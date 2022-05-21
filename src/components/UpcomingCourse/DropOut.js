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

export default function DropOut(props) {
  // const [openDialog, setOpenDialog] = React.useState(false);

  const classes = useStyles();

  const { open, close, title, id } = props;
  const user = useSelector(({ User }) => User);
  const handelDropOut = (Id) => {
    axios
      .delete(`${process.env.REACT_APP_MERAKI_URL}/classes/${Id}/unregister`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: user.data.token,
          "unregister-all": false,
        },
      })
      .then(() => {
        toast.success("Class Dropped", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2500,
        });
        close();
      })
      .catch((err) => {
        toast.error("Failed To Drop Out of Class", {
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
            Are You Sure You want to drop out ?
          </Typography>
          <Typography variant="h6" mt={2}>
            {title}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ mb: 2, mr: 3 }}>
          <Button onClick={close}>Back</Button>
          <Button
            onClick={() => {
              handelDropOut(id);
            }}
            variant="contained"
          >
            Confirm DropOut
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
