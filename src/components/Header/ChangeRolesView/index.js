import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { PATHS } from "../../../constant";
import useStyles from "../styles";
import { Box, Typography, Menu, MenuItem } from "@mui/material";
import TextButtonDropDownMenu from "../TextButtonDropDownMenu";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import ExpandLessIcon from "@mui/icons-material/ExpandLess";
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
import AccordionDropDownMenu from "../AccordionDropDownMenu";
// import { isTouchScreen } from "../../../common/utils";

/*
const rolesLandingPages = {
  [STUDENT]: PATHS.NEW_USER_DASHBOARD,
  [ADMIN]: PATHS.PARTNERS,
  [VOLUNTEER]: PATHS.CLASS,
  [PARTNER]: PATHS.PARTNERS,
};
*/

// const SELECTED_ROLE_KEY = "selectedRole";
const ID_TO_SELECTED_ROLE_MAP_KEY = "idToSelectedRoleMap";

function ChangeRole({ isToggle, role, setRoleView, roleView, uid }) {
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
        // localStorage.setItem(SELECTED_ROLE_KEY, role.key);
        const idToSelectedRoleMap =
          JSON.parse(localStorage.getItem(ID_TO_SELECTED_ROLE_MAP_KEY)) || {};
        idToSelectedRoleMap[uid] = role.key;
        localStorage.setItem(
          ID_TO_SELECTED_ROLE_MAP_KEY,
          JSON.stringify(idToSelectedRoleMap)
        );
        // !isToggle && handleCloseSwitchView();
      }}
      sx={styles}
      className={roleView === role.key && classes.bgColor}
      // className={classes.link}
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

function ChangeRolesView({ setRole, roles, uid, leftDrawer }) {
  const defaultRole = roles.find((role) => role.assignedRole) || roles[0];
  const lastSelectedRoleKey = JSON.parse(
    localStorage.getItem(ID_TO_SELECTED_ROLE_MAP_KEY)
  )?.[uid]; // || localStorage.getItem(SELECTED_ROLE_KEY);
  const hasLastSelectedRole = roles.some(
    (role) => role.key === lastSelectedRoleKey
  );
  const [roleView, setRoleView] = React.useState(
    hasLastSelectedRole ? lastSelectedRoleKey : defaultRole?.key
  );
  const otherRole =
    roles[(roles.findIndex((role) => role.key === roleView) + 1) % 2];

  const commonProps = { setRoleView, roleView, uid };
  const history = useHistory();
  let menu = "";

  if (roles.length > 2) {
    const menuContents = (
      <div>
        {roles.map((role) => (
          <ChangeRole role={role} {...commonProps} />
        ))}
      </div>
    );
    menu = leftDrawer ? (
      <AccordionDropDownMenu textMsgKey="SWITCH_VIEWS">
        {menuContents}
      </AccordionDropDownMenu>
    ) : (
      <TextButtonDropDownMenu
        btnTextMsgKey="SWITCH_VIEWS"
        attachRight={!leftDrawer}
        menuContainerProps={{
          // sx: { mt: '45px' },
          id: "menu-appbar",
          /*
            anchorOrigin: {
              vertical: "top",
              horizontal: leftDrawer ? "left" : "right",
            },
            keepMounted: true,
            transformOrigin: {
              vertical: "top",
              horizontal: leftDrawer ? "left" : "right",
            },
            */
        }}
      >
        {menuContents}
      </TextButtonDropDownMenu>
    );
  } else if (roles.length === 2) {
    menu = <ChangeRole isToggle={true} role={otherRole} {...commonProps} />;
  }
  //const location = useLocation();

  React.useEffect(() => {
    setRole(roleView);
    // if (location !== roles[roleView]) {
    // for load
    //  history.push(roles[roleView]);
    //}
  }, [roleView]);

  // React.useEffect(() => {
  //   const roleData = roles.find((role) => role.key === roleView);
  //   roleData?.landingPage && history.push(roleData.landingPage);
  // }, []);

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
      {menu}
    </Box>
  );
}

export default ChangeRolesView;
