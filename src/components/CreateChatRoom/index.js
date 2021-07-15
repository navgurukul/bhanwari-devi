import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./styles.scss";

function MerakiChatRoom() {
  const user = useSelector(({ User }) => User);
  const [chatRoom, setChatRoom] = useState({
    name: "",
    topic: "",
    visibility: "",
  });

  const handleChange = async (event) => {
    setChatRoom({ ...chatRoom, [event.target.name]: event.target.value });
  };

  const submit = (event) => {
    event && event.preventDefault();
    const notify = () => {
      toast.success("Room Created!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    };
    axios
      .post(`${process.env.REACT_APP_MERAKI_URL}/chat/room`, chatRoom, {
        headers: {
          "Content-Type": "application/json",
          Authorization: user.data.token,
        },
      })
      .then(() => {
        notify();
      });
  };

  return (
    <>
      <div className="create-chat-room">
        <form onSubmit={submit} className="form-for-room">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="input-field"
            required
            aria-required
            onChange={handleChange}
            value={chatRoom.name}
          />
          <label htmlFor="topic">Topic</label>
          <input
            type="text"
            name="topic"
            id="topic"
            className="input-field"
            required
            aria-required
            onChange={handleChange}
            value={chatRoom.topic}
          />
          <label htmlFor="visibility">Visibility</label>
          <div className="radio">
            <span className="button1">
              <input
                type="radio"
                id="public"
                name="visibility"
                value="public"
                onChange={handleChange}
              />
              <label htmlFor="Choice1">Public</label>
            </span>
            <span className="button2">
              <input
                type="radio"
                id="private"
                name="visibility"
                value="private"
                onChange={handleChange}
              />
              <label htmlFor="Choice2">Private</label>
            </span>
          </div>
          <button type="submit" className="create-room-btn">
            create room
          </button>
        </form>
      </div>
    </>
  );
}

export default MerakiChatRoom;
