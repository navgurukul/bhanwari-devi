export const ADMIN_ROLE_KEY = "ADMIN";
export const STUDENT_ROLE_KEY = "STUDENT";
export const VOLUNTEER_ROLE_KEY = "VOLUNTEER";
export const PARTNER_ROLE_KEY = "PARTNER";
export const PARTNER_VIEW_ROLE_KEY = "PARTNER_VIEW";
export const PARTNER_EDIT_ROLE_KEY = "PARTNER_EDIT";

const ROLES = {
  [ADMIN_ROLE_KEY]: {
    msgKey: ADMIN_ROLE_KEY,
    savedValue: "admin",
    isDefault: false,
  },
  [STUDENT_ROLE_KEY]: {
    msgKey: STUDENT_ROLE_KEY,
    savedValue: "student",
    isDefault: true,
  },
  [VOLUNTEER_ROLE_KEY]: {
    msgKey: VOLUNTEER_ROLE_KEY,
    savedValue: "volunteer",
    isDefault: false,
  },
  [PARTNER_ROLE_KEY]: {
    msgKey: PARTNER_ROLE_KEY,
    savedValue: "partner",
    isDefault: false,
    properties: {
      partnerId: null,
      partnerGroupId: null,
    },
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
const DEFAULT_ROLES = Object.keys(ROLES).filter(
  (role) => ROLES[role].isDefault
);

const savedRolesToKeysMap = Object.keys(ROLES).reduce((roleKeyMap, roleKey) => {
  roleKeyMap[ROLES[roleKey].savedValue] = roleKey;
  return roleKeyMap;
}, {});

/**
 * Selector to get user roles
 * @return {Array.<{key: string, msgKey: string, assignedRole:boolean, properties: Object}>}
 */
export const selectRolesData = ({ User }) => {
  const rolesList = (User?.data?.user?.rolesList || []).map(
    (savedRole) => savedRolesToKeysMap[savedRole] || savedRole
  );
  const unassignedDefaultRoles = DEFAULT_ROLES.filter(
    (roleKey) => !rolesList.includes(roleKey)
  );

  // special case for partner role
  const partnerId = User?.data?.user?.partner_id;
  const partnerGroupId = User?.data?.user?.partner_group_id;
  ROLES[PARTNER_ROLE_KEY].properties.partnerId = User?.data?.user?.partner_id;
  ROLES[PARTNER_ROLE_KEY].properties.partnerGroupId =
    User?.data?.user?.partner_group_id;

  return unassignedDefaultRoles
    .map((roleKey) => ({
      key: roleKey,
      msgKey: ROLES[roleKey].msgKey,
      assignedRole: false,
      properties: ROLES[roleKey].properties || null,
    }))
    .concat(
      rolesList.map((roleKey) => ({
        key: roleKey,
        msgKey: ROLES[roleKey].msgKey,
        assignedRole: true,
        properties: ROLES[roleKey].properties || null,
      }))
    );
};

/**
 * Selector to get user id
 * @return {string} user id
 */
export const selectUserId = ({ User }) => User.data.user.id;
