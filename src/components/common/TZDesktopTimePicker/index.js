import React, { useEffect, useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { TextField } from "@mui/material";
import {
  format,
  formatInTimeZone,
  formatInSameTimeZone,
  addHours,
  toDateInSameTimeZone,
  getTimestampOffset,
  isOffsetOfLocalTime,
  serializeTimeForBackEnd,
  translateTimeFromLocal,
  translateTimeToLocal,
  getLocalTimezoneOffset,
  getDefaultDisplayTimestampOffset
} from "../../../common/date";

function TZDesktopTimePicker({
  Container,
  containerProps,
  timestamp,
  timeOffset,
  label,
  minTime,
  onChange
}) {
  // const [time, setTime] = React.useState(new Date(timestamp));
  // const [formatError, setFormatError] = React.useState(false);
  // const offset = timeOffset || getTimestampOffset(timestamp);
  const offset = timeOffset || getDefaultDisplayTimestampOffset(timestamp);
  // only show offset if it differs from local time offset
  const shownOffset = isOffsetOfLocalTime(offset, timestamp)
    ? ""
    : ` ${offset}`;
  // const formattedTimestamp = `'${formatInTimeZone(timestamp, offset, 'hh:mm aaa')}${shownOffset}`;

  // React.useEffect(() => {
  //   setTime(new Date(timestamp));
  // }, [timestamp]);

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      //dateFormats={{ fullTime12h: 'hh:mm aaa' + shownOffset }}
      //dateFormats={{ fullTime12h: `'` + formatInTimeZone(timestamp, offset, 'hh:mm aaa') + `'` + shownOffset }}
      //dateFormats={{ fullTime12h: formattedTimestamp }}
    >
      <Container {...containerProps}>
        <DesktopTimePicker
          label={label}
          value={translateTimeToLocal(timestamp, offset)}
          onChange={(time, error) => {
            //console.log("ITZ", time, offset, formatInTimeZone(time, offset));
            // console.log("is Date", time instanceof Date, serializeTimeForBackEnd(time), formatAsSameTimeInZone(time, offset));
            //setTime(time);
            try {
              if (!error) {
                onChange(
                  translateTimeFromLocal(time, offset),
                  serializeTimeForBackEnd(time)
                );
                // setFormatError(false);
              } else {
                // setFormatError(true);
                // console.log("Error", error);
              }
            } catch (e) {
              // console.log("ERROR", e, error);
              // onChange(timestamp, serializeTimeForBackEnd(timestamp));
            }
          }}
          minTime={minTime}
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {shownOffset}
                    {params.InputProps.endAdornment}
                  </>
                )
              }}
            />
          )}
        />
      </Container>
    </LocalizationProvider>
  );
}

export default TZDesktopTimePicker;
