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
import "./styles.scss";

let PAGINATION_THRESHOLD = 150;
let client;

const Mentor = () => {
  const { data } = useSelector(({ User }) => User);
  const { isMobile } = useContext(DeviceProvider);
  const { chat_id, chat_password } = data.user;
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [syncToken, setSyncToken] = useState({
    fromSyncToken: "",
    toSyncToken: "",
  });
  const [roomMessages, setRoomMessage] = useState({});

  function onSendMessage(message, roomId) {
    const messageObj = {
      body: message,
      msgtype: "m.text",
    };

    client.sendEvent(roomId, "m.room.message", messageObj);
  }

  function addBulkMessages(messages) {
    if (messages.length > 0) {
      setRoomMessage((roomMessages) => {
        return {
          ...roomMessages,
          [messages[0].room_id]: messages.concat(
            roomMessages[messages[0].room_id] || []
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
        setSyncToken({
          fromSyncToken: tokenDetails.nextSyncToken,
          toSyncToken: "",
        });
        setRooms(client.getRooms());
        setSelectedRoomId(isMobile ? null : initialRooms[0].roomId);
      }
    });
  }, [chat_id, chat_password]);

  const handleScroll = useCallback(
    _.throttle((element) => {
      if (
        !isLoading &&
        element.scrollHeight + element.scrollTop <
          element.clientHeight + PAGINATION_THRESHOLD
      ) {
        getMessages();
      }
    }, 500),
    [accessToken, selectedRoomId, syncToken, isLoading]
  );

  const deleteMessage = async (eventId) => {
    redactEvent({
      roomId: selectedRoomId,
      eventId,
      accessToken,
    });
  };

  const getMessages = async () => {
    setIsLoading(true);
    let messagesResponse = await fetchMessages({
      roomId: selectedRoomId,
      accessToken,
      fromSyncToken: syncToken.fromSyncToken,
      limit: 10,
    });
    setSyncToken({
      fromSyncToken: messagesResponse.endToken,
    });
    setIsLoading(false);
    const textMessages = messagesResponse.data.filter(
      (message) => message.type === "m.room.message" && message.content.msgtype
    );
    addBulkMessages(textMessages);
  };

  useEffect(() => {
    if (accessToken && selectedRoomId) {
      getMessages();
    }
  }, [selectedRoomId, accessToken]);

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
    </div>
  );
};

export default Mentor;
