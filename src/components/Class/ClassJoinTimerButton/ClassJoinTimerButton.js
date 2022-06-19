import React, { useState, useEffect } from "react";
import { timeLeftFormat, minutesUntil } from "../../../common/date";
import { Button } from "@mui/material";
import ExternalLink from "../../common/ExternalLink";

function ClassJoinTimerButton({ startTime, link, joinOnClick }) {
  const ONE_SECOND = 1000; //millisecs
  const ONE_MINUTE = 60 * ONE_SECOND;
  const CAN_JOIN = "Join Now";
  // const TOO_LATE = "less than a minute (too late to join)";
  // const CLASS_PAST_START = "progress or concluded (too late to join)";
  const timeLeftFormatOptions = {
    // expiredText: CLASS_PAST_START,
    precision: [2, 2, 2, 2, 1, 1],
    // cutoffTextArr: ["", "", "", "", CAN_JOIN, TOO_LATE],
    // cutoffNumArr: [0, 0, 0, 0, 10, 60]
  };
  const canJoin = () => minutesUntil(startTime) <= 10;
  const [joinNow, setJoinNow] = useState(canJoin());

  useEffect(() => {
    const timer = setInterval(() => {
      const newJoinNow = canJoin(); 
      setJoinNow(newJoinNow);
      if (newJoinNow) {
        clearInterval(timer); // can join so can dispose of timer now
      }
    }, ONE_MINUTE);
    return () => clearInterval(timer); // cleans up on unmount
  }, [startTime]);

  return (
    <>
      {joinNow ? (
        <ExternalLink
          style={{
            textDecoration: "none"
          }}
          href={link}
        >
          <Button
            variant="contained"
            fullWidth
            onClick={joinOnClick ? joinOnClick : undefined}
          >
            {CAN_JOIN}
          </Button>
        </ExternalLink>
      ) : (
        <Button disabled={true} variant="contained">
          Class in {timeLeftFormat(startTime, timeLeftFormatOptions)}
        </Button>
      )}
    </>
  );
}

export default ClassJoinTimerButton;