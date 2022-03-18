import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { PATHS } from "../../constant";
import axios from "axios";
import { METHODS } from "../../services/api";
import { hasOneFrom } from "../../common/utils";
import { actions as userActions } from "../User/redux/action";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import useStyles from "./styles";
import "./styles.scss";
import { DropDown, MobileDropDown } from "./DropDown";
import {
  Box,
  IconButton,
  Typography,
  Menu,
  Avatar,
  MenuItem,
} from "@mui/material";

// const SwitchView = ({ role }) => {
//   if (role == "admin") {
//     return (
//       <MenuItem
//         onClick={() => {
//           setSwitchView(role);
//           handleCloseSwitchView();
//         }}
//       >
//         <NavLink
//           to={PATHS.VOLUNTEER}
//           className={classes.link}
//           // activeClassName={classes.active}
//         >
//           {role}
//         </NavLink>
//       </MenuItem>
//     );
//   }
//   if (role == "volunteer") {
//     return (
//       <MenuItem
//         onClick={() => {
//           setSwitchView(role);
//           handleCloseSwitchView();
//         }}
//       >
//         <NavLink
//           to={PATHS.CLASS}
//           className={classes.link}
//           // activeClassName={classes.active}
//         >
//           {role}
//         </NavLink>
//       </MenuItem>
//     );
//   }
//   if (role == "partner") {
//     return (
//       <MenuItem
//         onClick={() => {
//           setSwitchView(role);
//           handleCloseSwitchView();
//         }}
//       >
//         <NavLink
//           to={PATHS.CLASS}
//           className={classes.link}
//           // activeClassName={classes.active}
//         >
//           {role}
//         </NavLink>
//       </MenuItem>
//     );
//   }
// };

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
  // const rolesList = user.data.user.rolesList;
  const rolesList = ['admin', 'volunteer', 'partner'];
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

  console.log("switchView", switchView);

  // const SwitchView = (role) => {
  //   console.log("poo");

  //   if (role == "admin") {
  //     console.log("role", role);
  //     return (
  //       <MenuItem
  //         onClick={() => {
  //           setSwitchView(role);
  //           handleCloseSwitchView();
  //         }}
  //       >
  //         <NavLink
  //           to={PATHS.VOLUNTEER}
  //           className={classes.link}
  //           // activeClassName={classes.active}
  //         >
  //           {role}
  //         </NavLink>
  //       </MenuItem>
  //     );
  //   }
  //   if (role == "volunteer") {
  //     return (
  //       <MenuItem
  //         onClick={() => {
  //           setSwitchView(role);
  //           handleCloseSwitchView();
  //         }}
  //       >
  //         <NavLink
  //           to={PATHS.CLASS}
  //           className={classes.link}
  //           // activeClassName={classes.active}
  //         >
  //           {role}
  //         </NavLink>
  //       </MenuItem>
  //     );
  //   }
  //   if (role == "partner") {
  //     return (
  //       <MenuItem
  //         onClick={() => {
  //           setSwitchView(role);
  //           handleCloseSwitchView();
  //         }}
  //       >
  //         <NavLink
  //           to={PATHS.CLASS}
  //           className={classes.link}
  //           // activeClassName={classes.active}
  //         >
  //           {role}
  //         </NavLink>
  //       </MenuItem>
  //     );
  //   }
  // };

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
                Learn
                {learn ? <ExpandLessIcon /> : <ExpandMoreIcon />}
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
                flexGrow: 1,
                display: { xs: "block", md: "none" },
              }}
            >
              <MobileDropDown Menu="Learn" />
            </Box>
            <Box
              sx={{
                flexGrow: 0,
                display: {
                  xs: "block",
                  md: "flex",
                },
              }}
            >
              <MenuItem onClick={toggleDrawer && toggleDrawer(false)}>
                <NavLink
                  to={PATHS.ADMISSION}
                  className={classes.link}
                  activeClassName={classes.active}
                >
                  Admission
                </NavLink>
              </MenuItem>
              <MenuItem onClick={toggleDrawer && toggleDrawer(false)}>
                <NavLink
                  to={PATHS.OPPORTUNITIES}
                  className={classes.link}
                  activeClassName={classes.active}
                >
                  Opportunity
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
                    Students
                  </NavLink>
                </MenuItem>
                <MenuItem onClick={toggleDrawer && toggleDrawer(false)}>
                  <NavLink
                    to={PATHS.VOLUNTEER}
                    className={classes.link}
                    activeClassName={classes.active}
                  >
                    Volunteers
                  </NavLink>
                </MenuItem>
                <MenuItem onClick={toggleDrawer && toggleDrawer(false)}>
                  <NavLink
                    to={PATHS.PARTNERS}
                    className={classes.link}
                    activeClassName={classes.active}
                  >
                    Partners
                  </NavLink>
                </MenuItem>
              </>
            ) : null}

            {(switchView || rolesList[0]) === "volunteer" && volunteer ? (
              <>
                {/* <MenuItem onClick={toggleDrawer && toggleDrawer(false)}>
                  <NavLink
                    to={PATHS.VOLUNTEER}
                    className={classes.link}
                    activeClassName={classes.active}
                  >
                    Volunteers
                  </NavLink>
                </MenuItem> */}
                <MenuItem onClick={toggleDrawer && toggleDrawer(false)}>
                  <NavLink
                    to={PATHS.COURSE}
                    className={classes.link}
                    activeClassName={classes.active}
                  >
                    Course
                  </NavLink>
                </MenuItem>

                <MenuItem onClick={toggleDrawer && toggleDrawer(false)}>
                  <NavLink
                    to={PATHS.CLASS}
                    className={classes.link}
                    activeClassName={classes.active}
                  >
                    Classes
                  </NavLink>
                </MenuItem>
              </>
            ) : null}

            {(switchView || rolesList[0]) === "partner" &&
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
                    Dashboard
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
            // display: {
            //   xs: "none",
            //   md: leftDrawer ? "none" : "flex",
            // },
          }}
        >
          {rolesList.length > 1 ? (
            <>
              <MenuItem onClick={handleOpenSwitchView}>
                Switch Views
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
                >
                  Student
                </MenuItem>
                {/* {rolesList.map((role) => {
                  // <SwitchView role={role} />;
                  SwitchView(role);
                })} */}
                {rolesList.map((role) => (
                  <MenuItem
                    onClick={() => {
                      setSwitchView(role);
                      handleCloseSwitchView();
                    }}
                    sx={{ width: 130 }}
                    className={switchView === role ? classes.bgColor : null}
                  >
                    {console.log("switchView", switchView, "role", role)}
                    {role}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <MenuItem
              onClick={() => {
                setStudentView(!studentView);
              }}
            >
              {studentView
                ? `Switch to ${rolesList[0]} View`
                : "Switch to student View"}
            </MenuItem>
          )}
        </Box>

        {/* <Box
          sx={{
            flexGrow: 0,
            display: {
              xs: leftDrawer ? "block" : "none",
              md: "none",
            },
          }}
        >
          {rolesList.length > 1 ? (
            <>
              <MenuItem onClick={handleOpenSwitchView}>
                Switch Views
                {dropDown ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </MenuItem>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={dropDown}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(dropDown)}
                onClose={handleCloseSwitchView}
              >
              <MenuItem
                onClick={() => {
                  setSwitchView("student");
                  handleCloseSwitchView();
                }}
              >
                Student
              </MenuItem>
              {rolesList.map((role) => (
                <MenuItem
                  onClick={() => {
                    setSwitchView(role);
                    handleCloseSwitchView();
                  }}
                >
                  Poonam
                </MenuItem>
              ))}
              </Menu>
            </>
          ) : (
            <MenuItem
              onClick={() => {
                setStudentView(!studentView);
              }}
            >
              {studentView
                ? `Switch to ${rolesList[0]} View`
                : "Switch to student View"}
            </MenuItem>
          )}
        </Box> */}

        {/* <Box
          sx={{
            flexGrow: 0,
            display: {
              xs: leftDrawer ? "block" : "none",
              md: "none",
            },
          }}
        >
          {rolesList.length > 1 ? (
            <MobileDropDown Menu={rolesList} />
          ) : (
            <MenuItem
              onClick={() => {
                setStudentView(!studentView);
              }}
            >
              {studentView
                ? `Switch to ${rolesList[0]} View`
                : "Switch to student View"}
            </MenuItem>
          )}
        </Box> */}
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
            // elevation={2}
          >
            <MenuItem onClick={handleCloseUserMenu} sx={{ width: 130 }}>
              <NavLink to={PATHS.PROFILE} className={classes.link}>
                <Typography textAlign="center">Profile</Typography>
              </NavLink>
            </MenuItem>
            <MenuItem onClick={handleCloseUserMenu} sx={{ width: 130 }}>
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
