import React, { useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import CloseIcon from "@material-ui/icons/Close";
import {
  Typography,
  Grid,
  Button,
  Box,
  Modal,
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
} from "@mui/material";
import { breakpoints } from "../../theme/constant";
import useMediaQuery from "@mui/material/useMediaQuery";
import moment from "moment";

function ClassFormModel() {
  const [batchName, setBatchName] = useState("");
  const [date, setDate] = useState(moment.utc(new Date()).format("YYYY-MM-DD"));
  const [startTime, setStartTime] = React.useState(
    new Date("2018-01-01T00:00:00.000Z")
  );
  const [endTime, setEndTime] = React.useState(
    new Date("2018-01-01T00:00:00.000Z")
  );
  const [selectedLang, setSelectedLang] = useState("");
  const [day, setDay] = useState([]);
  const [capEnrollmentData, setcapEnrollmentData] = useState("");
  const [newPartnerList, setNewPartnerList] = useState([]);
  const [open, setOpen] = React.useState(true);

  const rootRef = React.useRef(null);
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  const days = ["MO", "TU", "WE", "TH", "FR", "SU"];
  const language = ["English", "Hindi", "Telugu", "Tamil"];
  const capEnrollment = ["No Limit", "10", "20", "30"];
  const partnerList = ["p1", "p2", "p3"];

  // console.log(batchName,date,startTime,endTime,selectedLang,day,capEnrollmentData,newPartnerList);

  const handleDaySelection = (checkedDay) => {
    const index = day.indexOf(checkedDay.target.value);
    if (index === -1) {
      setDay([...day, checkedDay.target.value]);
    } else {
      setDay(
        day.filter((selectedDay) => selectedDay !== checkedDay.target.value)
      );
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        height: 990,
        flexGrow: 1,
        minWidth: 320,
        transform: "translateZ(0)",
        "@media all and (-ms-high-contrast: none)": {
          display: "none",
        },
      }}
      ref={rootRef}
    >
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open={open}
        sx={{
          display: "flex",
          p: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
        container={() => rootRef.current}
      >
        <Box
          sx={{
            width: 500,
            bgcolor: "background.paper",
            p: 4,
          }}
        >
          <div>
            <Grid container mb={4}>
              <Grid item xs={11}>
                <Typography variant="h6" component="h2">
                  Create Batch
                </Typography>
              </Grid>
              <Grid
                item
                xs={1}
                sx={{
                  dispay: "flex",
                  alignItems: "flex-end",
                  cursor: "pointer",
                }}
              >
                <CloseIcon color="text.secondary" open onClick={handleClose} />
              </Grid>
            </Grid>
          </div>
          <div>
            <TextField
              fullWidth
              label="Batch Name"
              defaultValue="Ankit_2022"
              value={batchName}
              onChange={(e) => {
                setBatchName(e.target.value);
              }}
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
                value={newPartnerList}
                options={partnerList}
                getOptionLabel={(option) => option}
                onChange={(event, value) => setNewPartnerList(value)}
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
            value={date}
            label="Start Date"
            fullWidth
            onChange={(e) => {
              setDate(e.target.value);
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
                      checked={day.includes(item)}
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
                    value={startTime}
                    onChange={(newStartTime) => {
                      setStartTime(newStartTime);
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
                    value={endTime}
                    // defaultValue = "End-Time"
                    onChange={(newEndTime) => {
                      setEndTime(newEndTime);
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
                <RadioGroup value={selectedLang?.index} row>
                  {language?.map((item) => {
                    return (
                      <FormControlLabel
                        key={item}
                        sx={{ fontWeight: 20 }}
                        value={item}
                        control={<Radio />}
                        onClick={() => {
                          setSelectedLang(item);
                        }}
                        label={item}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
            </Box>
          </div>
          <div>
            <FormControl sx={{ mb: 4, mt: 2 }}>
              <RadioGroup row value={capEnrollmentData?.index}>
                <Typography variant="body1" pt={1} pr={2}>
                  Cap enrollments at
                </Typography>
                {capEnrollment?.map((item) => {
                  return (
                    <FormControlLabel
                      key={item}
                      value={item}
                      control={<Radio />}
                      label={item}
                      onClick={() => {
                        setcapEnrollmentData(item);
                      }}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
          </div>
          <Button variant="contained" fullWidth>
            Create Batch
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default ClassFormModel;
