import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { actions as classActions } from "../../components/Class/redux/action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {
  Typography,
  Container,
  Grid,
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import useStyles from "./styles";
import { dateTimeFormat, TimeLeft } from "../../constant";

function AttendClass({ setDisable }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(({ User }) => User);
  const { data = [] } = useSelector(({ Class }) => Class.allClasses);
  const [enrollId, setEnrollId] = useState(false);

  useEffect(() => {
    dispatch(classActions.getClasses());
  }, [dispatch]);

  console.log(data);

  const languageMap = {
    hi: "Hindi",
    te: "Telugu",
    en: "English",
    ta: "Tamil",
    cohort: "Batch",
  };

  let sliceData = [];
  data && data.slice(0, 6).map((item) => sliceData.push(item));

  sliceData &&
    sliceData.find((item) => {
      if (item.id == enrollId) {
        sliceData = [];
        sliceData.push(item);
      }
    });

  const handleSubmit = (Id) => {
    const notify = () => {
      toast.success("You have been enrolled to class successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2500,
      });
    };
    axios
      .post(
        `${process.env.REACT_APP_MERAKI_URL}/classes/${Id}/register`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: user.data.token,
            "register-to-all": "false",
          },
        }
      )
      .then((res) => {
        console.log(res);
        notify();
      });
  };

  var today = new Date();
  let time;
  console.log("time", time);

  useEffect(() => {
    time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log("time", time);
  }, [time]);

  setTimeout(
    (time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()),
    1000
  );
  const EnrolledAndTimer = ({ item }) => {
    const [Timer, setTimer] = useState(TimeLeft(item.start_time));
    const ONE_MINUTE = 60000; //millisecs
    setInterval(() => {
      console.log("TimeChanged");
      setTimer(TimeLeft(item.start_time));
    }, ONE_MINUTE);
    console.log("Timer", Timer);
    return (
      <>
        {Timer == "joinNow" ? (
          <a
            style={{
              textDecoration: "none",
            }}
            href={item.meet_link}
            target="_blank"
          >
            <Button
              onClick={() => setDisable(false)}
              variant="contained"
              fullWidth
            >
              Join Now
            </Button>
          </a>
        ) : (
          <Button disabled={true} variant="contained" fullWidth>
            Starts in {Timer}
          </Button>
        )}
      </>
    );
  };
  return (
    <Container sx={{ mt: 5, mb: 15 }} maxWidth="lg">
      <Container maxWidth="md">
        <Typography variant="h6" gutterBottom>
          Please choose a class to attend
        </Typography>
        <Typography variant="body1" gutterBottom>
          Attending a class will help you observe how the teacher and students
          interact with each other. You may also stay a bit after the class to
          chat with the teacher. Once, completed please return to complete the
          onboarding
        </Typography>
      </Container>
      <Grid sx={{ mt: 5 }} container spacing={4}>
        {sliceData &&
          sliceData.map((item) => (
            <Grid item xs={12} ms={6} md={4}>
              <Card className={classes.AttendClassCard}>
                <CardContent>
                  <Typography gutterBottom variant="subtitle1">
                    {item.title}
                  </Typography>
                  <Box sx={{ display: "flex", mt: 2 }}>
                    <Button
                      sx={{
                        borderRadius: "100px",
                        background: "#E9F5E9",
                        color: "#48A145",
                        height: "33px",
                      }}
                      variant="contained"
                    >
                      Batch
                      {/* {languageMap[item.type]} */}
                    </Button>
                    <Button
                      sx={{
                        marginLeft: "10px",
                        borderRadius: "100px",
                        height: "33px",
                      }}
                      variant="outlined"
                    >
                      {languageMap[item.lang]}
                    </Button>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography>
                      {/* {moment(item.start_time).format("DD-MM-YYYY")} */}
                      {dateTimeFormat(item.start_time).finalDate} ,{" "}
                      {/* {dateTimeFormat(item.end_time).finalDate} */}
                      {moment(item.start_time).format("hh:mm a")} -
                      {moment(item.end_time).format("hh:mm a")}
                    </Typography>
                  </Box>
                  <Typography sx={{ mt: 2 }} gutterBottom variant="subtitle1">
                    {item.facilitator.name}
                  </Typography>

                  <Typography gutterBottom variant="body2">
                    Please join at least 10 mintues before the scheduled time
                  </Typography>
                </CardContent>
                <CardActions>
                  {sliceData && sliceData.length > 1 ? (
                    <Button
                      onClick={() => {
                        setEnrollId(item.id);
                        return handleSubmit(item.id);
                      }}
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Enroll
                    </Button>
                  ) : (
                    <EnrolledAndTimer item={item} />
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}

export default AttendClass;
