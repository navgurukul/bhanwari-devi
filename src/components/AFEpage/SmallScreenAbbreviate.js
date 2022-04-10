import React from "react";
export default function SmallScreenAbbreviate(props) {
  const text = props.text || "";
  const isActive = props.isActive || false;
  const abbrText = text
    .split(" ")
    .map((word) => word[0].toUpperCase())
    .join("");
  return isActive ? <abbr title={text}>{abbrText}</abbr> : text;
}
