import React from "react";
import useStyles from "./styles";

import { Typography, MenuItem } from "@mui/material";
import { NavLink } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
function HeaderNavLink({ to, text, toggleDrawer, externalLink }) {
  const classes = useStyles();

  function handleLinkClick(event) {
    if (externalLink) {
      event.preventDefault();
      window.open(to, externalLink ? "_blank" : "_self");
    }
  }

  return (
    <MenuItem
      onClick={toggleDrawer && toggleDrawer(false)}
      sx={{
        padding: 0,
        borderRadius: "8px",
      }}
    >
      <NavLink
        to={to}
        onClick={handleLinkClick}
        className={classes.link}
        activeClassName={classes.active}
        style={{ width: "100%" }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            height: "36px",
            padding: "6px 16px",
            display: "flex",
            alignItems: "center",
            "&:hover": {
              backgroundColor: "#E9F5E9",
              borderRadius: "8px",
            },
          }}
        >
          {text}
          {externalLink && (
            <OpenInNewIcon style={{ color: "Black", paddingLeft: "9px" }} />
          )}
        </Typography>
      </NavLink>
    </MenuItem>
  );
}
export default HeaderNavLink;
