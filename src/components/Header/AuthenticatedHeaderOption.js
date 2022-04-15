import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { PATHS, interpolatePath } from "../../constant";
import { hasOneFrom } from "../../common/utils";
import { actions as userActions } from "../User/redux/action";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import useStyles from "./styles";
import { DropDown, MobileDropDown } from "./DropDown";
import { sendToken } from "../User/redux/api";
import { actions as pathwayActions } from "../../components/PathwayCourse/redux/action";
import {
  Box,
  IconButton,
  Typography,
  Menu,
  Avatar,
  MenuItem,
} from "@mui/material";
import HeaderNavLink from "./HeaderNavlink";

const rolesLandingPages = {
  admin: PATHS.PARTNERS,
  volunteer: PATHS.CLASS,
  partner: PATHS.PARTNERS,
};

const SwitchView = ({
  role,
  setSwitchView,
  handleCloseSwitchView,
  switchView,
}) => {
  const classes = useStyles();

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
        {role.charAt(0).toUpperCase() + role.slice(1)}
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
  const pathway = useSelector((state) => state.Pathways);
  const classes = useStyles();

  useEffect(() => {
    sendToken({ token: user.data.token }).then((res) => {
      setPartnerId(res.data.user.partner_id);
      setProfile(res.data.user.profile_picture);
    });
  }, []);

  useEffect(() => {
    dispatch(pathwayActions.getPathways());
  }, [dispatch]);

  let pythonPathwayId;
  pathway.data &&
    pathway.data.pathways.forEach((pathway) => {
      if (pathway.code === "PRGPYT") pythonPathwayId = pathway.id;
    });

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

              <HeaderNavLink
                to={PATHS.CLASS}
                text="Classes"
                toggleDrawer={toggleDrawer}
              />
              <HeaderNavLink
                to={PATHS.MENTOR}
                text="Mentor"
                toggleDrawer={toggleDrawer}
              />
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
              <HeaderNavLink
                to={PATHS.CLASS}
                text="Classes"
                toggleDrawer={toggleDrawer}
              />
              <HeaderNavLink
                to={PATHS.MENTOR}
                text="Mentor"
                toggleDrawer={toggleDrawer}
              />
            </Box>
            <Box
              sx={{
                display: { xs: "block", md: "flex" },
                justifyContent: { xs: "normal", md: "flex-end" },
                width: { xs: 0, sm: "100%" },
                pr: rolesList.length < 1 && 2,
              }}
            >
              <HeaderNavLink
                to={PATHS.ADMISSION}
                text="Navgurukul Admission"
                toggleDrawer={toggleDrawer}
              />
              <HeaderNavLink
                to={PATHS.OPPORTUNITIES}
                text="Opportunity"
                toggleDrawer={toggleDrawer}
              />
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
                <HeaderNavLink
                  to={PATHS.USER}
                  text="Students"
                  toggleDrawer={toggleDrawer}
                />

                <HeaderNavLink
                  to={PATHS.VOLUNTEER}
                  text="Volunteers"
                  toggleDrawer={toggleDrawer}
                />

                <HeaderNavLink
                  to={PATHS.PARTNERS}
                  text="Partners"
                  toggleDrawer={toggleDrawer}
                />
              </>
            ) : null}

            {(switchView || rolesList[0]) === "volunteer" && volunteer ? (
              <>
                <HeaderNavLink
                  to={PATHS.VOLUNTEER}
                  text="Volunteers"
                  toggleDrawer={toggleDrawer}
                />{" "}
                <HeaderNavLink
                  to={PATHS.CLASS}
                  text="Classes"
                  toggleDrawer={toggleDrawer}
                />
              </>
            ) : null}

            {(switchView || rolesList[0]) === "partner" &&
            // "partner_view" || "partner_edit" || "partner"
            (canSpecifyPartnerGroupId || canSpecifyPartner) ? (
              <>
                <HeaderNavLink
                  to={
                    canSpecifyPartnerGroupId
                      ? `${PATHS.STATE}/${partnerGroupId}`
                      : `${PATHS.PARTNERS}/${partnerId}`
                  }
                  text="Dashboard"
                  toggleDrawer={toggleDrawer}
                />
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
                  <NavLink
                    to={interpolatePath(PATHS.PATHWAY_COURSE, {
                      pathwayId: pythonPathwayId,
                    })}
                    className={classes.link}
                  >
                    Student
                  </NavLink>
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
                <NavLink
                  to={
                    studentView === false
                      ? interpolatePath(PATHS.PATHWAY_COURSE, {
                          pathwayId: pythonPathwayId,
                        })
                      : rolesLandingPages[rolesList[0]]
                  }
                  className={classes.link}
                >
                  {studentView
                    ? `Switch to ${rolesList[0]} View`
                    : "Switch to student View"}
                </NavLink>
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
