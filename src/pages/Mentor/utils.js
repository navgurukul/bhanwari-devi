import axios from "axios";
export const MATRIX_DOMAIN = "https://m.navgurukul.org";

const baseUrl = `${MATRIX_DOMAIN}/_matrix/client/r0`;

export const getMembers = async (accessToken, roomId) => {
  const getMembersResponse = await axios.get(
    `${baseUrl}/rooms/${roomId}/members?access_token=${accessToken}`
  );
  return getMembersResponse.data.chunk;
};

export const fetchMessages = async (params) => {
  const {
    roomId,
    accessToken,
    fromSyncToken,
    limit = 10,
    direction = "b",
  } = params;

  let baseMessagesUrl = `${baseUrl}/rooms/${roomId}/messages?access_token=${accessToken}&limit=${limit}&dir=${direction}`;
  if (fromSyncToken) {
    baseMessagesUrl += `&from=${fromSyncToken}`;
  }

  const response = await axios.get(baseMessagesUrl);
  return {
    endToken: response.data.end,
    startToken: response.data.start,
    data: response.data.chunk.reverse(),
  };
};

export const redactEvent = async (params) => {
  const { roomId, eventId, accessToken, trxnId = null } = params;
  const baseRedactEventUrl = `${baseUrl}/rooms/${roomId}/redact/${eventId}/${trxnId}?access_token=${accessToken}`;
  return await axios.put(baseRedactEventUrl);
};
