import React from "react";
import useStyles from "./styles";
import { Box } from "@mui/system";
import Avatar from "../../../components/common/Avatar";
import { Typography, useMediaQuery } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Toggle from "./Toggle/Toggle";
import Chip from "@mui/material/Chip";
import MuteModal from "./Modal/MuteModal";

// const members = [
//   {
//     name: "Amrita Parashar",
//     isTutor: true,
//   },
//   {
//     name: "Amrita Parashar",
//     isTutor: false,
//   },
//   {
//     name: "Amrita Parashar",
//     isTutor: false,
//   },
//   {
//     name: "Amrita Parashar",
//     isTutor: false,
//   },
//   {
//     name: "Amrita Parashar",
//     isTutor: false,
//   },
//   {
//     name: "Amrita Parashar",
//     isTutor: false,
//   },
//   {
//     name: "Amrita Parashar",
//     isTutor: false,
//   },
//   {
//     name: "Amrita Parashar",
//     isTutor: false,
//   },
//   {
//     name: "Amrita Parashar",
//     isTutor: false,
//   },
//   {
//     name: "Amrita Parashar",
//     isTutor: false,
//   },
//   {
//     name: "Amrita Parashar",
//     isTutor: false,
//   },
// ];

const chipStyle = {
  height: "27px",
  padding: "3px 0px",
  backgroundColor: "#FFCC00",
  marginLeft: "auto",
};

export default function ChatInfo({selectedRoomId, setChatInfoOpen, members, rooms }) {
  const desktop = useMediaQuery("(min-width: 1200px)");
  const mobile = useMediaQuery("(max-width: 768px)");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);
  const [roomName, setRoomName] = React.useState("");
  const classes = useStyles({ mobile, desktop });
  const name = "DVET Pune Batch 1 Beginners";
  const subtitle1 = "#DVETPuneBatch";

  console.log(rooms)
  console.log(selectedRoomId);
  
  React.useEffect(() => {
    rooms.map((room) => {
      if (room.roomId === selectedRoomId) {
        setRoomName(room.name ? room.name : "");
      }
    });
  }, [selectedRoomId]);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <MuteModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        setIsMuted={setIsMuted}
      />
      <Box className={classes.infoContainer}>
        {mobile && (
          <ArrowBackIosNewIcon
            onClick={setChatInfoOpen}
            className={classes.backIcon}
          />
        )}
        <Box className={classes.header}>
          <Avatar
            style={{ height: "48px", width: "48px" }}
            name={name}
          ></Avatar>
          <Typography className={classes.title} variant="subtitle1">
            {roomName}
          </Typography>
          <Box className={classes.subtitleWrapper}>
            <Typography className={classes.subtitle} variant="subtitle1">
              {subtitle1}
            </Typography>
            <CircleIcon className={classes.dot} />
            <Typography className={classes.subtitle} variant="subtitle1">
              {members.length} Participants
            </Typography>
          </Box>
        </Box>

        <Box className={classes.notificationContainer}>
          <NotificationsIcon className={classes.bellIcon} />
          <Box className = {classes.muteWrapper}>
            <Typography className={classes.muteText} variant="subtitle1">
              Mute Notifications
            </Typography>
            {isMuted && <Typography className={classes.muted} variant="subtitle1">
              Muted
            </Typography>}
          </Box>
          <Box className={classes.toggleWrapper}>
            <Toggle
              openModal={openModal}
              isChecked={isMuted}
              setIsMuted={setIsMuted}
            />
          </Box>
        </Box>
        <Typography className={classes.participantText} variant="subtitle1">
          {members.length} Participants
        </Typography>
        <Box className={classes.listContainer}>
          {members.map((member, index) => {
            return (
              <Box key={index} className={classes.nameContainer}>
                <Avatar
                  style={{ height: "40px", width: "40px" }}
                  name={member.content?.displayname ||  "N/A" }
                ></Avatar>
                <Typography className={classes.nameText} variant="subtitle1">
                  {member.content?.displayname || "N/A"}
                </Typography>
                {member.isTutor && <Chip label="Tutor" sx={chipStyle} />}
              </Box>
            );
          })}
        </Box>
      </Box>
    </>
  );
}