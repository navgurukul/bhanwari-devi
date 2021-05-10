/**
 * Common HTTP Methods used
 */
export const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  HEAD: "HEAD",
};

/**
 * Generate the headers needed for the requests
 * @param {String} token - Token used on Authentication
 */
export const HeaderFactory = (token, platform = null) => {
  const headers = new Headers();
  if (!token) {
    return headers;
  }
  const customHeaders = {
    "Content-Type": "application/json",
    Authorization: token,
    // 'x-api-key': process.env.REACT_APP_TEST_API_KEY
  };
  if (platform) {
    return { ...customHeaders, ...platform };
  }
  return customHeaders;
};

/**
 * Handle Gracefully an HTTP Error
 * @param {Error} error - Fetch Error
 */
export function* ErrorHandler(error) {
  const genericResponse = { message: "Something Went Wrong, try again later" };
  if (error && error.json) {
    try {
      const data = yield error.json();
      return data;
    } catch (e) {
      return genericResponse;
    }
  } else return genericResponse;
}
