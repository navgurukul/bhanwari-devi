import React from "react";
import { Typography } from "@mui/material";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import useStyles from "./styles";

export default function ContentListText(props) {
  const { setOpenDrawer, desktop } = props;
  const textStyle = { color: "#6D6D6D", fontSize: "12px", marginLeft: "8px" };
  const iconStyle = { position: desktop ? "absolute" : "static" };
  const classes = useStyles();

  return (
    <div
      onClick={() => setOpenDrawer(true)}
      style={iconStyle}
      className={classes.ContentListDiv}
    >
      <AssignmentOutlinedIcon className={classes.ContentListIcon} />
      <Typography style={textStyle} type="overline">
        CONTENT LIST
      </Typography>
    </div>
  );
}
