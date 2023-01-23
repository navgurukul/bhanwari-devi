import React from "react";
import { Link } from "react-router-dom";
import HeaderNavLink from "../HeaderNavlink";
import Message from "../../common/Message";
import { PATHS } from "../../../constant";
import Tooltip from "@mui/material/Tooltip";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  // Typography,
  // Menu,
  // MenuItem,
  Button,
} from "@mui/material";

function SearchHeader() {
  return (
    <Box>
      {/* <Link to={PATHS.SEARCHED_COURSE}>
        <Tooltip title={<Message constantKey="SEARCH_FOR_COURSES" />}>
          <Button color="dark">
            <SearchIcon />
          </Button>
        </Tooltip>
      </Link> */}
    </Box>
  );
}

export default SearchHeader;
