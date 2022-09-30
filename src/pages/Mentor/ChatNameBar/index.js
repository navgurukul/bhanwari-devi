import React from "react";
import { Typography, useMediaQuery } from "@material-ui/core";
import CircleIcon from "@mui/icons-material/Circle";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InfoIcon from '@mui/icons-material/Info';
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import useStyles from "./styles";

export default function ChatNameBar({ onBack, rooms, selectedRoomId, chatInfoOpen, setChatInfoOpen}) {
  const desktop = useMediaQuery("(min-width: 1200px)");
  const laptop = useMediaQuery("(min-width: 769px) and (max-width: 1199px)");
  const mobile = useMediaQuery("(max-width: 768px)");

  const [roomName, setRoomName] = React.useState("");
  const classes = useStyles({ desktop, laptop, mobile });

  React.useEffect(() => {
    rooms.map((room) => {
      if (room.roomId === selectedRoomId) {
        setRoomName(room.name ? room.name : "");
      }
    });
  }, [selectedRoomId]);

  return (
    <div className={classes.chatNameBar}>
      {mobile && (
        <ArrowBackIosNewIcon onClick={onBack} className={classes.backIcon} />
      )}
      <div className={classes.chatLeftWrapper}>
        <Typography className={classes.chatName} variant="subtitle1">
          {roomName}
        </Typography>
        {desktop && <CircleIcon className={classes.chatDot} />}
        <Typography className={classes.studentNumber} variant="body1">
          40 Students
        </Typography>
      </div>
      {
        chatInfoOpen ? 
        <InfoIcon onClick={setChatInfoOpen} className={classes.chatInfo}/>:
        <InfoOutlinedIcon onClick={setChatInfoOpen} className={classes.chatInfo}/>
      }
    </div>
  );
}
