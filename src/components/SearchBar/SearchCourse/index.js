import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { actions as courseActions } from "../../Course/redux/action";
import SearchBar from "..";
import { Box, TextField, Container } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

function SearchCourse(props) {
  //   console.log("props", props);
  const { data } = useSelector(({ Course }) => Course);
  const dispatch = useDispatch();
  const query = new URLSearchParams(useLocation().search).get("search");
  const [search, setSearch] = useState(query ? query : "");
  const history = useHistory();

  useEffect(() => {
    dispatch(courseActions.getCourses());
  }, [dispatch]);

  const handleSearchChange = (e) => {
    console.log("e", e.target.value);
    history.push(`?search=${e.target.value}`);
    e.preventDefault();
    setSearch(e.target.value);
  };

  console.log("data", data);

  let filteredCourse;
  if (data) {
    filteredCourse = data.allCourses.filter((names) => {
      console.log("names", names);
      if (names.course_type === "json") {
        return names.name.toLowerCase().includes(search.toLowerCase());
      }
    });
  }

  console.log("filteredCourse", filteredCourse);

  return (
    <Container maxWidth="lg">
      {/* <SearchBar handleSearchChange={handleSearchChange} /> */}
      <Container sx={{ mt: 5 }} maxWidth="sm">
        <TextField
          id="outlined-basic"
          label="Search for course..."
          variant="outlined"
          fullWidth
          value={search}
          onChange={handleSearchChange}
        />
      </Container>
    </Container>
  );
}

export default SearchCourse;
