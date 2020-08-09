import React, { Component } from "react";
import moment from "moment";
import "moment/locale/es";

export default class Nearby extends Component {
  render() {
    let { data } = this.props;

    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            <img src={data.icon} alt="icono" width="16" height="16" />
            {data.name}
          </h5>
          <p className="card-text">
            Calificación: {data.rating ? data.rating : "--"}
          </p>
          <a
            href={"#" + data.place_id}
            id={data.place_id}
            className="btn btn-primary"
            onClick={this.handleOnclick}
          >
            Ver sitio
          </a>
        </div>
      </div>
    );
  }

  handleOnclick = (e) => {
    e.preventDefault();
    let { target } = e;
    this.props.click(target.id);
  };
}
