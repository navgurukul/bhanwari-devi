import React, { useEffect, useState, useContext, useCallback } from "react";
import _ from "lodash";
import { DeviceProvider } from "../../common/context";
import { useSelector } from "react-redux";
import * as sdk from "matrix-js-sdk";
import RoomNav from "./RoomNav";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import { MATRIX_DOMAIN, fetchMessages, redactEvent, getMembers } from "./utils";
import FloatingIcon from "../../components/common/FloatingIcon";
import Loader from "../../components/common/Loader";
import "./styles.scss";

let PAGINATION_THRESHOLD = 150;

const Mentor = () => {
  const { data } = useSelector(({ User }) => User);
  const [client, setClient] = useState(null);
  const { isMobile } = useContext(DeviceProvider);
  const { chat_id, chat_password } = data.user;
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [members, setMembers] = useState({});
  const [accessToken, setAccessToken] = useState("");
  const [syncToken, setSyncToken] = useState({
    fromSyncToken: "",
    toSyncToken: "",
  });
  const [isInitializingClient, setInitializaingClient] = useState(true);
  const [roomMessages, setRoomMessage] = useState({});

  const onSendMessage = (message, roomId) => {
    const messageObj = {
      body: message,
      msgtype: "m.text",
    };

    client.sendEvent(roomId, "m.room.message", messageObj);
  };

  const removeMessageEvent = (eventId) => {
    setRoomMessage((roomMessages) => {
      let newMessages = roomMessages[selectedRoomId].filter((messageEvent) => {
        return messageEvent.event_id !== eventId;
      });

      return {
        ...roomMessages,
        [selectedRoomId]: newMessages,
      };
    });
  };

  const addMessageFromMessageEvent = (messageEvent) => {
    setRoomMessage((roomMessages) => {
      const existingMessages = roomMessages[messageEvent.room_id] || [];
      const doesMessageEventExist = !!existingMessages.find(
        (message) => message.event_id === messageEvent.event_id
      );
      if (!doesMessageEventExist) {
        // new message
        let localMessages = [];
        let nonLocalMessages = [];

        if (!messageEvent.age && !messageEvent.unsigned) {
          messageEvent.age = 0;
          localMessages.push(messageEvent);
        } else {
          nonLocalMessages.push(messageEvent);
        }

        existingMessages.reverse().forEach((message) => {
          if (message.age === 0) {
            localMessages.push(message);
          } else {
            nonLocalMessages.push(message);
          }
        });

        const newMessages = localMessages
          .concat(
            _.sortBy(nonLocalMessages, [
              (message) =>
                message.unsigned ? message.unsigned.age : message.age,
            ])
          )
          .reverse();
        return {
          ...roomMessages,
          [messageEvent.room_id]: newMessages,
        };
      } else {
        return roomMessages;
      }
    });
  };

  useEffect(() => {
    if (client) {
      client
        .login("m.login.password", { user: chat_id, password: chat_password })
        .then((response) => {
          setAccessToken(response.access_token);
          client.startClient();
        });

      client.once("sync", (state) => {
        if (state === "PREPARED") {
          let initialRooms = client.getRooms();
          setRooms(client.getRooms());
          setSelectedRoomId(isMobile ? null : initialRooms[0].roomId);
          setInitializaingClient(false);

          client.on("event", (event) => {
            if (event.event) {
              switch (event.event.type) {
                case "m.room.name":
                  setRooms((rooms) => {
                    const doesRoomExist = !!rooms.find((room) => {
                      return room.roomId === event.event.room_id;
                    });
                    if (!doesRoomExist) {
                      return rooms.concat([
                        {
                          name: event.event.content.name,
                          roomId: event.event.room_id,
                        },
                      ]);
                    }
                    return rooms;
                  });
                  break;
              }
            }
          });
        }
      });
    }
  }, [client]);

  useEffect(() => {
    if (client && selectedRoomId) {
      client.on("Room.timeline", (event) => {
        if (event.getType() === "m.room.message") {
          addMessageFromMessageEvent(event.event);
        }
      });
    }
  }, [client, selectedRoomId]);

  useEffect(() => {
    setClient(
      sdk.createClient({
        baseUrl: MATRIX_DOMAIN,
        userId: chat_id,
        accessToken: chat_password,
      })
    );
  }, [chat_id, chat_password]);

  const handleScroll = useCallback(
    _.throttle((element) => {
      if (
        element.scrollHeight + element.scrollTop <
        element.clientHeight + PAGINATION_THRESHOLD
      ) {
        getMessages();
      }
    }, 500),
    [accessToken, selectedRoomId, syncToken]
  );

  const getSelectedRoomMembers = async () => {
    const roomMembers = await getMembers(accessToken, selectedRoomId);
    setMembers({
      ...members,
      [selectedRoomId]: roomMembers || [],
    });
  };

  useEffect(() => {
    if (accessToken && selectedRoomId) {
      getSelectedRoomMembers();
    }
  }, [accessToken, selectedRoomId]);

  const deleteMessage = async (eventId) => {
    const redactedEventResponse = await redactEvent({
      roomId: selectedRoomId,
      eventId,
      accessToken,
      reason: "user deleted message",
    });
    if (redactedEventResponse && redactedEventResponse.data) {
      removeMessageEvent(eventId);
    }
  };

  const getMessages = async () => {
    let getMessagesPayload = {
      roomId: selectedRoomId,
      accessToken,
      limit: 15,
    };

    if (syncToken.fromSyncToken[selectedRoomId]) {
      getMessagesPayload.fromSyncToken =
        syncToken.fromSyncToken[selectedRoomId];
    }
    let messagesResponse = await fetchMessages(getMessagesPayload);
    setSyncToken({
      fromSyncToken: {
        ...syncToken.fromSyncToken,
        [selectedRoomId]: messagesResponse.endToken,
      },
    });
    const textMessages = messagesResponse.data.filter(
      (message) => message.type === "m.room.message" && message.content.msgtype
    );
    textMessages.forEach(addMessageFromMessageEvent);
  };

  useEffect(() => {
    if (accessToken && selectedRoomId) {
      getMessages();
    }
  }, [selectedRoomId, accessToken]);

  const renderRooms = () => {
    return (
      !(isMobile && selectedRoomId) && (
        <nav role="navigation">
          <ul className="rooms-navs-container">
            {rooms.map((room) => {
              return (
                <RoomNav
                  key={room.roomId}
                  isSelected={room.roomId === selectedRoomId}
                  name={room.name}
                  onSelect={() => setSelectedRoomId(room.roomId)}
                  lastMessage={
                    roomMessages[room.roomId]
                      ? roomMessages[room.roomId][0]
                      : null
                  }
                />
              );
            })}
          </ul>
        </nav>
      )
    );
  };

  const renderChat = () => {
    return (
      <>
        <div className="room-chat">
          <Messages
            messages={roomMessages[selectedRoomId]}
            selfChatId={chat_id}
            onScroll={(e) => {
              handleScroll(e.target);
            }}
            deleteMessage={deleteMessage}
            members={members[selectedRoomId] || []}
            onSendMessage={(value) => {
              onSendMessage(value, selectedRoomId);
            }}
          />
          <ChatInput onNewMessage={onSendMessage} roomId={selectedRoomId} />
        </div>
        {isMobile && selectedRoomId && (
          <FloatingIcon
            onClick={() => {
              setSelectedRoomId(null);
            }}
            icon={<i className="fa fa-chevron-left" />}
            styles={{
              top: 16,
              left: 16,
            }}
          />
        )}
      </>
    );
  };

  return (
    <div className="chat-container">
      {isInitializingClient ? (
        <Loader />
      ) : (
        <>
          {renderRooms()}
          {renderChat()}
        </>
      )}
    </div>
  );
};

export default Mentor;
