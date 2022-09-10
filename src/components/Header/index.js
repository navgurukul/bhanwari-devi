import React, { useState } from "react";
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
} from "@mui/material";
import {
  PUBLIC_MENU_KEYS,
  // LEARN_KEY,
  MENU_ITEMS,
  // ROLES,
  ADMIN_ROLE_KEY as ADMIN,
  PARTNER_ROLE_KEY as PARTNER,
  // PARTNER_VIEW_ROLE_KEY as PARTNER_VIEW,
  // PARTNER_EDIT_ROLE_KEY as PARTNER_EDIT,
  STUDENT_ROLE_KEY as STUDENT,
  VOLUNTEER_ROLE_KEY as VOLUNTEER,
} from "./constant";
import { selectRolesData } from "../User/redux/selectors";
import AuthenticatedHeaderOption from "./AuthenticatedHeaderOption";
import SearchBar from "../SearchBar";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Message from "../common/Message";
// import { PUBLIC_MENU_KEYS, MENU_ITEMS } from "./constant";
// import { useContext } from "react";
// import { useLanguageConstants, getTranslationKey } from "../../common/language";
// import { LanguageProvider } from "../../common/context";

const PublicMenuOption = ({ leftDrawer, toggleDrawer }) => {
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
              onMouseEnter={(event) => menuOpenHandler(event, menuKey)}
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
              <img
                src={require("./asset/logo.svg")}
                loading="lazy"
                alt="logo"
              />
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
  const user = useSelector(({ User }) => User);

  const roles = useSelector(selectRolesData);
  const [role, setRole] = React.useState(null);
  const isAuthenticated = data && data.isAuthenticated;
  const [leftDrawer, setLeftDrawer] = useState(false);
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
      : `${PATHS.PARTNERS}/${partnerId}`,
  };

  let defalutPage = "/";
  roles.map((userRole) => {
    if (userRole.key === role) {
      defalutPage = rolesLandingPages[userRole.key];
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
      setElevation(9);
    } else {
      setElevation(0);
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="sticky" color="background" elevation={elevation}>
        <Container maxWidth="false" sx={{ my: "7px" }}>
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
                  toggleDrawer={toggleDrawer}
                  leftDrawer={leftDrawer}
                />
              </SwipeableDrawer>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <Link to={defalutPage}>
                <img
                  src={require("./asset/logo.svg")}
                  loading="lazy"
                  alt="logo"
                />
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
              <Link to={defalutPage}>
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
