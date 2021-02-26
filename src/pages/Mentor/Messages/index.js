import React from "react";
import Message from "../Message";
import "./styles.scss";

export default ({ messages, selfChatId }) => {
  return (
    <div className="messages">
      <div className="messages-content">
        {messages &&
          messages.map((message) => {
            return (
              <Message
                key={message.event_id}
                message={message}
                isSelf={message.sender.indexOf(selfChatId) > -1}
              />
            );
          })}
      </div>
    </div>
  );
};
