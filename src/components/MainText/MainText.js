import React from "react";
import PropTypes from "prop-types";

import "../../styles/MainText.css";

export default function MainText(props) {
  return (
    <div className="mainTextContainer" style={props.style}>
      <h2 className="title">{props.title}</h2>
      <span className="description">{props.description}</span>
    </div>
  );
}

MainText.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  style: PropTypes.string
};

MainText.defaultProps = {
  title: "",
  description: "",
  style: {}
};
