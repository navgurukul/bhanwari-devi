import React, { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { CardMedia, CardContent, Card, Button, Stack } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import useStyles from "../styles";
import { useSelector } from "react-redux";
import { breakpoints } from "../../../theme/constant";
import { dateTimeFormat, TimeLeft } from "../../../constant";
import RevisionClassEnroll from "../Revision/RevisionClassEnroll";

// import { Button } from "framework7-react";

const BatchClass = (props) => {
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const classes = useStyles();
  const { facilitator, start_time, end_time, is_enrolled, meet_link, id } =
    props;
  let [TimeLefts, setTimeLefts] = useState(TimeLeft(start_time));
  var ONE_MINUTE = 60 * 1000;
  setInterval(() => {
    setTimeLefts(TimeLeft(start_time));
    console.log("TimeChange");
  }, ONE_MINUTE);
  return TimeLefts !== "expired" ? (
    <>
      <Container maxWidth="l">
        <Box align="right" mt={1} maxWidth={350} mb={10}>
          <Card elevation={2} pl={10}>
            <CardContent>
              <Typography gutterBottom variant="h5" align="start"></Typography>
              <Typography
                variant="body1"
                mb={1}
                style={{
                  display: "flex",
                  padding: "10px 0",
                }}
              >
                <img
                  className={classes.icons}
                  src={require("./assets/calender.svg")}
                  alt="Students Img"
                />
                {dateTimeFormat(start_time).finalDate},{" "}
                {dateTimeFormat(start_time).finalTime} -{" "}
                {dateTimeFormat(end_time).finalTime}
              </Typography>
              <Typography
                variant="body1"
                mb={1}
                style={{
                  display: "flex",
                  // padding: "10px 0",
                }}
              >
                {" "}
                <img
                  className={classes.icons}
                  src={require("./assets/Group.svg")}
                  alt="Students Img"
                />
                {facilitator}
              </Typography>
              <Typography
                align="left"
                mb={2}
                variant="body1"
                color="secondery.text"
              >
                Please join at least 10 mintues before the scheduled time
              </Typography>
              {TimeLefts == "joinNow" ? (
                <a
                  style={{
                    textDecoration: "none",
                  }}
                  href={meet_link}
                  target="_blank"
                >
                  <Button variant="contained" fullWidth>
                    Join Now
                  </Button>
                </a>
              ) : (
                <Button disabled={true} variant="contained" fullWidth>
                  Starts in {TimeLefts}
                </Button>
              )}

              <Typography
                mt={2}
                align="start"
                style={{
                  display: "flex",
                }}
              ></Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  ) : (
    <RevisionClassEnroll id={id} />
  );
};
export default BatchClass;
