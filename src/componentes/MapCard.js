import React, { Component } from "react";

export default class MapCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      medio: "",
    };
  }
  static getDerivedStateFromProps(props, state) {
    //console.log("State from props MapCard [props, state]", props, state);
    return {
      medio: props.medio,
    };
  }
  render() {
    return (
      <div className="card">
        <div className="card-header bg-info" id="headingTwo">
          <h2 className="mb-0">
            <button
              className={
                this.props.show
                  ? "btn btn-link btn-block text-left text-white"
                  : "btn btn-link btn-block text-left text-white collapsed"
              }
              type="button"
              aria-expanded={this.props.show ? "true" : "false"}
              onClick={this.setPanel}
            >
              Ubicacion y ruta
            </button>
          </h2>
        </div>
        <div
          id="collapseTwo"
          className={this.props.show ? "collapse show" : "collapse"}
          aria-labelledby="headingTwo"
          data-parent="#accordionExample"
        >
          <div className="card-body">
            <div className="card">
              <div className="card-body ">
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Punto de partida
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Selecione la ciudad de partida"
                      id="input_origin"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    className={
                      window.marker
                        ? "col-sm-4 col-form-label"
                        : "col-sm-4 col-form-label text-danger"
                    }
                  >
                    Medio de transporte
                  </label>
                  <div className="col-sm-8">
                    <select
                      className={
                        window.marker
                          ? "form-control form-control-lg"
                          : "form-control form-control-lg text-danger"
                      }
                      value={this.state.medio}
                      onChange={this.handleGetRoute}
                    >
                      <option value="">Seleccione medio de transporte</option>
                      <option value="DRIVING">Automovil</option>
                      <option value="BICYCLING">Bicicleta</option>
                      <option value="WALKING">Caminando</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div
              id="gmapContainer"
              className="border rounded p-3 mt-4"
              style={{ height: 600 }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  setPanel = () => {
    if (!this.props.show) this.props.setPanel("map");
    else this.props.setPanel("");
  };
  handleGetRoute = (e) => {
    e.preventDefault();
    const origen = document.getElementById("input_origin").value;

    if (!window.marker.length) {
      window.alert("Indique primero un lugar");
      return false;
    }

    if (window.marker.length && e.target.value && origen) {
      this.setState({
        medio: e.target.value,
      });
      if (window.dr) window.dr.setMap(null);
      window.ds = new window.google.maps.DirectionsService();
      window.dr = new window.google.maps.DirectionsRenderer({
        map: window.map,
      });

      window.ds.route(
        {
          origin: origen,
          destination: window.marker[0].position,
          travelMode: e.target.value,
        },
        (result, status) => {
          if (status === "OK") {
            window.dr.setDirections(result);
            var bounds = new window.google.maps.LatLngBounds(
              window.mylocation,
              window.marker[0].position
            );
            window.map.fitBounds(bounds);
          } else {
            window.alert("No se encontro la ubicación");
          }
        }
      );
    }
  };
}
