import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { METHODS } from "../../services/api";
import { toast } from "react-toastify";

toast.configure();

function GitHubStudyPack(props) {
  const user = useSelector(({ User }) => User.data.user);
  const [urlLink, setUrlLink] = useState("#");

  useEffect(() => {
    if (user.email.includes("navgurukul")) {
      axios({
        method: METHODS.GET,
        urlLink: `${process.env.REACT_APP_SARAL_URL}/${user.email}`,
      }).then((data) => {
        setUrlLink(data.data.urlLink);
      });
    }
  }, []);

  const handleClick = () => {
    if (urlLink === "#") {
      toast.error(
        `${user.name}, Please use Navgurukul email id to access Git Pack.`,
        {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 5000,
        }
      );
    }
  };

  return (
    <a
      className={props.sty}
      href={urlLink}
      onClick={handleClick}
      target={urlLink === "#" ? null : "_blank"}
    >
      Github Study Pack
    </a>
  );
}

export default GitHubStudyPack;
