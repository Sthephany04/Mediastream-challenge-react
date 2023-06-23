import React from "react";
import "../assets/styles.css";

export const MovieCard = ({ posterUrl, title, year, genres }) => {
  const defaultImage =
    "https://thumbs.dreamstime.com/b/icono-de-c%C3%A1mara-v%C3%ADdeo-ilustraci%C3%B3n-plana-para-dise%C3%B1o-gr%C3%A1fico-y-web-aislado-en-fondo-negro-logotipo-vectorial-simple-161242685.jpg";
  return (
    <div
      className="movie-container__card"
      style={{
        backgroundImage: `url(${posterUrl}), url(${defaultImage})`,
      }}
    >
      <div className="movie-library__card">
        <p style={{ fontSize: 14, fontWeight: "bold" }}>{title}</p>
        <p style={{ fontSize: 12 }}>{genres.join(", ")}</p>
        <p style={{ fontSize: 12 }}>{year}</p>
      </div>
    </div>
  );
};
