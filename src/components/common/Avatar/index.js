import React, { useMemo } from "react";
import "./styles.scss";

const colors = [
  "#D55F31",
  "#DD7F5A",
  "#E69F83",
  "#91C642",
  "#A7D168",
  "#BDDD8E",
  "#0052F2",
  "#2971FF",
  "#5E95FF",
  "#B8BCBD",
  "#D63447",
];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getColor() {
  return colors[getRandomInt(0, 10)];
}

// in memory cache for name, color mapping
const nameColorMap = {};

export default ({ url, name, style = {} }) => {
  let avatarColor;
  if (!nameColorMap[name]) {
    avatarColor = useMemo(() => getColor(), [name]);
    nameColorMap[name] = avatarColor;
  } else {
    avatarColor = nameColorMap[name];
  }

  const renderContent = () => {
    if (!url) {
      return (
        <div className="avatar-text" style={{ backgroundColor: avatarColor }}>
          {name[0]}
        </div>
      );
    }
    return <img src={url} />;
  };
  return (
    <div className="avatar-container" style={style}>
      {renderContent()}
    </div>
  );
};
