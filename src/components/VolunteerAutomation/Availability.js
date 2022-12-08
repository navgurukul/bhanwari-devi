import React, { useEffect } from "react";
import {
  Grid,
  Typography,
  Container,
  TextField,
  Box,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Stack,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import moment from "moment";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import itLocale from "date-fns/locale/it";

function Availability({ setAvailability, availability, setDisable }) {
  const days = {
    MO: "Mon",
    TU: "Tue",
    WE: "Wed",
    TH: "Thu",
    FR: "Fri",
    SA: "Sat",
    SU: "Sun",
  };

  const handleChange = (e) => {
    setAvailability({ ...availability, [e.target.name]: e.target.value });
  };

  const handleDaySelection = (e) => {
    const index = availability.available_on_days.indexOf(e.target.value);
    if (index === -1) {
      setAvailability({
        ...availability,
        ["available_on_days"]: [
          ...availability.available_on_days,
          e.target.value,
        ],
      });
    } else {
      const dayDeleted = availability.available_on_days.filter(
        (selectedDay) => selectedDay !== e.target.value
      );
      setAvailability({ ...availability, ["available_on_days"]: dayDeleted });
    }
  };

  useEffect(() => {
    console.log(availability);
    if (
      availability.hours_per_week.length > 0 &&
      availability.available_on_days.length > 0
      // &&
      // availability.available_on_time.length > 0
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [availability]);

  console.log("availability", availability);

  return (
    <Container sx={{ mt: 6 }} maxWidth="sm">
      <Typography variant="h6" gutterBottom>
        Please tell us your availability to teach
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        We recommend giving nearly 3 hours per week for about 15 weeks duration.
      </Typography>

      <Box sx={{ mt: 4 }}>
        <TextField
          label="Volunteering Duration (In Weeks)"
          onChange={(e) => handleChange(e)}
          value={availability.hours_per_week}
          name="hours_per_week"
          id="contact"
          variant="outlined"
          fullWidth
        />
      </Box>

      <FormLabel component="legend">
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 4 }}
          // mb={1}
        >
          Available on days
        </Typography>
      </FormLabel>
      <FormGroup aria-label="position" row>
        {Object.keys(days).map((item) => (
          <FormControlLabel
            control={
              <Checkbox
                value={item}
                checked={availability.available_on_days.includes(item)}
                onChange={handleDaySelection}
              />
            }
            // onClick={() => {
            //   setOnInput((prev) => {
            //     return { ...prev, days: true };
            //   });
            // }}
            label={item}
            labelPlacement={item}
          />
        ))}
      </FormGroup>

      <Box sx={{ mt: 3 }}>
        <Typography variant="body2" color="textSecondary">
          Please provide 3 preferred start times in a day (Classes are of 1
          hour)
        </Typography>
        <Grid container mt={2} spacing={0}>
          {[
            { label: "First Start Time", prop: "first_time" },
            { label: "Second Start Time", prop: "second_time" },
            { label: "Third Start Time", prop: "third_time" },
          ].map(({ label, prop }) => (
            <Grid sx={{ mt: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopTimePicker
                  label={label}
                  value={availability.available_on_time[prop]}
                  // onChange={(time) => {
                  //   setAvailability({
                  //     ...availability,
                  //     [prop]: time,
                  //   });
                  // }}
                  onChange={(time) => {
                    console.log("time", time);
                    // let time =  time.getHours() + ":" + time.getMinutes()
                    setAvailability({
                      ...availability,
                      ["available_on_time"]: {
                        ...availability.available_on_time,
                        [prop]: time,
                      },
                    });
                  }}
                  // minTime={
                  //   availability.date === moment().format("YYYY-MM-DD")
                  //     ? new Date(new Date().setSeconds(0))
                  //     : null
                  // }
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default Availability;
