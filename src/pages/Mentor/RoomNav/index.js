import React from "react";
import Avatar from "../../../components/common/Avatar";
import "./styles.scss";
import { Box, Typography, Grid } from "@material-ui/core";
import useStyles from "./Styles.js";
import ListItem from "@mui/material/ListItem";

// import Dropdown from "../../../components/common/Dropdown";
// import format from "date-fns/format";
// import { leaveRoom } from "../utils";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import { breakpoints } from "../../../theme/constant";
// import { display, width } from "@mui/system";

export default ({
  name,
  lastMessage,
  onSelect,
  isSelected,
  roomId,
  accessToken,
}) => {
  // const [isMessageActionsDropdownOpen, setIsMessageActionsDropdownOpen] =
  //   useState(false);
  const subtitle = lastMessage ? lastMessage.text : "";

  const renderSubtitle = () => {
    return subtitle.length > 30 ? subtitle.slice(0, 27) + "..." : subtitle;
  };

  // const roomActions = [
  //   {
  //     label: "Leave room",
  //     value: "leave room",
  //     onClick: () => {
  //       leaveRoom({
  //         roomId,
  //         accessToken,
  //       });
  //     },
  //   },
  // ];
  // const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const classes = useStyles();

  return (
    <ListItem
      className={isSelected ? classes.listItemSelected : classes.listItem}
      onClick={onSelect}
    >
      <Avatar style={{ height: "48px", width: "48px" }} name={name} />
      <Box className={classes.roomText}>
        <Typography
          className={classes.title}
          style={{ fontWeight: 600 }}
          variant="subtitle1"
        >
          {name}
        </Typography>
        <Typography
          className={classes.subtitle}
          variant="body2"
          color="textSecondary"
        >
          {subtitle ? renderSubtitle() : "This is the new way to do..."}
        </Typography>
      </Box>
      <Box className={classes.messageNumberCircle}>
        <Typography className={classes.messageNumber}>10</Typography>
      </Box>
    </ListItem>

    //   <div
    //   className={`room-nav ${isSelected ? "room-nav-selected" : ""}`}
    //   onClick={onSelect}
    // >
    //   <Avatar name={name} />
    //   <div className="room-text">
    //     <div className="title">{name}</div>
    //     <div className="subtitle">
    //       {subtitle ? (
    //         renderSubtitle()
    //       ) : (
    //         <span className="empty-char">empty</span>
    //       )}
    //     </div>
    //   </div>
    //   <div className="room-info-actions">
    //     {lastMessage && lastMessage.origin_server_ts && (
    //       <div>{format(new Date(lastMessage.origin_server_ts), "dd LLL")}</div>
    //     )}
    //     <div
    //       className="menu-ellipsis"
    //       onClick={(e) => {
    //         e.stopPropagation();
    //         setIsMessageActionsDropdownOpen(!isMessageActionsDropdownOpen);
    //       }}
    //     >
    //       <div className="menu-ellipsis-dot">•</div>
    //       <div className="menu-ellipsis-dot">•</div>
    //       <div className="menu-ellipsis-dot">•</div>
    //       <Dropdown
    //         isOpen={isMessageActionsDropdownOpen}
    //         options={roomActions}
    //       />
    //     </div>
    //   </div>
    // </div>
  );
};
