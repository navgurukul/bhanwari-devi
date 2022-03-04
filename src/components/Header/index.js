import React, { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import theme from "../../theme/theme";
import python from "./asset/python.svg";
import typing from "./asset/typing.svg";
import web from "./asset/web.svg";
import language from "./asset/language.svg";
import softSkills from "./asset/softSkills.svg";
import random from "./asset/random.svg";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { PATHS } from "../../constant";
import axios from "axios";
import { METHODS } from "../../services/api";
import { hasOneFrom } from "../../common/utils";
import { actions as userActions } from "../User/redux/action";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CloseIcon from "@mui/icons-material/Close";
import useStyles from "./styles";
import "./styles.scss";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  MenuItem,
  ThemeProvider,
} from "@mui/material";

const students = {
  // image: [
  //   "./asset/python.svg",
  //   "./asset/typing.svg",
  //   "./asset/web.svg",
  //   "./asset/language.svg",
  //   "./asset/softSkills.svg",
  //   "./asset/random.svg",
  // ],
  image: [python, typing, web, language, softSkills, random],
  Learn: [
    "Python",
    "Typing Guru",
    "JavaScript",
    "English",
    "Soft Skills",
    "Open Courses",
  ],
  About: ["Meraki Team", "Alumni"],
  GetInvolved: ["Become a Partner", "Become a Volunteer", "Donate", "Careers"],
};

const DropDown = ({ dropDown, indicator, handleClose }) => {
  return (
    <Menu
      sx={{ mt: "45px" }}
      id="menu-appbar"
      anchorEl={indicator}
      anchorOrigin={{
        vertical: "top",
        // horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(indicator)}
      onClose={handleClose}
    >
      {/* {dropDown && console.log("dropDown", dropDown, students[dropDown])} */}
      {dropDown &&
        students[dropDown].map((menu, index) => (
          <>
            <MenuItem key={menu} onClick={handleClose}>
              {dropDown === "Learn" && (
                <img src={students.image[index]} loading="lazy" />
              )}
              <Typography textAlign="center">{menu}</Typography>
            </MenuItem>
            {dropDown === "Learn" && index == 4 && <Divider />}
          </>
        ))}
    </Menu>
  );
};

const AuthenticatedHeaderOption = ({ toggleDrawer, leftDrawer }) => {
  const [partnerId, setPartnerId] = useState("");
  const [profile, setProfile] = useState("");
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [learn, setLearn] = React.useState(null);
  const dispatch = useDispatch();
  const user = useSelector(({ User }) => User);
  const rolesList = user.data.user.rolesList;
  const classes = useStyles();

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/users/me`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
    }).then((res) => {
      setPartnerId(res.data.user.partner_id);
      setProfile(res.data.user.profile_picture);
    });
  }, []);

  const partnerGroupId = user.data.user.partner_group_id;

  const canSpecifyPartnerGroupId =
    hasOneFrom(rolesList, ["admin", "partner", "partner_view"]) &&
    user.data.user.partner_group_id;

  const canSpecifyUserBaseRole = rolesList.indexOf("student") > -1; //student

  const merakiStudents = rolesList.indexOf("admin") > -1; //admin

  const canSpecifyPartner =
    hasOneFrom(rolesList, ["partner", "partner_view", "partner_edit"]) &&
    partnerId != null;

  const handleOpenLearn = (event) => {
    // console.log("event.currentTarget", event.currentTarget);
    setLearn(event.currentTarget);
  };

  const handleCloseLearn = () => {
    setLearn(null);
  };

  const handleOpenUserMenu = (event) => {
    // console.log("event.currentTarget.........", event.currentTarget);
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // console.log("toggleDrawer", toggleDrawer);

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: {
            xs: leftDrawer ? "block" : "none",
            md: leftDrawer ? "none" : "flex",
          },
        }}
      >
        {merakiStudents && (
          <>
            <Box
              sx={{
                flexGrow: 1,
                display: {
                  xs: leftDrawer ? "block" : "none",
                  md: leftDrawer ? "none" : "flex",
                },
              }}
            >
              <MenuItem
                onClick={handleOpenLearn}
                sx={{ my: 2, color: "black" }}
              >
                Learn
                <ExpandMoreIcon />
              </MenuItem>
              <DropDown
                dropDown="Learn"
                indicator={learn}
                handleClose={handleCloseLearn}
              />
            </Box>
            <Box
              sx={{
                flexGrow: 0,
                display: {
                  xs: leftDrawer ? "block" : "none",
                  md: leftDrawer ? "none" : "flex",
                },
              }}
            >
              <MenuItem onClick={toggleDrawer && toggleDrawer(false)}>
                <Link to={PATHS.ADMISSION} className={classes.link}>
                  Admission
                </Link>
              </MenuItem>
              <MenuItem onClick={toggleDrawer && toggleDrawer(false)}>
                <Link to={PATHS.OPPORTUNITIES} className={classes.link}>
                  Opportunity
                </Link>
              </MenuItem>
            </Box>
          </>
        )}
        {canSpecifyUserBaseRole ? (
          <>
            <MenuItem onClick={toggleDrawer && toggleDrawer(false)}>
              <Link to={PATHS.USER} className={classes.link}>
                Students
              </Link>
            </MenuItem>
            <MenuItem onClick={toggleDrawer && toggleDrawer(false)}>
              <Link to={PATHS.VOLUNTEER} className={classes.link}>
                Volunteers
              </Link>
            </MenuItem>
            <MenuItem onClick={toggleDrawer && toggleDrawer(false)}>
              <Link to={PATHS.PARTNERS} className={classes.link}>
                Partners
              </Link>
            </MenuItem>
          </>
        ) : null}

        {canSpecifyPartnerGroupId || canSpecifyPartner ? (
          <MenuItem onClick={toggleDrawer && toggleDrawer(false)}>
            <Link
              to={
                canSpecifyPartnerGroupId
                  ? `${PATHS.STATE}/${partnerGroupId}`
                  : `${PATHS.PARTNERS}/${partnerId}`
              }
              className={classes.link}
            >
              Dashboard
            </Link>
          </MenuItem>
        ) : null}
      </Box>

      {!leftDrawer && (
        <Box sx={{ flexGrow: 0 }}>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src={profile} />
          </IconButton>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleCloseUserMenu}>
              <Link to={PATHS.PROFILE} className={classes.link}>
                <Typography textAlign="center">Profile</Typography>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>
              <Link
                onClick={() => dispatch(userActions.logout())}
                className={classes.link}
              >
                <Typography textAlign="center">Logout</Typography>
              </Link>
            </MenuItem>
          </Menu>
        </Box>
      )}
    </>
  );
};

const PublicMenuOption = ({ leftDrawer }) => {
  const [indicator, setIndicator] = React.useState(null);
  const [dropDownMenu, setDropDownMenu] = React.useState(null);
  const [selectedMenu, SetSelectedMenu] = React.useState(null);

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
      <Box
        sx={{
          flexGrow: 1,
          display: {
            xs: leftDrawer ? "block" : "none",
            md: leftDrawer ? "none" : "flex",
          },
        }}
      >
        {["Learn", "About", "Get Involved"].map((menu) => (
          <>
            <MenuItem
              onClick={(e) => {
                menuOpenHandler(e, menu);
              }}
              sx={{ my: 2, color: "black" }}
            >
              {menu}
              {console.log("dropDownMenu", dropDownMenu, "menu", menu)}
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
            />
          </>
        ))}
      </Box>
      {!leftDrawer && (
        <Box sx={{ flexGrow: 0 }}>
          <Button variant="contained">
            <Link
              className="item"
              to={PATHS.LOGIN}
              style={{ textDecoration: "none", color: "white" }}
            >
              Log in
            </Link>
            {/* <Typography textAlign="center">Login</Typography> */}
          </Button>
        </Box>
      )}
    </>
  );
};

const MobileVersion = ({ toggleDrawer, leftDrawer }) => {
  const { data } = useSelector(({ User }) => User);
  const isAuthenticated = data && data.isAuthenticated;
  return (
    <Box
      sx={{ width: 415 }}
      // sx={{ width: 350 }}
      role="presentation"
      onClose={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box
        sx={{ flexGrow: 1, padding: "20px 0px 0px 20px" }}
        onClick={toggleDrawer(false)}
      >
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Link to="/">
              <img src={require("./asset/logo.svg")} loading="lazy" />
            </Link>
          </Box>
          <Box sx={{ flexGrow: 0, paddingRight: "20px" }}>
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
          <PublicMenuOption leftDrawer={leftDrawer} />
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
      {/* <AppBar position="static" color="default"> */}
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
              <MenuIcon />
            </IconButton>
            <SwipeableDrawer
              anchor="left"
              open={leftDrawer}
              onClose={toggleDrawer(false)} //Will let you close the side menu on clicking on the side
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
      {/* </AppBar> */}
    </ThemeProvider>
  );
}

export default Header;
