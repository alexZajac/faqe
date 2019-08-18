import React from "react";
import "../../styles/Loader.css";

const Loader = () => (
  <div className="loaderWrapper">
    <div className="loaderContainer">
      <div className="loaderBox firstBox" />
      <div className="loaderBox secondBox" />
      <div className="loaderBox thirdBox" />
      <div className="loaderTextContainer" />
    </div>
    <div className="loaderTextContainer">
      <span className="loaderText">Loading Face Recognition Models</span>
    </div>
  </div>
);

export default Loader;
