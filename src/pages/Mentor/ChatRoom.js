import React from "react";
import Messages from "./Messages";
import ChatInput from "./ChatInput";
import FloatingIcon from "../../components/common/FloatingIcon";

const ChatRoom = ({
  roomMessages,
  chat_id,
  prevScrollPosition,
  handleScroll,
  deleteMessage,
  members,
  replyMessage,
  onSendMessage,
  activateReplyToMessageState,
  selectedRoomId,
  isMobile,
  setSelectedRoomId,
}) => {
  return (
    <div className="room-chat">
      <Messages
        messages={roomMessages[selectedRoomId]}
        selfChatId={chat_id}
        prevScrollPosition={prevScrollPosition}
        onScroll={handleScroll}
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

export default ChatRoom;
