import React from "react";
import useStyles from "./styles";
import { Container, Typography } from "@mui/material";
import { PATHS, interpolatePath } from "../../constant";
import { format } from "../../common/date";
import { CardContent, Card, Button } from "@mui/material";
import { Box } from "@mui/system";
import AlertDialog from "./AlertDialog";
import { useSelector } from "react-redux";
import CheckMoreBatches from "./CheckMoreBatches";
import { useHistory } from "react-router-dom";

const PathwayCourseBatchEnroll1 = (props) => {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [upcomingBatchesOpen, setUpcomingBatchesOpen] = React.useState(false);
  const classes = useStyles();
  const { upcomingBatchesData } = props;
  const user = useSelector(({ User }) => User);
  const BatchData = useSelector((state) => {
    return state.Pathways?.upcomingBatches?.data[0];
  });
  const handleClickOpen = () => {
    if (user?.data?.token) {
      setOpen(!open);
    } else {
      history.push(interpolatePath(PATHS.LOGIN));
    }
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

  console.log("upcomingBatchesData", upcomingBatchesData);
  console.log("BatchData", BatchData);

  const batch = upcomingBatchesData ? upcomingBatchesData[0] : BatchData;

  return batch ? (
    <>
      <Container maxWidth="lg">
        <Box mt={1} maxWidth={500} mb={10}>
          <Card elevation={2} pl={10}>
            <CardContent>
              <Typography variant="h5" align="start">
                {upcomingBatchesData[0].title || batch?.title}
              </Typography>
              <Typography
                variant="body1"
                my={2}
                className={classes.FlexedContant}
              >
                <img
                  className={classes.icons}
                  src={require("./assets/calender.svg")}
                  alt="Students Img"
                />
                From {format(batch?.start_time, "dd MMM yy")} -{" "}
                {format(batch?.end_batch_time, "dd MMM yy")}
              </Typography>
              <Typography
                variant="body1"
                mb={2}
                className={classes.FlexedContant}
              >
                <img
                  className={classes.icons}
                  src={require("./assets/degree.svg")}
                  alt="Students Img"
                />
                Access to live classes
              </Typography>
              <Button variant="contained" onClick={handleClickOpen} fullWidth>
                Enroll Batch
              </Button>
              <AlertDialog
                open={open}
                close={close}
                title={batch?.title}
                start_time={batch?.start_time}
                end_time={batch?.end_batch_time}
                id={batch?.id}
                registerAll={true}
                type="batch"
              />
              {console.log("upcomingBatchesData -------", upcomingBatchesData)}
              <Typography
                className={classes.FlexedContant}
                mt={2}
                align="start"
                variant="body2"
              >
                Can’t start on {format(batch?.start_time, "dd MMM yy")}
                {" ? "}
                <section
                  className={classes.link}
                  onClick={handleUpcomingBatchesClickOpen}
                >
                  {"  "} &nbsp;
                  <b>Check out our other batches</b>
                </section>
                <CheckMoreBatches
                  open={upcomingBatchesOpen}
                  handleUpcomingBatchesClickOpen={
                    handleUpcomingBatchesClickOpen
                  }
                  handleUpcomingBatchesClickClose={
                    handleUpcomingBatchesClickClose
                  }
                  upcomingBatchesData={upcomingBatchesData}
                />
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  ) : (
    ""
  );
};
export default PathwayCourseBatchEnroll1;
