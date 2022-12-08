import React from "react";
import { Typography } from "@mui/material";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import useStyles from "./styles";

export default function ContentListText(props) {
  const { setOpenDrawer } = props;
  const textStyle = { color: "#6D6D6D", fontSize: "12px", marginLeft: "8px" };
  const classes = useStyles();

  return (
    <div onClick={() => setOpenDrawer(true)} className={classes.ContentListDiv}>
      <AssignmentOutlinedIcon className={classes.ContentListIcon} />
      <Typography style={textStyle} type="overline">
        CONTENT LIST
      </Typography>
    </div>
  );
}
