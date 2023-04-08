import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Stack,
  TextField,
  InputAdornment,
  Grid,
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
import CreatePartner from './CreatePartner';

function RegularPartnes() {
  const [volunteer, setVolunteer] = useState([]);
  const user = useSelector(({ User }) => User);
  const classes = useStyles();
  const [open, setOpen] = useState(false);

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
    },
    {
      name: "pointofcontact",
      label: "Point of Contact",
    },
    {
      name: "volunteer_id",
      label: "Number of Students",
    },
    {
      name: "status",
      label: "Status",
    },
    {
      name: "",
      label: "",
      options: {
        customBodyRender: (value) => (
          <>
            <Icon>
              <EditIcon />
            </Icon>
            {value}
          </>
        ),
      },
    },
    {
      name: "",
      label: "",
      options: {
        customBodyRender: (value) => (
          <>
            <Icon>
              <EmailIcon />
            </Icon>
            {value}
          </>
        ),
      },
    },
    {
      name: "",
      options: {
        customBodyRender: (value) => (
          <>
            <Icon>
              <DeleteIcon />
            </Icon>
            {value}
          </>
        ),
      },
    },
  ];

  const options = {
    filterType: "checkbox",
    pagination: {
      next: "Next Page",
      previous: "Previous Page",
      rowsPerPage: "Rows per page:",
      displayRows: "of",
    },
    responsive: "stacked",
    filter: false,
    download: false,
    print: false,
    search: false,
    viewColumns: false,
    elevation: 0,
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      <Stack spacing={2} direction="row">
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
        <Grid item>
          <Button
            variant="contained"
            sx={{ padding: "30px 16px", marginLeft: "20px" }}
            onClick={handleClick}
          >
            + Add Partner
          </Button>
          <CreatePartner open={open} handleClose={handleClose} />
        </Grid>
      </Grid>

      <MUIDataTable
        data={volunteer}
        columns={columns}
        options={options}
        className={classes.tableBody}
      />
    </Container>
  );
}

export default RegularPartnes;
