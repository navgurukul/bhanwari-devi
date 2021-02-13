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

export default ({ message, isSelf }) => {
  const [isMessageActionsMenuOpen, setMessageActionsMenu] = useState(false);
  const handleMouseOver = () => {
    // if (type !== "action") {
    //   setMessageActionsMenu(true);
    // }
  };

  const formatMessage = (message) => {
    switch (message.event.content.msgtype) {
      case "org.matrix.options":
        return {
          value: message.event.content.label,
          isHtml: true,
          options: message.event.content.options,
        };

      case "m.text":
        return {
          value: message.event.content.body,
          isHtml: false,
        };
    }
  };

  const renderOptions = (options) => {
    return options.map((option) => {
      return (
        <button className="option-button" key={option.value}>
          {option.label}
        </button>
      );
    });
  };

  const formattedMessage = formatMessage(message);

  return (
    <>
      <div
        onMouseOver={handleMouseOver}
        className={getMessageClass("", isSelf)}
        onMouseLeave={() => {
          setMessageActionsMenu(false);
        }}
      >
        {formattedMessage.isHtml ? (
          <span
            dangerouslySetInnerHTML={{
              __html: formattedMessage.value,
            }}
          ></span>
        ) : (
          formattedMessage.value
        )}
        {isMessageActionsMenuOpen && (
          <i className="fa fa-chevron-down actions-dropdown-trigger" />
        )}
      </div>
      {formattedMessage.options && renderOptions(formattedMessage.options)}
    </>
  );
};
