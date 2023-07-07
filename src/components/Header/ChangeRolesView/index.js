import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Box, MenuItem } from "@mui/material";
import TextButtonDropDownMenu from "../TextButtonDropDownMenu";
import AccordionDropDownMenu from "../AccordionDropDownMenu";
import Message from "../../common/Message";

import useStyles from "../styles";

const ID_TO_SELECTED_ROLE_MAP_KEY = "idToSelectedRoleMap";

function ChangeRole({ isToggle, role, setRoleView, roleView, uid }) {
  const classes = useStyles();
  const styles = isToggle ? {} : { margin: "0 10px" };
  const roleStr = <Message constantKey={role?.msgKey} />;

  const roleLandingPage = role.landingPage;
  if (!roleLandingPage) {
    return null;
  }

  return (
    <MenuItem
      component={NavLink}
      to={roleLandingPage}
      onClick={() => {
        setRoleView(role.key);
        const idToSelectedRoleMap =
          JSON.parse(localStorage.getItem(ID_TO_SELECTED_ROLE_MAP_KEY)) || {};
        idToSelectedRoleMap[uid] = role.key;
        localStorage.setItem(
          ID_TO_SELECTED_ROLE_MAP_KEY,
          JSON.stringify(idToSelectedRoleMap)
        );
      }}
      sx={styles}
      className={roleView === role.key && classes.bgColor}
    >
      {isToggle ? (
        <Message constantKey="SWITCH_TO_VIEW" args={[roleStr]} />
      ) : (
        roleStr
      )}
    </MenuItem>
  );
}

function ChangeRolesView({ setRole, roles, uid, leftDrawer }) {
  const [roleView, setRoleView] = useState(null);
  let menu = null;

  useEffect(() => {
    const defaultRole = roles.find((role) => role.assignedRole) || roles[0];
    const lastSelectedRoleKey = JSON.parse(
      localStorage.getItem(ID_TO_SELECTED_ROLE_MAP_KEY)
    )?.[uid];
    const hasLastSelectedRole = roles.some(
      (role) => role.key === lastSelectedRoleKey
    );
    setRoleView(hasLastSelectedRole ? lastSelectedRoleKey : defaultRole?.key);
  }, [roles, uid]);

  useEffect(() => {
    if (roleView) {
      setRole(roleView);
    }
  }, [roleView]);

  const handleRoleChange = (selectedRole) => {
    setRoleView(selectedRole);
  };

  if (roles.length > 1) {
    const menuContents = roles.map((role) => (
      <ChangeRole
        role={role}
        key={role.key}
        isToggle={roles.length > 2}
        setRoleView={handleRoleChange}
        roleView={roleView}
        uid={uid}
      />
    ));

    if (roles.length > 2) {
      menu = (
        <AccordionDropDownMenu textMsgKey="SWITCH_VIEWS">
          {menuContents}
        </AccordionDropDownMenu>
      );
    } else {
      menu = (
        <TextButtonDropDownMenu
          btnTextMsgKey="SWITCH_VIEWS"
          attachRight={!leftDrawer}
          menuContainerProps={{
            id: "menu-appbar",
          }}
        >
          {menuContents}
        </TextButtonDropDownMenu>
      );
    }
  }

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
