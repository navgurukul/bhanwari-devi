import React, { useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import CloseIcon from "@material-ui/icons/Close";
import { lang } from "../../constant";
import useStyles from "./styles";
import {
  Typography,
  Grid,
  Button,
  Box,
  Stack,
  Autocomplete,
  Checkbox,
  FormGroup,
  Radio,
  RadioGroup,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  Container,
} from "@mui/material";
import { breakpoints } from "../../theme/constant";
import useMediaQuery from "@mui/material/useMediaQuery";
import moment from "moment";

const SuccessModel = () => {
  const classes = useStyles();
  return (
    <Stack align="center" className={classes.successModel}>
      <Box className={classes.ModelBox} sx={{ bgcolor: "background.paper" }}>
        <img alt="img" src={require("./assets/ClassCreated.svg")} />
        <Typography variant="body1" mt={4}>
          The batch has been created successfully
        </Typography>
      </Box>
      Please join at least 10 mintues before the scheduled time
    </Stack>
  );
};

function ClassForm({ setShowModal }) {
  const [classFields, setClassFields] = useState({
    category_id: 3,
    title: "",
    partner_id: [],
    date: moment.utc(new Date()).format("YYYY-MM-DD"),
    onDays: [],
    start_time: new Date("2018-01-01T00:00:00.000Z"),
    end_time: new Date("2018-01-01T00:00:00.000Z"),
    lang: "",
    max_enrolment: "",
  });
  const [isClicked, setIsClicked] = useState(false);
  const [display, setDisplay] = useState(false);

  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const classes = useStyles();
  const days = ["MO", "TU", "WE", "TH", "FR", "SU"];
  const capEnrollment = ["No Limit", 10, 20, 30];
  const partnerList = ["p1", "p2", "p3"];

  const changeHandler = (e) => {
    setClassFields({ ...classFields, [e.target.name]: e.target.value });
  };

  // console.log("classFields", classFields);

  const handleDaySelection = (e) => {
    const index = classFields.onDays.indexOf(e.target.value);
    if (index === -1) {
      setClassFields({
        ...classFields,
        ["onDays"]: [...classFields.onDays, e.target.value],
      });
    } else {
      const dayDeleted = classFields.onDays.filter(
        (selectedDay) => selectedDay !== e.target.value
      );
      setClassFields({ ...classFields, ["onDays"]: dayDeleted });
    }
  };

  const submitHandle = () => {
    setIsClicked(true);
    // This function will be calling by clicking on create batch button,
    // created class successfully modal should open when click on create batch button
  };

  const handleFocus = (event) => {
    event.preventDefault();
    const { target } = event;
    // const extensionStarts = target.value;
    // setDisplay(extensionStarts);
    if (classFields.title === "") {
      setDisplay(true);
    }

    // console.log( extensionStarts);
    // error={extensionStarts && classFields.title === ""}
    // helperText={classFields.title === "" ? 'Add some data' : ' '}
  };

  return (
    <>
      <Stack alignItems="center">
        <Box
          className={classes.ModelBox}
          sx={{
            width: { xs: 330, md: 500 },
            bgcolor: "background.paper",
          }}
        >
          <Grid container mb={4}>
            <Grid item xs={11}>
              <Typography variant="h6" component="h2">
                Create Batch
              </Typography>
            </Grid>
            <Grid item xs={1} className={classes.FormCloseIcon}>
              <CloseIcon
                color="text.secondary"
                open
                onClick={() => {
                  setShowModal(false);
                }}
              />
            </Grid>
          </Grid>
          <div>
            <TextField
              fullWidth
              label="Batch Name"
              name="title"
              value={classFields.title}
              onChange={(e) => {
                changeHandler(e);
              }}
              onFocus={handleFocus}
              error={display && classFields.title === ""}
              // error={ classFields.title === ""}
              helperText={
                display && (classFields.title === "" ? "Add some data" : " ")
              }
            />

            <Typography variant="body2" color="text.secondary" mb={3} mt={3}>
              We will automatically create 28 classes for a Python batch with
              titles and descriptions
            </Typography>
          </div>
          <div>
            <Stack>
              <Autocomplete
                multiple
                value={classFields.partner_id}
                name="partner_id"
                options={partnerList}
                getOptionLabel={(option) => option}
                onChange={(event, value) => {
                  setClassFields({ ...classFields, ["partner_id"]: value });
                }}
                freeSolo
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="For Partner"
                  />
                )}
              />
            </Stack>
            <Typography variant="body2" color="text.secondary" mt={3}>
              This batch will be visible to students of only these partner
            </Typography>
          </div>
          <TextField
            sx={{ mt: 3 }}
            type="date"
            variant="outlined"
            value={classFields.date}
            name="date"
            label="Start Date"
            fullWidth
            onChange={(e) => {
              changeHandler(e);
            }}
          />
          <div>
            <FormLabel component="legend">
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ pt: 3 }}
                mb={2}
              >
                Schedule on days
              </Typography>
            </FormLabel>
            <FormGroup aria-label="position" row>
              {days.map((item) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      value={item}
                      checked={classFields.onDays.includes(item)}
                      onChange={handleDaySelection}
                    />
                  }
                  label={item}
                  labelPlacement={item}
                />
              ))}
            </FormGroup>
          </div>
          <Grid container mt={2} spacing={2}>
            <Grid item xs={isActive ? 12 : 6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <DesktopTimePicker
                    label="Start Time"
                    value={classFields.start_time}
                    onChange={(startTime) => {
                      setClassFields({
                        ...classFields,
                        ["start_time"]: startTime,
                      });
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={isActive ? 12 : 6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <DesktopTimePicker
                    label="End-Time"
                    value={classFields.end_time}
                    onChange={(endTime) => {
                      setClassFields({ ...classFields, ["end_time"]: endTime });
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </Grid>
          </Grid>
          <div>
            <Box display="flex" justifyContent="start">
              <FormControl>
                <FormLabel sx={{ mt: 3, mb: 2 }}>Language</FormLabel>
                <RadioGroup value={classFields.lang?.index} row>
                  {Object.keys(lang)?.map((item) => {
                    if (item !== "mr") {
                      return (
                        <FormControlLabel
                          key={item}
                          value={item}
                          name="lang"
                          control={<Radio />}
                          onChange={(e) => {
                            changeHandler(e);
                          }}
                          label={lang[item]}
                        />
                      );
                    }
                  })}
                </RadioGroup>
              </FormControl>
            </Box>
          </div>
          <div>
            <FormControl sx={{ mb: 4, mt: 2 }}>
              <RadioGroup row>
                <Typography variant="body1" pt={1} pr={2}>
                  Cap enrollments at
                </Typography>
                {capEnrollment?.map((item) => {
                  return (
                    <FormControlLabel
                      key={item}
                      value={item}
                      name="max_enrolment"
                      control={<Radio />}
                      label={item}
                      onChange={(e) => {
                        changeHandler(e);
                      }}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
          </div>
          <Button variant="contained" fullWidth onClick={submitHandle}>
            Create Batch
          </Button>
        </Box>
      </Stack>
      {isClicked && <SuccessModel />}
    </>
  );
}

export default ClassForm;
