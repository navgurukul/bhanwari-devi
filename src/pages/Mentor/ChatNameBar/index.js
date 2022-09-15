import React from "react";
import { Typography, useMediaQuery } from "@material-ui/core";
import CircleIcon from "@mui/icons-material/Circle";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import useStyles from "./styles";

export default function ChatNameBar() {
  const desktop = useMediaQuery("(min-width: 1200px)");
  const laptop = useMediaQuery("(min-width: 769px) and (max-width: 1199px)");
  const mobile = useMediaQuery("(max-width: 768px)");

  const classes = useStyles({ desktop, laptop, mobile });

  return (
    <div className={classes.chatNameBar}>
      <div className={classes.chatLeftWrapper}>
        <Typography
          style={{ fontWeight: 600, fontSize: !desktop && "14px" }}
          className={classes.chatName}
          variant="subtitle1"
        >
          DVET Pune Batch 1 Beginners
        </Typography>
        {desktop && (
          <CircleIcon
            style={{ width: "4px", height: "4px" }}
            className={classes.chatDot}
          />
        )}
        <Typography
          style={{
            fontWeight: 400,
            color: "#6D6D6D",
            fontSize: !desktop && "14px",
          }}
          className={classes.chatName}
          variant="body1"
        >
          40 Students
        </Typography>
      </div>
      <InfoOutlinedIcon className={classes.chatInfo} />
    </div>
  );
}
