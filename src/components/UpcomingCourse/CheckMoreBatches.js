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
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
export default function CheckMoreBatches(props) {
  const [open, setOpen] = React.useState(false);

  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { upcomingBatchesData } = props;
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
    <>
      <Link className={classes.link}>
        <Typography color="success" onClick={handleClickOpen}>
          {" "}
          Check out our other batches
        </Typography>
      </Link>

      <Dialog open={open} onClose={handleClose}>
        <div className={classes.MoreBatchWrap}>
          <Typography onClick={handleClickOpen} variant="h5" align="start">
            More Batches
          </Typography>
          {upcomingBatchesData?.slice(1).map((item) => (
            <Card
              style={{
                margin: "7px 5px 7px 5px",
                padding: "10px",
              }}
            >
              {" "}
              <Typography variant="h6" mt={2}>
                {item.title}
              </Typography>
              <Typography
                variant="body1"
                mt={1}
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
                {item.start_time?.split("T")[0]} -{" "}
                {item.end_time?.split("T")[0]}
              </Typography>
              <Button
                fullWidth
                onClick={() => {
                  handelEnrollment(item.id);
                }}
                variant="contained"
              >
                Enroll Batch
              </Button>
            </Card>
          ))}
        </div>
      </Dialog>
    </>
  );
}
