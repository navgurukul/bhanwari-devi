import React, { useState, useEffect, useRef } from "react";
import { Link, useRouteMatch, NavLink } from "react-router-dom";
import { Box, Button, MenuItem, Typography } from "@mui/material";
import LaunchOutlinedIcon from "@mui/icons-material/Launch";
import { PATHS } from "../../constant";
import useStyles from "./styles";
import { DropDown } from "./DropDown";
import { MobileDropDown } from "./MobileDropDown";
import { PUBLIC_MENU_KEYS, MENU_ITEMS } from "./constant";
import ExternalLink from "../common/ExternalLink";
import TextButtonDropDownMenu from "./TextButtonDropDownMenu";
import SearchPopup from "../SearchBar/SearchPopup";

export const PublicMenuOption = ({ leftDrawer, toggleDrawer }) => {
  const [indicator, setIndicator] = useState(null);
  const [inDropdown, setInDropdown] = useState({
    inProgress: false,
    value: false,
  });
  const inDropdownRef = useRef(inDropdown);
  inDropdownRef.current = inDropdown;
  const classes = useStyles();

  const showLoginButton = !useRouteMatch({
    path: PATHS.LOGIN,
  });

  const menuCloseHandler = () => {
    setIndicator(null);
  };

  useEffect(() => {
    if (!inDropdown.inProgress && !inDropdown.value) {
      // mouse has moved out of main menu item and its dropdown after delay milliseconds
      menuCloseHandler();
    }
  }, [inDropdown]);

  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {PUBLIC_MENU_KEYS.map((menuKey, index) => (
          <>
            <TextButtonDropDownMenu
              btnTextMsgKey={MENU_ITEMS[menuKey]?.msgKey}
              menuContainerProps={{
                id: "menu-appbar",
              }}
              sx={{ color: "black", zIndex: 2000 }}
              key={index}
            >
              <DropDown dropDown={menuKey} toggleDrawer={toggleDrawer} />
            </TextButtonDropDownMenu>
          </>
        ))}
        <ExternalLink
          href="https://www.navgurukul.org/donate"
          className={classes.link}
          onClick={toggleDrawer && toggleDrawer(false)}
        >
          <MenuItem
            sx={{
              padding: 0,
              borderRadius: "8px",
            }}
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
              Donate
              <LaunchOutlinedIcon sx={{ pl: "5px" }} />
            </Typography>
          </MenuItem>
        </ExternalLink>
      </Box>
      <Box sx={{ flexGrow: 1, display: { xs: leftDrawer ? "block" : "none" } }}>
        {PUBLIC_MENU_KEYS.map((menuKey) => (
          <MobileDropDown
            menuKey={menuKey}
            handleClose={menuCloseHandler}
            toggleDrawer={toggleDrawer}
          />
        ))}
        <MenuItem
          sx={{
            padding: 0,
            borderRadius: "8px",
          }}
        >
          <NavLink to={PATHS.GSOC_IDEA} className={classes.link}>
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
              Gsoc Ideas 2023
            </Typography>
          </NavLink>
        </MenuItem>
      </Box>

      {!leftDrawer && (
        <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
          <SearchPopup />
        </Box>
      )}

      {showLoginButton && !leftDrawer && (
        <Box sx={{ flexGrow: 0 }}>
          <Link to={PATHS.LOGIN} className={classes.button}>
            <Button variant="contained">Log in</Button>
          </Link>
        </Box>
      )}
    </>
  );
};
