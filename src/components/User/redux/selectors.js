export const getUserData = ({ User }) => User.data;
export const getWaitingForServerUserUpdate = ({ User }) =>
  !!User.data?.waitingForUpdate;
export const getUserRolesList = ({ User }) => User.data?.user?.rolesList;
