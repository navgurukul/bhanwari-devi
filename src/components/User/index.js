import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { METHODS } from "../../services/api";
import "./styles.scss";
import { toast } from "react-toastify";

function User() {
  const user = useSelector(({ User }) => User);
  const [allClasses, setAllClasses] = useState([]);
  const [values, setValues] = useState({
    email: "",
    roomId: "",
  });

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/apiDocs/chat/rooms`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
    }).then((res) => {
      setAllClasses(res.data);
    });
  }, []);

  const changeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const submitHandler = () => {
    const notify = () => {
      toast.success(`Added ${values.email} to the class successfully!`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    };
    return axios({
      method: METHODS.POST,
      url: `${process.env.REACT_APP_MERAKI_URL}/apiDocs/chat/addUser/${values.roomId}?email=${values.email}`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
    }).then(() => {
      notify();
    });
  };

  return (
    <div>
      <label htmlFor="email" className="label">
        Email
      </label>
      <input
        type="text"
        value={values.email}
        onChange={changeHandler}
        name="email"
        id="email"
        className="inputField"
        required
        aria-required
      />
      <label htmlFor="room" className="label">
        Select Class
      </label>
      <select
        className="inputField"
        onChange={changeHandler}
        value={values.roomId}
        id="item.room_id"
        name="roomId"
      >
        <option value="" disabled selected>
          Select a Class from options below
        </option>
        {allClasses.map((item, index) => {
          const lang = { en: "English", hi: "Hindi" };
          const className =
            lang[item.room_alias.split("meraki")[1].substr(0, 2)] +
            " " +
            item.room_alias.split("meraki")[1].substr(2, 6);
          return (
            <option key={index} value={item.room_id}>
              {className}
            </option>
          );
        })}
      </select>
      <button type="submit" className="submitData" onClick={submitHandler}>
        Add
      </button>
    </div>
  );
}

export default User;
