import axios from "axios";
export const MATRIX_DOMAIN = "https://m.navgurukul.org";

const baseUrl = `${MATRIX_DOMAIN}/_matrix/client/r0`;

export const fetchMessages = async (params) => {
  const {
    roomId,
    accessToken,
    fromSyncToken,
    toSyncToken,
    limit = 10,
    direction = "b",
  } = params;

  let baseMessagesUrl = `${baseUrl}/rooms/${roomId}/messages?access_token=${accessToken}&limit=${limit}&dir=${direction}`;
  if (fromSyncToken) {
    baseMessagesUrl += `&fromSyncToken=${fromSyncToken}`;
  }
  if (toSyncToken) {
    baseMessagesUrl += `&toSyncToken=${toSyncToken}`;
  }

  const response = await axios.get(baseMessagesUrl);
  return {
    endToken: response.data.end,
    startToken: response.data.start,
    data: response.data.chunk.reverse(),
  };
};
