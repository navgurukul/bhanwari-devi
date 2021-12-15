import React from "react";
import "./styles.scss";

function NavgurukulIntroduce() {
  return (
    <div className="ng-introduce-container">
      <div className="main-text">
        <h1 className="main-heading"> Navigating Meraki and its offerings</h1>
        <div className="video-of-ng">
          <video width="920" height="500" controls>
            <source src="movie.mp4" type="video/mp4" />
            <source src="movie.ogg" type="video/ogg" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}

export default NavgurukulIntroduce;
