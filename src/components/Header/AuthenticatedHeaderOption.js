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
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  IconButton,
  Typography,
  Menu,
  Avatar,
  MenuItem,
  Button,
} from "@mui/material";
import HeaderNavLink from "./HeaderNavlink";
import SearchBar from "../SearchBar";
import Tooltip from "@mui/material/Tooltip";
import Message from "../common/Message";
import {
  LEARN_KEY,
  MENU_ITEMS, 
  ROLES,
  ADMIN_ROLE_KEY as ADMIN,
  PARTNER_ROLE_KEY as PARTNER,
  PARTNER_VIEW_ROLE_KEY as PARTNER_VIEW,
  PARTNER_EDIT_ROLE_KEY as PARTNER_EDIT,
  STUDENT_ROLE_KEY as STUDENT,
  VOLUNTEER_ROLE_KEY as VOLUNTEER,
} from "./constant";

const rolesLandingPages = {
  [STUDENT]: PATHS.NEWUSER_DASHBOARED,
  [ADMIN]: PATHS.PARTNERS,
  [VOLUNTEER]: PATHS.CLASS,
  [PARTNER]: PATHS.PARTNERS,
};

// keys of roles which every user has
const DEFAULT_ROLES =
    Object.keys(ROLES).filter((role) => ROLES[role].isDefault);

const savedRolesToKeysMap = Object.keys(ROLES)
    .reduce((roleKeyMap, roleKey) => {
      roleKeyMap[ROLES[roleKey].savedValue] = roleKey;
      return roleKeyMap;
    }, {});

const SELECTED_ROLE_KEY = "selectedRole";

const SwitchView = ({
  role,
  setSwitchView,
  handleCloseSwitchView,
  switchView,
  partner,
}) => {
  const classes = useStyles();

  rolesLandingPages.partner = partner;
  const roleLandingPage = rolesLandingPages[role];

  return roleLandingPage ? (
    <MenuItem
      onClick={() => {
        setSwitchView(role);
        localStorage.setItem(SELECTED_ROLE_KEY, role);
        handleCloseSwitchView();
      }}
      sx={{ margin: "0px 10px" }}
      className={switchView === role && classes.bgColor}
    >
      <NavLink to={roleLandingPage} className={classes.link}>
        <Message constantKey={MENU_ITEMS[role]?.msgKey} />
      </NavLink>
    </MenuItem>
  ) : (
    ""
  );
};

function AuthenticatedHeaderOption({
  toggleDrawer,
  leftDrawer,
  handleSearchChange,
}) {
  const [partnerId, setPartnerId] = useState("");
  const [profile, setProfile] = useState("");
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [learn, setLearn] = React.useState(null);
  const [dropDown, setDropDown] = React.useState(null);
  const [studentView, setStudentView] = React.useState(false);
  const [switchView, setSwitchView] = React.useState(
    localStorage.getItem(SELECTED_ROLE_KEY)
  );
  const dispatch = useDispatch();
  const user = useSelector(({ User }) => User);
  const rolesList = (user.data.user.rolesList || [])
      .map(savedRole => savedRolesToKeysMap[savedRole] || savedRole);
  const rolesListWithDefaults = DEFAULT_ROLES.concat(
      rolesList.filter(roleKey => !DEFAULT_ROLES.includes(roleKey))
  );
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

  const pythonPathwayId =
      pathway.data?.pathways.find((pathway) => pathway.code === "PRGPYT")?.id;

  const partnerGroupId = user.data.user.partner_group_id;

  const canSpecifyPartnerGroupId =
    hasOneFrom(rolesList, [ADMIN, PARTNER, PARTNER_VIEW]) &&
    user.data.user.partner_group_id;

  const canSpecifyUserBaseRole = rolesList.indexOf(ADMIN) > -1; //student

  const merakiStudents = rolesList.length < 1; //admin

  const volunteer = rolesList.indexOf(VOLUNTEER) > -1;

  const canSpecifyPartner =
    hasOneFrom(rolesList, [PARTNER, PARTNER_VIEW, PARTNER_EDIT]) &&
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
        {(switchView === STUDENT || merakiStudents || studentView) && (
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
                <Typography variant="subtitle1">
                  <Message constantKey={MENU_ITEMS[LEARN_KEY].msgKey} />
                </Typography>
                {learn ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </MenuItem>
              <DropDown
                dropDown={LEARN_KEY}
                indicator={learn}
                handleClose={handleCloseLearn}
                toggleDrawer={toggleDrawer}
              />

              <HeaderNavLink
                to={PATHS.NEWUSER_DASHBOARED}
                text={<Message constantKey="DASHBOARD" />}
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
                menuKey={LEARN_KEY}
                handleClose={handleCloseLearn}
                toggleDrawer={toggleDrawer}
              />
              <HeaderNavLink
                to={PATHS.NEWUSER_DASHBOARED}
                text={<Message constantKey="DASHBOARD" />}
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
              {!leftDrawer && (
                <Link to={PATHS.SEARCHED_COURSE}>
                  <Tooltip title="Search the course...">
                    <Button color="dark">
                      <SearchIcon />
                    </Button>
                  </Tooltip>
                </Link>
              )}

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
            {(switchView || rolesList[0]) === ADMIN &&
            canSpecifyUserBaseRole ? (
              <>
                <HeaderNavLink
                  to={PATHS.USER}
                  text={<Message constantKey="STUDENTS" />}
                  toggleDrawer={toggleDrawer}
                />
                <HeaderNavLink
                  to={PATHS.VOLUNTEER}
                  text={<Message constantKey="VOLUNTEERS" />}
                  toggleDrawer={toggleDrawer}
                />
                <HeaderNavLink
                  to={PATHS.PARTNERS}
                  text="Partners"
                  toggleDrawer={toggleDrawer}
                />
                {canSpecifyPartnerGroupId && (
                  <HeaderNavLink
                    to={`${PATHS.STATE}/${partnerGroupId}`}
                    text={<Message constantKey="DASHBOARD" />}
                    toggleDrawer={toggleDrawer}
                  />
                )}
              </>
            ) : null}

            {(switchView || rolesList[0]) === VOLUNTEER ? (
              <>
                <HeaderNavLink
                  to={PATHS.CLASS}
                  text="Classes"
                  toggleDrawer={toggleDrawer}
                />
              </>
            ) : null}

            {(switchView || rolesList[0]) === PARTNER &&
            // "partner_view" || "partner_edit" || "partner"
            (canSpecifyPartnerGroupId || canSpecifyPartner) ? (
              <>
                <HeaderNavLink
                  to={
                    canSpecifyPartnerGroupId
                      ? `${PATHS.STATE}/${partnerGroupId}`
                      : `${PATHS.PARTNERS}/${partnerId}`
                  }
                  text={<Message constantKey="DASHBOARD" />}
                  toggleDrawer={toggleDrawer}
                />
              </>
            ) : null}
          </Box>
        )}
        {!(switchView === STUDENT || merakiStudents || studentView) &&
          !leftDrawer && (
            <Box>
              <Link to={PATHS.SEARCHED_COURSE}>
                <Tooltip title="Search the course...">
                  <Button color="dark">
                    <SearchIcon />
                  </Button>
                </Tooltip>
              </Link>
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
                {rolesListWithDefaults.map((role) => (
                  <SwitchView
                    role={role}
                    setSwitchView={setSwitchView}
                    handleCloseSwitchView={handleCloseSwitchView}
                    switchView={switchView}
                    partner={
                      canSpecifyPartnerGroupId
                        ? `${PATHS.STATE}/${partnerGroupId}`
                        : `${PATHS.PARTNERS}/${partnerId}`
                    }
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
            <NavLink to={PATHS.PROFILE} className={classes.link}>
              <MenuItem
                onClick={handleCloseUserMenu}
                sx={{ width: 120, margin: "0px 10px" }}
              >
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
            </NavLink>
            <Link
              onClick={() => dispatch(userActions.logout())}
              className={classes.link}
            >
              <MenuItem
                onClick={handleCloseUserMenu}
                sx={{ width: 120, margin: "0px 10px" }}
              >
                <Typography textAlign="center" color="error">
                  Logout
                </Typography>
              </MenuItem>
            </Link>
          </Menu>
        </Box>
      )}
    </>
  );
}

export default AuthenticatedHeaderOption;
