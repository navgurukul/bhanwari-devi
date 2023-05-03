import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions as courseActions } from "../../Course/redux/action";
import { actions as pathwayActions } from "../../PathwayCourse/redux/action";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../../theme/constant";
import NoBatchEnroll from "../../BatchClassComponents/NoBatchEnroll";
import { actions as upcomingBatchesActions } from "../redux/action";
import { actions as upcomingClassActions } from "../redux/action";
import { Link } from "react-router-dom";
import { PATHS, interpolatePath } from "../../../constant";
import {
  Container,
  Skeleton,
  Grid,
  Card,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import useStyles from "../styles";
import PathwayCourseBatchEnroll1 from "../../BatchClassComponents/PathwayCourseBatchEnroll1";

function AmazonCodingProgrammer() {
  const dispatch = useDispatch();
  const user = useSelector(({ User }) => User);
  const { data } = useSelector(({ Course }) => Course);
  const pathway = useSelector((state) => state);
  const classes = useStyles();
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  const upcomingBatchesData = useSelector((state) => {
    return state.Pathways?.upcomingBatches?.data;
  });

  useEffect(() => {
    dispatch(courseActions.getCourses());
  }, [dispatch]);

  useEffect(() => {
    dispatch(pathwayActions.getPathways());
  }, [dispatch]);

  const pathwayCourseId =
    (pathway.Pathways.data &&
      pathway.Pathways.data.pathways
        .map((pathway) => pathway.courses || [])
        .flat()
        .map((course) => course.id)) ||
    [];

  const otherCourses =
    data &&
    data.allCourses.filter(
      (item) => pathwayCourseId && !pathwayCourseId.includes(item.id)
    );

  return (
    <React.Fragment>
      <Container className={classes.pathwayContainer} maxWidth="lg">
        <Grid container>
          <Grid item xs={12} md={6} sx={{ pr: 2 }}>
            <Typography
              variant="h4"
              align={isActive ? "center" : "left"}
              sx={{ pb: "16px" }}
            >
              Build a Strong Foundation in Data Structures & Algorithms
            </Typography>
            <Typography
              variant="body1"
              maxWidth={"sm"}
              align={isActive ? "center" : "left"}
            >
              Are you ready to take your career to the next level? Our
              comprehensive bootcamp is designed to help you acquire the skills
              and knowledge you need to excel in technical interviews and land
              top jobs at product-based companies.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={{ pl: 2, mt: "16px" }}>
            <NoBatchEnroll />
          </Grid>
        </Grid>
        <Container maxWidth="md">
          <Typography variant="body1" margin="36px 0px">
            Our curriculum is divided into three modules, from basics to
            advanced, so you can learn at your own pace. Check out the breakdown
            of our modules below:
          </Typography>

          <Typography component="li" variant="body1" mb="16px">
            <span className={classes.spanfont}> Module 1 </span>: aims to
            provide students with a comprehensive understanding of the Java
            Programming Language, enabling them to become familiar with its
            syntax and key concepts.
          </Typography>
          <Typography component="li" variant="body1" mb="16px">
            <span className={classes.spanfont}> Module 2 </span>: Students will
            be introduced to Data Structures and Algorithms, empowering them
            with the knowledge necessary to tackle complex programming problems
            and optimize code efficiency.
          </Typography>
          <Typography component="li" variant="body1" mb="16px">
            <span className={classes.spanfont}> Module 3 </span>: Designed to
            inform students about the various Internship roles available at
            Amazon while also equipping them with the necessary Aptitude and
            Logical Reasoning skills.
          </Typography>
          <Typography variant="body1" marginTop="32px">
            In addition to the technical curriculum, we offer dedicated
            workshops to help you develop soft skills such as resume building
            and leveraging social network platforms like LinkedIn and Twitter.
            Our experienced instructors will guide you every step of the way,
            and you'll receive daily assignments and homework tasks to practice
            the concepts covered in class.
          </Typography>
        </Container>
      </Container>
    </React.Fragment>
  );
}

export default AmazonCodingProgrammer;
