import React, { useState, useEffect } from "react";
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
import dayjs from "dayjs";
import axios from "axios";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../theme/constant";
import CloseIcon from "@mui/icons-material/Close";
import useStyles from "./style";
import { Dayjs } from "dayjs";
import * as XLSX from "xlsx";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import { METHODS } from "../../services/api";
import { useSelector } from "react-redux";
import { CSVLink } from "react-csv";
import { data } from "dom7";

const date = new Date();
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
  } = props;
  const [value, setValue] = React.useState("1");
  const valuee = document.querySelector('[name="duration"]:checked');
  const widthOfMoal = value === "custom" ? "602px" : "458px";
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  // const [startDate, setstartDate] = useState("");
  // const [endTime, setendTime] = useState("");
  // const [volunteerReport, setVolunteerReport] = useState([]);
  const [dataInCSV, setDataInCSV] = useState("");
  const user = useSelector(({ User }) => User);

  //   useEffect(() => {
  //     axios({
  //       method: METHODS.GET,
  //       url: `${process.env.REACT_APP_MERAKI_URL}volunteers?from=${fromStart}&to=${toEnd}}`,
  //       headers: {
  //         accept: "application/json",
  //         Authorization: user.data.token,
  //       },
  //     }).then((res) => {
  //       setVolunteerReport(res.data);

  //   }, [startDate,endTime]);
  // })

  // const Getuser = () => {
  //   axios({
  //     method: METHODS.GET,
  //     url: `${process.env.REACT_APP_MERAKI_URL}volunteers?from=${fromStart}&to=${toEnd}}`,
  //     headers: {
  //       accept: "application/json",
  //       Authorization: user.data.token,
  //     },
  //   }).then(
  //     (res) => {
  //       setVolunteerReport(res.data);
  //     },
  //     [startDate, endTime]
  //   );
  // };
  const fromStart = moment(startDate).format("YYYY-MM-DD");
  const toEnd = moment(endTime).format("YYYY-MM-DD");

  const downloadExcel = () => {
    if (value === "active") {
      const url = window.URL.createObjectURL(new Blob(volunteerReport));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "reportfile.csv");
      document.body.appendChild(link);
      link.click();
    } else {
      const workSheet = XLSX.utils.json_to_sheet(volunteerReport);
      const workBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workBook, workSheet, "volunteer");
      //buffer
      let bef = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
      XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
      XLSX.writeFile(workBook, "volunteerReport.xlsx");
    }
  };

  // useEffect(() => {
  //   volunteerReport.get().then((res) => setDataInCSV(res));
  // }, []);

  var date = new Date().toDateString();
  var threeMonthsAgo = moment().subtract(3, "months");
  var onemonth = moment().subtract(1, "months");

  const headers = [
    { label: "ID", key: "id" },
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Contact", key: "contact" },
    { label: "Classes", key: "classes" },
    { label: "Status", key: "status" },
    { label: "Langauage", key: "lang" },
    { label: "Classes", key: "title" },
  ];

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
                    // sx={{ mb: 4 }}
                    type="date"
                    name="date"
                    label="From Date"
                    value={startDate}
                    sx={{
                      marginTop: "16px",
                    }}
                    fullWidth
                    onChange={(e) => setstartDate(e.target.value)}
                  />
                  {/* <DatePicker
                      views={['day', 'month', 'year']}
                      label="From Date"
                      value={startDate}
                      onChange={(e)=>setstartDate(e.target.value)}
                      renderInput={(params) => <TextField {...params} helperText={null} />}
                    /> */}
                  <TextField
                    type="date"
                    variant="outlined"
                    name="date"
                    label="To Date"
                    value={endTime}
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
          className={!isActive ? classes.dialogBtn : classes.dialogresBtn}
          onClick={() => {
            downloadExcel();
            setGenerateDialog(false);
          }}
        >
          Download
        </Button>
      </div>
    </Dialog>
  );
};

export default GenerateReport;
