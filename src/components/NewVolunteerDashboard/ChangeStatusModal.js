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
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const ChangeStatusModal = (props) => {
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "32px",
          gap: "32px",
          width: "420px",
          height: "405px",
          borderRadius: "8px",
        }}
      >
        <DialogTitle id="id">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              width: "356px",
            }}
          >
            <Box
              flexGrow={1}
              sx={{
                fontWeight: "600",
                fontSize: "24px",
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginLeft: "22px",
          }}
        >
          <AccountCircleIcon
            sx={{
              height: "48px",
              width: "48px",
            }}
          />
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
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: "8px 16px",
            gap: "10px",
            margin: "auto",
            width: "356px",
            height: "48px",
          }}
        >
          Confirm Status
        </Button>
      </div>
    </Dialog>
  );
};

export default ChangeStatusModal;
