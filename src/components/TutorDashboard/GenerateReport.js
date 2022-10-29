import React, { useState } from "react";
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
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../theme/constant";
import CloseIcon from "@mui/icons-material/Close";
import useStyles from "./style";
import * as XLSX from "xlsx";
import moment from "moment";
import { format } from "../../common/date";
import { CSVLink } from "react-csv";

const GenerateReport = (props) => {
  var d = new Date();
  const classes = useStyles();

  const {
    generateDialog,
    setGenerateDialog,
    startDate,
    endTime,
    setstartDate,
    setendTime,
    volunteerReport,
    numberOfWeek,
    languageMap,
  } = props;

  const [value, setValue] = React.useState("1");
  const widthOfMoal = value === "custom" ? "602px" : "458px";
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const [selectedOption, setSelectedOption] = useState("active");

  var wscols = [
    { wch: 10 },
    { wch: 18 },
    { wch: 18 },
    { wch: 15 },
    { wch: 18 },
    { wch: 18 },
    { wch: 18 },
    { wch: 17 },
    { wch: 10 },
    { wch: 17 },
    { wch: 10 },
    { wch: 10 },
    { wch: 15 },
  ];

  const volunteerReportData = volunteerReport.map((el) => {
    return {
      "Tutor ID": el.id,
      Name: el.name,
      Email: el.email,
      "Phone No": el.contact,
      "Pathway ID": el.pathway_id,
      Partner: el.partner,
      "Last Class Batch":
        el.classes &&
        el.classes.length > 0 &&
        el.classes[el.classes.length - 1]["title"]
          .toLowerCase()
          .includes("batch".toLowerCase())
          ? el.classes[el.classes.length - 1]["title"]
          : "-",
      "Last Class Title":
        el.classes &&
        el.classes.length > 0 &&
        !el.classes[el.classes.length - 1]["title"]
          .toLowerCase()
          .includes("batch".toLowerCase())
          ? el.classes[el.classes.length - 1]["title"]
          : "-",
      "Last Class Date": format(el.last_class_date, "dd MMM, yyyy"),
      "Class Language":
        el.classes &&
        el.classes.length > 0 &&
        el.classes[el.classes.length - 1]["lang"] != ""
          ? languageMap[el.classes[el.classes.length - 1]["lang"]]
          : "-",
      Status:
        el.status === "active"
          ? "Active"
          : el.status === "inactive"
          ? "In Active"
          : el.status === "dropout"
          ? "Dropped Out"
          : "Newly Onboarded",
      "Duration (in weeks)": numberOfWeek(el),
      "Days Available":
        el.available_on_days === null ? "-" : el.available_on_days,
      "Preffered Time Slots":
        el.available_on_time === null
          ? "-"
          : format(el.available_on_time, "hh:mm aaa"),
    };
  });

  const dataForCSV = volunteerReport.map((el) => {
    return {
      tutorId: el.id,
      name: el.name,
      email: el.email,
      phoneNo: el.contact,
      pathwayId: el.pathway_id,
      partner: el.partner,
      lastClassBatch:
        el.classes &&
        el.classes.length > 0 &&
        el.classes[el.classes.length - 1]["title"]
          .toLowerCase()
          .includes("batch".toLowerCase())
          ? el.classes[el.classes.length - 1]["title"]
          : "-",
      lastClassTitle:
        el.classes &&
        el.classes.length > 0 &&
        !el.classes[el.classes.length - 1]["title"]
          .toLowerCase()
          .includes("batch".toLowerCase())
          ? el.classes[el.classes.length - 1]["title"]
          : "-",
      lastClassDate: format(el.last_class_date, "dd MMM, yyyy"),
      classLanguage:
        el.classes &&
        el.classes.length > 0 &&
        el.classes[el.classes.length - 1]["lang"] != ""
          ? languageMap[el.classes[el.classes.length - 1]["lang"]]
          : "-",
      status:
        el.status === "active"
          ? "Active"
          : el.status === "inactive"
          ? "In Active"
          : el.status === "dropout"
          ? "Dropped Out"
          : "Newly Onboarded",
      duration: numberOfWeek(el),
      daysAvailable: el.available_on_days === null ? "-" : el.available_on_days,
      prefferedTimeSlots:
        el.available_on_time === null
          ? "-"
          : format(el.available_on_time, "hh:mm aaa"),
    };
  });

  const headersForCSV = [
    { label: "Tutor ID", key: "tutorId" },
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Phone No", key: "phoneNo" },
    { label: "Pathway ID", key: "pathwayId" },
    { label: "Partner", key: "partner" },
    { label: "Last Class Batch", key: "lastClassBatch" },
    { label: "Last Class Title", key: "lastClassTitle" },
    { label: "Last Class Date", key: "lastClassDate" },
    { label: "Class Language", key: "classLanguage" },
    { label: "Status", key: "status" },
    { label: "Duration (in weeks)", key: "duration" },
    { label: "Days Available", key: "daysAvailable" },
    { label: "Preffered Time Slots", key: "prefferedTimeSlots" },
  ];

  const csvReport = {
    data: dataForCSV,
    headers: headersForCSV,
    filename: "VolunteerReport.csv",
  };

  const downloadExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(volunteerReportData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "volunteer");
    // set width of columns
    workSheet["!cols"] = wscols;
    //buffer
    let bef = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "tutorReport.xlsx");
  };
  var date = new Date().toDateString();
  var threeMonthsAgo = moment().subtract(3, "months");
  var onemonth = moment().subtract(1, "months");

  return (
    <Dialog
      open={generateDialog}
      onClose={() => {
        setGenerateDialog(false);
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={isActive && classes.dialog}
    >
      <div
        style={{
          height: `${widthOfMoal}`,
        }}
        className={isActive ? classes.dialogresponsie : classes.dialogTypo}
      >
        <DialogTitle id="id">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              width: isActive ? "260px" : "356px",
            }}
          >
            <Box
              flexGrow={1}
              sx={{
                fontWeight: "600",
                fontSize: isActive ? "18px" : "24px",
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
                onClick={() => {
                  setstartDate(onemonth);
                  setendTime(date);
                }}
              />
              <FormControlLabel
                value="3"
                control={<Radio />}
                label="Last 3 months"
                onClick={() => {
                  setstartDate(threeMonthsAgo);
                  setendTime(date);
                }}
              />
              <FormControlLabel
                value="custom"
                control={<Radio />}
                label="Custom"
              />
              {value === "custom" && (
                <div>
                  <TextField
                    type="date"
                    name="date"
                    value={startDate}
                    sx={{
                      marginTop: "16px",
                    }}
                    label="From Date"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    onChange={(e) => setstartDate(e.target.value)}
                  />
                  <TextField
                    type="date"
                    variant="outlined"
                    name="date"
                    value={endTime}
                    label="To Date"
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      marginTop: "16px",
                    }}
                    fullWidth
                    onChange={(e) => setendTime(e.target.value)}
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
              defaultValue={selectedOption}
              name="radio-buttons-group"
              row
            >
              <FormControlLabel
                value="active"
                control={<Radio />}
                label=".csv"
                onClick={() => {
                  setSelectedOption("active");
                }}
              />
              <FormControlLabel
                value="inactive"
                control={<Radio />}
                label=".xlsx"
                sx={{
                  marginLeft: "8px",
                }}
                onClick={() => {
                  setSelectedOption("inactive");
                }}
              />
            </RadioGroup>
          </FormControl>
        </div>
        {selectedOption === "inactive" ? (
          <Button
            variant="contained"
            color="primary"
            className={!isActive ? classes.dialogBtn : classes.dialogresBtn}
            onClick={() => {
              downloadExcel();
              setGenerateDialog(false);
            }}
          >
            Download
          </Button>
        ) : (
          <CSVLink
            {...csvReport}
            style={{
              color: "white",
              textDecoration: "none",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              className={!isActive ? classes.dialogBtn : classes.dialogresBtn}
              onClick={() => {
                setGenerateDialog(false);
              }}
            >
              Download
            </Button>
          </CSVLink>
        )}
      </div>
    </Dialog>
  );
};

export default GenerateReport;
