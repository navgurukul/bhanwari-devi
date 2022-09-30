import React from "react";
import { useSelector } from "react-redux";
import { PATHS } from "../../constant";
import { Box } from "@mui/material";
import UserMenu from "./UserMenu";

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
import RoleSpecificHeader from "./RoleSpecificHeader";
import ChangeRolesView from "./ChangeRolesView";
import { selectRolesData, selectUserId } from "../User/redux/selectors";

const savedRolesToKeysMap = Object.keys(ROLES).reduce((roleKeyMap, roleKey) => {
  roleKeyMap[ROLES[roleKey].savedValue] = roleKey;
  return roleKeyMap;
}, {});

const rolesLandingPages = {
  [STUDENT]: PATHS.NEW_USER_DASHBOARD,
  [ADMIN]: PATHS.PARTNERS,
  [VOLUNTEER]: PATHS.CLASS,
  [PARTNER]: PATHS.PARTNERS,
};

function AuthenticatedHeaderOption({
  setRole,
  role,
  toggleDrawer,
  leftDrawer,
  handleSearchChange,
}) {
  //const [RoleSpecificHeader, setRoleSpecificHeader] = React.useState(null);
  const roles = useSelector(selectRolesData);
  const uid = useSelector(selectUserId);
  // const history = useHistory();
  // const location = useLocation();

  const rolesWithLandingPages = roles.map((role) => ({
    ...role,
    landingPage: rolesLandingPages[role.key],
  }));

  // const [role, setRole] = React.useState(null);
  // const user = useSelector(({ User }) => User);
  const isUniqueRole = roles.length === 1;
  // const dispatch = useDispatch();
  // const pathway = useSelector((state) => state.Pathways);

  // special case for partner landing page
  const partnerRole = rolesWithLandingPages.find(
    (role) => role.key === PARTNER
  );
  if (partnerRole) {
    if (partnerRole.properties.partnerGroupId != null) {
      partnerRole.landingPage = `${PATHS.STATE}/${partnerRole.properties.partnerGroupId}`;
    } else if (partnerRole.properties.partnerId != null) {
      partnerRole.landingPage = `${PATHS.PARTNERS}/${partnerRole.properties.partnerId}`;
    }
  }

  /*
  useEffect(() => {
    if (location !== rolesWithLandingPages[role.key]) {
      history.push(rolesWithLandingPages[role.key]);
    }
  }, [role]);
*/
  /*
  useEffect(() => {
    sendToken({ token: user.data.token }).then((res) => {
      // setPartnerId(res.data.user.partner_id);
      // setProfile(res.data.user.profile_picture);
    });
  }, []);
*/

  // useEffect(() => {
  //  dispatch(pathwayActions.getPathways());
  //}, [dispatch]);

  // const pythonPathwayId =
  //    pathway.data?.pathways.find((pathway) => pathway.code === "PRGPYT")?.id;

  // const merakiStudents = rolesList.length < 1; //admin

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
          {...{ role, isUniqueRole, leftDrawer, toggleDrawer }}
        />
        <ChangeRolesView
          {...{ setRole, roles: rolesWithLandingPages, uid, leftDrawer }}
        />
      </Box>
      {!leftDrawer && <UserMenu />}
    </>
  );
}

export default AuthenticatedHeaderOption;
