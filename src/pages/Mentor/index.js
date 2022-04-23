import React, { useEffect, useState, useContext } from "react";
import { useDebouncedCallback } from "use-debounce";
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

let PAGINATION_THRESHOLD = 200;

const Mentor = () => {
  const { data } = useSelector(({ User }) => User);
  const [client, setClient] = useState(null);
  const { isMobile } = useContext(DeviceProvider);
  const { chat_id, chat_password } = data.user;
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [prevScrollPosition, setPrevScrollPosition] = useState(null);
  const [roomNamesMap, setRoomNamesMap] = useState({});
  const [members, setMembers] = useState({});
  const [accessToken, setAccessToken] = useState("");
  const [replyMessage, setReplyMessage] = useState(null);
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

    if (replyMessage) {
      messageObj["m.relates_to"] = {
        ["m.in_reply_to"]: {
          event_id: replyMessage.event_id,
          body: replyMessage.content.body,
          sender: replyMessage.sender,
        },
      };

      setReplyMessage(null);
    }

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
      const doesMessageEventExist = Boolean(
        existingMessages.find(
          (message) => message.event_id === messageEvent.event_id
        )
      );
      if (!doesMessageEventExist) {
        const newMessages = _.sortBy(existingMessages.concat(messageEvent), [
          (message) => message.origin_server_ts,
        ]);
        return {
          ...roomMessages,
          [messageEvent.room_id]: newMessages,
        };
      } else {
        return roomMessages;
      }
    });
  };

  const addRoomName = (roomId, roomName) => {
    if (!roomNamesMap[roomId]) {
      setRoomNamesMap((existingRoomNames) => {
        return {
          ...existingRoomNames,
          [roomId]: roomName,
        };
      });
    }
  };

  const handleMatrixEvent = (event) => {
    if (event.event) {
      switch (event.getType()) {
        case "m.room.name":
          addRoomName(event.event.room_id, event.event.content.name);
          break;

        case "m.room.message":
          addMessageFromMessageEvent(event.event);
          break;

        case "m.room.member":
          if (event.event.content.membership === "leave") {
            if (event.event.sender.includes(chat_id)) {
              setRooms((rooms) => {
                return rooms.filter(
                  (room) => room.roomId !== event.event.room_id
                );
              });
            }
          }
          if (event.event.content.membership === "join") {
            if (event.event.sender.includes(chat_id)) {
              setRooms((rooms) => {
                const doesRoomExist = !!rooms.find((room) => {
                  return room.roomId === event.event.room_id;
                });
                if (!doesRoomExist) {
                  return rooms.concat([
                    {
                      name:
                        event.event.content.name ||
                        roomNamesMap[event.event.room_id] ||
                        "",
                      roomId: event.event.room_id,
                    },
                  ]);
                }
                return rooms;
              });
            }
          }
          break;
      }
    }
  };

  const clientSync = (state) => {
    if (state === "PREPARED") {
      let initialRooms = client.getRooms();
      setRooms(() => {
        const clientRooms = client.getRooms() || [];
        clientRooms.forEach((room) => addRoomName(room.roomId, room.name));
        setRooms(clientRooms);
      });
      setSelectedRoomId(isMobile ? null : initialRooms[0].roomId);
      setInitializaingClient(false);

      client.on("event", handleMatrixEvent);
    }
  };

  useEffect(() => {
    const roomWithoutName = rooms.find((room) => !room.name);
    if (!!roomWithoutName && roomNamesMap[roomWithoutName.roomId]) {
      setRooms((existingRooms) => {
        return existingRooms.map((room) => {
          if (!room.name) {
            room.name = roomNamesMap[room.roomId] || "";
          }
          return room;
        });
      });
    }
  }, [rooms, roomNamesMap]);

  useEffect(() => {
    if (client) {
      client
        .login("m.login.password", { user: chat_id, password: chat_password })
        .then((response) => {
          setAccessToken(response.access_token);
          client.startClient();
        });

      client.once("sync", clientSync);
    }
  }, [client, roomNamesMap]);

  useEffect(() => {
    setClient(
      sdk.createClient({
        baseUrl: MATRIX_DOMAIN,
        userId: chat_id,
        accessToken: chat_password,
      })
    );
  }, [chat_id, chat_password]);

  const handleScroll = useDebouncedCallback((element) => {
    if (
      element.scrollHeight + element.scrollTop <
      element.clientHeight + PAGINATION_THRESHOLD
    ) {
      setPrevScrollPosition(element.scrollTop);
      getMessages();
    }
  }, 1000);

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

  const activateReplyToMessageState = (messageEventId) => {
    const message = roomMessages[selectedRoomId].find(
      (message) => message.event_id === messageEventId
    );
    setReplyMessage(message);
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
      setPrevScrollPosition(null);
      getMessages();
    }
  }, [selectedRoomId, accessToken]);

  const renderRooms = () => {
    return (
      !(isMobile && selectedRoomId) && (
        <nav
          role="navigation"
          style={{
            Height: "100vh",
            overflowY: "scroll",
          }}
        >
          <ul className="rooms-navs-container">
            {rooms.map((room) => {
              return (
                <RoomNav
                  key={room.roomId}
                  roomId={room.roomId}
                  accessToken={accessToken}
                  isSelected={room.roomId === selectedRoomId}
                  name={room.name}
                  onSelect={() => {
                    setSelectedRoomId(room.roomId);
                  }}
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
            prevScrollPosition={prevScrollPosition}
            onScroll={(e) => {
              handleScroll(e.target);
            }}
            deleteMessage={deleteMessage}
            members={members[selectedRoomId] || []}
            activateReplyToMessageState={activateReplyToMessageState}
            onSendMessage={(value) => {
              onSendMessage(value, selectedRoomId);
            }}
          />
          <ChatInput
            replyMessage={replyMessage}
            onNewMessage={onSendMessage}
            activateReplyToMessageState={activateReplyToMessageState}
            roomId={selectedRoomId}
            members={members[selectedRoomId] || []}
          />
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
