import React, { useEffect, useRef } from "react";
import Message from "../Message";
import format from "date-fns/format";
import { getMemberName, getAreDatesOnDifferentDays } from "../utils";
import "./styles.scss";
import { Container, Typography } from "@material-ui/core";
import CircleIcon from "@mui/icons-material/Circle";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";

export default ({
  messages,
  selfChatId,
  onScroll,
  members,
  onSendMessage,
  deleteMessage,
  activateReplyToMessageState,
  prevScrollPosition,
}) => {
  const messagesRef = useRef();

  useEffect(() => {
    if (prevScrollPosition) {
      messagesRef.current.scrollTop = prevScrollPosition;
    }
  }, [messages && messages.length]);

  return (
    <>
      <Container className="messages-container">
        <div className="chat-name-bar">
          <div className="chat-left-wrapper">
            <Typography
              style={{ fontWeight: 600 }}
              className="chat-name"
              variant="subtitle1"
            >
              DVET Pune Batch 1 Beginners
            </Typography>
            <CircleIcon className="dot" />
            <Typography
              style={{ fontWeight: 400, color: "#6D6D6D" }}
              className="chat-name"
              variant="body1"
            >
              40 Students
            </Typography>
            <InfoOutlinedIcon className="info" />
          </div>
          <ExitToAppOutlinedIcon className="exit" />
        </div>
        <div className="messages" onScroll={onScroll} ref={messagesRef}>
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
                  <React.Fragment key={message.event_id}>
                    {shouldDisplayDayMarker && (
                      <div className="messages-day-marker">
                        {format(new Date(message.origin_server_ts), "do MMM")}
                      </div>
                    )}
                    <Message
                      deleteMessage={deleteMessage}
                      members={members}
                      onSendMessage={onSendMessage}
                      activateReplyToMessageState={activateReplyToMessageState}
                      senderName={getMemberName(member)}
                      message={message}
                      isSelf={message.sender.indexOf(selfChatId) > -1}
                    />
                  </React.Fragment>
                );
              })}
        </div>
      </Container>
    </>
  );
};
