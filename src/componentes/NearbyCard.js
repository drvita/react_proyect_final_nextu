import React, { Component } from "react";
import Nearby from "./Nearby";

export default class NearbyCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nearby: [],
    };
  }

  static getDerivedStateFromProps(props, state) {
    //console.log("State from props Nearby card [props, state]", props, state);
    return {
      nearby: props.nearby,
    };
  }

  render() {
    return (
      <div className="card">
        <div className="card-header bg-info" id="headingThree">
          <h2 className="mb-0">
            <button
              className={
                this.props.show
                  ? "btn btn-link btn-block text-left text-white"
                  : "btn btn-link btn-block text-left text-white collapsed"
              }
              type="button"
              onClick={this.setPanel}
            >
              Sitios relacionados
            </button>
          </h2>
        </div>
        <div
          id="collapseThree"
          className={this.props.show ? "collapse show" : "collapse"}
          aria-labelledby="headingThree"
          data-parent="#accordionExample"
        >
          <div className="card-body">
            {this.state.nearby.length
              ? this.state.nearby.map((site, index) => {
                  if (index > 8) return false;
                  else
                    return (
                      <Nearby
                        data={site}
                        key={index}
                        click={this.handleClickNearby}
                      />
                    );
                })
              : "No hay sitios de interes cercanos"}
          </div>
        </div>
      </div>
    );
  }

  setPanel = () => {
    if (!this.props.show) this.props.setPanel("nearby");
    else this.props.setPanel("");
  };
  handleClickNearby = (id) => {
    this.props.clickOnPlace(id);
  };
}
