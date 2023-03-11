import React, { useState, useEffect } from "react";
import { timeLeftFormat } from "../../../common/date";
import { Button, Typography } from "@mui/material";
import { format } from "../../../common/date";
import { useSelector, useDispatch } from "react-redux";

function LastLoginTime() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const user = useSelector(({ User }) => User);
  const date = user.data.user.last_login_at;
  var loginTime = new Date(date);
  const getTime = () => {
    const time = Date.now() - Date.parse(loginTime);

    setDays(Math.floor(time / 86400000));
    setHours(Math.floor((time % 86400000) / 3600000));
    setMinutes(Math.round(((time % 86400000) % 3600000) / 60000));
  };
  useEffect(() => {
    const interval = setInterval(() => getTime(loginTime), 1000);

    return () => clearInterval(interval);
  }, []);

  // var currentDate = new Date();
  // var diffMs = (currentDate - loginTime);
  // var diffDays = Math.floor(diffMs / 86400000);
  // var diffHrs = Math.floor((diffMs % 86400000) / 3600000);
  // var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
  //     const [timedate,setDate]=useEffect()
  //     useEffect(() => {
  //         var timer = setInterval(() => setDate(diffMins), 1000);
  //         return function cleanup() {
  //           clearInterval(timer);
  //         };
  //       });

  //    console.log(timedate)
  return (
    <>
      <Typography
        variant="body1"
        sx={{
          color: "GrayText",
          margin: "32px 0px",
        }}
      >
        Last Active{" "}
        {days == 0
          ? hours == 0
            ? minutes + " mins"
            : hours + " hours"
          : days + " Days"}{" "}
        ago
      </Typography>
    </>
  );
}

export default LastLoginTime;
