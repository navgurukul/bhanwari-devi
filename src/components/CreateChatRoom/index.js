import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "../common/Loader";
import { toast } from "react-toastify";
import "./styles.scss";

import {
  Card,
  Container,
  CardContent,
  Box,
  Grid,
  Typography,
  CardMedia,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import useMediaQuery from "@mui/material/useMediaQuery";
import useStyles from "./styles";
import { breakpoints } from "../../theme/constant";

function MerakiChatRoom() {
  const classes = useStyles();
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  const [loading, setLoading] = useState(false);
  const user = useSelector(({ User }) => User);
  const [chatRoom, setChatRoom] = useState({
    name: "",
    topic: "",
    roomAliasName: "",
    visibility: "",
  });

  const handleChange = async (event) => {
    setChatRoom({ ...chatRoom, [event.target.name]: event.target.value });
  };

  const submit = (event) => {
    setLoading(true);
    event && event.preventDefault();
    axios
      .post(`${process.env.REACT_APP_MERAKI_URL}/chat/room`, chatRoom, {
        headers: {
          "Content-Type": "application/json",
          Authorization: user.data.token,
        },
      })
      .then(() => {
        toast.success("Room Created!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        setLoading(false);
      })
      .catch((error) => {
        toast.error(
          `Room couldn't be created!: ${error.response.status} ${error.response.data.message.error}`,
          {
            position: toast.POSITION.BOTTOM_RIGHT,
          }
        );
        setLoading(false);
      });
  };

  return (
    <>
      <Container maxWidth="sm">
        <Grid xs={12} sm={12} md={10.5}>
          <Card
            variant="outlined"
            sx={{ boxShadow: 3 }}
            className={!isActive && classes.createChatRoomCard}
          >
            <form onSubmit={submit}>
              <CardContent>
                <Stack spacing={1}>
                  <InputLabel for="name">Name</InputLabel>

                  <TextField
                    type="text"
                    name="name"
                    id="name"
                    className={classes.createChatRoomtextField}
                    onChange={handleChange}
                    value={chatRoom.name}
                    required
                    aria-required

                    // sx={{ borderRadius: '50%' }}
                  />

                  <InputLabel for="Topic">Topic</InputLabel>

                  <TextField
                    type="text"
                    name="topic"
                    id="topic"
                    className={classes.createChatRoomtextField}
                    onChange={handleChange}
                    value={chatRoom.topic}
                    required
                    aria-required
                  />

                  <InputLabel for="roomAliasName">Room Alias</InputLabel>

                  <TextField
                    type="text"
                    name="roomAliasName"
                    id="roomAliasName"
                    className={classes.createChatRoomtextField}
                    //  className="input-field" border Reduce of the Text Field, and give marging bottom to the space.
                    onChange={handleChange}
                    value={chatRoom.roomAliasName}
                    required
                    aria-required
                  />

                  <InputLabel for="Visibility">Visibility</InputLabel>

                  <RadioGroup
                    row
                    aria-label="visibility"
                    name="visibility"
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="public"
                      id="public"
                      control={<Radio />}
                      label="Public"
                    />
                    <FormControlLabel
                      value="private"
                      id="private"
                      control={<Radio />}
                      label="Private"
                    />
                  </RadioGroup>

                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={loading}
                    size="xsmall"
                    sx={{ borderRadius: "18px" }}
                  >
                    {loading ? <Loader /> : "create room"}
                  </Button>
                  {/* <Button
                    variant="contained"
                    color="primary"
                    type="submit" 
                    disabled={loading}
                  >
                    {loading ? <Loader /> : "create room"}
                     {console.log(chatRoom)} it's giving the data. 
                  </Button> */}
                </Stack>
              </CardContent>
            </form>
          </Card>
        </Grid>
      </Container>

      {/* <div className="create-chat-room">
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
          <label htmlFor="roomAliasName">Room Alias</label>
          <input
            type="text"
            name="roomAliasName"
            id="roomAliasName"
            className="input-field"
            required
            aria-required
            onChange={handleChange}
            value={chatRoom.roomAliasName}
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
          <button type="submit" className="create-room-btn" disabled={loading}>
            {loading ? <Loader /> : "create room"}
          </button>
        </form>
      </div> */}
    </>
  );
}

export default MerakiChatRoom;
