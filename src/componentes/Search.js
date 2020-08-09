import React, { Component } from "react";
import Place from "./Place";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      origen: "",
      place_id: "",
    };
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((res) => {
        window.mylocation = new window.google.maps.LatLng(
          res.coords.latitude,
          res.coords.longitude
        );
        this.service = new window.google.maps.Geocoder();
        this.service.geocode(
          {
            latLng: window.mylocation,
          },
          (result, status) => {
            if (status === "OK") {
              result.map((place) => {
                if (place.types[0] === "locality") {
                  document.getElementById("input_origin").value =
                    place.formatted_address;
                }
              });
            } else {
              console.log(status);
            }
          }
        );
        window.map = new window.google.maps.Map(
          document.getElementById("gmapContainer"),
          {
            center: window.mylocation,
            zoom: 15,
          }
        );
      });
    } else {
      window.alert("Tu navegador no soporta geolocalización");
    }
  }
  static getDerivedStateFromProps(props, state) {
    return {
      origen: props.origen,
      place_id: props.place_id,
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.place_id != this.props.place_id) {
      this.getNewPlace(this.props.place_id);
    }
  }

  render() {
    //let { data } = this.props;
    //console.log("Renderizado de search [props, state]", this.props, this.state);
    return (
      <React.Fragment>
        <h4>Indique el lugar</h4>
        <input
          id="origen"
          type="text"
          className="form-control mb-2"
          value={this.state.origen}
          onChange={this.onChangePlace}
          onKeyPress={this.onKeyHandle}
        />
        <button
          className="btn btn-primary text-center mt-2"
          onClick={this.handleOnClick}
        >
          Buscar Lugar
        </button>
      </React.Fragment>
    );
  }

  getNewPlace = (idPlace) => {
    //console.log("Iniciando busqueda de nuevo place", idPlace);
    if (idPlace) {
      this.findPlaceDetail(idPlace);
    }
  };
  foundPlaceDatail = (place, status) => {
    if (status === "OK") {
      var placePhotos = [""];
      if (place.photos) {
        place.photos.map((placePhoto, index) => {
          placePhotos[index] = placePhoto.getUrl({
            maxWidth: 160,
            maxHeight: 120,
          });
          if (index === 2) return true;
        });
      }
      const placeTemp = {
        id: place.place_id,
        name: place.name,
        address: place.formatted_address,
        photos: placePhotos,
        icon: place.icon,
        types: place.types,
        status: place.business_status,
        rating: place.rating,
        website: place.website,
        horario: place.opening_hours ? place.opening_hours.weekday_text : [],
        reviews: place.reviews,
        location: place.geometry.location,
      };
      this.props.setPlaceState(<Place placeData={placeTemp} />, placeTemp);
    }
  };
  findPlaceDetail = (placeIdFound) => {
    var request = {
      placeId: placeIdFound,
      fields: [
        "business_status",
        "adr_address",
        "website",
        "formatted_address",
        "icon",
        "id",
        "name",
        "photo",
        "place_id",
        "plus_code",
        "scope",
        "type",
        "opening_hours",
        "vicinity",
        "utc_offset_minutes",
        "geometry",
        "rating",
        "review",
        "price_level",
      ],
    };
    this.service.getDetails(request, this.foundPlaceDatail);
  };
  findPlaceResult = (results, status) => {
    let placesTemp = [];
    let placeId = "";
    console.log("REsultado de busqueda", status);
    if (status === "OK") {
      results.map((place) => {
        var placePhotos = [""];
        const placeTemp = {
          id: place.place_id,
          name: place.name,
          address: place.formatted_address,
          photos: placePhotos,
        };
        placeId = place.place_id;
        placesTemp.push(<Place placeData={placeTemp} />);
      });
    }
    if (placesTemp.length > 0) this.findPlaceDetail(placeId);
    else {
      const placeTemp = {
        id: "N/A",
        name: (
          <div className="mt-5">
            <strong className="text-center">No hay resultados</strong>
          </div>
        ),
        address: "",
        photos: [""],
      };
      this.props.setPlaceState(<Place placeData={placeTemp} />);
    }
  };
  handleOnClick = () => {
    if (this.state.origen) {
      const request = {
        query: this.state.origen,
        fields: ["photos", "formatted_address", "name", "place_id"],
      };
      this.service = new window.google.maps.places.PlacesService(window.map);
      this.service.findPlaceFromQuery(request, this.findPlaceResult);
    } else {
      window.alert("Primero escriba un destino");
    }
  };
  onKeyHandle = (e) => {
    if (e.key === "Enter") {
      this.handleOnClick();
    }
  };
  onChangePlace = (e) => {
    let { target } = e;
    this.props.setOrigen(target.value);
  };
}
