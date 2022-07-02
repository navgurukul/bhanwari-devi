import React, { useState, useEffect } from "react";
import { isBeforeNow, millisecondsUntil } from "../../../common/date";

/**
 * Shows the future (React) element before the given date, past element after,
 *     updating what's shown from the future to the past, if the time passes
 *     when the user is viewing this component.
 * @param {ReactElement=} future the element to show before date, if any
 * @param {ReactElement=} past the element to show after date, if any
 * @param {Date|string=} date Valid Date string recognized by formatInTimeZone
 *     (https://www.npmjs.com/package/date-fns-tz#formatintimezone)
 *     or Date for which to base which Component to show, defaults to now
 */
function FutureOrPast({ future = "", past = "", date = new Date() }) {
  const [isInFuture, setIsInFuture] = useState(!isBeforeNow(date));

  useEffect(() => {
    setIsInFuture(!isBeforeNow(date));
    if (isInFuture) {
      const timer = setTimeout(() => {
        setIsInFuture(false);
      }, millisecondsUntil(date));
      return () => clearTimeout(timer); // cleans up on unmount
    }
  }, [date]);

  return isInFuture ? future : past;
}

export default FutureOrPast;
