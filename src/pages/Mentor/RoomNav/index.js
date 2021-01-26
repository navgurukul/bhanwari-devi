import React from "react";
import Avatar from "../../../components/common/Avatar";
import format from "date-fns/format";
import "./styles.scss";

export default ({ name, lastMessage, onSelect, isSelected }) => {
  const subtitle = lastMessage ? lastMessage.text : "";

  const renderSubtitle = () => {
    return subtitle.length > 30 ? subtitle.slice(0, 27) + "..." : subtitle;
  };

  return (
    <li
      className={`room-nav ${isSelected ? "room-nav-selected" : ""}`}
      onClick={onSelect}
    >
      <Avatar name={name} />
      <div className="room-text">
        <div className="title">{name}</div>
        <div className="subtitle">
          {subtitle ? (
            renderSubtitle()
          ) : (
            <span className="empty-char">empty</span>
          )}
        </div>
      </div>
      <div className="date-new-messages">
        {lastMessage && (
          <div>{format(new Date(lastMessage.time), "dd LLL")}</div>
        )}
        <div></div>
      </div>
    </li>
  );
};
