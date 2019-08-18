import React, { useState, useEffect, useRef } from "react";

import MainText from "../../components/MainText";
import CustomRange from "../../components/CustomRange";

import { statusConfig } from "../../assets/Configs";

import Webcam from "react-webcam";
import SweetAlert from "sweetalert-react";

import { faceDetectionOptions, canvas, faceapi } from "../../commons";

import "../../styles/Recognition.css";

const cosineSim = (A, B) => {
  let dotproduct = 0;
  let mA = 0;
  let mB = 0;
  for (let i = 0; i < A.length; i++) {
    dotproduct += A[i] * B[i];
    mA += A[i] * A[i];
    mB += B[i] * B[i];
  }
  mA = Math.sqrt(mA);
  mB = Math.sqrt(mB);
  const similarity = dotproduct / (mA * mB);
  return similarity;
};

const getOpacities = status => {
  let opacities = [1, 0, 0];
  if (status === "error") {
    opacities = [0, 0, 1];
  } else if (status === "success") {
    opacities = [0, 1, 0];
  }
  return opacities;
};

const getStatusTitle = status => {
  let title = "Press on the ‘space’ key to perform recognition";
  if (status === "error") {
    title = "You are not the same anymore";
  } else if (status === "success") {
    title = "I know you for sure !";
  }
  return title;
};

const getStatusDescription = (status, similarity) => {
  let desc = "Make sure your face is clearly visible";
  if (status === "error" || status === "success") {
    desc = "Similarity : " + similarity;
  }
  return desc;
};

const renderStatusSvg = status => {
  let png = statusConfig.neutral;
  if (status === "error") {
    png = statusConfig.error;
  } else if (status === "success") {
    png = statusConfig.success;
  }
  return (
    <div className="smileyContainer">
      <img alt="status" src={png} className="statusImage" />
    </div>
  );
};

const renderWebcam = webcam => (
  <Webcam
    ref={webcam}
    audio={false}
    style={{ opacity: 0, position: "absolute" }}
    screenshotQuality={1}
    screenshotFormat="image/png"
  />
);

const renderSpots = (opacities, loading) => (
  <div
    className="spots"
    style={{
      animation: loading
        ? "opacityinf 3s ease-in-out infinite"
        : "spotanim 1s ease-in-out"
    }}
  >
    <div
      className="radialGradient neutral"
      style={{
        opacity: opacities[0]
      }}
    />
    <div className="radialGradient success" style={{ opacity: opacities[1] }} />
    <div className="radialGradient error" style={{ opacity: opacities[2] }} />
  </div>
);

export default function Recognition() {
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [similarity, setSimilarity] = useState(0);
  const [messageAlert, setMessageAlert] = useState("");
  const [status, setStatus] = useState("neutral");

  let webcam = useRef();

  const renderAlert = (showAlert, messageAlert) => (
    <SweetAlert
      show={showAlert}
      title={messageAlert}
      type="warning"
      confirmButtonColor="#85E862"
      showLoaderOnConfirm
      text="Please try again with appropriate settings"
      onConfirm={() => setShowAlert(false)}
      onOutsideClick={() => setShowAlert(false)}
    />
  );

  const renderResetButton = status =>
    status !== "neutral" && (
      <div className="resetButton" onClick={() => setStatus("neutral")}>
        <span className="resetText">RESET</span>
      </div>
    );

  useEffect(() => {
    const handleKeyPress = async e => {
      if (webcam) {
        if (e.keyCode === 32) {
          const testImageUri = webcam.current.getScreenshot();
          setLoading(true);

          const testImage = await canvas.loadImage(testImageUri);
          const resultsTest = await faceapi
            .detectAllFaces(testImage, faceDetectionOptions)
            .withFaceLandmarks()
            .withFaceDescriptors();
          if (resultsTest.length === 0) {
            setShowAlert(true);
            setLoading(false);
            setMessageAlert(
              "Cannot detect your face, try again with appropriate settings"
            );
            setStatus("error");
          } else {
            const refObject = JSON.parse(localStorage.getItem("reference"));
            if (refObject === null) {
              setShowAlert(true);
              setLoading(false);
              setMessageAlert("Cannot find a reference image, set one first !");
              setStatus("error");
            } else {
              const refEmbedding = Object.values(refObject);
              const testEmbedding = resultsTest[0].descriptor;
              const cosineSimilarity = cosineSim(refEmbedding, testEmbedding);
              const threshold = JSON.parse(localStorage.getItem("threshold"));

              if (cosineSimilarity > threshold) {
                setLoading(false);
                setStatus("success");
                setSimilarity(cosineSimilarity.toFixed(3));
              } else {
                setLoading(false);
                setStatus("error");
                setSimilarity(cosineSimilarity.toFixed(3));
              }
            }
          }
        }
      } else {
        setShowAlert(true);
        setMessageAlert("Webcam is not ready !");
      }
    };
    document.addEventListener("keydown", handleKeyPress, false);
    return () => document.removeEventListener("keydown", handleKeyPress, false);
  }, [webcam]);

  return (
    <div className="recognitionContainer">
      {renderWebcam(webcam)}
      {renderAlert(showAlert, messageAlert)}
      {renderSpots(getOpacities(status), loading)}
      {renderStatusSvg(status)}
      <MainText
        title={getStatusTitle(status)}
        description={getStatusDescription(status, similarity)}
        style={{ margin: "5vh", animation: "bottomanim 0.6s ease-in-out" }}
      />
      {renderResetButton(status)}
      <CustomRange />
    </div>
  );
}

// export default class Recognition extends Component {
//   constructor(props) {
//     super(props);
//     this.webcam = null;
//     this.state = {
//       status: "neutral",
//       loading: false,
//       similarity: 0,
//       showAlert: false,
//       messageAlert: "",
//       rangeValues: [JSON.parse(localStorage.getItem("threshold")) * 100],
//     };
//   }

//   componentDidMount() {
//     document.addEventListener("keydown", this.beginRecognition, false);
//   }

//   componentWillUnmount() {
//     document.removeEventListener("keydown", this.beginRecognition, false);
//   }

//   beginRecognition = async () => {
//     if (this.webcam) {
//       const testImageUri = this.webcam.getScreenshot();
//       this.setState({ loading: true });
//       const testImage = await canvas.loadImage(testImageUri);
//       const resultsTest = await faceapi
//         .detectAllFaces(testImage, faceDetectionOptions)
//         .withFaceLandmarks()
//         .withFaceDescriptors();
//       if (resultsTest.length === 0) {
//         this.setState({
//           showAlert: true,
//           loading: false,
//           type: "error",
//           messageAlert:
//             "Cannot detect your face, try again with appropriate settings"
//         });
//       } else {
//         const refObject = JSON.parse(localStorage.getItem("reference"));
//         if (refObject === null) {
//           this.setState({
//             showAlert: true,
//             loading: false,
//             type: "error",
//             messageAlert: "Cannot find a reference image, set one first !"
//           });
//         } else {
//           const refEmbedding = Object.values(refObject);
//           const testEmbedding = resultsTest[0].descriptor;
//           const cosineSimilarity = this.cosinesim(refEmbedding, testEmbedding);
//           const { threshold } = this.state;
//           console.log(threshold);

//           if (cosineSimilarity > threshold) {
//             this.setState({
//               status: "success",
//               loading: false,
//               similarity: cosineSimilarity.toFixed(3)
//             });
//           } else {
//             this.setState({
//               status: "error",
//               loading: false,
//               similarity: cosineSimilarity.toFixed(3)
//             });
//           }
//         }
//       }
//     } else {
//       this.setState({
//         showAlert: true,
//         messageAlert: "Webcam is not ready !"
//       });
//     }
//   };

//   renderStatusSvg = status => {
//     let png = statusConfig.neutral;
//     if (status === "error") {
//       png = statusConfig.error;
//     } else if (status === "success") {
//       png = statusConfig.success;
//     }
//     return (
//       <div className="smileyContainer">
//         <img alt="status" src={png} className="statusImage" />
//       </div>
//     );
//   };

//   renderRange = rangeValues => (
//     <div className="rangeContainer">
//       <span className="titleRange">Confidence</span>
//       <Range
//         values={rangeValues}
//         step={1}
//         min={0}
//         max={100}
//         onChange={rangeValues => this.setState({ rangeValues })}
//         renderTrack={({ props, children }) => (
//           <div
//             style={{
//               ...props.style,
//               height: "36px",
//               display: "flex",
//               width: "100%"
//             }}
//           >
//             <div
//               ref={props.ref}
//               style={{
//                 height: "5px",
//                 width: "100%",
//                 borderRadius: "4px",
//                 background: getTrackBackground({
//                   values: rangeValues,
//                   colors: ["#54EAF3", "#575757"],
//                   min: 0,
//                   max: 100
//                 }),
//                 alignSelf: "center"
//               }}
//             >
//               {children}
//             </div>
//           </div>
//         )}
//         renderThumb={({ props, isDragged }) => (
//           <ThumbDrag
//             isDragged={isDragged}
//             handleDragEnd={() => this.handleDragEnd()}
//             rangeValues={rangeValues}
//             {...props}
//           />
//         )}
//       />
//       <div className="securityContainer">
//         <h6 className="secureText">Not secure</h6>
//         <h6 className="secureText" style={{ textAlign: "right" }}>
//           Perfect match
//         </h6>
//       </div>
//     </div>
//   );

//   handleDragEnd = () => {
//     const threshold = this.state.rangeValues[0] / 100;
//     this.setState(
//       { threshold },
//       localStorage.setItem("threshold", JSON.stringify(threshold))
//     );
//   };

//   getOpacities = status => {
//     let opacities = [1, 0, 0];
//     if (status === "error") {
//       opacities = [0, 0, 1];
//     } else if (status === "success") {
//       opacities = [0, 1, 0];
//     }
//     return opacities;
//   };

//   getStatusTitle = status => {
//     let title = "Press on the ‘space’ key to perform recognition";
//     if (status === "error") {
//       title = "You are not the same anymore";
//     } else if (status === "success") {
//       title = "I know you for sure !";
//     }
//     return title;
//   };

//   getStatusDescription = (status, similarity) => {
//     let desc = "Make sure your face is clearly visible";
//     if (status === "error" || status === "success") {
//       desc = "Similarity : " + similarity;
//     }
//     return desc;
//   };

//   renderAlert = (showAlert, messageAlert) => (
//     <SweetAlert
//       show={showAlert}
//       title={messageAlert}
//       type="warning"
//       confirmButtonColor="#85E862"
//       showLoaderOnConfirm
//       text="Please try again with appropriate settings"
//       onConfirm={() => this.setState({ showAlert: false })}
//       onOutsideClick={() => this.setState({ showAlert: false })}
//     />
//   );

//   renderWebcam = () => (
//     <Webcam
//       ref={webcam => (this.webcam = webcam)}
//       audio={false}
//       style={{ opacity: 0, position: "absolute" }}
//       screenshotQuality={1}
//       screenshotFormat="image/png"
//     />
//   );

//   renderSpots = (opacities, loading) => (
//     <div
//       className="spots"
//       style={{
//         animation: loading
//           ? "opacityinf 3s ease-in-out infinite"
//           : "spotanim 1s ease-in-out"
//       }}
//     >
//       <div
//         className="radialGradient neutral"
//         style={{
//           opacity: opacities[0]
//         }}
//       />
//       <div
//         className="radialGradient success"
//         style={{ opacity: opacities[1] }}
//       />
//       <div className="radialGradient error" style={{ opacity: opacities[2] }} />
//     </div>
//   );

//   renderResetButton = status =>
//     status !== "neutral" && (
//       <div
//         className="resetButton"
//         onClick={() => this.setState({ status: "neutral" })}
//       >
//         <span className="resetText">RESET</span>
//       </div>
//     );

//   render() {
//     const {
//       status,
//       showAlert,
//       loading,
//       messageAlert,
//       similarity,
//       rangeValues
//     } = this.state;
//     const opacities = this.getOpacities(status);
//     const statusTitle = this.getStatusTitle(status);
//     const statusDescription = this.getStatusDescription(status, similarity);

//     return (
//       <div className="recognitionContainer">
//         {this.renderWebcam()}
//         {this.renderAlert(showAlert, messageAlert)}
//         {this.renderSpots(opacities, loading)}
//         {this.renderStatusSvg(status)}
//         <MainText
//           title={statusTitle}
//           description={statusDescription}
//           style={{ margin: "5vh", animation: "bottomanim 0.6s ease-in-out" }}
//         />
//         {this.renderResetButton(status)}
//         {this.renderRange(rangeValues)}
//       </div>
//     );
//   }
// }
