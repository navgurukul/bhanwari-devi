import React, { useState, useEffect } from "react";
import { render } from "@testing-library/react";
import BeforeOrAfter from "./";
// jest.setSystemTime

describe("BeforeOrAfter", () => {
  const MINUTE = 60; // in seconds
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;
  const YEAR = 365 * DAY;

  const checkBeforeOrAfter = (testTimes) => {
    const { rerender, getByText } = render(<BeforeOrAfter />);

    testTimes.forEach((testTime) => {
      rerender(
        <BeforeOrAfter
          //startTime="2022-06-21T03:25:00.000+05:30"
          date={
            new Date(new Date().setSeconds(new Date().getSeconds() + testTime))
          }
          before={<div>before</div>}
          after={<div>after</div>}
        />
      );

      if (testTime !== 0) {
        expect(
          getByText(testTime > 0 ? "before" : "after")
        ).toBeInTheDocument();
      }
    });
  };

  it("Should show before element if given date is in the future", () => {
    checkBeforeOrAfter([
      Math.floor(Math.random() * 60) + 5,
      7 * HOUR,
      DAY + 3 * HOUR + 5 * MINUTE,
      2 * YEAR + HOUR,
      YEAR,
      Math.floor(Math.random() * 59 + 1) * MINUTE
    ]);
  });

  it("Should show after element if given date is in the past", () => {
    checkBeforeOrAfter([
      -(Math.floor(Math.random() * 60) + 5),
      -7 * HOUR,
      -(DAY + 3 * HOUR + 5 * MINUTE),
      -(2 * YEAR + HOUR),
      -YEAR,
      -Math.floor(Math.random() * 59 + 1) * MINUTE
    ]);
  });
});
