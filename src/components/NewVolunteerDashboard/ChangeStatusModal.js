import React from "react";
import axios from "axios";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useSelector } from "react-redux";
import useStyles from "./style";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../theme/constant";
import { METHODS } from "../../services/api";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const ChangeStatusModal = (props) => {
  const classes = useStyles();
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const [status, setStatus] = useState("");

  const { statusDialog, setStatusDialog, statusName, userId } = props;
  console.log(userId);
  console.log(status, "456789fghj");
  // console.log(userId, "sdfghjhgfdghj")
  // console.log(,"gfugujkfdjhfdlhj")

  console.log(typeof parseInt(userId));

  // const updateUser = () => {
  //   return axios({
  //     url: `${process.env.REACT_APP_MERAKI_URL}volunteer/${userId}`,
  //     method: METHODS.PUT,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: user.data.token,
  //     },
  //     data: {
  //       status: status,
  //     },

  //   })
  // }

  const updateUser = () => {
    return axios({
      url: `${process.env.REACT_APP_MERAKI_URL}volunteers/${userId}`,
      method: METHODS.PUT,
      headers: {
        "Content-Type": "application/json",
        Authorization: user.data.token,
      },
      data: {
        status: status,
      },
    })
      .then((res) => {
        console.log(res, "data");
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };
  console.log(status);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    {
      window.location.reload();
    }
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const user = useSelector(({ User }) => User);

  // useEffect(() => {
  // updateUser()

  //     // const requestOptions = {
  //     //     method: 'PUT',
  //     //     headers: { 'Content-Type': 'application/json' },
  //     //     body: JSON.stringify({ status : status})
  //     // };
  //     // fetch(`${process.env.REACT_APP_MERAKI_URL}volunteers/${userID}`, requestOptions)
  //     //     .then(response => response.json())
  //     //     .then(data => setuserID(data.id));

  // // emptydependency array means this effect will only run once (like componentDidMount in classes)
  // }, []);

  return (
    <>
      <Dialog
        open={statusDialog}
        onClose={() => {
          setStatusDialog(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={isActive && classes.dialog}
      >
        <div
          className={isActive ? classes.dialogresponsie : classes.dialogTypo}
        >
          <DialogTitle id="id">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                width: isActive ? "260px" : "356px",
              }}
            >
              <Box
                flexGrow={1}
                sx={{
                  fontWeight: "600",
                  fontSize: isActive ? "18px" : "24px",
                }}
              >
                Change Status
              </Box>
              <Box>
                <IconButton
                  onClick={() => {
                    setStatusDialog(false);
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>
          </DialogTitle>
          <div className={classes.dialogStatus}>
            {!statusName.includes("Total", 0) && (
              <AccountCircleIcon
                sx={{
                  height: "48px",
                  width: "48px",
                }}
              />
            )}
            <span
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginLeft: "8px",
              }}
            >
              {statusName}
            </span>
          </div>
          <div
            style={{
              fontSize: "18px",
              fontWeight: "400",
              marginLeft: "30px",
            }}
          >
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="active"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="active"
                  control={<Radio />}
                  label="Active"
                  onClick={(e) => {
                    setStatus(e.target.value);
                  }}
                />
                <FormControlLabel
                  value="inactive"
                  onClick={(e) => {
                    setStatus(e.target.value);
                  }}
                  control={<Radio />}
                  label="Inactive"
                />
                <FormControlLabel
                  value="droopedout"
                  onClick={(e) => {
                    setStatus(e.target.value);
                  }}
                  control={<Radio />}
                  label="Dropped Out"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <Button
            variant="contained"
            color="primary"
            className={!isActive ? classes.dialogBtn : classes.dialogresBtn}
            onClick={() => {
              setStatusDialog(false);
              updateUser();
              handleClick();
            }}
          >
            Confirm Status
          </Button>
        </div>
      </Dialog>
      <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
        action={action}
      >
        <Alert variant="filled" severity="success">
          Successfully changed the status
        </Alert>
      </Snackbar>
    </>
  );
};

export default ChangeStatusModal;
