import React, { useState } from "react";
import LinkifyHtml from "linkifyjs/html";

import { format } from "date-fns";
import _ from "lodash";
import Avatar from "../../../components/common/Avatar";
import Dropdown from "../../../components/common/Dropdown";
import createDOMPurify from "dompurify";
import "./styles.scss";
import { JSDOM } from "jsdom";
import { getMemberName } from "../utils";

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

const getMessageClass = (type, isSelf) => {
  let messageClass = "chat-message";
  if (type === "action") {
    messageClass += " chat-message-action";
  }

  // condition for self or not
  messageClass += isSelf ? " chat-message-self" : " chat-message-other";
  return messageClass;
};

export default ({
  message,
  isSelf,
  senderName,
  onSendMessage,
  deleteMessage,
  activateReplyToMessageState,
  members,
}) => {
  const [isMessageActionsMenuOpen, setMessageActionsMenu] = useState(false);
  const [isMessageActionsDropdownOpen, setIsMessageActionsDropdownOpen] =
    useState(false);
  const handleMouseOver = () => {
    setMessageActionsMenu(true);
  };

  const formatMessage = (message) => {
    switch (message.content.msgtype) {
      case "org.matrix.options":
        return {
          ...message,
          value: message.content.label,
          options: message.content.options,
        };

      case "text":
      case "m.text":
        return {
          ...message,
          value: message.content.body,
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

  if (formattedMessage) {
    let messageActions = [];
    if (isSelf) {
      messageActions.push({
        label: "Delete message",
        value: "delete",
        onClick: () => {
          deleteMessage(message.event_id);
        },
      });
    }

    if (formattedMessage && formattedMessage.content.msgtype === "m.text") {
      messageActions.push({
        label: "Reply",
        value: "reply",
        onClick: () => {
          activateReplyToMessageState(formattedMessage.event_id);
        },
      });
    }

    const replyToMessage = _.get(
      formattedMessage,
      "content['m.relates_to']['m.in_reply_to']"
    );

    return (
      <div
        className={`chat-message-container ${
          isSelf
            ? "chat-message-container-self"
            : "chat-message-container-other"
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
              {format(new Date(formattedMessage.origin_server_ts), "hh:mm aaa")}
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
              setIsMessageActionsDropdownOpen(false);
            }}
          >
            {replyToMessage && (
              <div className="reply-to-container">
                <div className="reply-to-header">
                  <div>in reply to</div>
                  <div className="reply-sender">
                    <Avatar
                      name={getMemberName(
                        members.find(
                          (member) => member.sender === replyToMessage.sender
                        )
                      )}
                      style={{
                        marginRight: 8,
                        width: 16,
                        height: 16,
                        fontSize: 12,
                      }}
                    />
                    <div>
                      {getMemberName(
                        members.find(
                          (member) => member.sender === replyToMessage.sender
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div>{replyToMessage.body}</div>
              </div>
            )}
            <span
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  LinkifyHtml(formattedMessage.value, {
                    defaultProtocol: "https",
                  })
                ),
              }}
            ></span>
            {isMessageActionsMenuOpen && messageActions.length > 0 && (
              <div className="actions-dropdown-trigger-container">
                <button
                  className="actions-dropdown-trigger"
                  onClick={() => {
                    setIsMessageActionsDropdownOpen(
                      !isMessageActionsDropdownOpen
                    );
                  }}
                >
                  <i className="fa fa-chevron-down" />
                </button>
                <Dropdown
                  isOpen={isMessageActionsDropdownOpen}
                  options={messageActions}
                />
              </div>
            )}
          </div>
          {formattedMessage.options && renderOptions(formattedMessage.options)}
        </div>
        {isSelf && senderName && (
          <Avatar name={senderName} style={{ marginLeft: 12 }} />
        )}
      </div>
    );
  }
  return null;
};
