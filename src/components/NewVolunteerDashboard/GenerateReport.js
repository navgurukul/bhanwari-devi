import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { Dayjs } from "dayjs";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";

const GenerateReport = (props) => {
  const { generateDialog, setGenerateDialog } = props;
  const [value, setValue] = React.useState("1");

  const valuee = document.querySelector('[name="duration"]:checked');
  const widthOfMoal = value === "custom" ? "602px" : "458px";

  return (
    <Dialog
      open={generateDialog}
      onClose={() => {
        setGenerateDialog(false);
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "32px",
          gap: "32px",
          height: `${widthOfMoal}`,
          width: "420px",
          borderRadius: "8px",
        }}
      >
        <DialogTitle id="id">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              width: "356px",
            }}
          >
            <Box
              flexGrow={1}
              sx={{
                fontWeight: "600",
                fontSize: "24px",
              }}
            >
              Generate Report
            </Box>
            <Box>
              <IconButton
                onClick={() => {
                  setGenerateDialog(false);
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        <div
          style={{
            fontSize: "18px",
            fontWeight: "400",
            marginLeft: "30px",
          }}
        >
          <FormControl name="duration">
            <FormLabel id="demo-radio-buttons-group-label">
              Choose Duration
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              value={value}
              name="radio-buttons-group"
              onChange={(e) => {
                setValue(e.target.value);
              }}
            >
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="Last 1 month"
              />
              <FormControlLabel
                value="3"
                control={<Radio />}
                label="Last 3 months"
              />
              <FormControlLabel
                value="custom"
                control={<Radio />}
                label="Custom"
              />
              {value === "custom" && (
                <div>
                  <TextField
                    // sx={{ mb: 4 }}
                    type="date"
                    variant="outlined"
                    inputProps={{
                      min: moment().format("YYYY-MM-DD"),
                    }}
                    name="date"
                    label="From Date"
                    value={moment().format("YYYY-MM-DD")}
                    sx={{
                      marginTop: "16px",
                    }}
                    fullWidth
                  />
                  <TextField
                    // sx={{ mb: 4 }}
                    type="date"
                    variant="outlined"
                    inputProps={{
                      min: moment().format("YYYY-MM-DD"),
                    }}
                    name="date"
                    label="To Date"
                    value={moment().format("YYYY-MM-DD")}
                    sx={{
                      marginTop: "16px",
                    }}
                    fullWidth
                  />
                </div>
              )}
            </RadioGroup>
          </FormControl>
        </div>
        <div
          style={{
            fontSize: "18px",
            fontWeight: "400",
            marginLeft: "30px",
          }}
        >
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">File Type</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="active"
              name="radio-buttons-group"
              row
            >
              <FormControlLabel
                value="active"
                control={<Radio />}
                label=".csv"
              />
              <FormControlLabel
                value="inactive"
                control={<Radio />}
                label=".xlsx"
                sx={{
                  marginLeft: "8px",
                }}
              />
            </RadioGroup>
          </FormControl>
        </div>
        <Button
          variant="contained"
          color="primary"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: "8px 16px",
            gap: "10px",
            margin: "auto",
            width: "356px",
            height: "48px",
          }}
        >
          Download
        </Button>
      </div>
    </Dialog>
  );
};

export default GenerateReport;
