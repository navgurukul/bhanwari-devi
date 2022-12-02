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
  const [learningTracks, setLearningTracks] = useState([]);
  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/pathways/ongoingTopic`,
      headers: {
        "version-code": versionCode,
        accept: "application/json",
        Authorization: user?.data?.token || "",
      },
    }).then((res) => {
      const data = res.data;
      setLearningTracks(data);
    });
  }, []);
  console.log({ learningTracks }, "learning>>>>>>>>>>>>");

  return (
    <>
      <div>
        <Container>
          <Typography display="flex" flexWrap="wrap" variant="h6" mb={5} mt={5}>
            My Learning Tracks (With Classes)
          </Typography>
          <Grid
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            style={{ gap: 40 }}
          >
            {learningTracks.map((item) => (
              <LearningTrackCard item={item} />
            ))}

            {/* {console.log({LearningTrackCard} ,"data is here>>>>>>>>>>>>>")} */}
          </Grid>
        </Container>

        <Container>
          <Typography display="flex" flexWrap="wrap" variant="h6" mb={5} mt={5}>
            My Learning Tracks (Without Classes)
          </Typography>
          <Grid
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            style={{ gap: 40 }}
          >
            {learningTracks.map((item) => (
              <LearningTrackCard item={item} />
            ))}
          </Grid>
        </Container>
      </div>
    </>
  );
}
export default ReturningUserPage;
