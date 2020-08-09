import React, { Component } from "react";

export default class SearchCard extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-header bg-info" id="headingOne">
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
              Sitio de interes
            </button>
          </h2>
        </div>

        <div
          id="collapseOne"
          className={this.props.show ? "collapse show" : "collapse"}
          aria-labelledby="headingOne"
          data-parent="#accordionExample"
        >
          <div className="card-body">
            {this.props.places ? (
              this.props.places
            ) : (
              <div>
                <h3 className="card-title">Paseando Ando</h3>
                <ul>
                  <li>
                    Para iniciar, teclea el nombre del sitio que te interese
                    conocer
                  </li>
                  <li>
                    Despues seleciona la ubicacion y la ruta para llegar a tu
                    sitio
                  </li>
                  <li>
                    <strong>Buen viaje</strong>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  setPanel = () => {
    if (!this.props.show) this.props.setPanel("search");
    else this.props.setPanel("");
  };
}
