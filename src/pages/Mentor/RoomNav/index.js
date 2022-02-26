import React, { useState } from "react";
import Avatar from "../../../components/common/Avatar";
import Dropdown from "../../../components/common/Dropdown";
import format from "date-fns/format";
import { leaveRoom } from "../utils";
import "./styles.scss";

export default ({
  name,
  lastMessage,
  onSelect,
  isSelected,
  roomId,
  accessToken,
}) => {
  const [isMessageActionsDropdownOpen, setIsMessageActionsDropdownOpen] =
    useState(false);
  const subtitle = lastMessage ? lastMessage.text : "";

  const renderSubtitle = () => {
    return subtitle.length > 30 ? subtitle.slice(0, 27) + "..." : subtitle;
  };

  const roomActions = [
    {
      label: "Leave room",
      value: "leave room",
      onClick: () => {
        leaveRoom({
          roomId,
          accessToken,
        });
      },
    },
  ];

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
      <div className="room-info-actions">
        {lastMessage && lastMessage.origin_server_ts && (
          <div>{format(new Date(lastMessage.origin_server_ts), "dd LLL")}</div>
        )}
        <div
          className="menu-ellipsis"
          onClick={(e) => {
            e.stopPropagation();
            setIsMessageActionsDropdownOpen(!isMessageActionsDropdownOpen);
          }}
        >
          <div className="menu-ellipsis-dot">•</div>
          <div className="menu-ellipsis-dot">•</div>
          <div className="menu-ellipsis-dot">•</div>
          <Dropdown
            isOpen={isMessageActionsDropdownOpen}
            options={roomActions}
          />
        </div>
      </div>
    </li>
  );
};
