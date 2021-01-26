import React, { useState } from "react";
import "./styles.scss";

export default ({ onNewMessage, roomId }) => {
  const [value, onChange] = useState("");

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

  return (
    <div className="chat-input-container">
      <input
        type="text"
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
  );
};
