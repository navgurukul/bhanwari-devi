import React, { useState, useEffect } from "react";
import { render } from "@testing-library/react";
import FutureOrPast from "./";
// jest.setSystemTime

describe("FutureOrPast", () => {
  const MINUTE = 60; // in seconds
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;
  const YEAR = 365 * DAY;

  const checkFutureOrPast = (testTimes) => {
    const { rerender, getByText } = render(<FutureOrPast />);

    testTimes.forEach((testTime) => {
      rerender(
        <FutureOrPast
          //startTime="2022-06-21T03:25:00.000+05:30"
          date={
            new Date(new Date().setSeconds(new Date().getSeconds() + testTime))
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
      Math.floor(Math.random() * 60) + 5,
      7 * HOUR,
      DAY + 3 * HOUR + 5 * MINUTE,
      2 * DAY + HOUR,
      7 * DAY,
      Math.floor(Math.random() * 59 + 1) * MINUTE,
    ]);
  });

  it("Should show past element if given date is in the past", () => {
    checkFutureOrPast([
      -(Math.floor(Math.random() * 60) + 5),
      -7 * HOUR,
      -(DAY + 3 * HOUR + 5 * MINUTE),
      -(2 * DAY + HOUR),
      -7 * DAY,
      -Math.floor(Math.random() * 59 + 1) * MINUTE,
    ]);
  });
});
