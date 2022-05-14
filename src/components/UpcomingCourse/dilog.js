import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";

import { breakpoints } from "../../theme/constant";
import useStyles from "./styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { dateTimeFormat } from "../../constant";

export default function AlertDialog(props) {
  // const [openDialog, setOpenDialog] = React.useState(false);

  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const classes = useStyles();

  const { open, close, title, start_time, end_time, id } = props;
  const user = useSelector(({ User }) => User);
  const handelEnrollment = (Id) => {
    axios
      .post(
        `${process.env.REACT_APP_MERAKI_URL}/classes/${Id}/register`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: user.data.token,
            "register-to-all": true,
          },
        }
      )
      .then(() => {
        toast.success("Class Enrolled", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2500,
        });
        close();
      })
      .catch((err) => {
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
          <Typography variant="h6">
            Awesome! You have taken the first step to being a programmer
          </Typography>
          <Typography variant="h6" mt={2}>
            {title}
          </Typography>
          <Typography
            variant="body1"
            mb={1}
            style={{
              display: "flex",
              padding: "10px 0",
            }}
          >
            <img
              className={classes.icons}
              src={require("./assets/calender.svg")}
              alt="Students Img"
            />
            {start_time ? dateTimeFormat(start_time).finalDate : ""} -{" "}
            {end_time ? dateTimeFormat(end_time).finalDate : ""}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ mb: 2, mr: 3 }}>
          <Button onClick={close}>Back</Button>
          <Button
            onClick={() => {
              handelEnrollment(id);
            }}
            variant="contained"
          >
            Confirm Enrollment
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
