import React from "react";
import useStyles from "./styles";
import { Container, Grid, Typography } from "@mui/material";
import { dateTimeFormat } from "../../constant";
import { Button, Stack } from "@mui/material";
import { Box } from "@mui/system";
import AlertDialog from "./AlertDialog";
import { useSelector } from "react-redux";
import CheckMoreBatches from "./CheckMoreBatches";

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
        <Box
          maxWidth={500}
          bgcolor="#E9F5E9"
          mb={10}
          pt={3}
          height={280}
          style={{ padding: "15px" }}
        >
          <Typography align="center" gutterBottom variant="h5">
            {upcomingBatchesData[0]?.title}
          </Typography>
          <Typography
            variant="body1"
            mb={1}
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "10px 0",
            }}
          >
            <img
              className={classes.icons}
              src={require("./assets/calender.svg")}
              alt="Students Img"
            />
            {dateTimeFormat(upcomingBatchesData[0]?.start_time).finalDate} -{" "}
            {dateTimeFormat(upcomingBatchesData[0]?.end_time).finalDate}
          </Typography>
          <Typography
            variant="body1"
            mb={1}
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "10px 0",
            }}
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
              {upcomingBatchesData[0]?.title} Enroll Batch
            </Button>
            <AlertDialog
              open={open}
              close={close}
              title={upcomingBatchesData[0]?.title}
              start_time={upcomingBatchesData[0]?.start_time}
              end_time={upcomingBatchesData[0]?.end_time}
              id={upcomingBatchesData[0]?.id}
              registerAll={true}
            />
          </Stack>
          <Typography
            mt={2}
            align="start"
            style={{
              display: "flex",
            }}
          >
            Can’t start on{" "}
            {dateTimeFormat(upcomingBatchesData[0]?.start_time).finalDate}
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
    ""
  );
};
export default PathwayCourseBatchEnroll2;
