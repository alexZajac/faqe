import React, { useState, useEffect, useRef } from "react";
import MainText from "../../components/MainText";

import SweetAlert from "sweetalert-react";
import Webcam from "react-webcam";

import { faceDetectionOptions, canvas, faceapi } from "../../commons";

import "../../styles/Reference.css";
import "sweetalert/dist/sweetalert.css";

const title = "Press on the ‘space’ key to take a picture";
const description = "Make sure your face is clearly visible";

export default function Reference() {
  const [showAlert, setShowAlert] = useState(false);
  const [showConfirmButton, setShowConfirmButton] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");
  const [type, setType] = useState("success");

  let webcam = useRef();

  useEffect(() => {
    const handleKeypress = async e => {
      if (e.keyCode === 32) {
        if (webcam) {
          const imageSrc = webcam.current.getScreenshot();

          setShowAlert(true);
          setMessageAlert(
            "Saving a 128-d space representation of your face..."
          );
          setType("info");

          const refImage = await canvas.loadImage(imageSrc);
          const resultsRef = await faceapi
            .detectAllFaces(refImage, faceDetectionOptions)
            .withFaceLandmarks()
            .withFaceDescriptors();
          if (resultsRef.length === 0) {
            setType("error");
            setShowConfirmButton(true);
            setMessageAlert(
              "Cannot detect your face, please try again with appropriate settings"
            );
          } else {
            setType("success");
            setShowConfirmButton(true);
            setMessageAlert("Your reference file was saved, test it out !");
            localStorage.setItem(
              "reference",
              JSON.stringify(resultsRef[0].descriptor)
            );
          }
        } else {
          setType("error");
          setShowConfirmButton(true);
          setMessageAlert("Webcam not ready");
        }
      }
    };
    document.addEventListener("keydown", handleKeypress, false);
    return () => document.removeEventListener("keydown", handleKeypress, false);
  }, [webcam]);

  return (
    <div className="referenceContainer">
      <div className="gradient" />
      <Webcam
        ref={webcam}
        audio={false}
        className="video"
        screenshotQuality={1}
        screenshotFormat="image/png"
      />
      <SweetAlert
        show={showAlert}
        title="Saving your reference image"
        type={type}
        confirmButtonColor={type === "error" ? "#E86262" : "#85E862"}
        confirmTextButton="OK"
        showConfirmButton={showConfirmButton}
        text={messageAlert}
        onConfirm={() => setShowAlert(false)}
        onOutsideClick={() => setShowAlert(false)}
      />
      <div className="textContainer">
        <MainText title={title} description={description} />
      </div>
    </div>
  );
}
