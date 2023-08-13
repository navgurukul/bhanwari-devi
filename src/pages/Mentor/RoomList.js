import React from "react";
import RoomNav from "./RoomNav";

const RoomList = ({
  rooms,
  selectedRoomId,
  accessToken,
  onSelect,
  roomMessages,
}) => {
  return (
    <nav role="navigation" style={{ height: "100vh", overflowY: "scroll" }}>
      <ul className="rooms-navs-container">
        {rooms.map((room) => (
          <RoomNav
            key={room.roomId}
            roomId={room.roomId}
            accessToken={accessToken}
            isSelected={room.roomId === selectedRoomId}
            name={room.name}
            onSelect={() => {
              onSelect(room.roomId);
            }}
            lastMessage={
              roomMessages[room.roomId] ? roomMessages[room.roomId][0] : null
            }
          />
        ))}
      </ul>
    </nav>
  );
};

export default RoomList;
