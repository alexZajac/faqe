import React, { useState } from "react";
import { tabConfig } from "./assets/Configs";

import Tabs from "./components/Tabs";
import ContentHandler from "./components/ContentHandler";

import "./styles/App.css";

export default function App() {
  const [index, setIndex] = useState(0);

  return (
    <div className="mainContainer">
      <Tabs
        config={tabConfig}
        selected={index}
        onSelect={idx => setIndex(idx)}
      />
      <ContentHandler selected={index} />
    </div>
  );
}
