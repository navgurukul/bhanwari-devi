import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useStyles from "./style";
import { PATHS } from "../../constant";
import { useSelector } from "react-redux";
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

function NewVolunteerDashboard(props) {
  const classes = useStyles();
  const { onSelectAllClick, numSelected, rowCount } = props;
  const [open, setOpen] = React.useState(true);

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
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid item={9}>
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
            }}
          >
            Generate Report
            <DownloadIcon sx={{ marginLeft: "10px" }} />
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow className={classes.tablecontainerow}>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  indeterminate={
                    selected.length > 0 && selected.length < volunteer.length
                  }
                  checked={
                    volunteer.length > 0 && selected.length === volunteer.length
                  }
                  onChange={handleSelectAllClick}
                  inputProps={{
                    "aria-label": "select all desserts",
                  }}
                  onClick={!open}
                />
              </TableCell>
              <TableCell>
                <Typography sx={{ fontWeight: "bold" }}>Name</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography sx={{ fontWeight: "bold" }}>
                  Last Class Batch
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography sx={{ fontWeight: "bold" }}>
                  Last Class Title
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography sx={{ fontWeight: "bold" }}>
                  Last Class Date
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography sx={{ fontWeight: "bold" }}>
                  Class Language
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography sx={{ fontWeight: "bold" }}>Status</Typography>
              </TableCell>
              <TableCell align="center">
                <MoreVertIcon />
              </TableCell>
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
                        hover
                        onClick={(event) => handleClick(event, item.name)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={item.name}
                        selected={isItemSelected}
                        className={classes.tablebodyrow}
                      >
                        <TableCell padding="checkbox" sx={{ border: "none" }}>
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                            onClick={() => setOpen(open)}
                            aria-label="expand row"
                          />
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          {item.name}
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          {/* {item.classes &&
                          item.classes.length > 0 &&
                          item.classes[item.classes.length - 1]["batch"] != ""
                            ? item.classes[item.classes.length - 1]["batch"]
                            : "-"} */}
                          -
                        </TableCell>

                        <TableCell
                          data-column="Last Class Title"
                          sx={{ border: "none" }}
                        >
                          {item.classes &&
                          item.classes.length > 0 &&
                          item.classes[item.classes.length - 1]["title"] != ""
                            ? item.classes[item.classes.length - 1]["title"]
                            : "-"}
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          {format(item.last_class_date, "dd-MM-yyyy")}
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
                        <TableCell data-column="Status" sx={{ border: "none" }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-around",
                            }}
                          >
                            <CircleIcon sx={{ fontSize: 12 }} color="success" />
                            Active
                          </div>
                        </TableCell>
                        <TableCell
                          data-column="three dots"
                          sx={{ border: "none" }}
                        >
                          <MoreVertIcon />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        {isItemSelected || isItemSelected > 0 ? (
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
      />
    </Container>
  );
}
export default NewVolunteerDashboard;
