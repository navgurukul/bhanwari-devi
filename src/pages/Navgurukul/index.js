import React, { useState } from "react";
import "./styles.scss";
import axios from "axios";
import { METHODS } from "../../services/api";

function NavgurukulIntroduce() {
  const [getMerakiUrl, setGetMerakiUrl] = useState([]);

  const partnerId = window.location.href.split("navgurukul/")[1];

  const getMerakiLink = () => {
    axios({
      method: METHODS.PUT,
      url: `${process.env.REACT_APP_MERAKI_URL}/partners/${partnerId}/merakiLink`,
      headers: {
        accept: "application/json",
        platform: "android",
      },
    }).then((res) => {
      setGetMerakiUrl(res.data.meraki_link);
    });
  };

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

        <button className="get-meraki-link" onClick={getMerakiLink()}>
          <a target="_blank" rel="noopener noreferrer" href={getMerakiUrl}>
            Get Meraki App
          </a>
        </button>
      </div>
    </div>
  );
}

export default NavgurukulIntroduce;
