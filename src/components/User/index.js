import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { METHODS } from "../../services/api";
import "./styles.scss";
import { toast } from "react-toastify";
import MerakiCreateRoom from "../CreateChatRoom/index";
import MerakiUsers from "../MerakiUsers";

import {
  Card,
  Container,
  CardContent,
  Box,
  Grid,
  Typography,
  CardMedia,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import useStyles from "./styles";
import { breakpoints } from "../../theme/constant";

function User() {
  const classes = useStyles();
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  const user = useSelector(({ User }) => User);
  const [allClasses, setAllClasses] = useState([]);
  const [values, setValues] = useState({
    email: "",
    roomId: "",
  });
  const lang = { en: "English", hi: "Hindi", sp: "Spoken English" };

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/chat/rooms`,
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
      const roomAlias = allClasses.filter((c) => {
        return c.room_id === values.roomId;
      });
      const className =
        lang[roomAlias[0].room_alias.split("meraki")[1].substr(0, 2)] +
        " Class - " +
        roomAlias[0].room_alias
          .split(":navgurukul.org")[0]
          .split("meraki")[1]
          .split("class")[1];
      toast.success(`Added ${values.email} to ${className} successfully!`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2500,
      });
    };
    return axios({
      method: METHODS.POST,
      url: `${process.env.REACT_APP_MERAKI_URL}/chat/addUser/${values.roomId}?email=${values.email}`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
    }).then(() => {
      notify();
    });
  };

  return (
    <>
      <MerakiUsers />
      <Container maxWidth="xl">
        <Stack direction="row">
          <InputLabel for="email" className={classes.usertext}>
            Email
          </InputLabel>

          <TextField
            type="text"
            value={values.email}
            // inputProps={{style: {borderRadius:" 40%"}}}
            onChange={changeHandler}
            name="email"
            id="email"
            // className="inputField"
            // sx={{borderRadius: '20px'}}
            required
            aria-required
          />

          <InputLabel for="room" id="item.room_id" className={classes.usertext}>
            Select Class
          </InputLabel>
          <Select
            className="inputField"
            // add the class to the input field.
            onChange={changeHandler}
            value={values.roomId}
            id="item.room_id"
            name="roomId"
            sx={{ borderRadius: "20px" }}
          >
            <MenuItem value="" disabled={true}>
              Select a Class from options below
              {/* IT's not showing when the value is empty. */}
            </MenuItem>
            {allClasses.map((item, index) => {
              const className =
                lang[item.room_alias.split("meraki")[1].substr(0, 2)] +
                " Class - " +
                item.room_alias
                  .split(":navgurukul.org")[0]
                  .split("meraki")[1]
                  .split("class")[1];
              return (
                <MenuItem key={index} value={item.room_id}>
                  {className}
                </MenuItem>
              );
            })}
          </Select>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={submitHandler}
            className={classes.userBtn}
            // size ="xsmall"
            sx={{ borderRadius: "20px" }}
          >
            Add
          </Button>
        </Stack>
        <MerakiCreateRoom />
      </Container>

      {/* <div className="container-for-users">
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
            const className =
              lang[item.room_alias.split("meraki")[1].substr(0, 2)] +
              " Class - " +
              item.room_alias
                .split(":navgurukul.org")[0]
                .split("meraki")[1]
                .split("class")[1];
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
      <div className="create-room">
        <MerakiCreateRoom />
      </div> */}
    </>
  );
}

export default User;
