import React, { useEffect, useState } from "react";
import "./styles.scss";
import axios from "axios";
import { useParams, Link } from "react-router";
import { useSelector } from "react-redux";
import { METHODS } from "../../services/api";

function NavgurukulIntroduce() {
  const user = useSelector(({ User }) => User);
  const [url, setUrl] = useState("");
  let { id = "112" } = useParams();
  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}partners/${id}/merakiLink`,
      headers: {
        accept: "application/json",
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEzNDMiLCJlbWFpbCI6ImFuYW5kbmF2Z3VydWt1bEBnbWFpbC5jb20iLCJpYXQiOjE2MjAzODI5MDIsImV4cCI6MTY1MTk0MDUwMn0.nSzJ32kBeN57iRpTiDCK81L1555oIgxaF0B1XZI7SjI",
        platform: "android",
      },
    }).then((res) => console.log(res.data));
  }, []);
  console.log(id);
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
        <button
          className="get-meraki-link"
          onClick={() => {
            window.location.href = url;
          }}
        >
          Get Meraki App
        </button>
      </div>
    </div>
  );
}

export default NavgurukulIntroduce;
