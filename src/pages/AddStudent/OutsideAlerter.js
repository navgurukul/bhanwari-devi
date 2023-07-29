import React, { useRef } from "react";
import useOutsideAlerter from "./useOutsideAlerter";

function OutsideAlerter(props) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, props.handleClick);

  return (
    <div ref={wrapperRef} className="d-inline">
      {props.children}
    </div>
  );
}

export default OutsideAlerter;
