import React, { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import {
  format, 
  formatInSameTimeZone, 
  addHours,
  toDateInSameTimeZone,
  getTimestampOffset,
  isOffsetOfLocalTime
} from "../../../common/date";

function TZDesktopTimePicker({
  Container,
  containerProps,
  timestamp,
  timeOffset,
  label,
  minTime,
  onChange,
}) {
  const [time, setTime] = React.useState(new Date(timestamp));
  const offset = timeOffset || getTimestampOffset(timestamp) || '+05:30';
  const shownOffset = isOffsetOfLocalTime(offset) ? '' : `' ${offset} '`;

  React.useEffect(() => {
    setTime(new Date(timestamp));
  }, [timestamp]);

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      dateFormats={{ fullTime12h: 'hh:mm aaa' + shownOffset }}
    >
      <Container {...containerProps}>
        <DesktopTimePicker
          label={label}
          value={timestamp}
          onChange={(time) => {
            setTime(time);
            onChange(time, seralizeForBackend(time));
          }}
          minTime={minTime}
          renderInput={(params) => <TextField {...params} />}
        />
      </Container>
    </LocalizationProvider>
  );
}

export default TZDesktopTimePicker;
