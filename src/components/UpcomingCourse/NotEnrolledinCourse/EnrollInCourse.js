import React, { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { CardMedia, CardContent, Card, Button, Stack } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import useStyles from "../styles";
import { useSelector } from "react-redux";
import { breakpoints } from "../../../theme/constant";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

// import { Button } from "framework7-react";

const CourseEnroll = () => {
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const classes = useStyles();

  return (
    <>
      <Container maxWidth="lg">
        <Box align="right" mt={1} maxWidth={350} mb={10}>
          <Card elevation={2} pl={10}>
            <CardContent>
              <Typography gutterBottom variant="body1" align="start">
                It seems you are not part of a batch. Please enroll in a batch
                to attend the live classes.
              </Typography>
              <Box display="flex" justifyContent="start">
                <FormControl>
                  <RadioGroup>
                    <FormControlLabel
                      sx={{ fontWeight: 20 }}
                      value="Ankit_19SEP2"
                      control={<Radio />}
                      label={<b>Ankit_19SEP2</b>}
                    />
                    <Typography mb={2} ml={3}>
                      19 Sep 21 - 19 Dec 21
                    </Typography>
                    <FormControlLabel
                      value="Ankit_19SEP21"
                      control={<Radio />}
                      label={<b>Ankit_19SEP2</b>}
                    />
                    <Typography mb={2} ml={3}>
                      19 Sep 21 - 19 Dec 21
                    </Typography>
                    <FormControlLabel
                      value="Ankit_19SEP1"
                      control={<Radio />}
                      label={<b>Ankit_19SEP2</b>}
                    />
                    <Typography mb={2} ml={3}>
                      19 Sep 21 - 19 Dec 21
                    </Typography>
                  </RadioGroup>
                </FormControl>
              </Box>
              <Button variant="contained" fullWidth>
                Enroll in Ankit_19SEP21
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  );
};
export default CourseEnroll;
