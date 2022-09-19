import { useSelector } from "react-redux";
import { PATHS } from "../constant";

export const ADMIN_ROLE_KEY = "ADMIN";
export const STUDENT_ROLE_KEY = "STUDENT";
export const VOLUNTEER_ROLE_KEY = "VOLUNTEER";
export const PARTNER_ROLE_KEY = "PARTNER";
export const PARTNER_VIEW_ROLE_KEY = "PARTNER_VIEW";
export const PARTNER_EDIT_ROLE_KEY = "PARTNER_EDIT";

const ID_TO_SELECTED_ROLE_MAP_KEY = "idToSelectedRoleMap";

const ROLES = {
  [ADMIN_ROLE_KEY]: {
    msgKey: ADMIN_ROLE_KEY,
    savedValue: "admin",
    isDefault: false,
    landingPage: PATHS.PARTNERS,
  },
  [STUDENT_ROLE_KEY]: {
    msgKey: STUDENT_ROLE_KEY,
    savedValue: "student",
    isDefault: true,
    landingPage: PATHS.NEW_USER_DASHBOARD,
  },
  [VOLUNTEER_ROLE_KEY]: {
    msgKey: VOLUNTEER_ROLE_KEY,
    savedValue: "volunteer",
    isDefault: false,
    landingPage: PATHS.CLASS,
  },
  [PARTNER_ROLE_KEY]: {
    msgKey: PARTNER_ROLE_KEY,
    savedValue: "partner",
    isDefault: false,
    properties: {
      partnerId: null,
      partnerGroupId: null,
    },
    landingPage: PATHS.PARTNERS,
  },
  [PARTNER_VIEW_ROLE_KEY]: {
    msgKey: PARTNER_ROLE_KEY,
    savedValue: "partner_view",
    isDefault: false,
  },
  [PARTNER_EDIT_ROLE_KEY]: {
    msgKey: PARTNER_ROLE_KEY,
    savedValue: "partner_edit",
    isDefault: false,
  },
};


// keys of roles which every user has
const DEFAULT_ROLE_KEYS = Object.keys(ROLES).filter(
  (role) => ROLES[role].isDefault
);

const savedRolesToKeysMap = Object.keys(ROLES).reduce((roleKeyMap, roleKey) => {
  roleKeyMap[ROLES[roleKey].savedValue] = roleKey;
  return roleKeyMap;
}, {});

/**
 * Custom hook to get user roles with relevant information
 * @return {Array.<{key: string, msgKey: string, assignedRole: boolean, selected: boolean, properties: Object, landingPage: string|undefined}>}
 */
export const useRoles = () => {
  const user = useSelector(({ User }) => User);
  const roleKeys = (user?.data?.user?.rolesList || []).map(
    (savedRole) => savedRolesToKeysMap[savedRole] || savedRole
  );
  const unassignedDefaultRoleKeys = DEFAULT_ROLE_KEYS.filter(
    (roleKey) => !roleKeys.includes(roleKey)
  );
  const defaultRoleKey = roleKeys[0] || unassignedDefaultRoleKeys;
  const uid = user?.data?.user?.id;
  const lastSelectedRoleKey = JSON.parse(
    localStorage.getItem(ID_TO_SELECTED_ROLE_MAP_KEY)
  )?.[uid]; // || localStorage.getItem(SELECTED_ROLE_KEY);
  const hasLastSelectedRole = 
    roleKeys.concat(unassignedDefaultRoleKeys).includes(lastSelectedRoleKey);
  const selectedRoleKey = hasLastSelectedRole ? lastSelectedRoleKey : defaultRoleKey;

  // special case for partner role
  const partnerId = user?.data?.user?.partner_id;
  const partnerGroupId = user?.data?.user?.partner_group_id;
  
  // HACK: selector should not mutate object 
  ROLES[PARTNER_ROLE_KEY].properties.partnerId = partnerId;
  ROLES[PARTNER_ROLE_KEY].properties.partnerGroupId = partnerGroupId;
  ROLES[PARTNER_ROLE_KEY].landingPage = partnerGroupId
    ? `${PATHS.STATE}/${partnerGroupId}`
    : `${PATHS.PARTNERS}/${partnerId || ""}`,
  // END HACK

  return unassignedDefaultRoleKeys
    .map((roleKey) => ({
      key: roleKey,
      msgKey: ROLES[roleKey].msgKey,
      assignedRole: false,
      properties: {...ROLES[roleKey].properties},
      landingPage: ROLES[roleKey].landingPage,
      selected: selectedRoleKey === roleKey,
    }))
    .concat(
      rolesList.map((roleKey) => ({
        key: roleKey,
        msgKey: ROLES[roleKey].msgKey,
        assignedRole: true,
        properties: {...ROLES[roleKey].properties},
        landingPage: ROLES[roleKey].landingPage,
        selected: selectedRoleKey === roleKey,
      }))
    );
};

/**
 * Saves the specified role key in localStorage to use as the view upon refresh/login
 * @param {string} roleKey - the key of the role to save
 * @param {string} uid - the id of the user
 */
export const saveSelectedRole(roleKey, uid) {
  const idToSelectedRoleMap =
    JSON.parse(localStorage.getItem(ID_TO_SELECTED_ROLE_MAP_KEY)) || {};
  idToSelectedRoleMap[uid] = roleKey;
  localStorage.setItem(
    ID_TO_SELECTED_ROLE_MAP_KEY,
    JSON.stringify(idToSelectedRoleMap)
  );
}
