import React from "react";
import "./styles.scss";

export default ({ message }) => {
  return <div className="chat-message chat-message-self">{message}</div>;
};
