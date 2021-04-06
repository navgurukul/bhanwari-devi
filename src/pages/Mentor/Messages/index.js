import React from "react";
import Message from "../Message";
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
                  onSendMessage={onSendMessage}
                  activateReplyToMessageState={activateReplyToMessageState}
                  senderName={
                    member
                      ? (member.content && member.content.displayname) ||
                        (member.prev_content && member.prev_content.displayname)
                      : ""
                  }
                  message={message}
                  isSelf={message.sender.indexOf(selfChatId) > -1}
                />
              );
            })}
      </div>
    </div>
  );
};
