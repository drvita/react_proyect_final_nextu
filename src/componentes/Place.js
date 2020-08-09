import React, { Component } from "react";
import moment from "moment";
import "moment/locale/es";

export default class Place extends Component {
  render() {
    let { placeData } = this.props,
      cantPhotos = placeData.photos.length,
      htmlPhotos = [];

    if (cantPhotos > 6) cantPhotos = 6;
    else cantPhotos = 3;

    placeData.photos.map((photo, index) => {
      htmlPhotos.push(
        <div key={index} className="col-4 text-center">
          <img
            src={photo}
            alt={placeData.name}
            title={placeData.name}
            className="img-thumbnail img-fluid"
          />
        </div>
      );
      if (index === cantPhotos - 1) return true;
    });

    return (
      <div className="jumbotron">
        <h1 className="display-4">
          {placeData.icon ? (
            <img src={placeData.icon} width="32" height="32" alt="icon" />
          ) : (
            ""
          )}
          {placeData.name}
        </h1>
        <p className="lead">{placeData.address}</p>
        {placeData.rating ? (
          <p>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            {placeData.rating}
          </p>
        ) : (
          ""
        )}
        <hr className="my-4" />
        <label>
          <strong>Fotografias</strong>
        </label>
        <div className="row py-2">{htmlPhotos.slice(0, 3)}</div>
        <div className="row py-2">{htmlPhotos.slice(3, 6)}</div>
        <div className="row">
          <div className="col-6">
            <label>
              <strong>Espesificaciones</strong>
            </label>
            {placeData.types ? (
              <ul>
                {placeData.types.map((type, index) => {
                  return <li key={index}>{type}</li>;
                })}
              </ul>
            ) : (
              ""
            )}
            <label>
              <strong>Website</strong>
            </label>
            <p>
              {placeData.website ? (
                <a href={placeData.website}>{placeData.website}</a>
              ) : (
                "sin sitio web"
              )}
            </p>
          </div>
          <div className="col-6">
            <label>
              <strong>Estado del establecimiento</strong>
            </label>
            <p>{placeData.status ? placeData.status : "No es un negocio"}</p>
            <label>
              <strong>Horario</strong>
            </label>
            <p>
              {placeData.horario
                ? placeData.horario.map((h, i) => {
                    return <label key={i}>{h}</label>;
                  })
                : "no tiene horarios establecidos"}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {placeData.reviews
              ? placeData.reviews.map((view, index) => {
                  return (
                    <div className="card" key={index}>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-2">
                            <img
                              src={view.profile_photo_url}
                              alt="Foto de perfil"
                              width="60"
                              height="60"
                              className="img-fluid"
                            />
                          </div>
                          <div className="col-10">
                            <h5 className="card-title">{view.author_name}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">
                              <small>Calificación: {view.rating}</small>
                              <br />
                              <small>
                                Fecha:{" "}
                                {moment(view.time)
                                  .locale("es")
                                  .format("dddd, MMMM Do YYYY")}
                              </small>
                            </h6>
                          </div>
                        </div>
                        <div className="card-text">{view.text}</div>
                        <a
                          href={view.author_url}
                          target="_blank"
                          className="card-link"
                        >
                          Perfil
                        </a>
                      </div>
                    </div>
                  );
                })
              : "Sin comentarios"}
          </div>
        </div>
      </div>
    );
  }
}
