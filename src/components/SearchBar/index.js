import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";

function SearchBar({ handleSearchChange }) {
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "14.2ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search for course…"
        inputProps={{ "aria-label": "search" }}
        // value={search}
        onChange={handleSearchChange}
        // onChange={(e) => {
        //   // const value =s
        //   console.log("e", e.target.value);
        //   setSearch("abc");
        // }}
      />
    </Search>
    // <Box>
    //   <SearchIconWrapper>
    //     <SearchIcon />
    //   </SearchIconWrapper>
    //   <TextField
    //     id="standard-basic"
    //     variant="filled"
    //     value={search}
    //     onChange={handleSearchChange}
    //     // onChange={(e) => {
    //     //   // const value =s
    //     //   console.log("e", e.target.value);
    //     //   setSearch(e.target.value);
    //     // }}
    //   />
    // </Box>
  );
}

export default SearchBar;
