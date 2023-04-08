import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Stack,
  TextField,
  InputAdornment,
  Grid,
  Typography,
  TableRow,
  TableCell,
  Chip,
  Box,
  TableHead,
} from "@mui/material";
import useStyles from "../style";
import axios from "axios";
import { METHODS } from "../../../services/api";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import MUIDataTable from "mui-datatables";
import EditIcon from "@mui/icons-material/Edit";
import { Icon } from "@material-ui/core";
import EmailIcon from "@mui/icons-material/Email";
import DeleteIcon from "@mui/icons-material/Delete";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CircleIcon from "@mui/icons-material/Circle";
import { Pagination } from "@mui/material";

function RegularPartnes() {
  const [volunteer, setVolunteer] = useState([]);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(0);
  const user = useSelector(({ User }) => User);
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 10;
  const pageCount = Math.ceil(volunteer.length / perPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page - 1);
  };

  const displayedData = volunteer.slice(
    currentPage * perPage,
    (currentPage + 1) * perPage
  );

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/volunteers`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
    })
      .then((res) => {
        setVolunteer(res.data);
      })
      .catch((err) => {});
  }, []);
  console.log(volunteer);

  const columns = [
    {
      name: "name",
      label: "Name",
      options: {
        sort: false,
        filter: false,
        fontSize: "600px",
      },
    },
    {
      name: "pointofcontact",
      label: "Point of Contact",
      options: {
        sort: false,
        filter: false,
        customBodyRender: (value) => <TableCell>Arvind Shukla</TableCell>,
      },
    },
    {
      name: "volunteer_id",
      label: "Number of Students",
      options: {
        sort: false,
        filter: false,
        customBodyRender: (value) => (
          <div align="right">
            <TableCell>{value === null ? "-" : value}</TableCell>
          </div>
        ),
        customHeadLabelRender: (columnMeta) => (
          <div style={{ textAlign: "right" }}>{columnMeta.label}</div>
        ),
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        sort: false,
        filter: false,
        customBodyRender: (value) => {
          return (
            <div style={{ display: "flex" }}>
              <CircleIcon
                className={classes.circleIcon}
                sx={{
                  color: `${
                    value === "active"
                      ? "#48A145"
                      : value === "inactive"
                      ? "#FFCC00"
                      : value === "dropout"
                      ? "#F44336"
                      : "#2196F3"
                  }`,
                }}
              />
              <TableCell sx={{ paddingLeft: "8px" }}>{value}</TableCell>
            </div>
          );
        },
      },
    },
    {
      name: "status",
      label: " ",
      options: {
        customBodyRender: (value) => (
          <>
            <Icon>
              <EditIcon
                color="grey"
                sx={value === "active" && { "&:hover": { color: "#2196F3" } }}
              />
            </Icon>
          </>
        ),

        sort: false,
        filter: false,
      },
    },
    {
      name: "status",
      label: " ",
      options: {
        customBodyRender: (value) => (
          <>
            <Icon>
              <EmailIcon
                color="grey"
                sx={value === "active" && { "&:hover": { color: "#48A145" } }}
              />
            </Icon>
          </>
        ),
        sort: false,
        filter: false,
      },
    },
    {
      name: "status",
      label: " ",
      options: {
        customBodyRender: (value) => (
          // console.log(value)
          <>
            <Icon>
              <DeleteIcon
                color="grey"
                sx={value === "active" && { "&:hover": { color: "#F44336" } }}
              />
            </Icon>
          </>
        ),
        sort: false,
        filter: false,
      },
    },
  ];

  const options = {
    customToolbarSelect: () => {},
    filterType: "checkbox",
    responsive: "stacked",
    pagination: false,
    filter: false,
    download: false,
    print: false,
    search: false,
    viewColumns: false,

    elevation: 0,
    setRowProps: (rows, dataIndex, rowIndex) => {
      return { sx: { backgroundColor: "transparent !important" } };
    },
  };

  return (
    <Container sx={{ marginTop: "32px" }}>
      <Stack spacing={2} direction="row" margin="16px 0px">
        <Button>Regular Partners</Button>
        <Button>State Level Partners</Button>
      </Stack>
      <Grid container>
        <Grid item md={10}>
          <TextField
            id="outlined-basic"
            placeholder="Search Partner, Point of Contact..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item md={2}>
          <Button
            variant="contained"
            sx={{ padding: "30px 16px", marginLeft: "20px" }}
          >
            + Add Partner
          </Button>
        </Grid>
      </Grid>
      <Stack direction="row" spacing={1} margin="16px 0px">
        <Chip
          label="All Partners"
          color="primary"
          sx={{
            fontSize: "14px",
            fontWeight: "400",
            fontFamily: "Noto Sans",
            cursor: "pointer",
          }}
        />
        <Chip
          label="Newly Onboarded"
          variant="outlined"
          sx={{
            fontSize: "14px",
            fontWeight: "400",
            fontFamily: "Noto Sans",
            cursor: "pointer",
          }}
        />
        <Chip
          label="Active"
          variant="outlined"
          sx={{
            fontSize: "14px",
            fontWeight: "400",
            fontFamily: "Noto Sans",
            cursor: "pointer",
          }}
        />
        <Chip
          label="Inactive"
          variant="outlined"
          sx={{
            fontSize: "14px",
            fontWeight: "400",
            fontFamily: "Noto Sans",
            cursor: "pointer",
          }}
        />
        <Chip
          label="Archived"
          variant="outlined"
          sx={{
            fontSize: "14px",
            fontWeight: "400",
            fontFamily: "Noto Sans",
            cursor: "pointer",
          }}
        />
      </Stack>

      <MUIDataTable
        data={displayedData}
        columns={columns}
        options={options}
        className={classes.MuiTableRow}
      />
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "32px",
        }}
      >
        <Typography
          variant="body2"
          style={{ position: "absolute", left: 0, top: 0 }}
        >
          showing {currentPage * 10 + 1}- {(currentPage + 1) * 10} of{" "}
          {volunteer.length}
        </Typography>

        <Pagination
          style={{ margin: "0 auto" }}
          count={pageCount}
          page={currentPage + 1}
          onChange={handlePageChange}
          // variant="outlined"
          // shape="circle"
          classes={{ ul: "pagination" }}
          color="primary"
        />
      </div>

      <Stack
        spacing={2}
        sx={{
          margin: "16px 0px",
        }}
      ></Stack>
    </Container>
  );
}

export default RegularPartnes;
