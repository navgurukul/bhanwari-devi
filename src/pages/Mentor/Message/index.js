import React, { useState } from "react";
import LinkifyHtml from "linkifyjs/html";
import { format } from "date-fns";
import Avatar from "../../../components/common/Avatar";
import Dropdown from "../../../components/common/Dropdown";
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import { getMemberName } from "../utils";
import "./styles.scss";

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

const Message = ({
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
      default:
        return null;
    }
  };

  const renderOptions = (options) => {
    return options.map((option) => (
      <button
        className="option-button"
        key={option.value}
        onClick={() => {
          onSendMessage(option.value);
        }}
      >
        {option.label}
      </button>
    ));
  };

  const formattedMessage = formatMessage(message);

  if (formattedMessage) {
    const isTextMessage = formattedMessage.content.msgtype === "m.text";
    const replyToMessage =
      formattedMessage.content["m.relates_to"]?.["m.in_reply_to"];

    const messageActions = [];
    if (isSelf) {
      messageActions.push({
        label: "Delete message",
        value: "delete",
        onClick: () => {
          deleteMessage(message.event_id);
        },
      });
    }

    if (isTextMessage) {
      messageActions.push({
        label: "Reply",
        value: "reply",
        onClick: () => {
          activateReplyToMessageState(formattedMessage.event_id);
        },
      });
    }

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
            className={`${
              isSelf ? "chat-message-self" : "chat-message-other"
            } chat-message`}
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
          {isTextMessage &&
            formattedMessage.options &&
            renderOptions(formattedMessage.options)}
        </div>
        {isSelf && senderName && (
          <Avatar name={senderName} style={{ marginLeft: 12 }} />
        )}
      </div>
    );
  }

  return null;
};

export default Message;
