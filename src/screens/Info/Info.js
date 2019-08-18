import React from "react";
import MainText from "../../components/MainText";

import { infoConfig } from "../../assets/Configs";
import "../../styles/Info.css";

const Info = () => (
  <div className="infoContainer">
    <MainText
      title={infoConfig.app.title}
      description={infoConfig.app.description}
      style={{
        alignItems: "flex-start",
        animation: "bottomanim 0.3s ease-in-out",
        width: "60vw"
      }}
    />
    <MainText
      title={infoConfig.credits.title}
      description={infoConfig.credits.description}
      style={{
        alignItems: "flex-start",
        animation: "bottomanim 0.6s ease-in-out",
        width: "60vw"
      }}
    />
    <MainText
      title={infoConfig.privacy.title}
      description={infoConfig.privacy.description}
      style={{
        alignItems: "flex-start",
        animation: "bottomanim 0.9s ease-in-out",
        width: "60vw"
      }}
    />
  </div>
);

export default Info;
