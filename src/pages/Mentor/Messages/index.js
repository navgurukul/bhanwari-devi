import React from "react";
import Message from "../Message";
import format from "date-fns/format";
import { getMemberName, getAreDatesOnDifferentDays } from "../utils";
import "./styles.scss";

export default ({
  messages,
  selfChatId,
  onScroll,
  members,
  onSendMessage,
  deleteMessage,
  activateReplyToMessageState,
}) => {
  return (
    <div className="messages" onScroll={onScroll}>
      <div className="messages-content">
        {messages &&
          messages
            .filter((message) => message.type === "m.room.message")
            .map((message, index) => {
              let shouldDisplayDayMarker = false;
              if (messages[index - 1]) {
                shouldDisplayDayMarker = getAreDatesOnDifferentDays(
                  messages[index - 1].origin_server_ts,
                  message.origin_server_ts
                );
              } else {
                shouldDisplayDayMarker = true;
              }
              const member = members.find(
                (member) => member.sender === message.sender
              );

              return (
                <>
                  {shouldDisplayDayMarker && (
                    <div className="messages-day-marker">
                      {format(new Date(message.origin_server_ts), "do MMM")}
                    </div>
                  )}
                  <Message
                    key={message.event_id}
                    deleteMessage={deleteMessage}
                    members={members}
                    onSendMessage={onSendMessage}
                    activateReplyToMessageState={activateReplyToMessageState}
                    senderName={getMemberName(member)}
                    message={message}
                    isSelf={message.sender.indexOf(selfChatId) > -1}
                  />
                </>
              );
            })}
      </div>
    </div>
  );
};
