import { format as dateFnsFormat, intervalToDuration} from "date-fns";

/**
 * Returns the time left until the given date or a warning or expiration if the
 *     date is within a specified amount of time at or before now
 * @param {string|Date} A valid Date string recognized by Date.parse or Date
 *     representing the Date to determine the time remaining
 * @param {{expiredText: (string|undefined),
 *     precision: (Array<number>|undefined),
 *     cutoffText: (string|undefined),
 *     cutoffNum: (num|undefined)}=} options The options for the string
 *     formatting.  expiredText is what's shown if the Date is now or past.
 *     precision[i] is the desired number of places to show when the ith item
 *     in [years, months, days, hours, minutes, seconds] is the largest
 *     non-zero unit in the time remaining (e.g., if precision[2] = 3), then
 *     when the time remaining starts with days, days, minutes, and hours will
 *     be displayed.  cutoffText is what's shown if the Date is within the 
 *     cutoffNum of units (rounded down) whose next smallest unit has a 
 *     precision of 0 (or seconds).  For example, if there's a 0 in the minutes 
 *     place and cutoffNum is 5, anything less than 6 hours will cause the 
 *     cutoffText to be shown.  If cutoffNum is 5, then 5 seconds or less will
 *     cause the cutoffText to be shown
 * @return {string} the time remaining or warning or expiration text
 */

const timeLeft = (
  date,
  {
    expiredText = 'expired',
    precision = [6, 5, 4, 3, 2, 1],
    cutoffText = 'warning',
    cutoffNum = 0,
  } = {
    expiredText: 'expired',
    precision: [6, 5, 4, 3, 2, 1],
    cutoffText: 'warning',
    cutoffNum: 0,
  }
) => {
  const targetDate = new Date(date);
  const now = new Date();

  if (targetDate <= now) {
    return expiredText;
  }

  const timeRemaining = intervalToDuration({
    start: new Date(),
    end: new Date(date),
  });
  const { years, months, days, hours, minutes, seconds } = timeRemaining;
  const units = [years, months, days, hours, minutes, seconds];
  const abbreviations = ['yr', 'mo', 'day', 'hr', 'min', 'sec'];
  const indexOfLeadingUnit = units.findIndex((num) => num > 0);

  if (
    (indexOfLeadingUnit === units.length - 1 ||
      precision[indexOfLeadingUnit + 1] === 0) &&
    units[indexOfLeadingUnit] <= cutoffNum
  ) {
    return cutoffText;
  } else {
    return units
      .slice(
        indexOfLeadingUnit,
        indexOfLeadingUnit + precision[indexOfLeadingUnit]
      )
      .map(
        (num, index) =>
          `${num} ${abbreviations[index + indexOfLeadingUnit]}${
            num !== 1 ? 's' : ''
          }`
      )
      .join(' ');
  }
};

const format = (date, format, options) => {
  return dateFnsFormat(new Date(date), format, options);
};

module.exports = { timeLeft, format };