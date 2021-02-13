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

// const rooms = [
//   {
//     id: "room-1",
//     name: "English-3",
//   },
//   {
//     id: "room-2",
//     name: "Meraki",
//   },
// ];

const Mentor = () => {
  const { data } = useSelector(({ User }) => User);
  const { isMobile } = useContext(DeviceProvider);
  const { chat_id, chat_password } = data.user;
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [roomMessages, setRoomMessage] = useState({
    // [rooms[0].id]: [
    //   {
    //     text: "Someone has left the chat",
    //     time: Date.now(),
    //     type: "action",
    //   },
    // ],
  });

  function getMessagesFromTimeline(roomId) {
    const timeline = rooms.find((room) => room.roomId === roomId).timeline;
    return timeline.filter((timelineEvent) => {
      return timelineEvent.event.type === "m.room.message";
    });
  }

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
    if (selectedRoomId) {
      const messages = getMessagesFromTimeline(selectedRoomId);
      setRoomMessage({
        [selectedRoomId]: messages,
      });
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
        // client.on("RoomMember.membership", function (event, member) {
        //   console.log(member);
        //   if (member.membership === "invite" && member.userId === chat_id) {
        //     client.joinRoom(member.roomId).then(function () {
        //       console.log("Auto-joined %s", member.roomId);
        //     });
        //   }
        // });
      });

    client.once("sync", (state) => {
      if (state === "PREPARED") {
        let initialRooms = client.getRooms();
        setRooms(client.getRooms());
        setSelectedRoomId(initialRooms[0].roomId);
      }
    });

    // client.on("Room", () => {
    //   console.log("Room event");
    // });

    // client.on("RoomMember.membership", (event, member) => {
    //   console.log(event, member);
    // });
    // client.on("Room.timeline", (event, room, timeline) => {
    //   console.log(timeline);
    //   if (event.getType() === "m.room.message") {
    //     console.log(event.getSender(), event.getContent().body, event);
    //   }
    // });
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
