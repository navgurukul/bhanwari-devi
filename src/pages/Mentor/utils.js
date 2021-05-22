import axios from "axios";
export const MATRIX_DOMAIN = "https://m.navgurukul.org";

const baseUrl = `${MATRIX_DOMAIN}/_matrix/client/r0`;

export const getMembers = async (accessToken, roomId) => {
  const getMembersResponse = await axios.get(
    `${baseUrl}/rooms/${roomId}/members?access_token=${accessToken}`
  );
  return getMembersResponse.data.chunk;
};

export const getMemberName = (member) => {
  return member
    ? (member.content && member.content.displayname) ||
        (member.prev_content && member.prev_content.displayname)
    : "";
};

export const getAreDatesOnDifferentDays = (firstDateTs, secondDateTs) => {
  let areDatesOnDifferentDay = false;
  const previousMessageDate = new Date(firstDateTs);
  const currentMessageDate = new Date(secondDateTs);
  const previousMessageDay = previousMessageDate.getDate();
  const currentMessageDay = currentMessageDate.getDate();

  if (currentMessageDay !== previousMessageDay) {
    areDatesOnDifferentDay = true;
  } else {
    const previousMessageMonth = previousMessageDate.getMonth();
    const currentMessageMonth = currentMessageDate.getMonth();
    if (previousMessageMonth !== currentMessageMonth) {
      areDatesOnDifferentDay = true;
    } else {
      const previousMessageYear = previousMessageDate.getFullYear();
      const currentMessageYear = currentMessageDate.getFullYear();
      if (previousMessageYear !== currentMessageYear) {
        areDatesOnDifferentDay = true;
      }
    }
  }
  return areDatesOnDifferentDay;
};

export const fetchMessages = async (params) => {
  const {
    roomId,
    accessToken,
    fromSyncToken,
    limit = 10,
    direction = "b",
  } = params;

  const filters = JSON.stringify({
    types: ["m.room.message"],
  });

  let baseMessagesUrl = `${baseUrl}/rooms/${roomId}/messages?access_token=${accessToken}&limit=${limit}&dir=${direction}&filter=${filters}`;
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
  const { roomId, eventId, accessToken, trxnId = null, reason = "" } = params;
  const baseRedactEventUrl = `${baseUrl}/rooms/${roomId}/redact/${eventId}/${trxnId}?access_token=${accessToken}`;
  return await axios.put(baseRedactEventUrl, {
    reason,
  });
};

export const leaveRoom = async (params) => {
  const { roomId, accessToken } = params;
  const leaveRoomUrl = `${baseUrl}/rooms/${roomId}/leave?access_token=${accessToken}`;
  return await axios.post(leaveRoomUrl);
};
