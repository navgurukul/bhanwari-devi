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
import DOMPurify from "dompurify";
import get from "lodash/get";

function UnsafeHTML(props) {
  const { html, Container, ...otherProps } = props;
  const sanitizedHTML = DOMPurify.sanitize(html);
  return (
    <Container
      {...otherProps}
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
    />
  );
}

function AmazonCodingProgrammer({ pathwayId, pathwayCourseData }) {
  const dispatch = useDispatch();
  const user = useSelector(({ User }) => User);
  const { data } = useSelector((state) => state.Pathways);
  const pathway = useSelector((state) => state);
  const classes = useStyles();
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  const upcomingBatchesData = useSelector((state) => {
    return state.Pathways?.upcomingBatches?.data;
  });

  const enrolledBatches = useSelector((state) => {
    if (state?.Pathways?.enrolledBatches?.data?.length > 0) {
      return state?.Pathways?.enrolledBatches?.data;
    } else {
      return null;
    }
  });

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
        dispatch(
          upcomingBatchesActions.getUpcomingBatches({
            pathwayId: pathwayId,
            authToken: user?.data?.token,
          })
        );
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
                marginBottom="80px"
              >
                {pathwayCourseData?.description}
              </Typography>

              {pathwayCourseData?.summary.map((content, index) => {
                if (content.component === "header") {
                  return (
                    <UnsafeHTML
                      Container={Typography}
                      variant="h6"
                      html={DOMPurify.sanitize(get(content, "value"))}
                      sx={{ margin: "16px 0px" }}
                    />
                  );
                } else {
                  return (
                    <UnsafeHTML
                      Container={Typography}
                      variant="body1"
                      html={DOMPurify.sanitize(get(content, "value"))}
                      sx={{ margin: "16px 0px" }}
                    />
                  );
                }
              })}
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
