import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Typography, Grid, Button } from "@mui/material";
import { actions } from "../redux/action";
import { getWaitingForServerUserUpdate } from "../redux/selectors";

function UserUpdate() {
  const dispatch = useDispatch();
  const waitingForUpdate = useSelector(getWaitingForServerUserUpdate);

  return (
    <Grid textAlign="center" padding="10px">
      <Typography variant="h4" color="textPrimary" gutterBottom>
        Request Profile Change
      </Typography>
      <Button
        type="submit"
        variant="contained"
        onClick={() => {
          dispatch(actions.pollForServerUserUpdate());
          Notification.requestPermission().then((result) => {
            if (result === "granted") {
              toast.success(
                "You will get a system notification when your request is approved so long as this app is open.",
                { autoClose: false }
              );
            } else {
              toast.warn(
                "You have denied notifications from this app so you will need to check this tab to see when your request is approved.",
                {
                  autoClose: false
                }
              );
            }
          });
        }}
        disabled={waitingForUpdate}
      >
        {waitingForUpdate ? "Awaiting Approval" : "Request Profile Change"}
      </Button>
    </Grid>
  );
}

export default UserUpdate;
