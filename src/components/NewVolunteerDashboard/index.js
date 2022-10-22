import React, { useEffect, useState } from "react";
import useStyles from "./style";
import { useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../theme/constant";
import moment from "moment";
import Alert from "@mui/material/Alert";

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
import { ZoomInRounded } from "@material-ui/icons";
import { set } from "date-fns";
import { Link } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
function NewVolunteerDashboard(props) {
  const classes = useStyles();
  const { onSelectAllClick, numSelected, rowCount } = props;
  const [open, setOpen] = React.useState(true);
  // console.log(onSelectAllClick, "onSelectAllClick");
  const limit = 10;
  const [volunteer, setVolunteer] = useState([]);
  const [selctedPathway, setSelectedPathway] = useState("");
  const [slicedVolunteer, setSlicedVolunteer] = useState([]);
  const [cacheVolunteer, setCacheVolunteer] = useState([]);
  const [selected, setSelected] = React.useState([]);
  const [rowSelected, setRowSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedText] = useDebounce(searchTerm, 400);
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const [filter, setFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [langFilter, setLangFilter] = useState("All");
  const [statusDialog, setStatusDialog] = useState(false);
  const [status, setStatus] = useState("All");
  const [statusName, setStatusName] = useState("");
  const [statusId, setStatusId] = useState([]);
  const [generateDialog, setGenerateDialog] = useState(false);
  const [delfun, setdelFun] = useState();
  const [startDate, setstartDate] = useState("");
  const [endTime, setendTime] = useState("");
  const [slicedStudents, setSlicedStudents] = useState([]);

  const languageMap = {
    hi: "Hindi",
    te: "Telugu",
    en: "English",
    ta: "Tamil",
  };
  console.log(statusId, "idddddddddddddddddddddddddddddd");
  let pageCount = Math.ceil(volunteer && volunteer.length / limit);
  const isRowSelected = (name) => rowSelected.indexOf(name) !== -1;
  if (selctedPathway) {
    pageCount = Math.ceil(volunteer && volunteer.length / limit);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  function filterPathway(pathway, volunteer) {
    // console.log(pathway)
    return volunteer.filter((el) => {
      // console.log(el.classes)

      for (let i of el.classes) {
        if (i.title.includes(pathway)) {
          return true;
        }
      }
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
      console.log("delete", res);
    });
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
  console.log(selected, rowSelected);

  const user = useSelector(({ User }) => User);

  function numberOfWeek(el) {
    const classes = el.classes;
    let last_date =
      classes.length && new Date(classes[classes.length - 1].end_time);
    let new_date = classes.length && new Date(el.classes[0].end_time);
    return Math.ceil((last_date - new_date) / (7 * 24 * 60 * 60 * 1000));
  }
  const fromStart = moment(startDate).format("YYYY-MM-DD");
  const toEnd = moment(endTime).format("YYYY-MM-DD");
  // const cur_lang = languageMap[volunteer.map(el)];
  const baseUrl = `${process.env.REACT_APP_MERAKI_URL}/volunteers${
    statusFilter !== "All" &&
    langFilter !== "All" &&
    searchTerm.length > 0 &&
    endTime &&
    startDate
      ? `?from=${fromStart}&to=${toEnd}&?status=${statusFilter}&name=${searchTerm}&lang=${langFilter}`
      : statusFilter !== "All" && langFilter !== "All" && endTime && startDate
      ? `?from=${fromStart}&to=${toEnd}&?status=${statusFilter}&lang=${langFilter}`
      : statusFilter !== "All" && langFilter !== "All" && searchTerm.length > 0
      ? `?status=${statusFilter}&name=${searchTerm}&lang=${langFilter}`
      : statusFilter !== "All" && searchTerm.length > 0
      ? `?status=${statusFilter}&name=${searchTerm}`
      : searchTerm.length > 0 && langFilter !== "All"
      ? `&name=${searchTerm}&lang=${langFilter}`
      : searchTerm.length > 0 && endTime && startDate
      ? `?from=${fromStart}&to=${toEnd}&?name=${searchTerm}`
      : endTime && startDate && statusFilter !== "All"
      ? `?from=${fromStart}&to=${toEnd}&status=${statusFilter}`
      : endTime && startDate && langFilter !== "All"
      ? `?from=${fromStart}&to=${toEnd}&lang=${langFilter}`
      : statusFilter !== "All" && langFilter !== "All"
      ? `?status=${statusFilter}&lang=${langFilter}`
      : statusFilter !== "All"
      ? `?status=${statusFilter}`
      : langFilter !== "All"
      ? `?lang=${langFilter}`
      : searchTerm.length > 0
      ? `?name=${searchTerm}`
      : endTime && startDate
      ? `?from=${fromStart}&to=${toEnd}`
      : ""
  }
    `;

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: baseUrl,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
    }).then((res) => {
      setVolunteer(res.data);
      setSlicedStudents(
        res.data.slice(rowsPerPage * limit, (rowsPerPage + 1) * limit)
      );
      setCacheVolunteer(res.data);
    });
    pageCount = Math.ceil(slicedVolunteer && slicedVolunteer.length / limit);
  }, [statusFilter, langFilter, debouncedText, startDate, endTime]);

  const [state, setState] = React.useState({
    openDel: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, openDel } = state;

  const handleClickDel = (newState) => {
    setState({ openDel: true, ...newState });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({ ...state, openDel: false });
    {
      window.location.reload();
    }
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

  // console.log(statusId)

  // useEffect(() => {
  //   const data =
  //     volunteer &&
  //     volunteer.filter((searchValue) => {
  //       if (searchValue === "") {
  //         return searchValue;
  //       } else if (
  //         searchValue.name.toLowerCase().includes(searchTerm.toLowerCase())
  //       ) {
  //         return searchValue;
  //       }
  //       // searchValue.name.toLowerCase().includes(searchTerm.toLowerCase())
  //     });

  //   const slicedData = data.slice(
  //     rowsPerPage * limit,
  //     (rowsPerPage + 1) * limit
  //   );
  //   setVolunteer(data);
  // }, [debouncedText, rowsPerPage]);

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
              placeholder="Name, Batch, Class Title..."
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
              variant="contained"
              className={classes.python}
              onClick={() => {
                setVolunteer(filterPathway("Python", cacheVolunteer));
                setSelectedPathway("Python");
              }}
            >
              Python (40)
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              className={classes.learningTrack2}
              onClick={() => {
                setVolunteer(filterPathway("Spoken English", cacheVolunteer));
                setSelectedPathway("Spoken English");
              }}
            >
              Spoken English (20)
            </Button>
          </Grid>
          <Grid
            item
            className={classes.filterIcon}
            onClick={() => {
              setFilter(!filter);
              console.log(filter);
              console.log("clicked");
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
                  <MenuItem value="newlyonboarded">Newly Onboarded</MenuItem>
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
                  onClick={(e) => {
                    setLangFilter(e.target.value);
                  }}
                  label="Language"
                  className={classes.tableFont}
                >
                  <MenuItem value="All" s>
                    All
                  </MenuItem>
                  <MenuItem value="hi">Hindi</MenuItem>
                  <MenuItem value="en">English</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        )}
        <TableContainer component={Paper} className={classes.tablecontainer}>
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
                  }}
                >
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
                    <TableCell
                      align="center"
                      className={classes.tableSticky}
                      sx={{ left: "60px", width: "150px" }}
                    >
                      <Typography className={classes.tablecellHead}>
                        {selected.length}{" "}
                        {selected.length === 1 ? "row is " : "rows are "}
                        selected
                      </Typography>
                    </TableCell>
                    <TableCell
                      className={classes.tableSticky}
                      sx={{ left: "170px", width: "150px" }}
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
                      className={classes.tableSticky}
                      sx={{ left: "269px" }}
                      onClick={() => {
                        setStatusId(selected);
                        deleteUsers();
                        handleClickDel({
                          vertical: "bottom",
                          horizontal: "right",
                        });
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
                        open={openDel}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        action={action}
                        key={vertical + horizontal}
                      >
                        <Alert variant="filled" severity="success">
                          Successfully Deleted{" "}
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
                      <Typography className={classes.tablecellHead}>
                        Name
                      </Typography>
                    </TableCell>
                    <TableCell align="left" sx={{ width: "150px" }}>
                      <Typography className={classes.tablecellHead}>
                        Last Class Batch
                      </Typography>
                    </TableCell>
                    <TableCell align="left" sx={{ width: "150px" }}>
                      <Typography className={classes.tablecellHead}>
                        Last Class Title
                      </Typography>
                    </TableCell>
                    <TableCell align="left" sx={{ width: "119px" }}>
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
                      <Typography className={classes.tablecellHead}>
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
              {volunteer && volunteer.length > 0 ? (
                volunteer
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => {
                    const selectedRow = isRowSelected(item.id);
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
                            onClick={(event) => handleRowSelect(event, item.id)}
                          >
                            {item.name}
                          </TableCell>
                          <TableCell
                            className={classes.tablebodyCell}
                            onClick={(event) => handleRowSelect(event, item.id)}
                          >
                            {item.classes &&
                            item.classes.length > 0 &&
                            item.classes[item.classes.length - 1]["title"]
                              .toLowerCase()
                              .includes("batch".toLowerCase())
                              ? item.classes[item.classes.length - 1]["title"]
                              : "-"}
                          </TableCell>
                          <TableCell
                            // data-column="Last Class Title"
                            className={classes.tablebodyCell}
                            onClick={(event) => handleRowSelect(event, item.id)}
                          >
                            {item.classes &&
                            item.classes.length > 0 &&
                            !item.classes[item.classes.length - 1]["title"]
                              .toLowerCase()
                              .includes("batch".toLowerCase())
                              ? item.classes[item.classes.length - 1]["title"]
                              : "-"}
                          </TableCell>
                          <TableCell
                            className={classes.tablebodyCell}
                            onClick={(event) => handleRowSelect(event, item.id)}
                          >
                            {format(item.last_class_date, "dd MMM, yyyy")}
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
                            item.classes[item.classes.length - 1]["lang"] != ""
                              ? languageMap[
                                  item.classes[item.classes.length - 1]["lang"]
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
                            onClick={(event) => handleRowSelect(event, item.id)}
                          >
                            <CircleIcon
                              className={classes.circleIcon}
                              sx={{
                                color: `${
                                  item.status === "active"
                                    ? "#48A145"
                                    : item.status === "inactive"
                                    ? "#FFCC00"
                                    : item.status === "droppedout"
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
                                ? "In Active"
                                : item.status === "droppedout"
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
                              <Collapse in={open} timeout="auto" unmountOnExit>
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
                                    //
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
          sx={{ position: "relative", right: isActive ? "0px" : "40px" }}
        />
      </Container>
      <ChangeStatusModal
        statusName={statusName}
        setStatusDialog={setStatusDialog}
        statusDialog={statusDialog}
        userId={statusId}
        users={volunteer}
      />
      <GenerateReport
        generateDialog={generateDialog}
        setGenerateDialog={setGenerateDialog}
        startDate={startDate}
        endTime={endTime}
        setstartDate={setstartDate}
        setendTime={setendTime}
        volunteerReport={volunteer}
      />
    </div>
  );
}
export default NewVolunteerDashboard;
