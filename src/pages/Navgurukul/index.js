import React from "react";
import "./styles.scss";

function NavgurukulIntroduce() {
  return (
    <div className="ng-introduce-container">
      <div className="main-text">
        <h1 className="main-heading"> Navigating Meraki and its offerings</h1>
        <div>
          <video
            src="../../asset/video.mp4"
            className="meraki-insertion-video"
            controls
          ></video>
        </div>
        <button className="get-meraki-link">Get Meraki App</button>
      </div>
    </div>
  );
}

export default NavgurukulIntroduce;
