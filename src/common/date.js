/* eslint-disable no-unused-vars */
import {
  format as dateFnsFormat,
  isBefore as comesBefore,
  differenceInMinutes as minutesDifference,
  differenceInMilliseconds as msDifference,
  intervalToDuration,
  addHours as ah,
  add
} from "date-fns";
import { 
  zonedTimeToUtc,
  utcToZonedTime,
  toDate,
  getTimezoneOffset,
  format as dateFnsTzFormat
} from "date-fns-tz";
import { formatInTimeZone as ftz } from "date-fns-tz";
/**
 * Returns a copy of the given date if supplied a Date object input or a Date
 *    object from the given timestamp if supplied a string in a format accepted
 *    by Date.parse
 *    (See:
 *    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse#date_time_string_format
 *    and 
 *    https://tc39.es/ecma262/#sec-date-time-string-format) 
 * @param {Date|string} date A valid Date string recognized by formatInTimeZone
 *     (https://www.npmjs.com/package/date-fns-tz#formatintimezone)
 *     or Date to make a new Date from
 * @return {Date} a copy of the inputted date or a new one from the timestamp
 */
export const makeDateFrom = (date) => {
  return typeof date === "string"
    // ? new Date(zonedTimeToUtc(date).toISOString())
    ? new Date(date)
    : date;
};

/**
 * Wrapper for date-fns's isBefore but allows date strings
 *     (See: https://date-fns.org/v2.28.0/docs/isBefore)
 * @param {Date|string} date A valid Date string recognized by
 *     formatInTimeZone
 *     (https://www.npmjs.com/package/date-fns-tz#formatintimezone)
 *     or Date that should be before the other one to return true
 * @param {Date|string} dateToCompare A valid Date string recognized by
 *     formatInTimeZone
 *     (https://www.npmjs.com/package/date-fns-tz#formatintimezone)
 *     or Date to compare with
 * @return {Boolean} true exactly when the first date is before the second date
 */
export const isBefore = (date, dateToCompare) => {
  return comesBefore(makeDateFrom(date), makeDateFrom(dateToCompare));
};

/**
 * Returns true if the given date was in the past
 * @param {Date|string} date A valid Date string recognized by
 *     formatInTimeZone
 *     (https://www.npmjs.com/package/date-fns-tz#formatintimezone)
 *     or Date that should be before now to return true
 * @return {Boolean} true exactly when date occurs before now
 */
export const isBeforeNow = (date) => {
  return isBefore(date, new Date());
};

/**
 * Returns the time left until the given date or a warning or expiration if the
 *     date is within a specified amount of time at or before now
 * @param {Date|string} date A valid Date string recognized by formatInTimeZone
 *     (https://www.npmjs.com/package/date-fns-tz#formatintimezone)
 *     or Date to be formatted to determine the time remaining
 * @param {{expiredText: (string|undefined),
 *     precision: (Array<number>|undefined),
 *     cutoffTextArr: (string|undefined),
 *     cutoffNumArr: (Array<number>|undefined)}=} options The options for the
 *     string formatting.  expiredText is what's shown if the Date is now or past.
 *     precision[i] is the desired number of places to show when the ith item
 *     in [years, months, days, hours, minutes, seconds] is the largest
 *     non-zero unit in the time remaining (e.g., if precision[2] = 3), then
 *     when the time remaining starts with days, days, minutes, and hours will
 *     be displayed.  cutoffTextArr[i] is what's shown if the largest nonzero unit
 *     is at most cutoffNumArr[i].
 * @return {string} the time remaining or warning or expiration text
 */
export const timeLeftFormat = (
  date,
  {
    expiredText = "expired",
    precision = [6, 5, 4, 3, 2, 1],
    cutoffTextArr = [
      "warning",
      "warning",
      "warning",
      "warning",
      "warning",
      "warning",
    ],
    cutoffNumArr = [0, 0, 0, 0, 0, 0],
  } = {
    expiredText: "expired",
    precision: [6, 5, 4, 3, 2, 1],
    cutoffTextArr: [
      "warning",
      "warning",
      "warning",
      "warning",
      "warning",
      "warning",
    ],
    cutoffNumArr: [0, 0, 0, 0, 0, 0],
  }
) => {
  const targetDate = makeDateFrom(date);
  const now = makeDateFrom(new Date());

  if (isBefore(targetDate, now)) {
    return expiredText;
  }

  const timeRemaining = intervalToDuration({
    start: now,
    end: targetDate,
  });
  const { years, months, days, hours, minutes, seconds } = timeRemaining;
  const units = [years, months, days, hours, minutes, seconds];
  const abbreviations = ["yr", "mo", "day", "hr", "min", "sec"];
  const indexOfLeadingUnit = units.findIndex((num) => num > 0);

  if (units[indexOfLeadingUnit] <= cutoffNumArr[indexOfLeadingUnit]) {
    return cutoffTextArr[indexOfLeadingUnit];
  } else {
    return units
      .slice(
        indexOfLeadingUnit,
        indexOfLeadingUnit + precision[indexOfLeadingUnit]
      )
      .map(
        (num, index) =>
          `${num} ${abbreviations[index + indexOfLeadingUnit]}${
            num !== 1 ? "s" : ""
          }`
      )
      .join(" ");
  }
};

/**
 * Provides the local date and time strings of the provided date in Meraki's
 *     standardized format (currently HH : mm and dd MMM, yyyy)
 * @param {Date|string} date A valid Date string recognized by formatInTimeZone
 *     (https://www.npmjs.com/package/date-fns-tz#formatintimezone)
 *     or Date to be formatted
 * @param {string} the string of tokens
 * @param {Object|undefined} an object with options
 * @return {{finalTime: string, finalDate: string}} the formatted date/time
 *     strings or empty strings if the input is null or undefined
 */
export const dateTimeFormat = (date) => {
  if (date == null) {
    return { finalTime: "", finalDate: "" };
  }

  return {
    finalTime: format(date, "HH : mm"),
    finalDate: format(date, "dd MMM, yyyy"),
  };
};

/**
 * Wrapper for date-fns's differenceInMinutes but allows date strings
 *     (See: https://date-fns.org/v2.28.0/docs/differenceInMinutes)
 * @param {Date|string} dateLeft A valid Date string recognized by
 *     formatInTimeZone
 *     (https://www.npmjs.com/package/date-fns-tz#formatintimezone)
 *     or left Date in difference
 * @param {Date|string} dateRight A valid Date string recognized by
 *     formatInTimeZone
 *     (https://www.npmjs.com/package/date-fns-tz#formatintimezone)
 *     or right Date in difference
 * @return {number} the signed number of full (rounded towards 0) minutes
 *     between the given dates (dateLeft - dateRight minutes)
 */
const differenceInMinutes = (dateLeft, dateRight) => {
  return minutesDifference(makeDateFrom(dateLeft), makeDateFrom(dateRight));
};

/**
 * Gets the signed number of full (rounded towards 0) minutes from now until
 *     given date (If the date occurs at least a full minute later, the number
 *     will be positive; if it occurs at least a full minute earlier, it will
 *     be negative.)
 * @param {Date|string} date A valid Date string recognized by formatInTimeZone
 *     (https://www.npmjs.com/package/date-fns-tz#formatintimezone)
 *     or Date to get the minutes until
 * @returns {number} the number of full minutes from now until date
 */
export const minutesUntil = (date) => {
  return differenceInMinutes(date, new Date());
};

/**
 * Wrapper for date-fns's differenceInMilliseconds but allows date strings
 *     (See: https://date-fns.org/v2.28.0/docs/differenceInMilliseconds)
 * @param {Date|string} dateLeft A valid Date string recognized by
 *     formatInTimeZone
 *     (https://www.npmjs.com/package/date-fns-tz#formatintimezone)
 *     or left Date in difference
 * @param {Date|string} dateRight A valid Date string recognized by
 *     formatInTimeZone
 *     (https://www.npmjs.com/package/date-fns-tz#formatintimezone)
 *     or right Date in difference
 * @return {number} the signed number of full milliseconds between the given
 *     dates (dateLeft - dateRight seconds)
 */
const differenceInMilliseconds = (dateLeft, dateRight) => {
  return msDifference(makeDateFrom(dateLeft), makeDateFrom(dateRight));
};

/**
 * Gets the signed number of milliseconds from now until given date (If the
 *     date occurs at least a millisecond later, the number will be positive;
 *     if it occurs at least a millisecond earlier, it will be negative.)
 * @param {Date|string} date A valid Date string recognized by formatInTimeZone
 *     (https://www.npmjs.com/package/date-fns-tz#formatintimezone)
 *     or Date to get the milliseconds until
 * @returns {number} the (signed) number of milliseconds from now until date
 */
export const millisecondsUntil = (date) => {
  return differenceInMilliseconds(date, new Date());
};

/**
 * Wrapper for date-fns's addHours but allows date strings
 *     (See: https://date-fns.org/v2.29.3/docs/addHours)
 * @param {Date|string|number} the date to be changed
 * @param {number} amount the amount of hours to be added. Positive decimals
 *     will be rounded using Math.floor, decimals less than zero will be
 *     roundered using Math.ceil.
 * @returns {Date} the new date with the hours added
 */
export const addHours = (date, amount) => ah(makeDateFrom(date), amount);

/**
 * Get default timezone offset to display (ISO-8601 w/o Z) on given date
 * @param {Date|string} date the date or timestamp for which to get the offset
 * @returns {string} the default timezone offset at date
 */
export const getDefaultDisplayTimestampOffset = (date) => '+05:30';

/**
 * Get interpretation of Timezone offsets of timestamps (ISO-8601 w/o Z) in
 *     back-end
 * @param {Date|string} date the date or timestamp for which to get the offset
 * @returns {string} the default timezone offset at date
 */
export const getBackEndTimestampOffset = (date) => '+05:30';

/**
 * Gets local ISO-8601 timezone offset (+/-HH:MM or Z)
 * @param {Date|string} time the date or timestamp for which to get the offset
 * @returns {string} the default local offset at time
 */
export const getLocalTimezoneOffset = (time) => format(time, 'XXX');

/**
 * Returns true exactly when the provided timezone offset in the XXX ISO-8601
 *   format is the offset of the user's local time at the provided time
 * @param {string} offset the offset in XXX ISO-8601 format to check
 * @param {Date|string} time the date or timestamp to get the user's timezone
 *   offset
 * @returns {boolean} true exactly when the offsets match
 */
export const isOffsetOfLocalTime = (offset, time) => {
  return offset === getLocalTimezoneOffset(time);
};

/**
 * Gets timestamp of toTzOffset that is the same time in timezone fromTzOffset
 *   For example, fromTzOffset of "-04:00", toTzOffset of "+05:00" : 
 *   2023-03-25T10:00:00.000-04:00 => 2023-03-25T10:00:00.000+05:30
 * @param {Date|string} time the date or timestamp for which to translate
 * @param {string} fromTzOffset the offset of the timezone of the time to
 *   translate
 * @param {string} toTzOffset the offset of the timezone to translate the time
 *   to
 * @returns {string} the ISO-8601 translated timestamp
 *   (yyyy-MM-dd'T'HH:mm:ss.sssXXX)
 */
export const translateTimeToZone = (time, fromTzOffset, toTzOffset) => {
  return formatInTimeZone(time, fromTzOffset).replace(fromTzOffset, toTzOffset);
};

/**
 * Gets timestamp of local time that is the same time in timezone fromTzOffset
 * @param {Date|string} time the date or timestamp for which to translate
 * @param {string} fromTzOffset the offset of the timezone of the time to
 *   translate
 * @returns {string} the ISO-8601 translated timestamp in local time
 *   (yyyy-MM-dd'T'HH:mm:ss.sssXXX)
 */
export const translateTimeToLocal = (time, fromTzOffset) => {
  const localOffset = getLocalTimezoneOffset(time);
  return translateTimeToZone(time, fromTzOffset, localOffset);
};

/**
 * Gets timestamp of toTzOffset that is the same time in the local time zone
 * @param {Date|string} time the date or timestamp for which to translate
 * @param {string} toTzOffset the offset of the timezone to translate the time
 *   to
 * @returns {string} the ISO-8601 translated timestamp
 *   (yyyy-MM-dd'T'HH:mm:ss.sssXXX)
 */
export const translateTimeFromLocal = (time, toTzOffset) => {
  const localOffset = getLocalTimezoneOffset(time);
  return translateTimeToZone(time, localOffset, toTzOffset);
};

/**
 * Transforms the given timestamp or local date to the required back-end format
 * @param {Date} date A valid Date in local time or timestamp
 * @return {string} the serialized date (currently YYYY-MM-DDTHH:mm:ss.sssZ)
 *   adjusted to the timezone that the back-end expects instead of UTC. 
 *   E.g., Even though dates are represented with a Z represent UTC
 *   (as per ISO-8601: https://tc39.es/ecma262/#sec-date-time-string-format),
 *   it's currently used to refer to times given in IST.
 *   (See: 
 *   https://github.com/navgurukul/bhanwari-devi/wiki/Working-with-Dates#date-representations)
 */
export const serializeTimeForBackEnd = (date) => {
  const offset = getBackEndTimestampOffset(date);
  return translateTimeToZone(date, offset, "Z");
  // return formatInTimeZone(date, offset).replace(offset, "Z");
};

/**
 * Transforms the given timestamp from the back-end to the actual ISO-8601
 *   interpretation. Currently, the Z is replaced with the IST offset
 *   that it's supposed to be interpreted as, so no transformation is needed;
 *   it's the identity function. But using this function everywhere instead of
 *   relying on this now permits changes by onlying changing the below 
 *   definition, so it should always be used when interpreting a back-end
 *   timestamp for use on the front-end.
 * @param {string} timestamp from the back-end to be interpreted for the
 *   front-end
 * @returns {string} the interpreted timestamp
 */
export const interpretBackEndTimestamp = (timestamp) => {
  return timestamp;
};

/**
 * Parses the given timestamp from the back-end for use in the front-end
 * @param {string} back-end timestamp to interpret
 * @returns {Date} the interpreted Date for front-end use
 */
export const parseBackEndTimestamp = (timestamp) => {
  return makeDateFrom(interpretBackEndTimestamp(timestamp));
};

/**
 * Wrapper for date-fns-tz's formatInTimeZone
 *   (See: https://github.com/marnusw/date-fns-tz#formatintimezone and
 *   https://github.com/marnusw/date-fns-tz/blob/master/src/formatInTimeZone/index.js)
 *   but with default format string of ISO-8601 with XXX timezone offset
 * @param  {Date|String|Number} date - the date representing the local time /
 *   real UTC time
 * @param {String} timeZone - the time zone this date should be formatted for;
 *   can be an offset or IANA time zone
 * @param {String=} formatStr - the string of tokens, defaults to ISO-8601 XXX
 *   timezone offset
 * @returns {String} the formatted date string
 */
export const formatInTimeZone = (date, timeZone, formatStr  = `yyyy-MM-dd'T'HH:mm:ss.sssXXX`) => {
  return ftz(makeDateFrom(date), timeZone, formatStr);
};

/**
 * Formats the given date in the default time zone (currently IST +05:30)
 * @param {Date|String|Number} date - the date representing the local time /
 *   real UTC time
 * @param {String=} formatStr - the string of tokens, defaults to ISO-8601 XXX
 *   timezone offset
 * @returns {String} the formatted date string in the default zone
 */
export const formatInDefaultTimeZone = (date, formatStr) => {
  return formatInTimeZone(date, getDefaultDisplayTimestampOffset(date));
};

/**
 * Gets xxx offset from timestamp in ISO-8601 with XXX timezone offset format
 * @param {string} timestamp the timestamp for which to extract the offset
 * @returns {string} xxx offset of timestamp
 */
export const getTimestampOffset = (timestamp) => {
  return timestamp.endsWith('Z')
    ? '+00:00'
    : /([\+\-][^\+\-]*)$/.exec(timestamp)?.[1] || '+05:30';
};

/**
 * Formats a string in the ISO-8601 with XXX timezone offset format with respect
 *   to that timezone
 * @param {String} timestamp - the timestamp in ISO-8601 with XXX timezone
 *   format to format
 * @param {String=} formatStr - the string of tokens, defaults to ISO-8601 XXX
 *   timezone offset
 * @returns {String} the formatted date string in the XXX timezone of the
 *   timestamp
 */
export const formatInSameTimeZone = (
  timestamp,
  formatStr = `yyyy-MM-dd'T'HH:mm:ss.sssXXX`
) => {
  return ftz(timestamp, getTimestampOffset(timestamp), formatStr);
};

export const toDateInSameTimeZone = (timestamp) => {
  return utcToZonedTime(makeDateFrom(timestamp), getTimestampOffset(timestamp));
};

/**
export const formatAsSameTimeInZone = (time, offset) => {
  const timeToReplace = time instanceof Date
    ? format(time, `yyyy-MM-dd'T'HH:mm:ss.sssXXX`)
    : time;
  return timeToReplace.replace(getLocalTimezoneOffset(time), offset);
}

export const getDateInTimezone = (timestamp) => {
  return zonedTimeToUtc(makeDateFrom(timestamp), getTimestampOffset(timestamp));
}
**/

export const formatInUtc = (date, formatStr) => {
  return formatInTimeZone(date, "UTC", formatStr);
};

/**
 * Wrapper for the date-fns format function but allows date strings
 *     (See: https://date-fns.org/v2.16.1/docs/format#arguments)
 * @param {Date|string} date A valid Date string recognized by formatInTimeZone
 *     (https://www.npmjs.com/package/date-fns-tz#formatintimezone)
 *     or Date to be formatted
 * @param {string} formatStr the string of tokens
 * @param {Object|undefined} options an object with options
 * @return {string} the formatted date string in the user's local time zone
 */
export const format = (date, formatStr, options) => {
  if (date) {
    const dateToFormat = makeDateFrom(date);
    return dateFnsFormat(dateToFormat, formatStr, options);
  } else {
    return "";
  }
};

// module.exports = { timeLeftFormat, format };
