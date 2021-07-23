import React, { useState } from "react";
import "./styles.scss";

function HiddenContent(props) {
  const [hidden, setHidden] = useState(true);

  return (
    <div id="hiddenContent__container">
      <div id="hiddenContent__control" onClick={() => setHidden(!hidden)}>
        {" "}
        {hidden ? "Show" : "Hide"} Solution {hidden ? "⤵" : "⤴"}{" "}
      </div>
      <div id={`hiddenContent__main--${hidden ? "hide" : "show"}`}>
        {props.children}
      </div>
    </div>
  );
}

export default HiddenContent;
