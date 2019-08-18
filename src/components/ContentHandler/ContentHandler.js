import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Recognition from "../../screens/Recognition";
import Info from "../../screens/Info";
import Reference from "../../screens/Reference";

import Loader from "../../components/Loader";
import * as faceapi from "face-api.js";
import { faceDetectionNet } from "../../commons";

import "../../styles/ContentHandler.css";

const screens = [<Recognition />, <Reference />, <Info />];

export default function ContentHandler(props) {
  const [modelsLoaded, setModelsLoaded] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      await faceDetectionNet.loadFromUri("./weights");
      await faceapi.nets.faceLandmark68Net.loadFromUri("./weights");
      await faceapi.nets.faceRecognitionNet.loadFromUri("./weights");
      setModelsLoaded(true);
    };
    loadModels();
  }, []);

  return (
    <div className="container">
      {modelsLoaded ? screens[props.selected] : <Loader />}
    </div>
  );
}

ContentHandler.propTypes = {
  selected: PropTypes.number.isRequired
};

ContentHandler.defaultProps = {
  selected: 0
};
