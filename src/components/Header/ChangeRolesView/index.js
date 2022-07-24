import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { PATHS } from "../../../constant";
import useStyles from "../styles";
import { Box, Typography, Menu, MenuItem } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Message from "../../common/Message";
import {
  MENU_ITEMS,
  ROLES,
  ADMIN_ROLE_KEY as ADMIN,
  PARTNER_ROLE_KEY as PARTNER,
  PARTNER_VIEW_ROLE_KEY as PARTNER_VIEW,
  PARTNER_EDIT_ROLE_KEY as PARTNER_EDIT,
  STUDENT_ROLE_KEY as STUDENT,
  VOLUNTEER_ROLE_KEY as VOLUNTEER,
} from "../constant";

/*
const rolesLandingPages = {
  [STUDENT]: PATHS.NEW_USER_DASHBOARED,
  [ADMIN]: PATHS.PARTNERS,
  [VOLUNTEER]: PATHS.CLASS,
  [PARTNER]: PATHS.PARTNERS,
};
*/

const SELECTED_ROLE_KEY = "selectedRole";

function ChangeRole({
  isToggle,
  role,
  setRoleView,
  handleCloseSwitchView,
  roleView,
}) {
  const classes = useStyles();
  const styles = isToggle ? {} : { margin: "0 10px" };
  const roleStr = <Message constantKey={role.msgKey} />;

  const roleLandingPage = role.landingPage;
  // classes.bgColor doesn't do anything because it's overriden by the
  //     transparency of the list item
  return roleLandingPage ? (
    <MenuItem
      component={NavLink}
      to={roleLandingPage}
      onClick={() => {
        setRoleView(role.key);
        localStorage.setItem(SELECTED_ROLE_KEY, role.key);
        !isToggle && handleCloseSwitchView();
      }}
      sx={styles}
      className={roleView === role.key && classes.bgColor}
      className={classes.link}
    >
      {isToggle ? (
        <Message constantKey="SWITCH_TO_VIEW" args={[roleStr]} />
      ) : (
        roleStr
      )}
    </MenuItem>
  ) : (
    ""
  );
}

function ChangeRolesView({ setRole, roles, leftDrawer }) {
  const defaultRole = roles.find((role) => role.assignedRole) || roles[0];
  const [roleView, setRoleView] = React.useState(
    localStorage.getItem(SELECTED_ROLE_KEY) || defaultRole?.key
  );
  const [dropDown, setDropDown] = React.useState(null);
  const otherRole =
    roles[(roles.findIndex((role) => role.key === roleView) + 1) % 2];

  const commonProps = { setRoleView, roleView };
  const history = useHistory();
  //const location = useLocation();

  const handleOpenSwitchView = (event, menu) => {
    setDropDown(event.currentTarget);
  };

  const handleCloseSwitchView = () => {
    setDropDown(null);
  };

  React.useEffect(() => {
    setRole(roleView);
    // if (location !== roles[roleView]) {
    // for load
    //  history.push(roles[roleView]);
    //}
  }, [roleView]);

  React.useEffect(() => {
    const roleData = roles.find((role) => role.key === roleView);
    roleData?.landingPage && history.push(roleData.landingPage);
  }, []);

  return (
    <Box
      sx={{
        flexGrow: 0,
        display: {
          xs: leftDrawer ? "block" : "none",
          md: leftDrawer ? "none" : "flex",
        },
      }}
    >
      {roles.length > 2 ? (
        <>
          <MenuItem onClick={handleOpenSwitchView}>
            <Typography variant="subtitle1">
              <Message constantKey="SWITCH_VIEWS" />
            </Typography>
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
            {roles.map((role) => (
              <ChangeRole
                handleCloseSwitchView={handleCloseSwitchView}
                role={role}
                {...commonProps}
              />
            ))}
          </Menu>
        </>
      ) : (
        roles.length === 2 && (
          <ChangeRole isToggle={true} role={otherRole} {...commonProps} />
        )
      )}
    </Box>
  );
}

export default ChangeRolesView;
