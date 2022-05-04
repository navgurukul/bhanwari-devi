import React, { useEffect, useState } from "react";
import {
  Typography,
  CssBaseline,
  Container,
  Button,
  Card,
  Stack,
  Box,
} from "@mui/material";
import useStyles from "./styles";

function NewParnter() {
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <Container maxWidth="sm">
        <Typography variant="h5" align="center">
          Our Partners
        </Typography>
        <hr color="primary" className={classes.underLine} />
      </Container>
    </Container>
  );
}

export default NewParnter;
