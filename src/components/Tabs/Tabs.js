import React from "react";
import PropTypes from "prop-types";

import "../../styles/Tabs.css";

export default function Tabs(props) {
  const renderTabs = tabConfig =>
    tabConfig.map((item, i) => (
      <div onClick={() => props.onSelect(i)} key={i} className="tab">
        <img alt={item.label} src={item.icon} className="tabImage" />
        <span className="tabLabel">{item.label}</span>
      </div>
    ));

  const renderHighlight = (tabConfig, selected) => (
    <div
      className="selectedArea"
      style={{
        top: `${(100 / tabConfig.length) * selected}%`,
        height: `${100 / tabConfig.length}vh`
      }}
    >
      <div
        className="highlightBar"
        style={{ height: `${100 / tabConfig.length}vh` }}
      />
      <div
        className="highlightGradient"
        style={{ height: `${100 / tabConfig.length}vh` }}
      />
    </div>
  );

  return (
    <div className="tabsContainer">
      {renderTabs(props.config)}
      {renderHighlight(props.config, props.selected)}
    </div>
  );
}

Tabs.propTypes = {
  config: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ),
  selected: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired
};

Tabs.defaultProps = {
  config: [],
  selected: 0,
  onSelect: () => {}
};
