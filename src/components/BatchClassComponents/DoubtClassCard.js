import React, { useState } from "react";
import axios from "axios";
import { format } from "../../common/date";
import { METHODS } from "../../services/api";
import { useSelector } from "react-redux";
import ClassJoinTimerButton from "../../components/Class/ClassJoinTimerButton";
import {
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DateRangeIcon from "@mui/icons-material/DateRange";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CircularProgress from "@mui/material/CircularProgress";

function DoubtClassCard({ item, setDoubtclasses }) {
  const user = useSelector(({ User }) => User);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (Id) => {
    setLoading(true);
    axios({
      method: METHODS.POST,
      url: `${process.env.REACT_APP_MERAKI_URL}/classes/${Id}/register`,
      headers: {
        "Content-Type": "application/json",
        Authorization: user.data.token,
        "register-to-all": true,
      },
      data: {},
    })
      .then((res) => {
        axios({
          method: METHODS.GET,
          url: `${process.env.REACT_APP_MERAKI_URL}/pathways/doubtclasses/7`,
          headers: {
            accept: "application/json",
            Authorization: user.data.token,
          },
        }).then((res) => {
          setLoading(false);
          setDoubtclasses(res.data);
        });
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <Grid item xs={12} ms={6} md={4}>
      <Card
        sx={{
          padding: "32px 16px",
          maxWidth: "384px",
          background: "#FFF5CC",
        }}
        elevation={1}
      >
        <CardContent>
          <Grid container>
            <Grid item sm={2}>
              <img
                src={require("./assets/playButton.svg")}
                alt="Students Img"
              />
            </Grid>
            <Grid item md={10} sm={8} xs={8}>
              <Typography marginLeft="16px" variant="subtitle1">
                {item.title}
              </Typography>
            </Grid>
          </Grid>
          <Grid container mt="32px">
            <Grid item md={7} xs={7} sx={{ display: "flex" }}>
              <DateRangeIcon />
              <Typography variant="body1" ml="8px">
                {format(item.start_time, "dd MMM yy")}
              </Typography>
            </Grid>
            <Grid display="flex">
              <AccessTimeIcon />
              <Typography variant="body1" marginLeft="8px">
                {/* 2 PM */}
                {format(item.start_time, "hh:mm aaa")}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={{ justifyContent: "right" }}>
          <Button endIcon={<ArrowForwardIcon />}>
            {item.enrolled ? (
              loading ? (
                <CircularProgress color="primary" />
              ) : (
                <ClassJoinTimerButton
                  buttonType="text"
                  startTime={item.start_time}
                  link={item.meet_link}
                />
              )
            ) : loading ? (
              <CircularProgress color="primary" />
            ) : (
              <Button
                type="submit"
                variant="contained"
                onClick={() => {
                  handleSubmit(item.id);
                }}
              >
                Enroll
              </Button>
            )}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default DoubtClassCard;
