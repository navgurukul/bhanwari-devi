import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { DeviceProvider } from "../../common/context";
import { useSelector } from "react-redux";
import * as sdk from "matrix-js-sdk";
import RoomNav from "./RoomNav";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import FloatingIcon from "../../components/common/FloatingIcon";
import "./styles.scss";
let client;

const Mentor = () => {
  const { data } = useSelector(({ User }) => User);
  const { isMobile } = useContext(DeviceProvider);
  const { chat_id, chat_password } = data.user;
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [roomMessages, setRoomMessage] = useState({});

  function getMessagesFromTimeline(roomId) {
    const timeline = rooms.find((room) => room.roomId === roomId).timeline;
    return timeline.filter((timelineEvent) => {
      return timelineEvent.event.type === "m.room.message";
    });
  }

  function onSendMessage(message, roomId) {
    const messageObj = {
      body: message,
      msgtype: "m.text",
    };

    client.sendEvent(roomId, "m.room.message", messageObj);
  }

  function addMessageFromMessageEvent(messageEvent) {
    const newMessages = roomMessages[messageEvent.event.room_id] || [];
    const doesMessageEventExist = !!newMessages.find(
      (message) => message.event.event_id === messageEvent.event.event_id
    );
    if (!doesMessageEventExist) {
      setRoomMessage((roomMessages) => {
        return {
          ...roomMessages,
          [messageEvent.event.room_id]: (
            roomMessages[messageEvent.event.room_id] || []
          ).concat(messageEvent),
        };
      });
    }
  }

  useEffect(() => {
    if (selectedRoomId) {
      const messages = getMessagesFromTimeline(selectedRoomId);
      messages.forEach(addMessageFromMessageEvent);
    }
  }, [selectedRoomId]);

  useEffect(() => {
    client = sdk.createClient({
      baseUrl: "https://m.navgurukul.org",
      userId: chat_id,
      accessToken: chat_password,
    });
    client
      .login("m.login.password", { user: chat_id, password: chat_password })
      .then(() => {
        client.startClient();
        client.on("Room.timeline", function (event) {
          if (event.getType() === "m.room.message") {
            addMessageFromMessageEvent(event);
          }
        });
      });

    client.once("sync", (state) => {
      if (state === "PREPARED") {
        let initialRooms = client.getRooms();
        setRooms(client.getRooms());
        setSelectedRoomId(isMobile ? null : initialRooms[0].roomId);
      }
    });
  }, [chat_id, chat_password]);

  return (
    <div className="chat-container">
      {!(isMobile && selectedRoomId) && (
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
      )}
      <div className="room-chat">
        <Messages messages={roomMessages[selectedRoomId]} />
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
    </div>
  );
};

export default Mentor;
