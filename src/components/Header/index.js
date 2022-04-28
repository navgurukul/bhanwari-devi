import React from "react";
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
} from "@mui/material";
import AuthenticatedHeaderOption from "./AuthenticatedHeaderOption";

const PublicMenuOption = ({ leftDrawer, toggleDrawer }) => {
  const [indicator, setIndicator] = React.useState(null);
  const [dropDownMenu, setDropDownMenu] = React.useState(null);
  const [selectedMenu, SetSelectedMenu] = React.useState(null);
  const classes = useStyles();

  const menuOpenHandler = (event, menu) => {
    setIndicator(event.currentTarget);
    setDropDownMenu(menu.split(" ").join(""));
    SetSelectedMenu(menu);
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
        {["Learn", "About", "Get Involved"].map((menu, index) => (
          <>
            <MenuItem
              className={classes.MenuItem}
              onClick={(e) => {
                menuOpenHandler(e, menu);
              }}
              sx={{ my: 2, color: "black" }}
              key={index}
            >
              <Typography variant="subtitle1">{menu}</Typography>
              {selectedMenu === menu && indicator ? (
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
      {/* <Box sx={{ flexGrow: 1, display: { xs: "block", md: "none" } }}> */}
      <Box sx={{ flexGrow: 1, display: { xs: leftDrawer ? "block" : "none" } }}>
        {["Learn", "About", "Get Involved"].map((Menu) => (
          <MobileDropDown
            Menu={Menu}
            handleClose={menuCloseHandler}
            toggleDrawer={toggleDrawer}
          />
        ))}
      </Box>

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
  const classes = useStyles();
  const { data } = useSelector(({ User }) => User);
  const isAuthenticated = data && data.isAuthenticated;
  const [leftDrawer, setLeftDrawer] = React.useState(false);
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
  const [elevation, setElevation] = React.useState(0);
  window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
      setElevation(6);
    } else {
      setElevation(0);
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="sticky" color="background" elevation={elevation}>
        <Container maxWidth="false">
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
            <Box
              sx={{ pr: 3, flexGrow: 0, display: { xs: "none", md: "flex" } }}
            >
              <Link to="/">
                <img src={require("./asset/meraki.svg")} loading="lazy" />
              </Link>
            </Box>

            {isAuthenticated ? (
              <AuthenticatedHeaderOption />
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
