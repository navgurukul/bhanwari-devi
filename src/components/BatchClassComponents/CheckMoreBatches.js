import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { TextField, Typography } from "@mui/material";
import { breakpoints } from "../../theme/constant";
import useStyles from "./styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSelector } from "react-redux";
import AlertDialog from "./AlertDialog";
import { Box } from "@mui/system";
import { format } from "../../common/date";
export default function CheckMoreBatches(props) {
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const classes = useStyles();
  const {
    open,
    handleUpcomingBatchesClickOpen,
    handleUpcomingBatchesClickClose,
  } = props;

  const { upcomingBatchesData } = props;
  const user = useSelector(({ User }) => User);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [AlertData, setAlertData] = React.useState({});
  const handelEnrollment = () => {
    setOpenDialog(true);
  };

  const close = () => {
    setOpenDialog(false);
  };
  return (
    <>
      <Dialog open={open} onClose={handleUpcomingBatchesClickClose}>
        {upcomingBatchesData?.length > 1 ? (
          <Box
            className={classes.MoreBatchWrap}
            width={isActive ? "290px" : "448px"}
          >
            <Typography variant="h5" align="start">
              More Batches
            </Typography>
            {upcomingBatchesData?.slice(1, 3).map((item) => (
              <Box className={classes.MoreBatchCard}>
                {" "}
                <Typography variant="h6" mt={2}>
                  {item.title}
                </Typography>
                <Typography
                  variant="body1"
                  mt={2}
                  className={classes.FlexedContant}
                >
                  <img
                    className={classes.icons}
                    src={require("./assets/calender.svg")}
                    alt="Students Img"
                  />
                  {format(item.start_time, "dd MMM yy")} -{" "}
                  {format(item.end_batch_time, "dd MMM yy")}
                </Typography>
                <Button
                  fullWidth
                  onClick={() => {
                    handelEnrollment(item.id);
                    setAlertData({
                      title: item.title,
                      start_time: item.start_time,
                      end_time: item.end_batch_time,
                      id: item.id,
                    });
                  }}
                  variant="contained"
                >
                  Enroll Batch
                </Button>
              </Box>
            ))}
            <AlertDialog
              open={openDialog}
              close={close}
              title={AlertData?.title}
              start_time={AlertData?.start_time}
              end_time={AlertData?.end_batch_time}
              id={AlertData?.id}
              registerAll={true}
              type="batch"
            />
          </Box>
        ) : (
          <Box
            className={classes.MoreBatchWrap}
            width={isActive ? "290px" : "448px"}
          >
            <img
              src={require("./assets/NoBatchesjpg.jpg")}
              alt="empty"
              style={{ width: "100%", height: "30%" }}
            />
            <Typography variant="body1" align="center">
              It’s a void out here. Unfortunately, we only have one batch
              running at the moment.
            </Typography>
          </Box>
        )}
      </Dialog>
    </>
  );
}
