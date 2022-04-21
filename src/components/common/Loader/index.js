import React from "react";
import PropTypes from "prop-types";
import useStyles from "./styles";

// import "./styles.scss";

import { Box } from "@mui/material";

const Loader = ({ className = "", pageLoader = false }) => {
  const classes = useStyles();

  return (
    // <Box className={`${className} ${pageLoader ? "ng-page-loader" : "loader"}`}>
    //  <Box className="idsEllipsis">
    <Box
      className={`${className} ${
        pageLoader ? classes.loaderNgpageloader : classes.loderLoader
      }`}
    >
      <Box className={classes.loderIdsEllipsis}>
        <Box />
        <Box />
        <Box />
        <Box />
      </Box>
    </Box>
  );
};

Loader.propTypes = {
  className: PropTypes.string,
  pageLoader: PropTypes.bool,
  // If main page loading pass this prop value as true
};

export default Loader;
