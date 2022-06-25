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
import { TimeLeft } from "../../../constant";
import { format } from "../../../common/date";
import RevisionClassEnroll from "../Revision/RevisionClassEnroll";
// import { Button } from "framework7-react";
import DropOut from "../DropOut";
import FutureOrPast from "../../common/FutureOrPast";
import ClassJoinTimerButton from "../../Class/ClassJoinTimerButton";

const ExerciseBatchClass = (props) => {
  const classes = useStyles();
  const [dropOutOpen, setDropOutOpen] = useState(false);
  const {
    facilitator,
    start_time,
    end_time,
    is_enrolled,
    meet_link,
    id
  } = props;
  const closeDropOut = () => {
    setDropOutOpen(false);
  };

  return (
    <FutureOrPast
      date={start_time}
      future={
        <Container maxWidth="l">
          <Box align="right" mt={5} maxWidth={350} mb={2}>
            <Card elevation={2} pl={10}>
              <CardContent>
                {/* <Typography gutterBottom variant="h5" align="start"></Typography> */}
                <Typography
                  variant="body1"
                  mb={1}
                  style={{
                    display: "flex",
                    padding: "10px 0"
                  }}
                >
                  <img
                    className={classes.icons}
                    src={require("./assets/calender.svg")}
                    alt="Students Img"
                  />
                  {format(start_time, "dd MMM yy")},{" "}
                  {format(start_time, "hh:mm aaa")} -{" "}
                  {format(end_time, "hh:mm aaa")}
                </Typography>
                <Typography
                  variant="body1"
                  mb={1}
                  style={{
                    display: "flex"
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
                <ClassJoinTimerButton startTime={start_time} link={meet_link} />
              </CardContent>
            </Card>
          </Box>
        </Container>
      }
      past={<RevisionClassEnroll id={id} />}
    />
  );
};

export default ExerciseBatchClass;
