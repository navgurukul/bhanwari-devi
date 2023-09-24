import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { PATHS } from "../../constant";
import UserMenu from "./UserMenu";
import RoleSpecificHeader from "./RoleSpecificHeader";
import ChangeRolesView from "./ChangeRolesView";
import {
  ADMIN_ROLE_KEY as ADMIN,
  PARTNER_ROLE_KEY as PARTNER,
  STUDENT_ROLE_KEY as STUDENT,
  VOLUNTEER_ROLE_KEY as VOLUNTEER,
} from "./constant";
import { selectRolesData, selectUserId } from "../User/redux/selectors";

const rolesLandingPages = {
  [STUDENT]: PATHS.NEW_USER_DASHBOARD,
  [ADMIN]: PATHS.PARTNERS,
  [VOLUNTEER]: PATHS.CLASS,
  [PARTNER]: PATHS.PARTNERS,
};

function AuthenticatedHeaderOption({ toggleDrawer, leftDrawer }) {
  const roles = useSelector(selectRolesData);
  const uid = useSelector(selectUserId);

  const rolesWithLandingPages = useMemo(() => {
    return roles.map((role) => ({
      ...role,
      landingPage: rolesLandingPages[role.key] || "/",
    }));
  }, [roles]);

  const [role, setRole] = useState(null);
  const isUniqueRole = roles.length === 1;

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
        <RoleSpecificHeader
          role={role}
          isUniqueRole={isUniqueRole}
          leftDrawer={leftDrawer}
          toggleDrawer={toggleDrawer}
        />
        <ChangeRolesView
          setRole={setRole}
          roles={rolesWithLandingPages}
          uid={uid}
          leftDrawer={leftDrawer}
        />
      </Box>
      {!leftDrawer && <UserMenu />}
    </>
  );
}

export default AuthenticatedHeaderOption;
