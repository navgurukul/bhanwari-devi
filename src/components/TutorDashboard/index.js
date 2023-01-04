import React, { useEffect, useState } from "react";
import useStyles from "./style";
import { useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../theme/constant";
import moment from "moment";
import { BaseURL } from "./BaseURL";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

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
  Grid,
  Button,
  Collapse,
  FormControl,
  InputLabel,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import DownloadIcon from "@mui/icons-material/Download";
import axios from "axios";
import { METHODS } from "../../services/api";
import { format } from "../../common/date";
import Checkbox from "@mui/material/Checkbox";
import TablePagination from "@mui/material/TablePagination";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { useDebounce } from "use-debounce";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CircleIcon from "@mui/icons-material/Circle";
import GenerateReport from "./GenerateReport";
import ChangeStatusModal from "./ChangeStatusModal";
import MenuItem from "@mui/material/MenuItem";
import MenuComponent from "./MenuComponent";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Select } from "@material-ui/core";
import { fontSize } from "@mui/system";

function isAll(val) {
  return val === "All";
}

function getBaseURL(
  startDate,
  endTime,
  statusFilter,
  searchTerm,
  langFilter,
  pathway
) {
  const baseURL = new BaseURL();

  /*Joining dates if present */
  let flag = false;
  if (startDate && endTime) {
    const fromStart = moment(startDate).format("YYYY-MM-DD");
    const toEnd = moment(endTime).format("YYYY-MM-DD");
    baseURL.setDates(fromStart, toEnd);
    flag = true;
  }

  if (statusFilter !== "All" || searchTerm || langFilter !== "All") {
    /*If joined a query earlier (date), attach & for next query*/
    if (flag) baseURL.setAmpersand();
    flag = true;

    switch (true) {
      /*If status and language both NOT present*/
      case isAll(statusFilter) && isAll(langFilter):
        baseURL.setFilterSearch("", searchTerm, "");
        break;
      /*If only status is present */
      case isAll(statusFilter):
        baseURL.setFilterSearch("", searchTerm, langFilter);
        break;
      /*If only language is present */
      case isAll(langFilter):
        baseURL.setFilterSearch(statusFilter, searchTerm, "");
        break;
      /*If both status and language ARE PRESENT */
      case !isAll(langFilter) && !isAll(langFilter):
        baseURL.setFilterSearch(statusFilter, searchTerm, langFilter);
        break;
    }
  }

  if (pathway) {
    if (flag) {
      baseURL.setAmpersand();
    } else {
      baseURL.setQuestion();
    }

    if (pathway === "Python") {
      baseURL.setPathway(1);
    } else if (pathway === "Spoken English") {
      baseURL.setPathway(2);
    }
  }

  return baseURL.URL;
}

function Tutor(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);

  const limit = 10;
  const [volunteer, setVolunteer] = useState([]);
  const [selectedPathway, setSelectedPathway] = useState("Python");
  const [pathwayCount, setPathwayCount] = useState({
    python: 0,
    spokenEnglish: 0,
  });
  const [slicedVolunteer, setSlicedVolunteer] = useState([]);
  const [cacheVolunteer, setCacheVolunteer] = useState([]);
  const [selected, setSelected] = React.useState([]);
  const [rowSelected, setRowSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedText] = useDebounce(searchTerm, 400);
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const isActiveIpad = useMediaQuery("(max-width:1300px)");
  const [filter, setFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [langFilter, setLangFilter] = useState("All");
  const [statusDialog, setStatusDialog] = useState(false);
  const [status, setStatus] = useState("All");
  const [statusName, setStatusName] = useState("");
  const [statusId, setStatusId] = useState([""]);
  const [generateDialog, setGenerateDialog] = useState(false);
  const [delfun, setdelFun] = useState(false);
  const [startDate, setstartDate] = useState("");
  const [endTime, setendTime] = useState("");
  const [slicedStudents, setSlicedStudents] = useState([]);
  const [statusValue, setStatusValue] = useState("");

  const languageMap = {
    hi: "Hindi",
    te: "Telugu",
    en: "English",
    ta: "Tamil",
  };
  let pageCount = Math.ceil(volunteer && volunteer.length / limit);
  const isRowSelected = (name) => rowSelected.indexOf(name) !== -1;
  if (selectedPathway) {
    pageCount = Math.ceil(volunteer && volunteer.length / limit);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  function filterPathway(pathwayId, volunteer) {
    return volunteer.filter((el) => {
      return el.pathway_id === pathwayId;
    });
  }

  const deleteUsers = () => {
    return axios({
      url: `${process.env.REACT_APP_MERAKI_URL}/volunteers`,
      method: METHODS.DELETE,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
      data: {
        volunteer_ids: selected,
      },
    }).then((res) => {
      if (res.status === 200) {
        snackbarMsg({
          vertical: "bottom",
          horizontal: "right",
        });
        setTimeout(() => {
          setdelFun(true);
        }, 1000);
      }
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = volunteer.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  const handleClick = (event, name, type) => {
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
  const handleRowSelect = (event, name) => {
    const selectedIndex = rowSelected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(rowSelected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(rowSelected.slice(1));
    } else if (selectedIndex === rowSelected.length - 1) {
      newSelected = newSelected.concat(rowSelected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        rowSelected.slice(0, selectedIndex),
        rowSelected.slice(selectedIndex + 1)
      );
    }
    setRowSelected(newSelected);
  };
  const user = useSelector(({ User }) => User);

  function numberOfWeek(el) {
    const classes = el.classes;
    let last_date =
      classes.length && new Date(classes[classes.length - 1].end_time);
    let new_date = classes.length && new Date(el.classes[0].end_time);
    return Math.ceil((last_date - new_date) / (7 * 24 * 60 * 60 * 1000));
  }

  const baseUrl = getBaseURL(
    startDate,
    endTime,
    statusFilter,
    searchTerm,
    langFilter,
    selectedPathway
  );

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: baseUrl,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
    })
      .then((res) => {
        setVolunteer(res.data);
        setSlicedStudents(
          res.data.slice(rowsPerPage * limit, (rowsPerPage + 1) * limit)
        );
        setCacheVolunteer(res.data);
      })
      .catch((err) => {});
    pageCount = Math.ceil(slicedVolunteer && slicedVolunteer.length / limit);
  }, [
    statusFilter,
    langFilter,
    debouncedText,
    startDate,
    endTime,
    selectedPathway,
    statusValue,
    delfun,
  ]);

  useEffect(() => {
    axios({
      url: `${process.env.REACT_APP_MERAKI_URL}/apiDocs/volunteers/count`,
      method: METHODS.GET,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
    })
      .then((res) => {
        setPathwayCount({
          python: res.data?.pythonVolunteerCount,
          spokenEnglish: res?.data?.spokenEnglishVolunteersCount,
        });
      })
      .catch((err) => {});
  }, []);

  const [state, setState] = React.useState({
    openDel: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, openDel } = state;

  const snackbarMsg = (newState) => {
    setState({ openDel: true, ...newState });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({ ...state, openDel: false });
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <div>
      <Container maxWidth="lg">
        {/* HEADER */}
        <Grid
          container
          spacing={2}
          sx={{
            marginTop: "20px",
          }}
        >
          <Grid
            item
            className={classes.searchBar}
            // xs={isActive && 12}
          >
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "black" }} />
                  </InputAdornment>
                ),
                style: { fontSize: "14px" },
              }}
              fullWidth
              type="text"
              placeholder=" Search By Name... "
              variant="standard"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </Grid>
          <Grid item className={classes.generateReport} xs={isActive && 12}>
            <Button
              fullWidth
              variant="outlined"
              sx={{
                fontWeight: "600",
                fontSize: "14px",
                marginTop: isActive && 2,
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
        {/* END HEADER */}

        {/* FILTERS */}
        <Grid container className={classes.filters} mb={2}>
          <Grid item>
            <Button
              variant={selectedPathway === "Python" ? "contained" : "outlined"}
              className={classes.python}
              onClick={() => {
                setVolunteer(filterPathway(1, cacheVolunteer));
                setSelectedPathway("Python");
              }}
            >
              Python (
              {selectedPathway === "Python"
                ? volunteer.length
                : pathwayCount.python}
              )
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant={
                selectedPathway === "Spoken English" ? "contained" : "outlined"
              }
              className={classes.learningTrack2}
              onClick={() => {
                setVolunteer(filterPathway(2, cacheVolunteer));
                setSelectedPathway("Spoken English");
              }}
            >
              Spoken English (
              {selectedPathway === "Spoken English"
                ? volunteer.length
                : pathwayCount.spokenEnglish}
              )
            </Button>
          </Grid>
          <Grid
            item
            className={classes.filterIcon}
            onClick={() => {
              setFilter(!filter);
            }}
          >
            <Box className={classes.tableBtn}>
              <FilterAltIcon
                color={`${filter ? "primary" : "dark"}`}
                sx={{
                  height: "16px",
                }}
              />
              <Typography
                sx={{
                  cursor: "pointer",
                  fontWeight: "700",
                  fontSize: "14px",
                  color: `${filter ? "#48A145" : "black"}`,
                }}
              >
                {!isActive && "Filter"}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {filter && (
          <Grid container my={2}>
            <Grid item xs={isActive && 6} className={classes.tableFont}>
              <FormControl
                variant="standard"
                sx={{ width: !isActive ? "254px" : "170px" }}
              >
                <InputLabel
                  shrink={true}
                  id="demo-simple-select-standard-label"
                  sx={{
                    position: "relative",
                    bottom: "8px",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                  }}
                  label="Status"
                  notched
                  className={classes.tableFont}
                  PaperProps={{
                    style: {
                      height: "48px",
                      width: "254px",
                    },
                  }}
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="null">Newly Onboarded</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                  <MenuItem value="dropout">Dropped Out</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid
              xs={isActive && 6}
              item
              sx={{
                marginLeft: !isActive && "20px",
              }}
            >
              <FormControl
                variant="standard"
                sx={{
                  width: !isActive ? "254px" : "170px",
                  fontSize: "14px",
                  fontWeight: "400",
                }}
              >
                <InputLabel
                  shrink={true}
                  id="demo-simple-select-standard-label"
                  className={classes.inputLabel}
                  sx={{
                    position: "relative",
                    bottom: "8px",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  Language
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={langFilter}
                  onChange={(e) => {
                    setLangFilter(e.target.value);
                  }}
                  label="Language"
                  className={classes.tableFont}
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="hi">Hindi</MenuItem>
                  <MenuItem value="en">English</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        )}
        <TableContainer component={Paper} className={classes.tablecontainer}>
          {volunteer && volunteer.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    position: "sticky",
                    top: 0,
                  }}
                  className={classes.tablecontainerow}
                >
                  <TableCell
                    sx={{
                      position: "sticky",
                      left: -1,
                      backgroundColor: "white",
                      zIndex: 600,
                      p: "8px",
                    }}
                  >
                    <Checkbox
                      color="primary"
                      indeterminate={
                        selected.length > 0 &&
                        selected.length < volunteer.length
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
                      <TableCell align="center">
                        <Typography className={classes.tablecellHead}>
                          {selected.length}{" "}
                          {selected.length === 1 ? "row is " : "rows are "}
                          selected
                        </Typography>
                      </TableCell>
                      <TableCell
                        onClick={() => {
                          const valueToDisplay = `Total ${selected.length} ${
                            selected.length === 1 ? "row is " : "rows are "
                          } selected`;

                          setStatusName(valueToDisplay);
                          setStatusDialog(true);
                          setStatusId(selected);
                        }}
                      >
                        <Typography
                          className={classes.tablecellHead}
                          color="primary"
                        >
                          Change Statuses
                        </Typography>
                      </TableCell>
                      <TableCell
                        colSpan={isActive ? 0 : 5}
                        onClick={() => {
                          setStatusId(selected);
                          deleteUsers();
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: "600",
                            fontSize: "14px",
                          }}
                          color="error"
                        >
                          Delete
                        </Typography>
                        <Snackbar
                          anchorOrigin={{ vertical, horizontal }}
                          open={open}
                          autoHideDuration={1000}
                          onClose={handleClose}
                          action={action}
                          key={vertical + horizontal}
                        >
                          <Alert variant="filled" severity="success">
                            Successfully Deleted
                          </Alert>
                        </Snackbar>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell
                        sx={{
                          position: "sticky",
                          left: "74px",
                          backgroundColor: "white",
                          zIndex: 800,
                          width: "150px",
                        }}
                      >
                        <Typography className={classes.tablecellHeadWidthLess}>
                          Name
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography className={classes.tablecellHead}>
                          Last Class Batch
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography className={classes.tablecellHead}>
                          Last Class Title
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography className={classes.tablecellHead}>
                          Last Class Date
                        </Typography>
                      </TableCell>
                      <TableCell align="left" sx={{ width: "119px" }}>
                        <Typography className={classes.tablecellHead}>
                          Class Language
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          width: isActive ? "55px" : "140px",
                        }}
                      >
                        <Typography className={classes.tablecellHeadWidthLess}>
                          Status
                        </Typography>
                      </TableCell>
                      <TableCell align="center" sx={{ color: "#BDBDBD" }}>
                        <MoreVertIcon />
                      </TableCell>
                    </>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {volunteer && volunteer.length > 0
                  ? volunteer
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((item, index) => {
                        const selectedRow = isRowSelected(item.id);
                        const labelId = `enhanced-table-checkbox-${index}`;
                        const sortedClasses =
                          item.classes.length &&
                          item.classes.sort((a, b) => {
                            return (
                              new Date(a.start_time) - new Date(b.start_time)
                            );
                          });
                        item.last_class_date =
                          sortedClasses.length &&
                          sortedClasses[sortedClasses.length - 1].start_time;
                        return (
                          <>
                            <TableRow
                              key={item.id}
                              selected={selectedRow}
                              className={
                                selectedRow
                                  ? classes.tablebodyrowSelected
                                  : classes.tablebodyrow
                              }
                            >
                              <TableCell
                                hover
                                onClick={(event) => handleClick(event, item.id)}
                                role="checkbox"
                                tabIndex={-1}
                                padding="checkbox"
                                className={
                                  selectedRow
                                    ? classes.tablebodyrowSelected
                                    : classes.tablebodyrow
                                }
                                sx={{
                                  border: "none",
                                  position: "sticky",
                                  left: -1,
                                  zIndex: 800,
                                  whiteSpace: "nowrap",
                                }}
                                align="center"
                              >
                                <Checkbox
                                  checked={selected.includes(item.id)}
                                  color="primary"
                                  inputProps={{
                                    "aria-labelledby": labelId,
                                  }}
                                />
                              </TableCell>
                              <TableCell
                                style={{
                                  position: "sticky",
                                  left: "74px",
                                  backgroundColor: "white",
                                  zIndex: 800,
                                }}
                                component="th"
                                scope="row"
                                className={
                                  classes.tablebodyCell && selectedRow
                                    ? classes.tablebodyrowSelected
                                    : classes.tablebodyrow
                                }
                                tabIndex={-1}
                                onClick={(event) =>
                                  handleRowSelect(event, item.id)
                                }
                              >
                                {item.name}
                              </TableCell>
                              <TableCell
                                className={classes.tablebodyCell}
                                onClick={(event) =>
                                  handleRowSelect(event, item.id)
                                }
                              >
                                <p style={{ fontSize: "1rem" }}>
                                  {(item?.last_class &&
                                    item?.last_class?.title) ||
                                    "-"}
                                </p>
                              </TableCell>

                              <TableCell
                                className={classes.tablebodyCell}
                                onClick={(event) =>
                                  handleRowSelect(event, item.id)
                                }
                              >
                                <p style={{ fontSize: "1rem" }}>
                                  {(item?.last_class &&
                                    item?.last_class?.sub_title) ||
                                    "-"}
                                </p>
                              </TableCell>

                              <TableCell
                                className={classes.tablebodyCell}
                                onClick={(event) =>
                                  handleRowSelect(event, item.id)
                                }
                              >
                                <p style={{ fontSize: "1rem" }}>
                                  {format(item.last_class_date, "dd MMM, yyyy")}
                                </p>
                              </TableCell>
                              <TableCell
                                // data-column="Last class lang"
                                sx={{ border: "none" }}
                                onClick={(event) => {
                                  handleRowSelect(event, item.id);
                                }}
                              >
                                {item.classes &&
                                item.classes.length > 0 &&
                                item.classes[item.classes.length - 1]["lang"] !=
                                  ""
                                  ? languageMap[
                                      item.classes[item.classes.length - 1][
                                        "lang"
                                      ]
                                    ]
                                  : "-"}
                              </TableCell>
                              <TableCell
                                // data-column="Status"
                                sx={{
                                  fontWeight: "400",
                                  fontSize: "14px",
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: "flex-start",
                                  width: "140px",
                                  border: "none",
                                }}
                                onClick={(event) =>
                                  handleRowSelect(event, item.id)
                                }
                              >
                                <CircleIcon
                                  className={classes.circleIcon}
                                  sx={{
                                    color: `${
                                      item.status === "active"
                                        ? "#48A145"
                                        : item.status === "inactive"
                                        ? "#FFCC00"
                                        : item.status === "dropout"
                                        ? "#F44336"
                                        : "#2196F3"
                                    }`,
                                  }}
                                />
                                <p
                                  style={{
                                    marginLeft: "5px",
                                    height: "21px",
                                  }}
                                >
                                  {item.status === "active"
                                    ? "Active"
                                    : item.status === "inactive"
                                    ? "Inactive"
                                    : item.status === "dropout"
                                    ? "Dropped Out"
                                    : "Newly Onboarded"}
                                </p>
                              </TableCell>
                              <TableCell
                                // data-column="three dots"
                                className={classes.tablebodyCell}
                                sx={{
                                  color: "#BDBDBD",
                                }}
                              >
                                <MenuComponent
                                  itemname={item.name}
                                  itemStatus={item.status}
                                  setStatusValue={setStatusValue}
                                  itemId={item.id}
                                  setStatusName={setStatusName}
                                  setStatusDialog={setStatusDialog}
                                  setStatusId={setStatusId}
                                  userId={statusId}
                                  delfun={delfun}
                                  setdelFun={setdelFun}
                                />
                              </TableCell>
                            </TableRow>
                            <TableRow
                              sx={{
                                position: "sticky",
                                top: 0,
                                zIndex: 1,
                              }}
                            >
                              {selectedRow || selectedRow > 0 ? (
                                <TableCell
                                  style={{ paddingBottom: 0, paddingTop: 0 }}
                                  colSpan={12}
                                >
                                  <Collapse
                                    in={open}
                                    timeout="auto"
                                    unmountOnExit
                                  >
                                    <Box
                                      sx={{
                                        height: isActive ? "198px" : "165px",
                                      }}
                                    >
                                      <div className={classes.collapse}>
                                        <Avatar
                                          src="/broken-image.jpg"
                                          style={{
                                            width: "32px",
                                            height: "32px",
                                          }}
                                        />
                                        <Typography
                                          sx={{
                                            fontWeight: 600,
                                            fontSize: "14px",
                                            marginLeft: "8px",
                                          }}
                                        >
                                          {item.name}
                                        </Typography>
                                      </div>
                                      <Table
                                        size="small"
                                        aria-label="purchases"
                                      >
                                        <TableHead>
                                          <TableRow
                                            sx={{
                                              borderBottom:
                                                "1.2px solid rgba(163, 163, 163, 0.4)",
                                              paddingBottom: "50px",
                                              position: "sticky",
                                              top: 0,
                                            }}
                                          >
                                            <TableCell
                                              className={classes.tablecellHead}
                                            >
                                              Email
                                            </TableCell>
                                            <TableCell
                                              align="right"
                                              className={classes.tablecellHead}
                                            >
                                              Phone
                                            </TableCell>
                                            <TableCell
                                              className={classes.tablecellHead}
                                            >
                                              Duration (In Weeks)
                                            </TableCell>
                                            <TableCell
                                              className={classes.tablecellHead}
                                            >
                                              Days Available
                                            </TableCell>
                                            <TableCell
                                              className={classes.tablecellHead}
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
                                              className={classes.tablebodyCell}
                                            >
                                              {item.email}
                                            </TableCell>
                                            <TableCell
                                              align="right"
                                              className={classes.tablebodyCell}
                                            >
                                              {item.contact === null
                                                ? "-"
                                                : item.contact}
                                            </TableCell>
                                            <TableCell
                                              className={classes.tablebodyCell}
                                            >
                                              {numberOfWeek(item)}
                                            </TableCell>
                                            <TableCell
                                              className={classes.tablebodyCell}
                                            >
                                              {item.available_on_days === null
                                                ? "-"
                                                : item.available_on_days}
                                            </TableCell>
                                            <TableCell
                                              className={classes.tablebodyCell}
                                            >
                                              {item.available_on_time === null
                                                ? "-"
                                                : format(
                                                    item.available_on_time,
                                                    "hh:mm aaa"
                                                  )}
                                            </TableCell>
                                          </TableRow>
                                        </TableBody>
                                      </Table>
                                    </Box>
                                  </Collapse>
                                </TableCell>
                              ) : (
                                ""
                              )}
                            </TableRow>
                          </>
                        );
                      })
                  : ""}
              </TableBody>
            </Table>
          ) : (
            <Box sx={{ fontSize: "20px" }}>
              <Typography>There are no results to display...</Typography>
            </Box>
          )}
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={volunteer.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ position: "relative", right: isActive ? "0px" : "40px" }}
        />
      </Container>
      <ChangeStatusModal
        statusName={statusName}
        setStatusDialog={setStatusDialog}
        statusDialog={statusDialog}
        userId={statusId}
        users={volunteer}
        statusValue={statusValue}
        setStatusValue={setStatusValue}
      />
      <GenerateReport
        generateDialog={generateDialog}
        setGenerateDialog={setGenerateDialog}
        startDate={startDate}
        endTime={endTime}
        setstartDate={setstartDate}
        setendTime={setendTime}
        volunteerReport={volunteer}
        languageMap={languageMap}
        numberOfWeek={numberOfWeek}
      />
    </div>
  );
}
export default Tutor;
