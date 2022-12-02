/* eslint-disable no-unused-vars */
import {
  format as dateFnsFormat,
  isBefore as comesBefore,
  differenceInMinutes as minutesDifference,
  differenceInMilliseconds as msDifference,
  intervalToDuration,
} from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
import { formatInTimeZone as ftz } from "date-fns-tz";
/**
 * Returns a copy of the given date if supplied a Date object input or a Date
 *    object from the given timestamp.
 * @param {Date|string} date A valid Date string recognized by formatInTimeZone
 *     (https://www.npmjs.com/package/date-fns-tz#formatintimezone)
 *     or Date to make a new Date from
 * @return {Date} a copy of the inputted date or a new one from the timestamp
 */
export const makeDateFrom = (date) => {
  return typeof date === "string"
    ? new Date(zonedTimeToUtc(date).toISOString())
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
 * Returns a timestamp of the given date in the required back-end format
 * @param {Date|string} date A valid Date string recognized by formatInTimeZone
 *     (https://www.npmjs.com/package/date-fns-tz#formatintimezone)
 *     or Date to be formatted
 * @return {string} the serialized date (currently YYYY-MM-DDTHH:mm:ss.sssZ)
 *     See: https://tc39.es/ecma262/#sec-date-time-string-format
 */
// const serializeForBackEnd = (date) => {
//   return makeDateFrom(date).toISOString();
// };

const formatInTimeZone = (date, timeZone, formatStr) => {
  return ftz(makeDateFrom(date), timeZone, formatStr);
};

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
