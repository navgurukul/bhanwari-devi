import React, { useState, useEffect } from "react";
import axios from "axios";
import { METHODS } from "../../services/api";
import "./styles.scss";

function GitHubStudyPack({ userEmail }) {
  const [urlLink, setUrlLink] = useState("#");
  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_SARAL_URL}/${userEmail}`,
    }).then((data) => {
      setUrlLink(data.data.url);
    });
  }, []);
  return userEmail.split("@")[1] === "navgurukul.org" ? (
    <button className="github-btn">
      <a
        href={urlLink}
        target="_blank"
        rel="noopener noreferrer"
        className="github-study-pack"
      >
        Github Study Pack
        <i className="fa fa-github github-icon"></i>
      </a>
    </button>
  ) : null;
}

export default GitHubStudyPack;
