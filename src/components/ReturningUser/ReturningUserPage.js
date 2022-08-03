import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Card,
  CardContent,
  Box,
  Link,
} from "@mui/material";
import { Grid } from "@mui/material";
import useStyles from "./styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../theme/constant";
import { useHistory, useParams } from "react-router-dom";
import { interpolatePath, PATHS, versionCode } from "../../constant";
import LearningTrackCard from "./LearningTrackCard";
import axios from "axios";
import { METHODS } from "../../services/api";
import { useSelector } from "react-redux";

function ReturningUserPage() {
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();
  const user = useSelector(({ User }) => User);
  const [learningTracks, setLearningTracks] = useState([
    {
      image: "python",
      course_Name: "Python",
      NoOfCourse: "8",
      NoOfTopic: "1",
      TopicName: "Introduction To Python",
    },
  ]);
  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/progressTracking/learningTrackStatus`,
      headers: {
        "version-code": versionCode,
        accept: "application/json",
        Authorization: user?.data?.token || "",
      },
    }).then((res) => {
      const data = res.data.data;
      setLearningTracks(data);
    });
  }, []);

  return (
    <>
      <Container maxWidth="lg">
        <Typography variant="h5" mb={3} mt={5}>
          My Learning Tracks
        </Typography>
        <Grid container spacing={1}>
          {learningTracks.map((item) => (
            <LearningTrackCard item={item} />
          ))}
        </Grid>
      </Container>
    </>
  );
}
export default ReturningUserPage;
