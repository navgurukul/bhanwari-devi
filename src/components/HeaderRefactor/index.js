import React, { useEffect, useState } from 'react';
import theme from "../../theme/theme";
import ResponsiveBox from '../common/ResponsiveBox';
import TopHeader from './TopHeader';
import TopMobileHeader from './TopMobileHeader';
import MobileSidebarHeader from './MobileSidebarHeader';
import { useLocation } from "react-router-dom";
import { breakpoints } from "../../theme/constant";
import {
  AppBar,
  // Box,
  Toolbar,
  Container,
  // Button,
  // MenuItem,
  ThemeProvider,
  // SwipeableDrawer,
  // Typography,
  useMediaQuery,
} from '@mui/material';

export default function Header() {
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [elevation, setElevation] = useState(0);
  const [bgColor, setBgcolor] = useState(false);
  const [position, setPosition] = useState(true);
  const location = useLocation();
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  useEffect(() => {
    const handleResize = () => {
      if (window.outerWidth > theme.breakpoints.values.md) {
        setToggleDrawer(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const count = isActive ? 900 : 770;
      // console.log("IS ACTIVE", isActive, breakpoints.values.sm, window.innerWidth);
      setPosition(window.scrollY <= count);
      setElevation(window.scrollY > 0 ? 8 : 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isActive]);

  useEffect(() => {
    setBgcolor(location.pathname === "/home" || location.pathname === "/");
  }, [location]);

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        elevation={elevation}
        sx={{
          background: position && bgColor
            ? "linear-gradient(90deg, #C1DFC4 0%, #DEECDD 100%);"
            : "white",
          borderRadius: "0px",
        }}
        position="sticky"
        //color="background"
      >
        <Container sx={{ my: "7px" }} maxWidth="false">
          <Toolbar disableGutters>
            <ResponsiveBox xs={<TopMobileHeader setToggleDrawer={setToggleDrawer} />} md={<TopHeader />} />
            <MobileSidebarHeader setIsOpen={setToggleDrawer} isOpen={toggleDrawer} />
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}