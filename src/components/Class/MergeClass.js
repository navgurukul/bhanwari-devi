import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useStyles from "./styles";
import {
  MenuItem,
  Typography,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import axios from "axios";
import { METHODS } from "../../services/api";
import { useSelector } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";

function AlertDialog({ itemID, showClass, PathwayID, pathwayFilter }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [Mergeclassid, setMarginId] = useState();
  const user = useSelector(({ User }) => User);
  const { UId, setUId } = useState();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    axios({
      method: METHODS.POST,
      url: `${process.env.REACT_APP_MERAKI_URL}/classes/${Mergeclassid}/mergeClass`,
      params: {
        classId: itemID,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: user.data.token,
      },
    }).then(() => {
      window.location.reload();
    });
  };

  return (
    <div>
      <MenuItem
        onClick={handleClickOpen}
        sx={{ width: 138, margin: "0px 10px" }}
      >
        <Typography textAlign="center">Merge Class</Typography>
      </MenuItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.dialogBox}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography variant="h6"> Merge Class</Typography>
          <CloseIcon onClick={handleClose} style={{ cursor: "pointer" }} />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography variant="subtitle2">
              Please choose a batch to add students of this class to that
              batch’s same class
            </Typography>
            <FormControl
              fullWidth
              sx={{ margin: "32px 0px", borderRadius: "8px" }}
            >
              <InputLabel id="demo-simple-select-label">
                Merge to Batch
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Merge to Batch"
                onClick={() => {}}
                onChange={(e) => {
                  setMarginId(e.target.value);
                }}
              >
                {pathwayFilter?.map((item) => {
                  return (
                    item.id !== itemID && (
                      <MenuItem key={item.id} value={item.id}>
                        {item.title}
                      </MenuItem>
                    )
                  );
                })}
              </Select>
            </FormControl>
            <Typography variant="body2">
              The tutor and students will receive the updated class invitations
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              // setUId(itemID);
              handleSubmit(itemID);
              handleClose();
            }}
          >
            Confirm Class Merger
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default AlertDialog;
