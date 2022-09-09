import React from "react";
import { Typography } from "@material-ui/core";
import CircleIcon from "@mui/icons-material/Circle";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import useStyles from "./styles";

export default function ChatNameBar() {
  const classes = useStyles();
  return (
    <div className={classes.chatNameBar}>
      <div className={classes.chatLeftWrapper}>
        <Typography
          style={{ fontWeight: 600 }}
          className="chat-name"
          variant="subtitle1"
        >
          DVET Pune Batch 1 Beginners
        </Typography>
        <CircleIcon
          style={{ width: "4px", height: "4px" }}
          className={classes.chatDot}
        />
        <Typography
          style={{ fontWeight: 400, color: "#6D6D6D" }}
          className={classes.chatName}
          variant="body1"
        >
          40 Students
        </Typography>
        <InfoOutlinedIcon className={classes.chatInfo} />
      </div>
      <ExitToAppOutlinedIcon className={classes.chatExit} />
    </div>
  );
}
