import { useQuery } from "./url";
import { useEffect } from "react";

/**
 * A custom hook that calls the provided function, if any, every time the
 *     search parameter of the query string changes
 * @param {Function} cb the function to call with the search parameter or empty
 *     string if it's not present
 * @return {string} the value of the search parameter in the query string, if
 *     present, otherwise the empty string
 */
export const useSearchQuery = (cb) => {
  const query = useQuery();
  const search = query.get("search") || "";
  useEffect(() => {
    if (typeof cb === "function") {
      cb(search);
    }
  }, [search]);

  return search;
};
