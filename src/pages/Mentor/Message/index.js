import React, { useState } from "react";
import { format } from "date-fns";
import Avatar from "../../../components/common/Avatar";
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

const nowDate = Date.now();

export default ({ message, isSelf, senderName, onSendMessage }) => {
  const [isMessageActionsMenuOpen, setMessageActionsMenu] = useState(false);
  const handleMouseOver = () => {
    setMessageActionsMenu(true);
  };

  const formatMessage = (message) => {
    switch (message.content.msgtype) {
      case "org.matrix.options":
        return {
          ...message,
          value: message.content.label,
          isHtml: true,
          options: message.content.options,
        };

      case "text":
      case "m.text":
        return {
          ...message,
          value: message.content.body,
          isHtml: false,
        };
    }
  };

  const renderOptions = (options) => {
    return options.map((option) => {
      return (
        <button
          className="option-button"
          key={option.value}
          onClick={() => {
            onSendMessage(option.value);
          }}
        >
          {option.label}
        </button>
      );
    });
  };

  const formattedMessage = formatMessage(message);
  return (
    <div
      className={`chat-message-container ${
        isSelf ? "chat-message-container-self" : "chat-message-container-other"
      }`}
    >
      {!isSelf && senderName && (
        <Avatar name={senderName} style={{ marginRight: 12 }} />
      )}
      <div>
        <div
          className={`message-header ${isSelf ? "" : "message-header-other"}`}
        >
          <div className="message-time">
            {format(new Date(nowDate - formattedMessage.age), "hh:mm aaa")}
          </div>
          <div
            className={`chat-message-sender ${
              isSelf ? "chat-message-sender-self" : ""
            }`}
          >
            {senderName}
          </div>
        </div>
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
      </div>
      {isSelf && senderName && (
        <Avatar name={senderName} style={{ marginLeft: 12 }} />
      )}
    </div>
  );
};
