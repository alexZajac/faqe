import React, { useEffect } from "react";
import PropTypes from "prop-types";

export default function ThumbDrag(props) {
  const { isDragged, handleDragEnd } = props;
  useEffect(() => {
    if (!isDragged) {
      handleDragEnd();
    }
  }, [isDragged, handleDragEnd]);

  return (
    <div
      {...props}
      style={{
        height: "4vh",
        width: "4vh",
        borderRadius: "50%",
        backgroundColor: "#FFF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-5vh",
          color: "#fff",
          fontWeight: "bold",
          fontSize: "2vh",
          fontFamily: "Open Sans",
          padding: "4px",
          borderRadius: "4px",
          backgroundColor: "#54EAF3"
        }}
      >
        {props.rangeValues[0].toFixed(1)}
      </div>
    </div>
  );
}

ThumbDrag.propTypes = {
  rangeValues: PropTypes.arrayOf(PropTypes.number).isRequired,
  isDragged: PropTypes.bool.isRequired,
  handleDragEnd: PropTypes.func.isRequired
};

ThumbDrag.defaultProps = {
  rangeValues: [50],
  isDragged: false,
  handleDragEnd: () => {}
};
