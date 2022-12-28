import React, { useState, useEffect } from "react";
import { timeLeftFormat } from "../../common/date";
import { Button } from "@mui/material";
import ExternalLink from "../common/ExternalLink";

function LearningTrackTimerButton({
  startTime = new Date(),
  link,
  joinOnClick,
}) {
  const ONE_SECOND = 1000; //millisecs
  const ONE_MINUTE = 60 * ONE_SECOND;
  const CAN_JOIN_MSG = "Join Now";
  // const TOO_LATE = "less than a minute (too late to join)";
  // const CLASS_PAST_START = "progress or concluded (too late to join)";
  const timeLeftFormatOptions = {
    expiredText: CAN_JOIN_MSG,
    precision: [2, 2, 2, 2, 1, 1],
    cutoffTextArr: ["", "", "", "", CAN_JOIN_MSG, CAN_JOIN_MSG],
    cutoffNumArr: [0, 0, 0, 0, 10, 60],
  };
  // const canJoin = () => minutesUntil(startTime) <= 10;
  const [timeRemainingMsg, setTimeRemainingMsg] = useState(
    timeLeftFormat(startTime, timeLeftFormatOptions)
  );

  useEffect(() => {
    setTimeRemainingMsg(timeLeftFormat(startTime, timeLeftFormatOptions));
    const timer = setInterval(() => {
      const newTimeRemainingMsg = timeLeftFormat(
        startTime,
        timeLeftFormatOptions
      );
      setTimeRemainingMsg(newTimeRemainingMsg);
      if (newTimeRemainingMsg === CAN_JOIN_MSG) {
        clearInterval(timer); // can join so can dispose of timer now
      }
    }, ONE_MINUTE);
    return () => clearInterval(timer); // cleans up on unmount
  }, [startTime]);

  return (
    <>
      {timeRemainingMsg === CAN_JOIN_MSG ? (
        <ExternalLink
          style={{
            textDecoration: "none",
          }}
          href={link}
        >
          <Button
            // variant="text"
            sx={{ display: "block" }}
            onClick={joinOnClick ? joinOnClick : undefined}
            variant="outlined"
          >
            {CAN_JOIN_MSG}
          </Button>
        </ExternalLink>
      ) : (
        <Button disabled={true} variant="outlined" sx={{ display: "block" }}>
          Starts in {timeRemainingMsg}
        </Button>
      )}
    </>
  );
}

export default LearningTrackTimerButton;
