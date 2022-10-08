import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { CircularProgress, Typography } from "@mui/material";
import useStyles from "./styles";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { format } from "../../common/date";
import { useParams } from "react-router-dom";
import { actions as enrolledBatchesActions } from "../PathwayCourse/redux/action";
import { actions as upcomingClassActions } from "../PathwayCourse/redux/action";

export default function AlertDialog(props) {
  const classes = useStyles();
  const {
    open,
    close,
    title,
    start_time,
    end_time,
    id,
    registerAll,
    exerciseReload,
    setIsEnrolled,
    type,
    reloadContent,
  } = props;
  // console.log("props", props);
  const user = useSelector(({ User }) => User);
  const params = useParams();
  const pathwayId = params.pathwayId;
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const handelEnrollment = (Id) => {
    setLoading(true);
    axios
      .post(
        `${
          process.env.REACT_APP_MERAKI_URL
        }/classes/${Id}/register?register-all=${registerAll || false}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: user.data.token,
          },
        }
      )
      .then(() => {
        toast.success("Class Enrolled", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2500,
        });
        setLoading(false);

        close();
        if (registerAll) {
          dispatch(
            enrolledBatchesActions.getEnrolledBatches({
              pathwayId: pathwayId,
              authToken: user?.data?.token,
            })
          );
          dispatch(
            upcomingClassActions.getupcomingEnrolledClasses({
              pathwayId: pathwayId,
              authToken: user?.data?.token,
            })
          );
        } else if (setIsEnrolled) {
          setIsEnrolled(true);
        }
        reloadContent && reloadContent();
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Failed To Enroll To Class", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2500,
        });
        close();
      });
  };
  const dialougContentMap = {
    batch: [
      "Awesome! You have taken the first step to being a programmer",
      "Batch: " + title,
    ],
    DoubtClass: ["Doubt Class", "Class : " + title],
    RevisionClass: ["Revision Class", "From: " + title],
  };
  return (
    <div>
      <Dialog open={open} onClose={close}>
        <DialogContent sx={{ maxWidth: 370 }}>
          <>
            <Typography variant="h6" mb={2}>
              {dialougContentMap[type][0]}
            </Typography>
            <Typography variant="h6" my={2}>
              {dialougContentMap[type][1]}
            </Typography>
          </>
          <Typography variant="body1" mb={2} className={classes.FlexedContant}>
            <img
              className={classes.icons}
              src={require("./assets/calender.svg")}
              alt="Students Img"
            />
            {start_time ? format(start_time, "dd MMM yy") : ""} , {"  "}
            {start_time ? format(start_time, "hh:mm aaa") : ""}-{" "}
            {end_time ? format(end_time, "hh:mm aaa") : ""}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ mb: 2, mr: 3 }}>
          <Button onClick={close} color="dark">
            Back
          </Button>
          <Button
            disabled={loading}
            onClick={() => {
              handelEnrollment(id);
            }}
            variant="contained"
          >
            {loading ? (
              <CircularProgress color="secondary" />
            ) : (
              " Confirm Enrollment"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
