import React, { useEffect, useState, useContext, useCallback } from "react";
import _ from "lodash";
import { DeviceProvider } from "../../common/context";
import { useSelector } from "react-redux";
import * as sdk from "matrix-js-sdk";
import RoomNav from "./RoomNav";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import { MATRIX_DOMAIN, fetchMessages, redactEvent } from "./utils";
import FloatingIcon from "../../components/common/FloatingIcon";
import Loader from "../../components/common/Loader";
import "./styles.scss";

let PAGINATION_THRESHOLD = 150;
let client;

const Mentor = () => {
  const { data } = useSelector(({ User }) => User);
  const { isMobile } = useContext(DeviceProvider);
  const { chat_id, chat_password } = data.user;
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [syncToken, setSyncToken] = useState({
    fromSyncToken: "",
    toSyncToken: "",
  });
  const [isInitializingClient, setInitializaingClient] = useState(true);
  const [roomMessages, setRoomMessage] = useState({});

  function onSendMessage(message, roomId) {
    const messageObj = {
      body: message,
      msgtype: "m.text",
    };

    client.sendEvent(roomId, "m.room.message", messageObj);
  }

  function addMessageFromMessageEvent(messageEvent) {
    setRoomMessage((roomMessages) => {
      const existingMessages = roomMessages[selectedRoomId] || [];
      const doesMessageEventExist = !!existingMessages.find(
        (message) => message.event_id === messageEvent.event_id
      );
      if (!doesMessageEventExist) {
        const newMessages = _.sortBy([messageEvent].concat(existingMessages), [
          (message) => (message.unsigned ? message.unsigned.age : message.age),
        ]).reverse();
        return {
          ...roomMessages,
          [messageEvent.room_id]: newMessages,
        };
      } else {
        return roomMessages;
      }
    });
  }

  useEffect(() => {
    client = sdk.createClient({
      baseUrl: MATRIX_DOMAIN,
      userId: chat_id,
      accessToken: chat_password,
    });
    client
      .login("m.login.password", { user: chat_id, password: chat_password })
      .then((response) => {
        setAccessToken(response.access_token);
        client.startClient();
        client.on("Room.timeline", function (event) {
          if (event.getType() === "m.room.message") {
            console.log(event.event);
            addMessageFromMessageEvent(event.event);
          }
        });
      });

    client.once("sync", (state, what, tokenDetails) => {
      if (state === "PREPARED") {
        let initialRooms = client.getRooms();
        setSyncToken({
          fromSyncToken: tokenDetails.nextSyncToken,
          toSyncToken: "",
        });
        setRooms(client.getRooms());
        setSelectedRoomId(isMobile ? null : initialRooms[0].roomId);
        setInitializaingClient(false);
      }
    });
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

  const deleteMessage = async (eventId) => {
    redactEvent({
      roomId: selectedRoomId,
      eventId,
      accessToken,
    });
  };

  const getMessages = async () => {
    let messagesResponse = await fetchMessages({
      roomId: selectedRoomId,
      accessToken,
      fromSyncToken: syncToken.fromSyncToken,
      limit: 15,
    });
    setSyncToken({
      fromSyncToken: messagesResponse.endToken,
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
                  isSelected={room.id === selectedRoomId}
                  name={room.name}
                  onSelect={() => setSelectedRoomId(room.roomId)}
                  lastMessage={
                    roomMessages[room.id] ? roomMessages[room.id][0] : null
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
        ;
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
