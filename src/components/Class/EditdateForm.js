import React from "react";
import {
  Box,
  Typography,
  Container,
  Stack,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import useStyles from "./styles";
import moment from "moment";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress } from "@mui/material";

function EditdateForm({
  classFields,
  classToEdit,
  setClassFields,
  changeHandler,
  submitHandle,
  buttonDisabled,
  setShowModal,
  isEditMode,
  setIsEditMode,
  loading,
}) {
  const classes = useStyles();

  return (
    <>
      <Stack alignItems="center">
        <Box
          className={classes.ModelBox}
          sx={{
            width: { xs: 330, md: 500 },
            bgcolor: "background.paper",
          }}
          padding={4}
        >
          <Grid container mb={2}>
            <Grid item xs={11}>
              <Typography variant="h6" component="h2">
                Update Class Details
              </Typography>
            </Grid>
            <Grid
              color="text.secondary"
              item
              xs={1}
              className={classes.FormCloseIcon}
            >
              <CloseIcon
                open
                onClick={() => {
                  setShowModal(false);
                  setIsEditMode(false);
                }}
              />
            </Grid>
          </Grid>
          <Typography variant="body2" pt={2} color="gray">
            Batch Name
          </Typography>
          <Typography variant="body1" pt={1}>
            {classToEdit.title}
          </Typography>
          <Typography variant="body2" pt={3} color="gray">
            Class Name
          </Typography>
          <Typography variant="body1" pt={1} pb={4}>
            {classToEdit.sub_title}
          </Typography>
          <TextField
            type="date"
            variant="outlined"
            inputProps={{
              min: moment().format("YYYY-MM-DD"),
            }}
            value={classFields.date}
            name="date"
            label="Start Date"
            fullWidth
            onChange={(e) => {
              changeHandler(e);
            }}
            InputLabelProps={{ shrink: true }}
          />
          <Typography variant="body2" pt={3} color="gray">
            Class Time
          </Typography>
          <Grid container spacing={2} mb={2} pt={3} pb={3}>
            {[
              { label: "Start Time", prop: "start_time" },
              { label: "End Time", prop: "end_time" },
            ].map(({ label, prop }) => (
              <Grid
                item
                xs={
                  // isActive ? 12 :
                  6
                }
              >
                {/* same time for every class */}
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}>
                    <DesktopTimePicker
                      label={label}
                      value={classFields[prop]}
                      onChange={(time) => {
                        setClassFields({
                          ...classFields,
                          [prop]: time,
                        });
                      }}
                      minTime={
                        classFields.date === moment().format("YYYY-MM-DD")
                          ? new Date(new Date().setSeconds(0))
                          : null
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </Grid>
            ))}
          </Grid>
          {loading ? (
            <div style={{ textAlign: "center" }}>
              <CircularProgress color="primary" />
            </div>
          ) : (
            <Button
              variant="contained"
              style={buttonDisabled ? { backgroundColor: "#B3B3B3" } : null}
              fullWidth
              onClick={submitHandle}
              mt={4}
            >
              Update Class Details
            </Button>
          )}
        </Box>
      </Stack>
    </>
  );
}
export default EditdateForm;
