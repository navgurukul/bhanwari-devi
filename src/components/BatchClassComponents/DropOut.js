import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { CircularProgress, Box, Typography } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function DropOut(props) {
  const { open, close, title, id, unregister_all, setIsEnrolled } = props;
  const [loading, setLoading] = React.useState(false);
  const user = useSelector(({ User }) => User);

  const handelDropOut = (Id) => {
    setLoading(true);
    axios
      .delete(
        `${
          process.env.REACT_APP_MERAKI_URL
        }/classes/${Id}/unregister?unregister-all=${unregister_all || false}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: user.data.token,
          },
        }
      )
      .then(() => {
        toast.success("Class Dropped", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2500,
        });
        setLoading(false);
        close();
        if (setIsEnrolled) {
          setIsEnrolled(false);
        }
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
    <Box>
      <Dialog open={open} onClose={close}>
        <DialogContent sx={{ maxWidth: 370 }}>
          <Typography variant="h6">
            Confirm dropping out of the batch
          </Typography>
          <Typography variant="body1" mt={2}>
            If you have missed some classes, you can take revision classes
            without dropping off
          </Typography>
        </DialogContent>
        <DialogActions sx={{ mb: 2, mr: 3 }}>
          <Button
            onClick={() => {
              handelDropOut(id);
            }}
            color="error"
          >
            {loading ? <CircularProgress color="secondary" /> : "Drop Out"}
          </Button>
          <Button onClick={close} color="dark">
            Stay Enrolled
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
