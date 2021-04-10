import React, { useState, useEffect, useRef } from "react";
import Avatar from "../../../components/common/Avatar";
import { getMemberName } from "../utils";
import "./styles.scss";

export default ({
  onNewMessage,
  roomId,
  replyMessage,
  members,
  activateReplyToMessageState,
}) => {
  const [value, onChange] = useState("");
  const inputRef = useRef(null);

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
      <div className="chat-input-container">
        <input
          type="text"
          ref={inputRef}
          className="chat-input"
          placeholder="Enter a message..."
          value={value}
          onKeyDown={onKeyDown}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
        <i
          className="fa fa-arrow-circle-left chat-input-icon"
          onClick={sendMessage}
        />
      </div>
    </>
  );
};
