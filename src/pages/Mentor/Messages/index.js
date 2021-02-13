import React from "react";
import Message from "../Message";
import "./styles.scss";

export default ({ messages }) => {
  return (
    <div className="messages">
      <div className="messages-content">
        {messages &&
          messages.map((message) => {
            return (
              <Message
                key={message.event.event_id}
                message={message}
                isSelf={true}
              />
            );
          })}
      </div>
    </div>
  );
};
