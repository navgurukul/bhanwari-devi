import React from "react";
import { Typography } from "@mui/material";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";

export default function ContentListText(props) {
  const { setOpenDrawer, desktop } = props;
  return (
    <div
      onClick={() => setOpenDrawer(true)}
      style={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        position: desktop ? "absolute" : "static",
        left: "24px",
      }}
    >
      <AssignmentOutlinedIcon
        style={{ color: "#6D6D6D", width: "20px", height: "28px" }}
      />
      <Typography
        style={{ color: "#6D6D6D", fontSize: "12px", marginLeft: "8px" }}
        type="overline"
      >
        CONTENT LIST
      </Typography>
    </div>
  );
}
