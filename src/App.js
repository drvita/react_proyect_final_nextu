import React, { Component } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Search from "./componentes/Search";
import SearchCard from "./componentes/SearchCard";
import MapCard from "./componentes/MapCard";
import NearbyCard from "./componentes/NearbyCard";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: "",
      place_id: "",
      origen: "",
      photo: "",
      medio: "",
      nearby: [],
      show: "search",
    };
    window.marker = [];
  }

  map = "";

  componentDidMount() {
    const googlePlaceAPILoad = setInterval(() => {
      if (window.google) {
        this.google = window.google;
        this.coords = "";
        clearInterval(googlePlaceAPILoad);
      }
    }, 100);
  }

  render() {
    //console.log("show", this.state.show);
    return (
      <div className="container">
        <div className="card mt-4">
          <div className="card-header bg-primary text-center">
            <h3>Paseando ando</h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-3 text-center">
                {window.google ? (
                  <Search
                    origen={this.state.origen}
                    setPlaceState={this.setPlaceState}
                    setOrigen={this.setOrigenValue}
                    place_id={this.state.place_id}
                  />
                ) : (
                  ""
                )}
              </div>
              <div className="col-9">
                <div className="accordion" id="accordionExample">
                  <SearchCard
                    places={this.state.places}
                    show={this.state.show === "search" ? true : false}
                    setPanel={this.handlePanel}
                  />
                  <MapCard
                    medio={this.state.medio}
                    show={this.state.show === "map" ? true : false}
                    setPanel={this.handlePanel}
                  />
                  <NearbyCard
                    nearby={this.state.nearby}
                    clickOnPlace={this.clickOnNewPlace}
                    show={this.state.show === "nearby" ? true : false}
                    setPanel={this.handlePanel}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handlePanel = (panel) => {
    this.setState({
      show: panel,
    });
  };
  clickOnNewPlace = (place) => {
    //console.log("New place", place);
    this.setState({
      place_id: place,
      show: "search",
    });
  };
  setOrigenValue = (origen) => {
    this.setState({
      origen,
    });
  };
  setPlaceState = (result, place) => {
    if (result && place) {
      this.setState({
        places: result,
        medio: "",
        origen: "",
      });
      if (window.dr) window.dr.setMap(null);
      if (window.marker.length) {
        window.marker[0].setMap(null);
      }
      window.marker = [];
      window.marker.push(
        new window.google.maps.Marker({
          position: place.location,
          map: this.map,
          title: place.name,
          description: place.address,
        })
      );
      window.marker[0].setMap(window.map);
      window.map.setCenter(window.marker[0].position);
      window.map.setZoom(11);
      this.searchNearby();
    }
  };
  searchNearby = () => {
    if (window.marker.length) {
      var request = {
        location: window.marker[0].position,
        radius: 5000,
      };
      // Creamos el servicio PlaceService y enviamos la petición.
      var service = new window.google.maps.places.PlacesService(window.map);
      service.nearbySearch(request, (places, status) => {
        if (status === "OK") {
          this.setState({
            nearby: places,
          });
        }
      });
    }
  };
}

export default App;
