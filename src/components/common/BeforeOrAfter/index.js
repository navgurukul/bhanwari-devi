import React, { useState, useEffect } from "react";
import { isBeforeNow, millisecondsUntil } from "../../../common/date";

/**
 * Shows the before (React) element before the given date, after element after,
 *     updating what's shown from the before to the after, if the time passes
 *     when the user is viewing this component.
 * @param {ReactElement=} before the element to show before date, if any
 * @param {ReactElement=} after the element to show after date, if any
 * @param {Date|string=} date Valid Date string recognized by formatInTimeZone
 *     (https://www.npmjs.com/package/date-fns-tz#formatintimezone)
 *     or Date for which to base which Component to show, defaults to now
 */
function BeforeOrAfter({ before="", after="", date=new Date()}) {
  const [isBefore, setIsBefore] = useState(isBeforeNow(date));

  useEffect(() => {
    if (isBefore) {
      const timer = setTimeout(() => {
        setIsBefore(false);
      }, millisecondsUntil(date));
      return () => clearTimeout(timer); // cleans up on unmount
    }
  }, [date]);

  return isBefore ? before : after;
}

export default BeforeOrAfter;