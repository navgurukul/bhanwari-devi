import React from "react";
import StudentHeader from "../StudentHeader";
import VolunteerHeader from "../VolunteerHeader";
import {
  STUDENT_ROLE_KEY as STUDENT,
  VOLUNTEER_ROLE_KEY as VOLUNTEER,
} from "../constant";

function RoleSpecificHeader({ role, isUniqueRole, leftDrawer, toggleDrawer }) {
  const drawerProps = { leftDrawer, toggleDrawer };

  const roleSpecificComponentMap = {
    [STUDENT]: <StudentHeader isUniqueRole={isUniqueRole} {...drawerProps} />,
    [VOLUNTEER]: <VolunteerHeader {...drawerProps} />,
  };

  return roleSpecificComponentMap[role] || "";
}

export default RoleSpecificHeader;
