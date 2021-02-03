import React, { useState } from "react";
import "./styles.scss";

const getMessageClass = (type, isSelf) => {
  let messageClass = "chat-message";
  if (type === "action") {
    messageClass += " chat-message-action";
  }

  // condition for self or not
  messageClass += isSelf ? " chat-message-self" : " chat-message-other";
  return messageClass;
};

export default ({ message, type, isSelf }) => {
  const [isMessageActionsMenuOpen, setMessageActionsMenu] = useState(false);
  const handleMouseOver = () => {
    if (type !== "action") {
      setMessageActionsMenu(true);
    }
  };

  return (
    <div
      onMouseOver={handleMouseOver}
      className={getMessageClass(type, isSelf)}
      onMouseLeave={() => {
        setMessageActionsMenu(false);
      }}
    >
      {message}
      {isMessageActionsMenuOpen && (
        <i className="fa fa-chevron-down actions-dropdown-trigger" />
      )}
    </div>
  );
};
