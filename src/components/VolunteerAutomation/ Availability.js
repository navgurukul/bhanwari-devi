import React from "react";
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

function Availability() {
  const [value, setValue] = React.useState(undefined);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const days = {
    MO: "Mon",
    TU: "Tue",
    WE: "Wed",
    TH: "Thu",
    FR: "Fri",
    SA: "Sat",
    SU: "Sun",
  };

  return (
    <Container sx={{ mt: 6 }} maxWidth="sm">
      <Typography variant="h6" gutterBottom>
        Please tell us your availability to teach
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        We recommend giving about 3 hours per week for about 15 weeks duration
      </Typography>

      <Box sx={{ mt: 4 }}>
        <TextField
          label="Volunteering Duration (In Weeks)"
          //   onChange={}
          //   value={}
          name="contact"
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
                //   checked={classFields.on_days.includes(item)}
                //   onChange={handleDaySelection}
              />
            }
            //   onClick={() => {
            //     setOnInput((prev) => {
            //       return { ...prev, days: true };
            //     });
            //   }}
            label={item}
            labelPlacement={item}
          />
        ))}
      </FormGroup>

      <Box sx={{ mt: 3 }}>
        <Typography variant="body2" color="textSecondary">
          {" "}
          Please provide 3 preferred start times in a day (Classes are of 1
          hour)
        </Typography>
        <Grid container mt={2} spacing={0}>
          {[
            { label: "First Start Time" },
            { label: "Second Start Time" },
            { label: "Third Start Time" },
          ].map(({ label }) => (
            <Grid sx={{ mt: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopTimePicker
                  label={label}
                  // value={classFields[prop]}
                  // onChange={(time) => {
                  //   setClassFields({
                  //     ...classFields,
                  //     [prop]: time,
                  //   });
                  // }}
                  // minTime={
                  //   classFields.date === moment().format("YYYY-MM-DD")
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
