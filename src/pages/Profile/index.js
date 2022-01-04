import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { METHODS } from "../../services/api";
import "./styles.scss";

function Profile() {
  const user = useSelector(({ User }) => User);
  const [userData, setUserData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState();

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/users/me`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
    }).then((res) => {
      setUserData(res.data.user);
      setEditName(res.data.user.name ? res.data.user.name : "");
    });
  }, []);

  const editProfile = () => {
    setIsEditing(false);
    axios({
      method: METHODS.PUT,
      url: `${process.env.REACT_APP_MERAKI_URL}/users/me`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
      data: {
        name: editName,
      },
    }).then((res) => {
      axios({
        method: METHODS.GET,
        url: `${process.env.REACT_APP_MERAKI_URL}/users/me`,
        headers: {
          accept: "application/json",
          Authorization: user.data.token,
        },
      }).then((res) => {
        setUserData(res.data.user);
      });
    });
  };
  return (
    <div className="profile-container">
      <div className="profile">
        <div>
          <img className="profile-img" src={userData.profile_picture} />
        </div>
        <div className="profile-details">
          {isEditing ? (
            <input
              className="email-input"
              type="text"
              value={editName}
              onChange={(e) => {
                setEditName(e.target.value);
              }}
            />
          ) : (
            <h1 className="profile-deta">{userData.name}</h1>
          )}
          <p className="user-email">{userData.email}</p>
          {isEditing ? (
            <button onClick={editProfile} className="edit-Profile">
              Save
            </button>
          ) : (
            <button onClick={() => setIsEditing(true)} className="edit-Profile">
              Edit Name
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default Profile;
