import React from "react";
import useStyles from "./styles";
import { Container, Grid, Typography } from "@mui/material";
import { format } from "../../common/date";
import { Button, Stack } from "@mui/material";
import { Box } from "@mui/system";
import AlertDialog from "./AlertDialog";
import { useSelector } from "react-redux";
import CheckMoreBatches from "./CheckMoreBatches";
import NoBatchEnroll from "./NoBatchEnroll";

const PathwayCourseBatchEnroll2 = (props) => {
  const { upcomingBatchesData } = props;

  const user = useSelector(({ User }) => User);

  const [open, setOpen] = React.useState(false);
  const [upcomingBatchesOpen, setUpcomingBatchesOpen] = React.useState(false);

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(!open);
  };
  const close = () => {
    setOpen(false);
  };
  const handleUpcomingBatchesClickOpen = () => {
    setUpcomingBatchesOpen(true);
  };
  const handleUpcomingBatchesClickClose = () => {
    setUpcomingBatchesOpen(false);
  };
  return upcomingBatchesData ? (
    <>
      <Container align="center">
        <Box className={classes.BatchEnroll2Box} bgcolor="success.light">
          <Typography align="center" gutterBottom variant="h5">
            {upcomingBatchesData[0]?.title}
          </Typography>
          <Typography
            variant="body1"
            className={classes.BatchEnroll2DateNDegree}
          >
            <img
              className={classes.icons}
              src={require("./assets/calender.svg")}
              alt="Students Img"
            />
            {format(upcomingBatchesData[0]?.start_time, "dd MMM yy")} -{" "}
            {format(upcomingBatchesData[0]?.end_batch_time, "dd MMM yy")}
          </Typography>
          <Typography
            variant="body1"
            className={classes.BatchEnroll2DateNDegree}
          >
            <img
              className={classes.icons}
              src={require("./assets/degree.svg")}
              alt="Students Img"
            />
            Access to live classes
          </Typography>
          <Stack alignItems="center" maxWidth={600}>
            <Button variant="contained" onClick={handleClickOpen}>
              Enroll Batch
            </Button>
            <AlertDialog
              open={open}
              close={close}
              title={upcomingBatchesData[0]?.title}
              start_time={upcomingBatchesData[0]?.start_time}
              end_time={upcomingBatchesData[0]?.end_batch_time}
              id={upcomingBatchesData[0]?.id}
              registerAll={true}
              type="batch"
            />
          </Stack>
          <Typography mt={2} align="start" className={classes.FlexedContant}>
            Can’t start on{" "}
            {format(upcomingBatchesData[0]?.start_time, "dd MMM yy")}
            {" ? "}
            <Typography
              onClick={handleUpcomingBatchesClickOpen}
              color="primary"
              style={{
                cursor: "pointer",
              }}
            >
              {" "}
              &nbsp;
              <b>Check out our other batches</b>
            </Typography>
            <CheckMoreBatches
              open={upcomingBatchesOpen}
              handleUpcomingBatchesClickOpen={handleUpcomingBatchesClickOpen}
              handleUpcomingBatchesClickClose={handleUpcomingBatchesClickClose}
              upcomingBatchesData={upcomingBatchesData}
            />
          </Typography>
        </Box>
      </Container>
    </>
  ) : (
    <NoBatchEnroll />
  );
};
export default PathwayCourseBatchEnroll2;
