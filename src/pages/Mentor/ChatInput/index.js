import { Box, InputAdornment, TextField } from "@material-ui/core";
import React, { useState, useEffect, useRef } from "react";
import Avatar from "../../../components/common/Avatar";
import ReplyIcon from "@mui/icons-material/Reply";
import CloseIcon from "@mui/icons-material/Close";
import { getMemberName } from "../utils";
import "./styles.scss";
import useStyles from "./styles";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";

const InputAdorns = {
  startAdornment: [
    <InputAdornment key="1" position="start">
      {<AttachFileIcon style={{ color: "#6D6D6D", cursor: "pointer" }} />}
    </InputAdornment>,
    <InputAdornment key="2" position="start">
      {
        <SentimentSatisfiedAltIcon
          style={{ color: "#6D6D6D", cursor: "pointer" }}
        />
      }
    </InputAdornment>,
  ],
};

export default ({
  onNewMessage,
  roomId,
  replyMessage,
  members,
  activateReplyToMessageState,
}) => {
  const [value, onChange] = useState("");
  const inputRef = useRef(null);
  const classes = useStyles();

  useEffect(() => {
    if (replyMessage) {
      inputRef.current.focus();
    }
  }, [replyMessage]);

  const sendMessage = () => {
    if (value) {
      onChange("");
      onNewMessage(value, roomId);
    }
  };

  const onKeyDown = (e) => {
    if (e.which === 13) {
      sendMessage();
    }
  };

  let replyMessageSenderName;

  if (replyMessage) {
    let member = members.find(
      (member) => member.sender === replyMessage.sender
    );
    replyMessageSenderName = getMemberName(member);
  }

  return (
    <>
      {replyMessage && (
        <div className={classes.replyMessage}>
          <CloseIcon
            onClick={() => {
              activateReplyToMessageState(null);
            }}
            className={classes.closeReplyMessage}
          />
          <div className={classes.replyTo}>
            <span>Reply to</span>
            <ReplyIcon className={classes.replyToIcon} />
          </div>
          <div className={classes.replyMessageContent}>
            <Avatar name={replyMessageSenderName} style={{ marginRight: 12 }} />
            <div>
              <div className={classes.replyMessageSenderName}>
                {replyMessageSenderName}
              </div>
              <div>{replyMessage.content.body}</div>
            </div>
          </div>
        </div>
      )}
      <Box className={classes.inputContainer}>
        <TextField
          type="text"
          className={classes.textField}
          variant="outlined"
          ref={inputRef}
          value={value}
          onKeyDown={onKeyDown}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          InputProps={InputAdorns}
        />
        <img
          src={require("../assets/message-arrow.svg")}
          className={classes.arrowIcon}
          onClick={sendMessage}
        />
      </Box>
    </>
  );
};
