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
import { actions as upcomingBatchesActions } from "../PathwayCourse/redux/action";
import { actions as upcomingClassActions } from "../PathwayCourse/redux/action";
import { actions as enrolledBatchesActions } from "../PathwayCourse/redux/action";

function ReturningUserPage() {
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();

  const user = useSelector(({ User }) => User);
  const [learningTracks, setLearningTracks] = useState([]);
  const [pathway, setPathway] = useState([]);
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
  console.log(learningTracks, "learning");

  // const Pathway = learningTracks.forEach((element)=>{
  //     setPathway(element.pathway_id)
  //   })
  // console.log(Pathway)

  // const userEnrolledClasses = useSelector((state) => {
  //   return state.Pathways?.upcomingEnrolledClasses?.data;
  // });

  // const enrolledBatches = useSelector((state) => {
  //   if (state?.Pathways?.enrolledBatches?.data?.length > 0) {
  //     return state?.Pathways?.enrolledBatches?.data;
  //   } else {
  //     return null;
  //   }
  // });
  // console.log(pathway)
  // useEffect(() => {
  //   if (user?.data?.token && enrolledBatches?.length > 0) {
  //     dispatch(
  //       upcomingClassActions.getupcomingEnrolledClasses({
  //         pathwayId: 1,
  //         authToken: user?.data?.token,
  //       })
  //     );
  //   } else {
  //     if (user?.data?.token) {
  //       dispatch(
  //         upcomingBatchesActions.getUpcomingBatches({
  //           pathwayId: 1,
  //           authToken: user?.data?.token,
  //         })
  //       );
  //     }
  //   }
  // }, []);

  return (
    <>
      <Container maxWidth="lg">
        <Typography variant="h6" mb={5} mt={5}>
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
