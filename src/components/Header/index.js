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
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import {
  AppBar,
  CardMedia,
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

const DropDown = ({ dropDown, indicator, handleClose, toggleDrawer }) => {
  const classes = useStyles();
  return (
    <Menu
      sx={{ mt: "45px" }}
      id="menu-appbar"
      anchorEl={indicator}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={Boolean(indicator)}
      onClose={handleClose}
    >
      {dropDown &&
        students[dropDown].map((menu, index) => (
          <>
            <Link
              to={PATHS.COURSE}
              className={classes.link}
              onClick={toggleDrawer && toggleDrawer(false)}
            >
              <MenuItem key={menu} onClick={handleClose}>
                {dropDown === "Learn" && (
                  <CardMedia
                    image={students.image[index]}
                    loading="lazy"
                    sx={{ padding: "15px" }}
                  />
                )}
                <Typography textAlign="center">{menu}</Typography>
              </MenuItem>
            </Link>

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
  const [studentView, setStudentView] = React.useState(false);
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

  const canSpecifyUserBaseRole = rolesList.indexOf("admin") > -1; //student

  const merakiStudents = rolesList.indexOf("student") > -1; //admin

  const canSpecifyPartner =
    hasOneFrom(rolesList, ["partner", "partner_view", "partner_edit"]) &&
    partnerId != null;

  const handleOpenLearn = (event) => {
    setLearn(event.currentTarget);
  };

  const handleCloseLearn = () => {
    setLearn(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  console.log("studentView", studentView);

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
        {(merakiStudents || studentView) && (
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
                toggleDrawer={toggleDrawer}
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
        {!studentView && (
          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: leftDrawer ? "block" : "none",
                md: leftDrawer ? "none" : "flex",
              },
            }}
          >
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
              <>
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
              </>
            ) : null}
          </Box>
        )}
        <Box
          sx={{
            flexGrow: 0,
            display: {
              xs: leftDrawer ? "block" : "none",
              md: leftDrawer ? "none" : "flex",
            },
          }}
        >
          <MenuItem
            onClick={() => {
              setStudentView(!studentView);
            }}
          >
            Switch to{" "}
            {canSpecifyUserBaseRole
              ? studentView
                ? "Admin"
                : "Student"
              : null}
            {canSpecifyPartnerGroupId || canSpecifyPartner
              ? studentView
                ? "Partner"
                : "Student"
              : null}{" "}
            View
          </MenuItem>
        </Box>
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
        {["Learn", "About", "Get Involved"].map((Menu, index) => (
          <Accordion elevation={0} sx={{ bgcolor: "#e9f5e9" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              key={index}
            >
              <Typography>{Menu}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {students[Menu.split(" ").join("")].map((menu, index) => (
                <Link to={PATHS.COURSE} className={classes.link}>
                  <MenuItem key={index}>
                    {Menu === "Learn" && (
                      <CardMedia
                        image={students.image[index]}
                        loading="lazy"
                        sx={{ padding: "15px" }}
                      />
                    )}
                    <Typography textAlign="center">{menu}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </AccordionDetails>
          </Accordion>
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
  const classes = useStyles();
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
      <AppBar position="sticky" color="default" elevation={0}>
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
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
              >
                <MobileVersion
                  toggleDrawer={toggleDrawer}
                  leftDrawer={leftDrawer}
                />
              </SwipeableDrawer>
            </Box>
            <Box
              // className={classes.meraki}
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              <Link to="/">
                <img src={require("./asset/logo.svg")} loading="lazy" />
              </Link>
            </Box>
            <Box
              // className={classes.merakiLearn}
              sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}
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
