import React from "react";
import MainText from "../../components/MainText";

import ReactMarkdown from "react-markdown";

import { infoConfig } from "../../assets/Configs";
import "../../styles/Info.css";

const customRenderers = {
  link: props => (
    <a
      style={{ color: "#54eaf3" }}
      {...props}
      target="_blank"
      contentEditable="false"
    />
  ),
  paragraph: props => (
    <p style={{ color: "white", fontFamily: "Open Sans" }} {...props} />
  ),
  list: props => (
    <p style={{ color: "white", fontFamily: "Open Sans" }} {...props} />
  )
};

const Info = () => (
  <div className="infoContainer">
    <div style={{ animation: "bottomanim 0.3s ease-in-out" }}>
      <MainText
        title={infoConfig.app.title}
        style={{
          alignItems: "flex-start",
          width: "60vw"
        }}
      />
      <ReactMarkdown
        renderers={customRenderers}
        className="markdownText"
        source={infoConfig.app.description}
      />
    </div>
    <div style={{ animation: "bottomanim 0.3s ease-in-out" }}>
      <MainText
        title={infoConfig.credits.title}
        style={{
          alignItems: "flex-start",
          animation: "bottomanim 0.6s ease-in-out",
          width: "60vw"
        }}
      />
      <ReactMarkdown
        renderers={customRenderers}
        className="markdownText"
        source={infoConfig.credits.description}
      />
    </div>
    <div style={{ animation: "bottomanim 0.3s ease-in-out" }}>
      <MainText
        title={infoConfig.privacy.title}
        style={{
          alignItems: "flex-start",
          animation: "bottomanim 0.9s ease-in-out",
          width: "60vw"
        }}
      />
      <ReactMarkdown
        renderers={customRenderers}
        className="markdownText"
        source={infoConfig.privacy.description}
      />
    </div>
  </div>
);

export default Info;
