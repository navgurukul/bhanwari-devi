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
      url: `${process.env.REACT_APP_MERAKI_URL}progressTracking/learningTrackStatus`,
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
      <Container maxWidth="lg" mt={2}>
        <Typography variant="h5" mb={3}>
          My Learning Tracks
        </Typography>
        <Grid container spacing={2} align="center">
          {learningTracks.map((item) => (
            <LearningTrackCard item={item} />
          ))}
        </Grid>
        {/* <Typography variant="h5">My Open Courses</Typography>
        <Grid sx={{ mt: 2 }} container spacing={3} align="center">
          {CardData.map((item, index) => (
            <Grid key={index} xs={12} sm={6} md={3}>
              <Link>
                <Card
                  elevation={0}
                  className={classes.pathwayCard}
                  sx={{
                    background: "#EEF1F5",
                    m: "15px",
                    height: "190px",
                  }}
                >
                  <Typography
                    align="center"
                    variant="subtitle1"
                    sx={{
                      p: "10px",
                      mt: "60px",
                    }}
                  >
                    {item.name}
                  </Typography>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid> */}
      </Container>
    </>
  );
}
export default ReturningUserPage;
