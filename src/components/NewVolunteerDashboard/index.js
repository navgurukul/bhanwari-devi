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
  Toolbar,
  Grid,
  Button,
  DialogTitle,
  DialogContent,
  FormControl,
  FormControlLabel,
  RadioGroup,
} from "@mui/material";

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
  const { onSelectAllClick, numSelected, rowCount } = props;

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
            >
              Generate Report
              <DownloadIcon sx={{ marginLeft: "10px" }} />
            </Button>
          </Grid>
        </Grid>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
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
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, item.name)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={item.name}
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
                        <TableCell sx={{ fontWeight: "400", fontSize: "14px" }}>
                          {item.name}
                        </TableCell>
                        <TableCell sx={{ fontWeight: "400", fontSize: "14px" }}>
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
                          sx={{ fontWeight: "400", fontSize: "14px" }}
                        >
                          {item.classes &&
                          item.classes.length > 0 &&
                          item.classes[item.classes.length - 1]["title"] != ""
                            ? item.classes[item.classes.length - 1]["title"]
                            : "-"}
                        </TableCell>
                        <TableCell sx={{ fontWeight: "400", fontSize: "14px" }}>
                          {format(item.last_class_date, "dd MMM, yyyy")}
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
                        <TableCell
                          data-column="Status"
                          sx={{ fontWeight: "400", fontSize: "14px" }}
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
                            <CircleIcon sx={{ fontSize: 12 }} color="success" />
                            {status}
                          </div>
                        </TableCell>
                        <TableCell
                          data-column="three dots"
                          sx={{ fontWeight: "400", fontSize: "14px" }}
                        >
                          <MoreVertIcon />
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
    </div>
  );
}
export default NewVolunteerDashboard;
