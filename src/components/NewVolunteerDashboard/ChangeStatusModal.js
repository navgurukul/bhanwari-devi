import React from "react";
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
import useStyles from "./style";

import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../theme/constant";

const ChangeStatusModal = (props) => {
  const classes = useStyles();
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  const { statusDialog, setStatusDialog, statusName } = props;
  return (
    <Dialog
      open={statusDialog}
      onClose={() => {
        setStatusDialog(false);
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className={isActive ? classes.dialogresponsie : classes.dialogTypo}>
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
              />
              <FormControlLabel
                value="inactive"
                control={<Radio />}
                label="Inactive"
              />
              <FormControlLabel
                value="droopedout"
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
        >
          Confirm Status
        </Button>
      </div>
    </Dialog>
  );
};

export default ChangeStatusModal;
