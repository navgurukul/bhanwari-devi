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
  const {
    statusDialog,
    setStatusDialog,
    statusName,
    userId,
    statusValue,
    setStatusValue,
  } = props;

  const updateUser = () => {
    return axios({
      url: `${process.env.REACT_APP_MERAKI_URL}/volunteers`,
      method: METHODS.PUT,
      headers: {
        "Content-Type": "application/json",
        Authorization: user.data.token,
      },
      data: {
        status: status,
        user_id: userId,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          snackbarMsg({
            vertical: "bottom",
            horizontal: "right",
          });
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {}, []);

  const user = useSelector(({ User }) => User);
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;

  const snackbarMsg = (newState) => {
    setState({ open: true, ...newState });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({ ...state, open: false });
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
                defaultValue={statusValue}
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
                  value="dropout"
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
              setStatusValue(status);
            }}
          >
            Confirm Status
          </Button>
        </div>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
        action={action}
        key={vertical + horizontal}
      >
        <Alert variant="filled" severity="success">
          Successfully changed the status
        </Alert>
      </Snackbar>
    </>
  );
};

export default ChangeStatusModal;
