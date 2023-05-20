import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function MergeClass({ open, onClose, item }) {
  const handleClose = () => {
    onClose(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography variant="h6">Merge Class</Typography>
          <CloseIcon onClick={handleClose} />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography variant="body1">
              Please choose a batch to add students of this class to that
              batch’s same class
            </Typography>

            <Typography variant="body2">
              Please choose a batch to add students of this class to that
              batch’s same class
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained">Confirm Class Merger</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default MergeClass;
