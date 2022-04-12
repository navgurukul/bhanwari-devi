import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { PATHS } from "../../constant";
import { hasOneFrom } from "../../common/utils";
import { actions as userActions } from "../User/redux/action";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import useStyles from "./styles";
import { DropDown, MobileDropDown } from "./DropDown";
import { sendToken } from "../User/redux/api";

import {
  Box,
  IconButton,
  Typography,
  Menu,
  Avatar,
  MenuItem,
} from "@mui/material";

const SwitchView = ({
  role,
  setSwitchView,
  handleCloseSwitchView,
  switchView,
}) => {
  const classes = useStyles();
  const rolesLandingPages = {
    admin: PATHS.PARTNERS,
    volunteer: PATHS.CLASS,
    partner: PATHS.PARTNERS,
  };

  const roleLandingPage = rolesLandingPages[role];
  return roleLandingPage ? (
    <MenuItem
      onClick={() => {
        setSwitchView(role);
        handleCloseSwitchView();
      }}
      sx={{ margin: "0px 10px" }}
      className={switchView === role && classes.bgColor}
    >
      <NavLink to={roleLandingPage} className={classes.link}>
        {role}
      </NavLink>
    </MenuItem>
  ) : (
    ""
  );
};

function AuthenticatedHeaderOption({ toggleDrawer, leftDrawer }) {
  const [partnerId, setPartnerId] = useState("");
  const [profile, setProfile] = useState("");
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [learn, setLearn] = React.useState(null);
  const [dropDown, setDropDown] = React.useState(null);
  const [studentView, setStudentView] = React.useState(false);
  const [switchView, setSwitchView] = React.useState("");
  const dispatch = useDispatch();
  const user = useSelector(({ User }) => User);
  const rolesList = user.data.user.rolesList;
  const classes = useStyles();

  useEffect(() => {
    sendToken({ token: user.data.token }).then((res) => {
      setPartnerId(res.data.user.partner_id);
      setProfile(res.data.user.profile_picture);
    });
  }, []);

  console.log("profile", profile);

  const partnerGroupId = user.data.user.partner_group_id;

  const canSpecifyPartnerGroupId =
    hasOneFrom(rolesList, ["admin", "partner", "partner_view"]) &&
    user.data.user.partner_group_id;

  const canSpecifyUserBaseRole = rolesList.indexOf("admin") > -1; //student

  const merakiStudents = rolesList.length < 1; //admin

  const volunteer = rolesList.indexOf("volunteer") > -1;

  const canSpecifyPartner =
    hasOneFrom(rolesList, ["partner", "partner_view", "partner_edit"]) &&
    partnerId != null;

  const handleOpenLearn = (event) => {
    setLearn(event.currentTarget);
  };

  const handleCloseLearn = () => {
    setLearn(null);
  };

  const handleOpenSwitchView = (event, menu) => {
    setDropDown(event.currentTarget);
  };

  const handleCloseSwitchView = () => {
    setDropDown(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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
        {(switchView === "student" || merakiStudents || studentView) && (
          <>
            <Box
              sx={{
                flexGrow: 1,
                display: {
                  xs: "none",
                  md: "flex",
                },
              }}
            >
              <MenuItem onClick={handleOpenLearn}>
                <Typography variant="subtitle1">Learn</Typography>
                {learn ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </MenuItem>
              <DropDown
                dropDown="Learn"
                indicator={learn}
                handleClose={handleCloseLearn}
                toggleDrawer={toggleDrawer}
              />
              <MenuItem onClick={toggleDrawer && toggleDrawer(false)}>
                <NavLink
                  to={PATHS.CLASS}
                  className={classes.link}
                  activeClassName={classes.active}
                >
                  <Typography variant="subtitle1">Classes</Typography>
                </NavLink>
              </MenuItem>
              <MenuItem onClick={toggleDrawer && toggleDrawer(false)}>
                <NavLink
                  to={PATHS.MENTOR}
                  className={classes.link}
                  activeClassName={classes.active}
                >
                  <Typography variant="subtitle1">Mentor</Typography>
                </NavLink>
              </MenuItem>
            </Box>
            <Box
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MobileDropDown
                Menu="Learn"
                handleClose={handleCloseLearn}
                toggleDrawer={toggleDrawer}
              />
              <MenuItem onClick={toggleDrawer && toggleDrawer(false)}>
                <NavLink
                  to={PATHS.CLASS}
                  className={classes.link}
                  activeClassName={classes.active}
                >
                  <Typography variant="subtitle1">Classes</Typography>
                </NavLink>
              </MenuItem>
              <MenuItem onClick={toggleDrawer && toggleDrawer(false)}>
                <NavLink
                  to={PATHS.MENTOR}
                  className={classes.link}
                  activeClassName={classes.active}
                >
                  <Typography variant="subtitle1">Mentor</Typography>
                </NavLink>
              </MenuItem>
            </Box>
            <Box
              sx={{
                display: { xs: "block", md: "flex" },
                justifyContent: { xs: "normal", md: "flex-end" },
                width: { xs: 0, sm: "100%" },
                pr: rolesList.length < 1 && 2,
              }}
            >
              <MenuItem onClick={toggleDrawer && toggleDrawer(false)}>
                <NavLink
                  to={PATHS.ADMISSION}
                  className={classes.link}
                  activeClassName={classes.active}
                >
                  <Typography variant="subtitle1">
                    Navgurukul Admission
                  </Typography>
                </NavLink>
              </MenuItem>
              <MenuItem onClick={toggleDrawer && toggleDrawer(false)}>
                <NavLink
                  to={PATHS.OPPORTUNITIES}
                  className={classes.link}
                  activeClassName={classes.active}
                >
                  <Typography variant="subtitle1">Opportunity</Typography>
                </NavLink>
              </MenuItem>
            </Box>
          </>
        )}

        {!studentView && (
          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: "block",
                md: "flex",
              },
            }}
          >
            {(switchView || rolesList[0]) === "admin" &&
            canSpecifyUserBaseRole ? (
              <>
                <MenuItem onClick={toggleDrawer && toggleDrawer(false)}>
                  <NavLink
                    to={PATHS.USER}
                    className={classes.link}
                    activeClassName={classes.active}
                  >
                    <Typography variant="subtitle1">Students</Typography>
                  </NavLink>
                </MenuItem>
                <MenuItem onClick={toggleDrawer && toggleDrawer(false)}>
                  <NavLink
                    to={PATHS.VOLUNTEER}
                    className={classes.link}
                    activeClassName={classes.active}
                  >
                    <Typography variant="subtitle1">Volunteers</Typography>
                  </NavLink>
                </MenuItem>
                <MenuItem onClick={toggleDrawer && toggleDrawer(false)}>
                  <NavLink
                    to={PATHS.PARTNERS}
                    className={classes.link}
                    activeClassName={classes.active}
                  >
                    <Typography variant="subtitle1">Partners</Typography>
                  </NavLink>
                </MenuItem>
              </>
            ) : null}

            {(switchView || rolesList[0]) === "volunteer" && volunteer ? (
              <>
                <MenuItem onClick={toggleDrawer && toggleDrawer(false)}>
                  <NavLink
                    to={PATHS.VOLUNTEER}
                    className={classes.link}
                    activeClassName={classes.active}
                  >
                    <Typography variant="subtitle1">Volunteers</Typography>
                  </NavLink>
                </MenuItem>
                <MenuItem onClick={toggleDrawer && toggleDrawer(false)}>
                  <NavLink
                    to={PATHS.CLASS}
                    className={classes.link}
                    activeClassName={classes.active}
                  >
                    <Typography variant="subtitle1">Classes</Typography>
                  </NavLink>
                </MenuItem>
              </>
            ) : null}

            {(switchView || rolesList[0]) === "partner" &&
            // "partner_view" || "partner_edit" || "partner"
            (canSpecifyPartnerGroupId || canSpecifyPartner) ? (
              <>
                <MenuItem onClick={toggleDrawer && toggleDrawer(false)}>
                  <NavLink
                    to={
                      canSpecifyPartnerGroupId
                        ? `${PATHS.STATE}/${partnerGroupId}`
                        : `${PATHS.PARTNERS}/${partnerId}`
                    }
                    className={classes.link}
                    activeClassName={classes.active}
                  >
                    <Typography variant="subtitle1">Dashboard</Typography>
                  </NavLink>
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
          {rolesList.length > 1 ? (
            <>
              <MenuItem onClick={handleOpenSwitchView}>
                <Typography variant="subtitle1">Switch Views</Typography>
                {dropDown ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </MenuItem>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={dropDown}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: leftDrawer ? "left" : "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: leftDrawer ? "left" : "right",
                }}
                open={Boolean(dropDown)}
                onClose={handleCloseSwitchView}
              >
                <MenuItem
                  onClick={() => {
                    setSwitchView("student");
                    handleCloseSwitchView();
                  }}
                  sx={{ margin: "0px 10px" }}
                  className={switchView === "student" && classes.bgColor}
                >
                  Student
                </MenuItem>
                {rolesList.map((role) => (
                  <SwitchView
                    role={role}
                    setSwitchView={setSwitchView}
                    handleCloseSwitchView={handleCloseSwitchView}
                    switchView={switchView}
                  />
                ))}
              </Menu>
            </>
          ) : (
            rolesList.length !== 0 && (
              <MenuItem
                onClick={() => {
                  setStudentView(!studentView);
                }}
              >
                {studentView
                  ? `Switch to ${rolesList[0]} View`
                  : "Switch to student View"}
              </MenuItem>
            )
          )}
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
            <MenuItem
              onClick={handleCloseUserMenu}
              sx={{ width: 120, margin: "0px 10px" }}
            >
              <NavLink to={PATHS.PROFILE} className={classes.link}>
                <Typography textAlign="center">Profile</Typography>
              </NavLink>
            </MenuItem>
            <MenuItem
              onClick={handleCloseUserMenu}
              sx={{ width: 120, margin: "0px 10px" }}
            >
              <Link
                onClick={() => dispatch(userActions.logout())}
                className={classes.link}
              >
                <Typography textAlign="center" color="error">
                  Logout
                </Typography>
              </Link>
            </MenuItem>
          </Menu>
        </Box>
      )}
    </>
  );
}

export default AuthenticatedHeaderOption;
