import React, { useEffect, useState } from "react";
import { format } from "../../common/date";
import KeyboardArrowRightTwoToneIcon from "@mui/icons-material/KeyboardArrowRightTwoTone";
import {
  Typography,
  Container,
  CardActionArea,
  CardMedia,
  Card,
  CardContent,
  Box,
  Link,
  LinearProgress,
  Collapse,
  Button,
  Chip,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Grid, IconButton } from "@mui/material";
import { actions as pathwayActions } from "../PathwayCourse/redux/action";
import { actions as upcomingBatchesActions } from "../PathwayCourse/redux/action";
import { actions as upcomingClassActions } from "../PathwayCourse/redux/action";
import { actions as enrolledBatchesActions } from "../PathwayCourse/redux/action";

import useStyles from "./styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../theme/constant";
import { useHistory } from "react-router-dom";
import { interpolatePath, PATHS } from "../../constant";
import { getPathwaysCourse } from "../PathwayCourse/redux/api";
import { METHODS } from "../../services/api";
import axios from "axios";

function WithoutLearningClasses(props) {
  // console.log(props.item,'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
  const user = useSelector(({ User }) => User);
  const dispatch = useDispatch();
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const isActiveIpad = useMediaQuery("(max-width:1300px)");
  const classes = useStyles();
  const history = useHistory();
  const [PathwayData, setPathwayData] = useState([]);
  const [courseIndex, setCourseIndex] = useState(0);
  const [open, setOpen] = React.useState(false);
  const { item, setPathway } = props;
  const pathwayId = item.pathway_id;
  const [completedPortionJason, setCompletedPortionJason] = useState();

  const params = useParams();

  useEffect(() => {
    getPathwaysCourse({ pathwayId: pathwayId }).then((res) => {
      setPathwayData(res.data);
    });

    const COurseIndex = PathwayData?.courses?.findIndex((course, index) => {
      if (course.course_id === item.course_id) {
        return index;
      }
    });
    setCourseIndex(COurseIndex);
  }, [item]);
  useEffect(() => {
    // setLoading(true);
    if (user?.data?.token && pathwayId) {
      dispatch(
        enrolledBatchesActions.getEnrolledBatches({
          pathwayId: pathwayId,
          authToken: user?.data?.token,
        })
      );
      axios({
        method: METHODS.GET,
        url: `${process.env.REACT_APP_MERAKI_URL}/pathways/${pathwayId}/completePortion`,
        headers: {
          accept: "application/json",
          Authorization: user?.data?.token,
        },
      }).then((response) => {
        setCompletedPortionJason(response.data.total_completed_portion);
      });
    }
  }, [pathwayId]);

  useEffect(() => {
    dispatch(pathwayActions.getPathwaysCourse({ pathwayId: pathwayId }));
  }, [dispatch, pathwayId]);

  return (
    <>
      <Card
        onClick={() => {
          history.push(
            interpolatePath(PATHS.PATHWAY_COURSE, {
              pathwayId: item.pathway_id,
            })
          );
        }}
        elevation={2}
        sx={{
          cursor: "pointer",
          width: "526px",
          marginBottom: "32px",
          borderRadius: "8px",
          padding: "16px",
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid item>
              <img
                style={{
                  width: "40px",
                  height: "40px",
                }}
                // align="left"
                src={PathwayData?.logo}
                alt="Students Img"
              />
            </Grid>
            <Grid item md={4} xs={3}>
              <Typography gutterBottom variant="body1" pt={1}>
                {PathwayData?.name}
              </Typography>
            </Grid>
            <Grid item md={2} xs={1}></Grid>
            <Grid
              item
              md={4}
              sx={{
                textAlign: "right",
                marginLeft: "15px",
              }}
              xs={5}
            >
              <Typography variant="body2" color="text.secondary">
                Progress:
                {completedPortionJason}%
              </Typography>
              <LinearProgress
                // className={classes.progressBar}
                sx={{ width: "73%", marginLeft: isActive ? "30px" : "40px" }}
                variant="determinate"
                value={parseInt(completedPortionJason) || 0}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default WithoutLearningClasses;
