import React, { useState, useEffect } from "react";
import { render } from "@testing-library/react";
// import { act } from "react-dom/test-utils";
// import { makeDateFrom } from "../../../common/date.js";
import ClassJoinTimerButton from "./";
// jest.setSystemTime

describe("ClassJoinTimerButton", () => {
  // Joining should not be allowed until at least 10 minutes before class start
  it("Button should be disabled more than 10 minutes before class start", () => {
    const { rerender, getByRole } = render(<ClassJoinTimerButton />);
    //const timerButton = getByRole("button");
    const MINUTE = 60; // in seconds
    const HOUR = 60 * MINUTE;
    const DAY = 24 * HOUR;
    const YEAR = 365 * DAY;

    const testTimes = [
      20 * MINUTE,
      7 * HOUR,
      DAY + 3 * HOUR + 5 * MINUTE,
      2 * YEAR + HOUR,
      YEAR,
      11 * MINUTE + Math.floor(Math.random() * 60)
    ];

    for (let i = 0; i < testTimes.length; i++) {
      rerender(
        <ClassJoinTimerButton
          //startTime="2022-06-21T03:25:00.000+05:30"
          startTime={
            new Date(
              new Date().setSeconds(new Date().getSeconds() + testTimes[i])
            )
          }
          link=""
          joinOnClick={() => true}
        />
      );

      expect(getByRole("button")).toBeDisabled();
    }
    //expect(getAllByRole("button")[index]).toBeDisabled();

    //expect(getByText('Class in')).toBeDisabled();
    //expect(queryByRole())
    //console.log(jest);
    //jest.useFakeTimers('modern')
    //jest.setSystemTime();
    //jest.createSystemTime(makeDateFrom());
    //expect()
  });

  // Joining should be allowed 10 minutes before class start or later
  it("Button should be enabled 10 minutes before class start or later", () => {
    const { rerender, getByRole } = render(<ClassJoinTimerButton />);
    //const timerButton = getByRole("button");
    const MINUTE = 60; // in seconds
    const HOUR = 60 * MINUTE;

    const testTimes = [
      10 * MINUTE,
      -10 * MINUTE,
      0,
      -5 * MINUTE + Math.floor(Math.random() * 60),
      -30 * MINUTE + Math.floor(Math.random() * 60),
      Math.floor(Math.random() * 60),
      9 * MINUTE + Math.floor(Math.random() * 60)
    ];

    for (let i = 0; i < testTimes.length; i++) {
      rerender(
        <ClassJoinTimerButton
          //startTime="2022-06-21T03:25:00.000+05:30"
          startTime={
            new Date(
              new Date().setSeconds(new Date().getSeconds() + testTimes[i])
            )
          }
          link=""
          joinOnClick={() => true}
        />
      );

      expect(getByRole("button")).toBeEnabled();
    }
  });
});
