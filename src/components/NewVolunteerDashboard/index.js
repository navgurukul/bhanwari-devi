import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

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
  TableFooter,
  Grid,
} from "@mui/material";
import axios from "axios";
import { METHODS } from "../../services/api";
import { format } from "../../common/date";
import Checkbox from "@mui/material/Checkbox";
import TableSortLabel from "@mui/material/TableSortLabel";
import TablePagination from "@mui/material/TablePagination";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { useDebounce } from "use-debounce";

function NewVolunteerDashboard(props) {
  const { onSelectAllClick, numSelected, rowCount } = props;
  const limit = 10;
  const [volunteer, setVolunteer] = useState([]);
  const [selctedPathway, setSelectedPathway] = useState("");
  const [slicedVolunteer, setSlicedVolunteer] = useState([]);

  const [cacheVolunteer, setCacheVolunteer] = useState([]);
  const [selected, setSelected] = React.useState([]);
  // const [page, setPage] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [pageNumber, setPageNumber] = React.useState(5);

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
    setCacheVolunteer(slicedData);
  }, [debouncedText, rowsPerPage]);

  return (
    <Container>
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "black" }} />
            </InputAdornment>
          ),
        }}
        fullWidth={1}
        type="text"
        placeholder=" Name, Class, Title, Language"
        variant="standard"
        value={debouncedText}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  indeterminate={numSelected > 0 && numSelected < rowCount}
                  checked={rowCount > 0 && numSelected === rowCount}
                  onChange={onSelectAllClick}
                  inputProps={{
                    "aria-label": "select all desserts",
                  }}
                />
              </TableCell>
              <TableCell>
                <Typography sx={{ fontWeight: "bold" }}>Name</Typography>{" "}
              </TableCell>
              <TableCell align="right">
                <Typography sx={{ fontWeight: "bold" }}>
                  Last Class Batch
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography sx={{ fontWeight: "bold" }}>
                  Last Class Title
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography sx={{ fontWeight: "bold" }}>
                  Last Class Date
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography sx={{ fontWeight: "bold" }}>
                  Class Language
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {volunteer && volunteer.length > 0 ? (
              volunteer
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => {
                  const isItemSelected = isSelected(volunteer.name);
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
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, volunteer.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={volunteer.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>
                        {item.classes &&
                        item.classes.length > 0 &&
                        item.classes[item.classes.length - 1]["batch"] != ""
                          ? item.classes[item.classes.length - 1]["batch"]
                          : "-"}
                      </TableCell>

                      <TableCell data-column="Last Class Title">
                        {item.classes &&
                        item.classes.length > 0 &&
                        item.classes[item.classes.length - 1]["title"] != ""
                          ? item.classes[item.classes.length - 1]["title"]
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {format(item.last_class_date, "dd-MM-yyyy")}
                      </TableCell>
                      <TableCell data-column="Last class lang">
                        {item.classes &&
                        item.classes.length > 0 &&
                        item.classes[item.classes.length - 1]["lang"] != ""
                          ? languageMap[
                              item.classes[item.classes.length - 1]["lang"]
                            ]
                          : "-"}
                      </TableCell>
                    </TableRow>
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
