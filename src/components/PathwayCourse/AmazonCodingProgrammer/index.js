import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../../theme/constant";
import NoBatchEnroll from "../../BatchClassComponents/NoBatchEnroll";
import { actions as upcomingBatchesActions } from "../redux/action";
import { actions as upcomingClassActions } from "../redux/action";

import { Container, Grid, Typography } from "@mui/material";
import useStyles from "../styles";
import PathwayCourseBatchEnroll1 from "../../BatchClassComponents/PathwayCourseBatchEnroll1";
import ExternalLink from "../../common/ExternalLink";
import AmazonBootcampBatch from "../../BatchClassComponents/AmazonBootcampBatch";
import axios from "axios";
import { METHODS } from "../../../services/api";
import { versionCode } from "../../../constant";

function AmazonCodingProgrammer({ pathwayId }) {
  const dispatch = useDispatch();
  const user = useSelector(({ User }) => User);
  const { data } = useSelector((state) => state.Pathways);
  const pathway = useSelector((state) => state);
  const classes = useStyles();
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const [upcomingBatchesData, setUpcomingBatchesData] = useState([]);

  // const upcomingBatchesData = useSelector((state) => {
  //   return state.Pathways?.upcomingBatches?.data;
  // });

  const enrolledBatches = useSelector((state) => {
    if (state?.Pathways?.enrolledBatches?.data?.length > 0) {
      return state?.Pathways?.enrolledBatches?.data;
    } else {
      return null;
    }
  });

  const upcomingBatche = () => {
    return axios({
      url: `${process.env.REACT_APP_MERAKI_URL}/pathways/${pathwayId}/upcomingBatches`,
      method: METHODS.GET,
      headers: {
        "version-code": versionCode,
        Authorization: user?.data?.token,
      },
    })
      .then((res) => {
        console.log("res", res);
        setUpcomingBatchesData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    if (user?.data?.token && enrolledBatches?.length > 0) {
      dispatch(
        upcomingClassActions.getupcomingEnrolledClasses({
          pathwayId: pathwayId,
          authToken: user?.data?.token,
        })
      );
    } else {
      if (user?.data?.token) {
        // dispatch(
        //   upcomingBatchesActions.getUpcomingBatches({
        //     pathwayId: pathwayId,
        //     authToken: user?.data?.token,
        //   })
        // );
        upcomingBatche();
      }
    }
  }, [enrolledBatches]);

  const userEnrolledClasses = useSelector((state) => {
    return state.Pathways?.upcomingEnrolledClasses?.data;
  });

  return (
    <React.Fragment>
      {enrolledBatches ? (
        <AmazonBootcampBatch enrolledBatches={enrolledBatches[0]["title"]} />
      ) : (
        <Container className={classes.pathwayContainer} maxWidth="lg">
          <Grid container>
            <Grid item xs={12} md={6} sx={{ pr: 2 }}>
              <Typography
                variant="body2"
                className={classes.cardSubtitle}
                sx={{ textAlign: isActive && "center", pb: "8px" }}
              >
                Learning Track
              </Typography>
              <Typography
                variant="h4"
                align={isActive ? "center" : "left"}
                sx={{ pb: "16px" }}
              >
                Foundations of Data Structures and Algorithms
              </Typography>
              <Typography
                variant="body1"
                maxWidth={"sm"}
                align={isActive ? "center" : "left"}
              >
                Master the necessary data structures and algorithms to help you
                ace the technical interviews at your favorite companies
              </Typography>

              {/* <ExternalLink
                style={{
                  textDecoration: "none",
                }}
                href={"yotubevideo"}
              >
                <Typography style={{ display: "flex" }} mt={2} variant="body2">
                  <img
                    src={require("../asset/ComputerScreen.svg")}
                    alt="MonitorScreen Img"
                  />
                  <section
                    className={classes.link}
                    // onClick={handleVideo}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    {"  "} &nbsp; &nbsp;
                    <b>What's it all about?</b>
                  </section>
                </Typography>
              </ExternalLink> */}
              <Typography variant="h6" mt="80px">
                What Will You be Learning?
              </Typography>

              <Typography variant="body1" margin="16px 0px">
                Our curriculum consists of three modules i.e. Basic,
                Intermediate and Advanced, which can be completed at your own
                pace. A breakdown of the modules is as below:
              </Typography>

              <Typography variant="body1" mb="16px">
                <span className={classes.spanfont}> Module 1 </span>: aims to
                provide students with a comprehensive understanding of the Java
                Programming Language, enabling them to become familiar with its
                syntax and key concepts.
              </Typography>
              <Typography variant="body1" mb="16px">
                <span className={classes.spanfont}> Module 2 </span>: Students
                will be introduced to Data Structures and Algorithms, empowering
                them with the knowledge necessary to tackle complex programming
                problems and optimize code efficiency.
              </Typography>
              <Typography variant="body1" mb="16px">
                <span className={classes.spanfont}> Module 3 </span>: Designed
                to inform students about the various Internship roles available
                at Amazon while also equipping them with the necessary Aptitude
                and Logical Reasoning skills.
              </Typography>
              <Typography variant="body1" marginTop="32px">
                In addition to the technical curriculum, we offer dedicated
                workshops to help you develop soft skills such as resume
                building and leveraging social network platforms like LinkedIn
                and Twitter. Our experienced instructors will guide you every
                step of the way, and you'll receive daily assignments and
                homework tasks to practice the concepts covered in class.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ pl: 1 }}>
              {upcomingBatchesData?.length > 0 ? (
                <PathwayCourseBatchEnroll1
                  upcomingBatchesData={upcomingBatchesData}
                />
              ) : (
                <NoBatchEnroll />
              )}
            </Grid>
          </Grid>
        </Container>
      )}
    </React.Fragment>
  );
}

export default AmazonCodingProgrammer;
