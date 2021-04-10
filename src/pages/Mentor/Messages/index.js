import React from "react";
import Message from "../Message";
import { getMemberName } from "../utils";
import "./styles.scss";

export default ({
  messages,
  selfChatId,
  onScroll,
  members,
  onSendMessage,
  deleteMessage,
  activateReplyToMessageState,
}) => {
  return (
    <div className="messages" onScroll={onScroll}>
      <div className="messages-content">
        {messages &&
          messages
            .filter((message) => message.type === "m.room.message")
            .map((message) => {
              const member = members.find(
                (member) => member.sender === message.sender
              );

              return (
                <Message
                  key={message.event_id}
                  deleteMessage={deleteMessage}
                  members={members}
                  onSendMessage={onSendMessage}
                  activateReplyToMessageState={activateReplyToMessageState}
                  senderName={getMemberName(member)}
                  message={message}
                  isSelf={message.sender.indexOf(selfChatId) > -1}
                />
              );
            })}
      </div>
    </div>
  );
};
