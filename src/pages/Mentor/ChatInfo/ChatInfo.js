import React from "react";
import useStyles from "./styles";
import { Box } from "@mui/system";
import Avatar from "../../../components/common/Avatar";
import { Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import NotificationsIcon from '@mui/icons-material/Notifications';
import Toggle from "./Toggle/Toggle";
import Chip from '@mui/material/Chip';


const members = [
  {
    name: "Amrita Parashar",
    isTutor: true 
  },
  {
    name: "Amrita Parashar",
    isTutor: false 
  },
  {
    name: "Amrita Parashar",
    isTutor: false 
  },
  {
    name: "Amrita Parashar",
    isTutor: false 
  },
  {
    name: "Amrita Parashar",
    isTutor: false 
  },
  {
    name: "Amrita Parashar",
    isTutor: false 
  },
  {
    name: "Amrita Parashar",
    isTutor: false 
  },
  {
    name: "Amrita Parashar",
    isTutor: false 
  },
  {
    name: "Amrita Parashar",
    isTutor: false 
  },
  {
    name: "Amrita Parashar",
    isTutor: false 
  },
  {
    name: "Amrita Parashar",
    isTutor: false 
  },
]

const chipStyle = {
  height: "27px", 
  padding: "3px 0px", 
  backgroundColor: "#FFCC00", 
  marginLeft: "auto"
}

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
            <Box className={classes.toggleWrapper}>
              <Toggle/>
            </Box>
        </Box>
        <Typography className={classes.participantText} variant="subtitle1">
            101 Participants
        </Typography>
        <Box className={classes.listContainer}>
          {
            members.map((member, index)=>{
              return (<Box key={index} className={classes.nameContainer}>
                <Avatar
                  style={{ height: "40px", width: "40px" }}
                  name={name}
                ></Avatar>
                <Typography className={classes.nameText} variant="subtitle1">
                  {member.name}
                </Typography>
                {member.isTutor && <Chip label="Tutor" sx={chipStyle} />}
              </Box>)
            })
          }          
        </Box>
      </Box>
    </>
  );
}
