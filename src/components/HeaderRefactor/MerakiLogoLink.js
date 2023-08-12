import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

export default function MerakiLogoLink({ includeText, defaultPage="/" }) {
  const textStyles = includeText ? {pr: 3, flexGrow: 0} : {flexGrow: 1};
  return (
    <Box sx={{ ...textStyles, display: "flex" }}>
      <Link to={defaultPage}>
        <img
          src={require(`./assets/${includeText ? "meraki.svg" : "logo.svg"}`)}
          loading="lazy"
          alt="meraki"
        />
      </Link>
    </Box>
  );
}