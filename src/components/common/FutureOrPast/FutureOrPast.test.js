import React, { useState, useEffect } from "react";
import { render } from "@testing-library/react";
import FutureOrPast from "./";
// jest.setSystemTime

describe("FutureOrPast", () => {
  const SECOND = 1000; // in milliseconds
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;
  const YEAR = 365 * DAY;
  const MAX_DELAY = 2 ** 31 - 1;

  const checkFutureOrPast = (testTimes) => {
    const { rerender, getByText } = render(<FutureOrPast />);

    testTimes.forEach((testTime) => {
      rerender(
        <FutureOrPast
          //startTime="2022-06-21T03:25:00.000+05:30"
          date={
            new Date(
              new Date().setMilliseconds(
                new Date().getMilliseconds() + testTime
              )
            )
          }
          future={<div>future</div>}
          past={<div>past</div>}
        />
      );

      if (testTime !== 0) {
        expect(getByText(testTime > 0 ? "future" : "past")).toBeInTheDocument();
      }
    });
  };

  it("Should show future element if given date is in the future", () => {
    checkFutureOrPast([
      (Math.floor(Math.random() * 60) + 5) * SECOND,
      7 * HOUR,
      DAY + 3 * HOUR + 5 * MINUTE,
      2 * DAY + HOUR,
      7 * DAY,
      Math.floor(Math.random() * 59 + 1) * MINUTE,
      MAX_DELAY,
      MAX_DELAY + 1,
      YEAR,
    ]);
  });

  it("Should show past element if given date is in the past", () => {
    checkFutureOrPast([
      -(Math.floor(Math.random() * 60) + 5) * SECOND,
      -7 * HOUR,
      -(DAY + 3 * HOUR + 5 * MINUTE),
      -(2 * DAY + HOUR),
      -7 * DAY,
      -Math.floor(Math.random() * 59 + 1) * MINUTE,
      -MAX_DELAY,
      -(MAX_DELAY + 1),
      -YEAR,
    ]);
  });
});
