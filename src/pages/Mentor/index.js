import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { DeviceProvider } from "../../common/context";
import { useSelector } from "react-redux";
import * as sdk from "matrix-js-sdk";
import RoomNav from "./RoomNav";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import { MATRIX_DOMAIN, fetchMessages } from "./utils";
import FloatingIcon from "../../components/common/FloatingIcon";
import "./styles.scss";
let client;

const Mentor = () => {
  const { data } = useSelector(({ User }) => User);
  const { isMobile } = useContext(DeviceProvider);
  const { chat_id, chat_password } = data.user;
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [syncToken, setSyncToken] = useState("");
  const [roomMessages, setRoomMessage] = useState({});

  function onSendMessage(message, roomId) {
    const messageObj = {
      body: message,
      msgtype: "m.text",
    };

    client.sendEvent(roomId, "m.room.message", messageObj);
  }

  function addMessageFromMessageEvent(message) {
    const newMessages = roomMessages[message.room_id] || [];
    const doesMessageExist = !!newMessages.find(
      (message) => message.event_id === message.event_id
    );
    if (!doesMessageExist) {
      setRoomMessage((roomMessages) => {
        return {
          ...roomMessages,
          [message.room_id]: (roomMessages[message.room_id] || []).concat(
            message
          ),
        };
      });
    }
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
      });

    client.once("sync", (state, what, tokenDetails) => {
      if (state === "PREPARED") {
        let initialRooms = client.getRooms();
        setSyncToken(tokenDetails.nextSyncToken);
        setRooms(client.getRooms());
        setSelectedRoomId(isMobile ? null : initialRooms[0].roomId);
      }
    });
  }, [chat_id, chat_password]);

  // useEffect(() => {
  //   // $wLeUrM1shMNbLygZH4KFda-KuyCs4lUfNaGj10lWu5s
  //   if (roomMessages[selectedRoomId]) {
  //     axios.put(
  //       `https://m.navgurukul.org/_matrix/client/r0/rooms/${selectedRoomId}/redact/$wLeUrM1shMNbLygZH4KFda-KuyCs4lUfNaGj10lWu5s/43243?access_token=${window.accessToken}`,
  //       {}
  //     );
  //   }
  // }, [roomMessages[selectedRoomId]]);

  const getMessages = async () => {
    let messagesResponse =
      (await fetchMessages({
        roomId: selectedRoomId,
        accessToken,
        fromSyncToken: syncToken,
        limit: 12,
      })) || [];
    messagesResponse.data.forEach(addMessageFromMessageEvent);
  };

  useEffect(() => {
    if (accessToken && selectedRoomId && syncToken) {
      getMessages();
    }
  }, [selectedRoomId, accessToken, syncToken]);

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
        <Messages
          messages={roomMessages[selectedRoomId]}
          selfChatId={chat_id}
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
    </div>
  );
};

export default Mentor;
