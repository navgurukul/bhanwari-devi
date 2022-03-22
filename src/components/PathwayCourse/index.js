// import React, { useState } from "react";
import PythonCourse from "./PythonCourse";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import CheckIcon from "@mui/icons-material/Check";
// import useStyles from "./styles";
import axios from "axios";
import { METHODS } from "../../services/api";

function Pathways() {
  const user = useSelector(({ User }) => User);
  const [pathwayId, setPathwayId] = useState("1");
  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/pathways?courseType=json`,
      headers: {
        accept: "application/json",
        "version-code": 40,
        Authorization: user.data.token,
      },
    }).then((res) => {
      console.log("ressssss", res);
      setPathwayId(res.data.pathways[0].id);
    });
  }, []);

  console.log("pathwayId", pathwayId);

  return (
    <>
      <h1>Komal</h1>
      <PythonCourse pathwayId={pathwayId} />
    </>
  );
}

export default Pathways;
