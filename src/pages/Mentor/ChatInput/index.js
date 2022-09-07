import { Box, Icon, TextField } from "@material-ui/core";
import React, { useState, useEffect, useRef } from "react";
import Avatar from "../../../components/common/Avatar";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { getMemberName } from "../utils";
import "./styles.scss";
import useStyles from "./styles";

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
  console.log(classes);
  return (
    <>
      {replyMessage && (
        <div className="reply-message">
          <i
            className="fa fa-times close-reply-message"
            onClick={() => {
              activateReplyToMessageState(null);
            }}
          />
          <div className="reply-to">
            <span>Reply to</span>
            <i className="fa fa-reply reply-to-icon" />
          </div>
          <div className="reply-message-content">
            <Avatar name={replyMessageSenderName} style={{ marginRight: 12 }} />
            <div>
              <div className="reply-message-sender-name">
                {replyMessageSenderName}
              </div>
              <div>{replyMessage.content.body}</div>
            </div>
          </div>
        </div>
      )}
      <Box className={classes.inputContainer}>
        {/* <input
          type="text"
          ref={inputRef}
          className="chat-input"
          placeholder="Enter a message..."
          value={value}
          onKeyDown={onKeyDown}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        /> */}
        <TextField
          type="text"
          className={classes.textField}
          variant="outlined"
          ref={inputRef}
          placeholder="Enter a message..."
          value={value}
          onKeyDown={onKeyDown}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />

        <ArrowCircleRightIcon
          color="primary"
          onClick={sendMessage}
          className={classes.arrowIcon}
        />
        {/* <i
          className="fa fa-arrow-circle-left chat-input-icon"
          onClick={sendMessage}
        /> */}
      </Box>
    </>
  );
};
