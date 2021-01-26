import React from "react";
import Message from "../Message";
import "./styles.scss";

export default ({ messages }) => {
  return (
    <div className="messages">
      {messages &&
        messages.map((message, index) => {
          return <Message key={message + index} message={message.text} />;
        })}
    </div>
  );
};
