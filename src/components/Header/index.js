import React from "react";
import theme from "../../theme/theme";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { PATHS } from "../../constant";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CloseIcon from "@mui/icons-material/Close";
import useStyles from "./styles";
import List from "@mui/material/List";
import { DropDown, MobileDropDown } from "./DropDown";
import {
  AppBar,
  Box,
  IconButton,
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

  const menuCloseHandler = () => {
    setIndicator(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {["Learn", "About", "Get Involved"].map((menu, index) => (
          <>
            <MenuItem
              onClick={(e) => {
                menuOpenHandler(e, menu);
              }}
              sx={{ my: 2, color: "black" }}
              key={index}
            >
              {/* <Typography variant="subtitle2">{menu}</Typography> */}
              {menu}
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
      <Box sx={{ flexGrow: 1, display: { xs: leftDrawer ? "block" : "none" } }}>
        {["Learn", "About", "Get Involved"].map((Menu) => (
          <MobileDropDown Menu={Menu} />
          // <MobileDropDown Menu={Menu} path={`${Menu}Link`} />
        ))}
      </Box>
      {!leftDrawer && (
        <Box sx={{ flexGrow: 0 }}>
          <Button variant="contained">
            <Link to={PATHS.LOGIN} className={classes.button}>
              Log in
            </Link>
          </Button>
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
      <Box className={classes.box} onClick={toggleDrawer(false)}>
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
  const { data } = useSelector(({ User }) => User);
  const isAuthenticated = data && data.isAuthenticated;
  const [leftDrawer, setLeftDrawer] = React.useState(false);
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

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="sticky" color="background" elevation={0}>
        <Container maxWidth="false">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={toggleDrawer(true)}
              >
                <img src={require("./asset/menu.svg")} loading="lazy" />
              </IconButton>
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
            <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
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
