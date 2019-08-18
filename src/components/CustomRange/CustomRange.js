import React, { useState } from "react";
import { Range, getTrackBackground } from "react-range";
import ThumbDrag from "../ThumbDrag";

import "../../styles/CustomRange.css";

export default function CustomRange() {
  const [rangeValues, setRangeValues] = useState([
    JSON.parse(localStorage.getItem("threshold")) * 100
  ]);

  const handleDragEnd = () => {
    const threshold = rangeValues[0] / 100;
    localStorage.setItem("threshold", JSON.stringify(threshold));
  };

  return (
    <div className="rangeContainer">
      <span className="titleRange">Confidence</span>
      <Range
        values={rangeValues}
        step={1}
        min={0}
        max={100}
        onChange={newRange => setRangeValues(newRange)}
        renderTrack={({ props, children }) => (
          <div
            style={{
              ...props.style,
              height: "36px",
              display: "flex",
              width: "100%"
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "5px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values: rangeValues,
                  colors: ["#54EAF3", "#575757"],
                  min: 0,
                  max: 100
                }),
                alignSelf: "center"
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <ThumbDrag
            isDragged={isDragged}
            handleDragEnd={() => handleDragEnd()}
            rangeValues={rangeValues}
            {...props}
          />
        )}
      />
      <div className="securityContainer">
        <h6 className="secureText">Not secure</h6>
        <h6 className="secureText" style={{ textAlign: "right" }}>
          Perfect match
        </h6>
      </div>
    </div>
  );
}
