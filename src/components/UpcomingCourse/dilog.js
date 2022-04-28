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

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);

  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { title, start_time, end_time, id } = props;
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
        handleClose();
      });
  };
  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} fullWidth>
        Enroll Batch
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent sx={{ maxWidth: 370 }}>
          <Typography variant="h6">
            Awesome! You have taken the first step to being a programmer
          </Typography>
          <Typography variant="h6" mt={2}>
            {title}
          </Typography>
          <Typography variant="body1" mt={1}>
            <img
              className={classes.icons}
              src={require("./assets/calender.svg")}
              alt="Students Img"
            />
            {start_time?.split("T")[0]} - {end_time?.split("T")[0]}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ mb: 2, mr: 3 }}>
          <Button onClick={handleClose}>Back</Button>
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
