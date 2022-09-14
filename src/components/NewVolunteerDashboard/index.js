import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useStyles from "./style";
import { PATHS } from "../../constant";
import { useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../theme/constant";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Paper,
  Typography,
  TableRow,
  TableHead,
  TextField,
  Container,
  Toolbar,
  Grid,
  Button,
  DialogTitle,
  DialogContent,
  FormControl,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  Collapse,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";

import DownloadIcon from "@mui/icons-material/Download";
import axios from "axios";
import { METHODS } from "../../services/api";
import { format } from "../../common/date";
import Checkbox from "@mui/material/Checkbox";
import TableSortLabel from "@mui/material/TableSortLabel";
import TablePagination from "@mui/material/TablePagination";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { useDebounce } from "use-debounce";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CircleIcon from "@mui/icons-material/Circle";
import { Dialog } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Radio from "@mui/material/Radio";

function NewVolunteerDashboard(props) {
  const classes = useStyles();
  const { onSelectAllClick, numSelected, rowCount } = props;
  const [open, setOpen] = React.useState(false);
  console.log(onSelectAllClick, "onSelectAllClick");
  const limit = 10;
  const [volunteer, setVolunteer] = useState([]);
  const [selctedPathway, setSelectedPathway] = useState("");
  const [slicedVolunteer, setSlicedVolunteer] = useState([]);
  const [cacheVolunteer, setCacheVolunteer] = useState([]);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedText] = useDebounce(searchTerm);
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  {
    /* ------------------------- Functions for Status Modal Starts Here ------------------------- */
  }
  const [statusDialog, setStatusDialog] = useState(false);
  const [status, setStatus] = useState("Active");
  const [statusName, setStatusName] = useState("");
  const handleCloseDialog = () => {
    setStatusDialog(false);
  };
  {
    /* ------------------------- Functions for Status Modal Ends Here ------------------------- */
  }

  const [generateDialog, setGenerateDialog] = useState(false);

  let pageCount = Math.ceil(volunteer && volunteer.length / limit);
  const isSelected = (name) => selected.indexOf(name) !== -1;
  if (selctedPathway) {
    pageCount = Math.ceil(slicedVolunteer && slicedVolunteer.length / limit);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = volunteer.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const user = useSelector(({ User }) => User);

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/volunteers`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
    }).then((res) => {
      setVolunteer(res.data);
      setCacheVolunteer(res.data);
    });
  }, []);
  console.log(volunteer);

  const languageMap = {
    hi: "Hindi",
    te: "Telugu",
    en: "English",
    ta: "Tamil",
  };
  useEffect(() => {
    const data =
      volunteer &&
      volunteer.filter((searchValue) =>
        searchValue.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const slicedData = data.slice(
      rowsPerPage * limit,
      (rowsPerPage + 1) * limit
    );
    // setVolunteer(data);
    setVolunteer(slicedData);
  }, [debouncedText, rowsPerPage]);

  return (
    <div>
      <Container maxWidth="lg">
        <Grid container spacing={1}>
          <Grid item xs={9}>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "black" }} />
                  </InputAdornment>
                ),
              }}
              fullWidth
              type="text"
              placeholder="Name, Batch, Class Title..."
              variant="standard"
              value={debouncedText}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="outlined"
              sx={{
                fontWeight: "600",
                fontSize: "14px",
              }}
              onClick={() => {
                setGenerateDialog(true);
              }}
            >
              Generate Report
              <DownloadIcon sx={{ marginLeft: "10px" }} />
            </Button>
          </Grid>
        </Grid>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="collapsible table">
            <TableHead>
              <TableRow className={classes.tablecontainerow}>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={
                      selected.length > 0 && selected.length < volunteer.length
                    }
                    checked={
                      volunteer.length > 0 &&
                      selected.length === volunteer.length
                    }
                    onChange={handleSelectAllClick}
                    inputProps={{
                      "aria-label": "select all desserts",
                    }}
                  />
                </TableCell>
                {selected.length > 0 ? (
                  <>
                    <TableCell>
                      <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>
                        {selected.length} rows are selected
                      </Typography>
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        setStatusDialog(true);
                      }}
                    >
                      <Typography
                        sx={{ fontWeight: "600", fontSize: "14px" }}
                        color="primary"
                      >
                        Status
                      </Typography>
                    </TableCell>

                    <TableCell colSpan={5}>
                      <Typography
                        sx={{ fontWeight: "600", fontSize: "14px" }}
                        color="error"
                      >
                        Delete
                      </Typography>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>
                      <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>
                        Name
                      </Typography>
                    </TableCell>

                    <TableCell align="left">
                      <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>
                        Last Class Batch
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>
                        Last Class Title
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>
                        Last Class Date
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>
                        Class Language
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>
                        Status
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <MoreVertIcon />
                    </TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {volunteer && volunteer.length > 0 ? (
                volunteer
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => {
                    const isItemSelected = isSelected(item.name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    const sortedClasses =
                      item.classes.length &&
                      item.classes.sort((a, b) => {
                        return new Date(a.start_time) - new Date(b.start_time);
                      });
                    item.last_class_date =
                      sortedClasses.length &&
                      sortedClasses[sortedClasses.length - 1].start_time;

                    return (
                      <>
                        <TableRow
                          key={item.name}
                          // selected={isItemSelected}
                          className={classes.tablebodyrow}
                          sx={{ "& > *": { borderBottom: "unset" } }}
                        >
                          <TableCell
                            hover
                            onClick={(event) => handleClick(event, item.name)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            selected={isItemSelected}
                            padding="checkbox"
                            sx={{ border: "none" }}
                          >
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            hover
                            color="primary"
                            sx={{
                              fontWeight: "400",
                              fontSize: "14px",
                              border: "none",
                              "&:hover": {
                                backgroundColor: "primary.light !important",
                              },
                            }}
                            tabIndex={-1}
                            onClick={() => setOpen(!open)}
                          >
                            {open}
                            {item.name}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: "400",
                              fontSize: "14px",
                              border: "none",
                            }}
                          >
                            {/*
                      {item.classes &&
                      item.classes.length > 0 &&
                      item.classes[item.classes.length - 1]["batch"] != ""
                        ? item.classes[item.classes.length - 1]["batch"]
                        : "-"}
                      */}
                            DVET Nashik Python
                          </TableCell>

                          <TableCell
                            data-column="Last Class Title"
                            sx={{
                              fontWeight: "400",
                              fontSize: "14px",
                              border: "none",
                            }}
                          >
                            {item.classes &&
                            item.classes.length > 0 &&
                            item.classes[item.classes.length - 1]["title"] != ""
                              ? item.classes[item.classes.length - 1]["title"]
                              : "-"}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: "400",
                              fontSize: "14px",
                              border: "none",
                            }}
                          >
                            {format(item.last_class_date, "dd MMM, yyyy")}
                          </TableCell>
                          <TableCell
                            data-column="Last class lang"
                            sx={{ border: "none" }}
                          >
                            {item.classes &&
                            item.classes.length > 0 &&
                            item.classes[item.classes.length - 1]["lang"] != ""
                              ? languageMap[
                                  item.classes[item.classes.length - 1]["lang"]
                                ]
                              : "-"}
                          </TableCell>
                          <TableCell
                            data-column="Status"
                            sx={{
                              fontWeight: "400",
                              fontSize: "14px",
                              border: "none",
                            }}
                          >
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-around",
                              }}
                              onClick={() => {
                                setStatusName(item.name);
                                setStatusDialog(true);
                              }}
                            >
                              <CircleIcon
                                sx={{ fontSize: 12 }}
                                color="success"
                              />
                              {status}
                            </div>
                          </TableCell>
                          <TableCell
                            data-column="three dots"
                            sx={{
                              fontWeight: "400",
                              fontSize: "14px",
                              border: "none",
                            }}
                          >
                            <MoreVertIcon />
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell
                            style={{ paddingBottom: 0, paddingTop: 0 }}
                            colSpan={12}
                          >
                            <Collapse in={open} timeout="auto" unmountOnExit>
                              <Box sx={{ margin: 1 }}>
                                <Typography
                                  variant="h6"
                                  gutterBottom
                                  component="div"
                                  sx={{ display: "flex" }}
                                >
                                  <Avatar src="/broken-image.jpg" />
                                  {item.name}
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                  <TableHead>
                                    <TableRow>
                                      <TableCell sx={{ fontWeight: "bold" }}>
                                        Email
                                      </TableCell>
                                      <TableCell sx={{ fontWeight: "bold" }}>
                                        Phone
                                      </TableCell>
                                      <TableCell
                                        align="right"
                                        sx={{ fontWeight: "bold" }}
                                      >
                                        Duration (In Weeks)
                                      </TableCell>
                                      <TableCell
                                        align="right"
                                        sx={{ fontWeight: "bold" }}
                                      >
                                        Days Available
                                      </TableCell>
                                      <TableCell
                                        align="right"
                                        sx={{ fontWeight: "bold" }}
                                      >
                                        Preferred Time Slots
                                      </TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    <TableRow>
                                      <TableCell
                                        component="th"
                                        scope="row"
                                        sx={{ border: "none" }}
                                      >
                                        {item.email}
                                      </TableCell>
                                      <TableCell sx={{ border: "none" }}>
                                        -
                                      </TableCell>
                                      <TableCell
                                        align="right"
                                        sx={{ border: "none" }}
                                      >
                                        -
                                      </TableCell>
                                      <TableCell
                                        align="right"
                                        sx={{ border: "none" }}
                                      >
                                        {" "}
                                        -
                                      </TableCell>
                                      <TableCell sx={{ border: "none" }}>
                                        {" "}
                                        -{" "}
                                      </TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </>
                    );
                  })
              ) : (
                <div className="message ">
                  <h3>There are no results to display...</h3>
                </div>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={volunteer.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>

      {/* ------------------------- Status Modal Dialog Ends Here ------------------------- */}
      <Dialog
        open={statusDialog}
        onClose={handleCloseDialog}
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
            width: "420px",
            height: "405px",
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
                Change Status
              </Box>
              <Box>
                <IconButton onClick={handleCloseDialog}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>
          </DialogTitle>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginLeft: "22px",
            }}
          >
            <AccountCircleIcon
              sx={{
                height: "48px",
                width: "48px",
              }}
            />
            <span
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginLeft: "8px",
              }}
            >
              {statusName}
            </span>
          </div>
          <div
            style={{
              fontSize: "18px",
              fontWeight: "400",
              marginLeft: "30px",
            }}
          >
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="active"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="active"
                  control={<Radio />}
                  label="Active"
                />
                <FormControlLabel
                  value="inactive"
                  control={<Radio />}
                  label="Inactive"
                />
                <FormControlLabel
                  value="droopedout"
                  control={<Radio />}
                  label="Dropped Out"
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
            Confirm Status
          </Button>
        </div>
      </Dialog>
      {/* ------------------------- Status Modal Dialog Ends Here ------------------------- */}

      {/* ------------------------- Generate Report Starts Here ------------------------- */}
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

            width: "420px",
            height: "458px",

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
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Choose Duration
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="active"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="active"
                  control={<Radio />}
                  label="Last 1 month"
                />
                <FormControlLabel
                  value="inactive"
                  control={<Radio />}
                  label="Last 3 months"
                />
                <FormControlLabel
                  value="droopedout"
                  control={<Radio />}
                  label="Custom"
                />
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
              <FormLabel id="demo-radio-buttons-group-label">
                File Type
              </FormLabel>
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

      {/* ------------------------- Generate Report Ends Here ------------------------- */}
    </div>
  );
}
export default NewVolunteerDashboard;
