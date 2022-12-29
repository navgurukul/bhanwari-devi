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
import { useSelector, useDispatch } from "react-redux";
import WithoutLearningClasses from "./WithoutLearningClasses";

function ReturningUserPage() {
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();

  const user = useSelector(({ User }) => User);
  const [learningTracks, setLearningTracks] = useState([]);
  console.log(user?.data?.user?.partner_id);
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
  console.log(learningTracks );

  return (
    <Container>
      {user?.data?.user?.partner_id != null ? (
        <>
          <Typography variant="h6" mb={5} mt={5}>
            My Learning Tracks (With Classes)
          </Typography>
          <Grid
            display="flex"
            flexWrap="wrap"
            justifyContent="left"
            style={{ gap: 32, justifyItems: "left" }}
          >
            {learningTracks.map(
              (item) =>
                (item.pathway_id == 1 || item.pathway_id === 2) && (
                  <LearningTrackCard item={item} />
                )
            )}
          </Grid>
          <Typography variant="h6" mb={5} mt={5}>
            My Learning Tracks (Without Classes)
          </Typography>
          <Grid
            display="flex"
            flexWrap="wrap"
            justifyContent="left"
            style={{ gap: 32 }}
          >
            {learningTracks.map(
              (item) =>
                (item.pathway_id >= 3 ) && (
                  <WithoutLearningClasses item={item} />
                )
            )}
          </Grid>
        </>
      ) : (
        <>
          <Typography display="flex" flexWrap="wrap" variant="h6" mb={5} mt={5}>
            My Learning Tracks
          </Typography>
          <Grid
            display="flex"
            flexWrap="wrap"
            justifyContent="left"
            style={{ gap: 32 }}
          >
            {learningTracks.map((item) => (
              <WithoutLearningClasses item={item} />
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
}
export default ReturningUserPage;
