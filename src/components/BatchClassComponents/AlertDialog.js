import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { CircularProgress, Typography } from "@mui/material";

import { breakpoints } from "../../theme/constant";
import useStyles from "./styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// import { dateTimeFormat } from "../../constant";
import { dateTimeFormat } from "../../common/date";
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
  } = props;
  console.log("props", props);
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
  return (
    <div>
      <Dialog open={open} onClose={close}>
        <DialogContent sx={{ maxWidth: 370 }}>
          {type == "batch" ? (
            <>
              <Typography variant="h6" sx={{ fontFamily: "Lusitana" }}>
                Awesome! You have taken the first step to being a programmer
              </Typography>
              <Typography variant="h6" mt={2} sx={{ fontFamily: "Lusitana" }}>
                Batch:{title}
              </Typography>
            </>
          ) : type == "DoubtClass" ? (
            <>
              <Typography variant="h6" sx={{ fontFamily: "Lusitana" }}>
                Doubt Class
              </Typography>
              <Typography variant="h6" mt={2} sx={{ fontFamily: "Lusitana" }}>
                Class : {title}
              </Typography>
            </>
          ) : type == "RevisionClass" ? (
            <>
              <Typography variant="h6" sx={{ fontFamily: "Lusitana" }}>
                Revision Class
              </Typography>
              <Typography variant="h6" mt={2} sx={{ fontFamily: "Lusitana" }}>
                From:{title}
              </Typography>
            </>
          ) : (
            ""
          )}

          <Typography
            variant="body1"
            mb={1}
            style={{
              display: "flex",
              padding: "15px 0",
            }}
          >
            <img
              className={classes.icons}
              src={require("./assets/calender.svg")}
              alt="Students Img"
            />
            {start_time ? dateTimeFormat(start_time).finalDate : ""} , {"  "}
            {start_time ? dateTimeFormat(start_time).finalTime : ""}-{" "}
            {end_time ? dateTimeFormat(end_time).finalTime : ""}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ mb: 2, mr: 3 }}>
          <Button onClick={close} sx={{ color: "black" }}>
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
