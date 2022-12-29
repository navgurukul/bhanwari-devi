import React from "react";
import Snackbar from "@mui/material/Snackbar";
import theme from "../../theme/theme";
import Message from "../../components/common/Message/index";

const CustomSnackbar = ({ openSnackbar, handleSnackbar, pathwayName }) => {
  return (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={6000}
      message={
        <Message
          constantKey="CERTIFICATE_COMPLETION_WARNING"
          args={[pathwayName]}
        />
      }
      onClose={handleSnackbar}
      ContentProps={{
        sx: {
          background: theme.palette.secondary.contrastText,
          fontWeight: "400",
          fontSize: theme.typography.fontSize,
          width: "328px",
          textAlign: "left",
        },
      }}
    />
  );
};

export default CustomSnackbar;
