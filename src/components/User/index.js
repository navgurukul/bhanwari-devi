import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { METHODS } from "../../services/api";
import "./styles.scss";
import { toast } from "react-toastify";
import MerakiCreateRoom from "../CreateChatRoom/index";
import MerakiUsers from "../MerakiUsers";

import { Container, Typography } from "@mui/material";
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
      <Container maxWidth="xl">
        <MerakiUsers />
        <MerakiCreateRoom />
        <Container className={classes.userSpace1}>
          <Typography variant="h6" align="center" gutterBottom>
            Add Student To The Room
          </Typography>
        </Container>
        <Stack direction="row" className={classes.userSpace}>
          <InputLabel for="email">
            <Typography sx={{ m: 2 }}>Email</Typography>
          </InputLabel>

          <TextField
            type="text"
            value={values.email}
            onChange={changeHandler}
            name="email"
            id="email"
            className={classes.userinputField}
            required
            aria-required
          />

          <InputLabel for="room" id="item.room_id">
            <Typography sx={{ m: 2 }}>Select room</Typography>
          </InputLabel>
          <Select
            className={classes.userinputField1}
            onChange={changeHandler}
            value={values.roomId}
            id="item.room_id"
            name="roomId"
          >
            <MenuItem value="">Select a Class from options below</MenuItem>
            {allClasses.map((item, index) => {
              const className =
                lang[item.room_alias.split("meraki")[1].substr(0, 2)] +
                " Class - " +
                item.room_alias
                  .split(":navgurukul.org")[0]
                  .split("meraki")[1]
                  .split("class")[1];
              return (
                <>
                  <MenuItem key={index} value={item.room_id}>
                    {className}
                  </MenuItem>
                </>
              );
            })}
          </Select>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={submitHandler}
            sx={{ width: "20%", height: "60px", borderRadius: "20px" }}
          >
            Add
          </Button>
        </Stack>
      </Container>
    </>
  );
}

export default User;
