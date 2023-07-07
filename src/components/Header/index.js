import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Container,
  ThemeProvider,
  SwipeableDrawer,
  useMediaQuery,
} from "@mui/material";
import theme from "../../theme/theme";
import { PATHS } from "../../constant";
import { breakpoints } from "../../theme/constant";
import {
  ADMIN_ROLE_KEY as ADMIN,
  PARTNER_ROLE_KEY as PARTNER,
  STUDENT_ROLE_KEY as STUDENT,
  VOLUNTEER_ROLE_KEY as VOLUNTEER,
} from "./constant";
import { selectRolesData } from "../User/redux/selectors";
import AuthenticatedHeaderOption from "./AuthenticatedHeaderOption";
import SearchPopup from "../SearchBar/SearchPopup";
import { PublicMenuOption } from "./PublicMenuOption";
import { MobileVersion } from "./MobileVersion";

function Header() {
  const [position, setposition] = useState(true);
  const [role, setRole] = useState(null);
  const [leftDrawer, setLeftDrawer] = useState(false);
  const [bgColor, setBgcolor] = useState(false);
  let location = useLocation();
  const { data } = useSelector(({ User }) => User);
  const user = useSelector(({ User }) => User);
  const roles = useSelector(selectRolesData);
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const isAuthenticated = data && data.isAuthenticated;

  window.addEventListener("resize", () => {
    if (window.outerWidth > theme.breakpoints.values.md) {
      setLeftDrawer(false);
    }
  });

  const partnerGroupId = user?.data?.user?.partner_group_id;
  const partnerId = user?.data?.user?.partner_id;

  const rolesLandingPages = {
    [STUDENT]: PATHS.NEW_USER_DASHBOARD,
    [ADMIN]: PATHS.PARTNERS,
    [VOLUNTEER]: PATHS.CLASS,
    [PARTNER]: partnerGroupId
      ? `${PATHS.STATE}/${partnerGroupId}`
      : `${PATHS.PARTNERS}/${partnerId || ""}`,
  };

  useEffect(() => {
    if (location.pathname === "/home" || location.pathname === "/") {
      setBgcolor(true);
    } else {
      setBgcolor(false);
    }
  }, [location]);

  const roleKey = roles
    .map((userRole) => userRole.key)
    .find((key) => key === role);

  const defaultPage = rolesLandingPages[roleKey] || "/";

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setLeftDrawer(open);
  };

  const [elevation, setElevation] = useState(0);
  window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
      setElevation(8);
    } else {
      setElevation(0);
    }
  });

  window.addEventListener("scroll", () => {
    let count = isActive ? 900 : 770;
    if (window.scrollY > count) {
      setposition(false);
    } else {
      setposition(true);
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        elevation={elevation}
        sx={
          bgColor
            ? {
                background: position
                  ? "linear-gradient(90deg, #C1DFC4 0%, #DEECDD 100%);"
                  : "background",
                borderRadius: "0px",
              }
            : { borderRadius: "0px" }
        }
        position="sticky"
        color="background"
      >
        <Container sx={{ my: "7px" }} maxWidth="false">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
              <Box sx={{ mr: 2 }} onClick={toggleDrawer(true)}>
                <img
                  src={require("./asset/menu.svg")}
                  loading="lazy"
                  alt="menu"
                />
              </Box>
              <SwipeableDrawer
                anchor="left"
                open={leftDrawer}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
              >
                <MobileVersion
                  {...{ toggleDrawer, leftDrawer, setRole, role }}
                />
              </SwipeableDrawer>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <Link to={defaultPage}>
                <img
                  src={require("./asset/logo.svg")}
                  loading="lazy"
                  alt="logo"
                />
              </Link>
            </Box>
            <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
              <SearchPopup />
            </Box>
            <Box
              sx={{ pr: 3, flexGrow: 0, display: { xs: "none", md: "flex" } }}
            >
              <Link to={defaultPage}>
                <img
                  src={require("./asset/meraki.svg")}
                  loading="lazy"
                  alt="meraki"
                />
              </Link>
            </Box>
            {isAuthenticated ? (
              <AuthenticatedHeaderOption setRole={setRole} role={role} />
            ) : (
              <>
                <PublicMenuOption />
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
