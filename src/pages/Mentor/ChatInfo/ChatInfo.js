import React from "react";
import useStyles from "./styles";
import { Box } from "@mui/system";
import Avatar from "../../../components/common/Avatar";
import { Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function ChatInfo() {
  const classes = useStyles();
  const name = "DVET Pune Batch 1 Beginners";
  const subtitle1 = "#DVETPuneBatch";
  const subtitle2 = "101 Participants";
  return (
    <>
      <Box className={classes.infoContainer}>
        <Box className={classes.header}>
          <Avatar
            style={{ height: "48px", width: "48px" }}
            name={name}
          ></Avatar>
          <Typography className={classes.title} variant="subtitle1">
            {name}
          </Typography>
          <Box className={classes.subtitleWrapper}>
            <Typography className={classes.subtitle} variant="subtitle1">
              {subtitle1}
            </Typography>
            <CircleIcon className={classes.dot} />
            <Typography className={classes.subtitle} variant="subtitle1">
              {subtitle2}
            </Typography>
          </Box>
        </Box>

        <Box className={classes.notificationContainer}>
            <NotificationsIcon className={classes.bellIcon}/>
            <Typography className={classes.muteText} variant="subtitle1">
                Mute Notifications
            </Typography>
        </Box>
      </Box>
    </>
  );
}
