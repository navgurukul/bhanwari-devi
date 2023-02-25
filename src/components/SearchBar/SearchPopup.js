import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { actions as courseActions } from "../Course/redux/action";
import { actions as pathwayActions } from "../PathwayCourse/redux/action";
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
} from "@mui/material";
import useStyles from "./styles";
import { Popover, InputAdornment, Modal } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Backdrop from "@mui/material/Backdrop";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

function SearchPopup() {
  const { data } = useSelector(({ Course }) => Course);
  const pathway = useSelector((state) => state.Pathways);
  const dispatch = useDispatch();
  // const [recentSearch,setrecentSearch]=useState("")
  const [search, setSearch] = useState("");
  const [focus, setFocus] = useState(true);
  useSearchQuery(setSearch);
  const history = useHistory();
  const classes = useStyles();
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const [anchorEl, setAnchorEl] = React.useState(null);

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

    // setSearch(e.target.value);
  };

  const [close, setClose] = "";
  const handleSearchClose = (e) => {
    setClose(search);
  };

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

  const rojgar = pathwayTrackResults?.map((item) => {
    return item.courses?.length;
  });

  let sum = rojgar?.reduce((total, item) => {
    return total + item;
  }, 0);

  const hasSearchResults =
    pathwayTrackResults?.length > 0 || otherCourseResults?.length > 0;

  // console.log(pathway.data && pathway.data.pathways)
  const handleClose = () => {
    setAnchorEl(null);
  };
  const recent = JSON.parse(localStorage.getItem("recent"));

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
              {recent ? (
                <>
                  <Typography variant="subtitle1">Recent Search</Typography>

                  <Grid container sx={{ mt: "16px", mb: "32px" }}>
                    {recent
                      ?.slice(Math.max(recent.length - 5, 0))
                      .map((item) => (
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
                  <Typography variant="subtitle1">Popular Searchs</Typography>
                  <Grid container sx={{ mt: "16px", mb: "32px" }}>
                    <Grid item mr={2}>
                      <Button value="Python" onClick={handleSearchBar}>
                        Python
                      </Button>
                    </Grid>
                    <Grid item mr={2}>
                      <Button value="List" onClick={handleSearchBar}>
                        List
                      </Button>
                    </Grid>
                    <Grid item mr={2}>
                      <Button value="Variable" onClick={handleSearchBar}>
                        Variable
                      </Button>
                    </Grid>
                    <Grid item mr={2}>
                      <Button value="Scratch" onClick={handleSearchBar}>
                        Scratch (CEL)
                      </Button>
                    </Grid>
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
