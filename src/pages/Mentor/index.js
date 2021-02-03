import React, { useEffect, useState, useContext } from "react";
import { DeviceProvider } from "../../common/context";
import { useSelector } from "react-redux";
import * as sdk from "matrix-js-sdk";
import RoomNav from "./RoomNav";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import FloatingIcon from "../../components/common/FloatingIcon";
import "./styles.scss";
let client;

const rooms = [
  {
    id: "room-1",
    name: "English-3",
  },
  {
    id: "room-2",
    name: "Meraki",
  },
];

const Mentor = () => {
  const { data } = useSelector(({ User }) => User);
  const { isMobile } = useContext(DeviceProvider);
  const { chat_id, chat_password } = data.user;
  const [selectedRoomId, setSelectedRoomId] = useState(
    isMobile ? null : rooms[0].id
  );
  const [roomMessages, setRoomMessage] = useState({
    [rooms[0].id]: [
      {
        text: "Someone has left the chat",
        time: Date.now(),
        type: "action",
      },
    ],
  });

  function onSendMessage(message, roomId) {
    const messageObj = {
      text: message,
      time: Date.now(),
    };
    setRoomMessage({
      ...roomMessages,
      [roomId]: roomMessages[roomId]
        ? [messageObj].concat(roomMessages[roomId])
        : [messageObj],
    });
  }

  useEffect(() => {
    client = sdk.createClient({
      baseUrl: "https://m.navgurukul.org",
      userId: chat_id,
      accessToken: chat_password,
    });
    client.startClient({ initialSyncLimit: 10 });

    const rooms = client.getRooms();
    client.on("sync", (state, prevState, data) => {
      console.log(state, prevState, data);
    });

    client.on("Room", () => {
      console.log("Room event");
    });

    client.on("RoomMember.membership", (event, member) => {
      console.log(event, member);
    });
    client.on("Room.timeline", (event, room, timeline) => {
      console.log(event, room, timeline);
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
                  key={room.id}
                  isSelected={room.id === selectedRoomId}
                  name={room.name}
                  onSelect={() => setSelectedRoomId(room.id)}
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
