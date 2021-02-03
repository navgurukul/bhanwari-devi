import React from "react";
import Message from "../Message";
import "./styles.scss";

export default ({ messages }) => {
  return (
    <div className="messages">
      {messages &&
        messages.map((message, index) => {
          return (
            <Message
              key={message.id + index}
              message={message.text}
              type={message.type}
              isSelf={index % 2 === 0}
            />
          );
        })}
    </div>
  );
};
