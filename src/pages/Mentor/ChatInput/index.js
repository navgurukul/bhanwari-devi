import { Box, InputAdornment, TextField } from "@material-ui/core";
import React, { useState, useEffect, useRef } from "react";
import Avatar from "../../../components/common/Avatar";
import ReplyIcon from "@mui/icons-material/Reply";
import CloseIcon from "@mui/icons-material/Close";
import { getMemberName } from "../utils";
import "./styles.scss";
import useStyles from "./styles";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EmojiPicker from "emoji-picker-react";

export default ({
  onNewMessage,
  roomId,
  replyMessage,
  members,
  activateReplyToMessageState,
}) => {
  const [value, setValue] = useState("");
  const [openEmoji, setOpenEmoji] = useState(false);
  const inputRef = useRef(null);
  const classes = useStyles();

  const onFileChange = (e) => {
    // console.log(e.target.files[0]);
  };

  const InputAdorns = {
    startAdornment: [
      <InputAdornment key="1" position="start">
        <input
          style={{ display: "none" }}
          type="file"
          id="file"
          onChange={onFileChange}
        />
        <label htmlFor="file">
          {<AttachFileIcon style={{ color: "#6D6D6D", cursor: "pointer" }} />}
        </label>
      </InputAdornment>,
      <InputAdornment key="2" position="start">
        {
          <SentimentSatisfiedAltIcon
            onClick={() => setOpenEmoji((prev) => !prev)}
            style={{ color: "#6D6D6D", cursor: "pointer" }}
          />
        }
      </InputAdornment>,
    ],
  };

  useEffect(() => {
    if (replyMessage) {
      inputRef.current.focus();
    }
  }, [replyMessage]);

  const sendMessage = () => {
    if (value) {
      if(openEmoji){
        setOpenEmoji(false);
      }
      setValue("");
      onNewMessage(value, roomId);
    }
  };

  const emojiClickHandler = (event) => {
    setValue((prev) => prev + event.emoji);
    inputRef.current.focus();
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

      {openEmoji && (
        <div className={classes.emojiContainer}>
          <CloseIcon
            className={classes.closeEmoji}
            onClick={() => setOpenEmoji(false)}
          />
          <EmojiPicker onEmojiClick={emojiClickHandler} />{" "}
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
            setValue(e.target.value);
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