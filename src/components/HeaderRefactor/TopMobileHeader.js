import React from 'react';
import MerakiLogoLink from "./MerakiLogoLink";
import { Box } from "@mui/material";

export default function TopMobileHeader({ setToggleDrawer }) {
  return (
    <>
      <Box sx={{ mr: 2 }} onClick={() => setToggleDrawer(true)}>
        <img
          src={require("./assets/menu.svg")}
          loading="lazy"
          alt="menu"
        />
      </Box>
      <MerakiLogoLink />
    </>
  );
}