import React, { useState, useEffect } from "react";
import { render } from "@testing-library/react";
import { makeDateFrom } from "../../../common/date.js";
import ClassJoinTimerButton from "./";
// jest.setSystemTime

// Joining should not be allowed until at least 10 minutes before class start
it("Button should be disabled more than 10 minutes before clss start", () => {
  const { getByRole } = render(
    <ClassJoinTimerButton
      startTime="2022-06-20T03:25:00.000+05:30"
      link=""
      joinOnClick={() => true}
    />
  );
  //expect(getByText('Class in')).toBeDisabled();
  expect(getByRole("button")).toBeDisabled();
  //expect(queryByRole())
  //jest.setSystemTime();
  //jest.createSystemTime(makeDateFrom());
  //expect()
});