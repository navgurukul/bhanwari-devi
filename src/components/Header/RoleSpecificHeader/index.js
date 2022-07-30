import React from "react";
import StudentHeader from "../StudentHeader";
import AdminHeader from "../AdminHeader";
import VolunteerHeader from "../VolunteerHeader";
import PartnerHeader from "../PartnerHeader";
import {
  ADMIN_ROLE_KEY as ADMIN,
  PARTNER_ROLE_KEY as PARTNER,
  STUDENT_ROLE_KEY as STUDENT,
  VOLUNTEER_ROLE_KEY as VOLUNTEER,
} from "../constant";

function RoleSpecificHeader({ role, isUniqueRole, leftDrawer, toggleDrawer }) {
  const drawerProps = { leftDrawer, toggleDrawer };

  console.log("Current Header Role View", role);

  const roleSpecificComponentMap = {
    [STUDENT]: <StudentHeader isUniqueRole={isUniqueRole} {...drawerProps} />,
    [ADMIN]: <AdminHeader {...drawerProps} />,
    [VOLUNTEER]: <VolunteerHeader {...drawerProps} />,
    [PARTNER]: <PartnerHeader {...drawerProps} />,
  };

  return roleSpecificComponentMap[role] || "";
}

export default RoleSpecificHeader;
