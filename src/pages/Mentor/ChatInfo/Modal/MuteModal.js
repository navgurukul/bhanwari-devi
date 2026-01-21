import React from "react";
import { Box } from "@mui/system";
import { Typography, Modal, Button, useMediaQuery } from "@mui/material";
import useStyles from "../styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

export default function MuteModal({ isModalOpen, closeModal, setIsMuted }) {
  const classes = useStyles();
  const mobile = useMediaQuery("(max-width: 768px)");
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "32px",
    borderRadius: "8px",
    width: mobile ? "200px" : "420px",
    bgcolor: "#FFF",
    boxShadow: 24,
    border: "none",
    p: 4,
  };
  const onCancel = () => {
    closeModal();
    setIsMuted(false);
  };
  const onMute = () => {
    closeModal();
    setIsMuted(true);
  };

  return (
    <>
      <Modal
        open={isModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            className={classes.modalTitle}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Mute Notifications
          </Typography>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="1day"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="1day"
                control={<Radio />}
                label="1 Day"
              />
              <FormControlLabel
                value="1week"
                control={<Radio />}
                label="1 Week"
              />
              <FormControlLabel
                value="always"
                control={<Radio />}
                label="Always"
              />
            </RadioGroup>
          </FormControl>
          <Box className={classes.buttonContainer}>
            <Button
              onClick={onCancel}
              className={classes.cancelButton}
              variant="text"
            >
              Cancel
            </Button>
            <Button
              onClick={onMute}
              className={classes.muteButton}
              variant="text"
            >
              Mute
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}