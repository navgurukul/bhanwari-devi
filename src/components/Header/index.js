import React, { useEffect, useState } from "react";
import theme from "../../theme/theme";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PATHS } from "../../constant";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CloseIcon from "@mui/icons-material/Close";
import useStyles from "./styles";
import List from "@mui/material/List";
import { DropDown, MobileDropDown } from "./DropDown";
import { useRouteMatch } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import { Redirect } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import {
  AppBar,
  Box,
  Toolbar,
  Container,
  Button,
  MenuItem,
  ThemeProvider,
  SwipeableDrawer,
  Typography,
  // Search,
} from "@mui/material";
import AuthenticatedHeaderOption from "./AuthenticatedHeaderOption";
import SearchBar from "../SearchBar";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Message from "../common/Message";
import { PUBLIC_MENU_KEYS, MENU_ITEMS } from "./constant";
// import { useContext } from "react";
// import { useLanguageConstants, getTranslationKey } from "../../common/language";
// import { LanguageProvider } from "../../common/context";

const PublicMenuOption = ({ leftDrawer, toggleDrawer, handleSearchChange }) => {
  const [indicator, setIndicator] = useState(null);
  const [dropDownMenu, setDropDownMenu] = useState(null);
  const [selectedMenu, SetSelectedMenu] = useState(null);
  const classes = useStyles();
  // const { language, MSG } = useLanguageConstants(); //useContext(LanguageProvider);

  const menuOpenHandler = (event, menuKey) => {
    setIndicator(event.currentTarget);
    setDropDownMenu(menuKey);
    SetSelectedMenu(menuKey);
  };

  const showLoginButton = !useRouteMatch({
    path: PATHS.LOGIN,
  });

  const menuCloseHandler = () => {
    setIndicator(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {PUBLIC_MENU_KEYS.map((menuKey, index) => (
          <>
            <MenuItem
              onClick={(e) => {
                menuOpenHandler(e, menuKey);
              }}
              sx={{ color: "black" }}
              key={index}
            >
              <Typography variant="subtitle1">
                {/*MSG[getTranslationKey(menu)]*/}
                <Message constantKey={MENU_ITEMS[menuKey].msgKey} />
              </Typography>
              {selectedMenu === menuKey && indicator ? (
                <ExpandLessIcon />
              ) : (
                <ExpandMoreIcon />
              )}
            </MenuItem>
            <DropDown
              dropDown={dropDownMenu}
              indicator={indicator}
              handleClose={menuCloseHandler}
              toggleDrawer={toggleDrawer}
            />
          </>
        ))}
      </Box>
      <Box sx={{ flexGrow: 1, display: { xs: leftDrawer ? "block" : "none" } }}>
        {PUBLIC_MENU_KEYS.map((menuKey) => (
          <MobileDropDown
            menuKey={menuKey}
            handleClose={menuCloseHandler}
            toggleDrawer={toggleDrawer}
          />
        ))}
      </Box>

      {/* <SearchBar handleSearchChange={handleSearchChange} /> */}
      {!leftDrawer && (
        <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
          <Link to={PATHS.SEARCHED_COURSE}>
            <Tooltip title="Search the course...">
              <Button color="dark">
                <SearchIcon />
              </Button>
            </Tooltip>
          </Link>
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

const MobileVersion = ({ toggleDrawer, leftDrawer }) => {
  const { data } = useSelector(({ User }) => User);
  const isAuthenticated = data && data.isAuthenticated;
  const classes = useStyles();

  return (
    <Box
      className={classes.mobileBox}
      role="presentation"
      onClose={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      bgcolor="primary.light"
    >
      <Box
        className={classes.box}
        onClick={toggleDrawer(false)}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <Toolbar disableGutters>
          <Box className={classes.RightBox}>
            <Link to="/">
              <img src={require("./asset/logo.svg")} loading="lazy" />
            </Link>
          </Box>
          <Box className={classes.crossIcon}>
            <CloseIcon />
          </Box>
        </Toolbar>
      </Box>
      <List>
        {isAuthenticated ? (
          <AuthenticatedHeaderOption
            toggleDrawer={toggleDrawer}
            leftDrawer={leftDrawer}
          />
        ) : (
          <PublicMenuOption
            toggleDrawer={toggleDrawer}
            leftDrawer={leftDrawer}
          />
        )}
      </List>
    </Box>
  );
};

function Header() {
  const query = new URLSearchParams(useLocation().search).get("search");
  // query ? query : ""
  const [search, setSearch] = useState(query ? query : "");
  const history = useHistory();
  const classes = useStyles();
  const [value, setValue] = useState();
  const [flag, setFlag] = useState(false);
  const { data } = useSelector(({ User }) => User);
  const isAuthenticated = data && data.isAuthenticated;
  const [leftDrawer, setLeftDrawer] = useState(false);
  window.addEventListener("resize", () => {
    if (window.outerWidth > theme.breakpoints.values.md) {
      setLeftDrawer(false);
    }
  });
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
      setElevation(6);
    } else {
      setElevation(0);
    }
  });

  const handleSearchChange = (e) => {
    console.log("e", e.target.value);
    // history.push(`?search=${e.target.value}`);
    // e.preventDefault();
    // setSearch(e.target.value);
    setValue(e.target.value);
    setFlag(true);
    // if (e.target.value) {
    //   console.log("komal", e.target.value);
    //   return (
    //     // <Redirect
    //     //   to={{
    //     //     pathname: PATHS.SEARCHED_COURSE,
    //     //     state: e.target.value,
    //     //   }}
    //     // />
    //     <Link
    //       to={{
    //         pathname: `/search-course`,
    //         state: {
    //           pass: e.target.value,
    //         },
    //       }}
    //     />
    //   );
    // }
  };

  // useEffect(() => {
  //   if (flag) {
  //     console.log("komal", value);
  //     return (
  //       <Redirect
  //         to={{
  //           pathname: PATHS.SEARCHED_COURSE,
  //           state: value,
  //         }}
  //       />
  //       // <Link
  //       //   to={{
  //       //     pathname: `/search-course`,
  //       //     state: {
  //       //       pass: value,
  //       //     },
  //       //   }}
  //       // />
  //     );
  //   }
  // }, [flag]);

  // const coursePage = () => {
  //   setFlag(true);
  // };

  // if (flag) {
  //   console.log("komal", value);
  //   return (
  //     <Redirect
  //       to={{
  //         pathname: PATHS.SEARCHED_COURSE,
  //         state: value,
  //       }}
  //     />
  //     // <Link
  //     //   to={{
  //     //     pathname: `/search-course`,
  //     //     state: {
  //     //       pass: value,
  //     //     },
  //     //   }}
  //     // />
  //   );
  // }

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="sticky" color="background" elevation={elevation}>
        <Container maxWidth="false" sx={{ my: "7px" }}>
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
              <Box sx={{ mr: 2 }} onClick={toggleDrawer(true)}>
                <img src={require("./asset/menu.svg")} loading="lazy" />
              </Box>
              <SwipeableDrawer
                anchor="left"
                open={leftDrawer}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
              >
                <MobileVersion
                  toggleDrawer={toggleDrawer}
                  leftDrawer={leftDrawer}
                />
              </SwipeableDrawer>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <Link to="/">
                <img src={require("./asset/logo.svg")} loading="lazy" />
              </Link>
            </Box>
            <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
              <Link to={PATHS.SEARCHED_COURSE}>
                <Tooltip title="Search the course...">
                  <Button color="dark">
                    <SearchIcon />
                  </Button>
                </Tooltip>
              </Link>
            </Box>
            <Box
              sx={{ pr: 3, flexGrow: 0, display: { xs: "none", md: "flex" } }}
            >
              <Link to="/">
                <img src={require("./asset/meraki.svg")} loading="lazy" />
              </Link>
            </Box>
            {isAuthenticated ? (
              <AuthenticatedHeaderOption
                handleSearchChange={handleSearchChange}
              />
            ) : (
              <>
                <PublicMenuOption handleSearchChange={handleSearchChange} />
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
