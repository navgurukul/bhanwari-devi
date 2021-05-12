import React, { useState, useEffect } from "react";
import axios from "axios";
import { METHODS } from "../../services/api";

function GitHubStudyPack(props) {
  const [urlLink, setUrlLink] = useState("#");
  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_SARAL_URL}/${props.userEmail}`,
    }).then((data) => {
      setUrlLink(data.data.url);
    });
  }, []);
  return props.userEmail.split("@")[1] === "navgurukul.org" ? (
    <a
      className={props.sty}
      href={urlLink}
      target="_blank"
      rel="noopener noreferrer"
    >
      Github Study Pack
    </a>
  ) : null;
}

export default GitHubStudyPack;
