import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { METHODS } from "../../services/api";
import { breakpoints } from "../../theme/constant";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "react-router-dom";
import { PATHS, interpolatePath } from "../../constant";
import { useSearchQuery } from "../../common/search";
import {
  Box,
  TextField,
  Container,
  Typography,
  Grid,
  Card,
  Button,
  Tooltip,
  Popper,
  setRef,
} from "@mui/material";
import useStyles from "./styles";
import { Popover, InputAdornment, Modal } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Backdrop from "@mui/material/Backdrop";
import axios from "axios";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

function SearchPopup() {
  const { data } = useSelector(({ Course }) => Course);
  const user = useSelector(({ User }) => User);
  const userId = user.data?.user.id;
  const pathway = useSelector((state) => state.Pathways);
  const dispatch = useDispatch();
  // const [recentSearch,setrecentSearch]=useState("")
  const [search, setSearch] = useState("");
  const [focus, setFocus] = useState(true);
  useSearchQuery(setSearch);
  const history = useHistory();
  const classes = useStyles();
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const [anchorEl, setAnchorEl] = useState(null);
  const [popular, setPopular] = useState([]);
  const [recentSearch, setRecentSearch] = useState([]);

  const prevSearch = usePrevious(search);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const handleSearchChange = (e) => {
    if (e.key == "Enter") {
      if (e.target.value == "") {
        if (!search == "") {
          history.replace(`/search-course/?search=${prevSearch}`);
        }
      } else {
        history.replace(`/search-course/?search=${e.target.value}`);
      }
      setAnchorEl(null);
      e.preventDefault();
    }
  };

  const handleSearchBar = (e) => {
    history.replace(`/search-course/?search=${e.target.value}`);
    setAnchorEl(null);
  };

  useEffect(() => {
    axios({
      url: `${process.env.REACT_APP_MERAKI_URL}/search/popular`,
      method: METHODS.GET,
      headers: {
        accept: "application/json",
        Authorization: false,
      },
    })
      .then((res) => {
        setPopular(res.data.top_popular);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    if (user.data !== null) {
      axios({
        url: `${process.env.REACT_APP_MERAKI_URL}/search/${userId}`,
        method: METHODS.GET,
        headers: {
          accept: "application/json",
          Authorization: user.data.token || null,
        },
      })
        .then((res) => {
          setRecentSearch(res.data.user_search);
        })
        .catch((err) => {});
    }
  }, []);

  const pathwayCourseIds =
    pathway.data?.pathways
      .map((pathway) => pathway.courses || [])
      .flat()
      .map((course) => course.id) || [];
  const otherCourseResults = data?.allCourses.filter((item) => {
    return (
      // item.course_type === "json" &&
      !pathwayCourseIds.includes(item.id) &&
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  });
  const pathwayTrackResults = pathway.data?.pathways
    .map((pathway) => {
      return {
        ...pathway,
        courses: pathway.courses?.filter((course) => {
          return course.name.toLowerCase().includes(search.toLowerCase());
        }),
      };
    })
    .filter((pathway) => pathway.courses?.length > 0);

  const hasSearchResults =
    pathwayTrackResults?.length > 0 || otherCourseResults?.length > 0;

  const handleClose = () => {
    setAnchorEl(null);
  };
  // const recent = JSON.parse(localStorage.getItem("recent"));

  return (
    <>
      <Button onClick={handleClick} color="dark">
        <SearchOutlinedIcon aria-describedby={id} />
      </Button>

      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        sx={{ zIndex: 1000 }}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
      >
        <Box
          sx={{
            transform: "translate(0%, 0%)",
            width: "100%",
            bgcolor: "background.paper",
            boxShadow: 24,
            padding: "16px 0px",
          }}
          marginTop={isActive ? "70px" : "78.50px"}
        >
          <Container maxWidth="lg">
            <TextField
              id="standard-search"
              placeholder="Search Course"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ margin: "40px 0px 32px 0px" }}
              inputRef={(input) => {
                if (input != null) {
                  input.focus();
                }
              }}
              variant="standard"
              fullWidth
              onKeyPress={handleSearchChange}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />

            <>
              {recentSearch && recentSearch?.length ? (
                <>
                  <Typography variant="subtitle1">Recent Searches</Typography>

                  <Grid container sx={{ mt: "16px", mb: "32px" }}>
                    {recentSearch.map((item) => (
                      <Grid item mr={2}>
                        <Button value={item} onClick={handleSearchBar}>
                          {item}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                </>
              ) : (
                <>
                  <Typography variant="subtitle1">Popular Searches</Typography>
                  <Grid container sx={{ mt: "16px", mb: "32px" }}>
                    {popular.map((item) => (
                      <Grid item mr={2} key={item}>
                        <Button value={item} onClick={handleSearchBar}>
                          {item}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}
            </>
          </Container>
        </Box>
      </Modal>
    </>
  );
}
export default SearchPopup;
