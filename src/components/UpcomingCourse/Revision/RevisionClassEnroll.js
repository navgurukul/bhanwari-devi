import React from "react";
import { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { CardMedia, CardContent, Card, Button, Stack } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import useStyles from "../styles";
import { useSelector } from "react-redux";
import { breakpoints } from "../../../theme/constant";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { METHODS } from "../../../services/api";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

function RevisionClassEnroll(props) {
  const classes = useStyles();
  const user = useSelector(({ User }) => User);
  const { id } = props;
  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}classes/27892/revision`,
      headers: {
        accept: "application/json",
        Authorization: user?.data?.token,
      },
    }).then((res) => {
      // setUserEnrolledClasses(res.data);
      console.log(res.data);
    });
  }, []);
  return (
    <Container maxWidth="lg">
      <Box align="right" mt={1} maxWidth={350} mb={10}>
        <Card elevation={2} pl={10}>
          <CardContent>
            <Typography gutterBottom variant="subtitle1" align="start">
              Missed the class or need to revise? Enroll in a class from another
              batch
            </Typography>
            <Box display="flex" justifyContent="start">
              <FormControl>
                <RadioGroup>
                  <FormControlLabel
                    sx={{ fontWeight: 20 }}
                    value="Ankit_19SEP2"
                    control={<Radio />}
                    // you can put your value using {} <- this
                    label="20 Sep 21, 4 PM - 5 PM"
                  />
                  <FormControlLabel
                    value="Ankit_19SEP21"
                    control={<Radio />}
                    label="20 Sep 21, 4 PM - 5 PM"
                  />
                  <FormControlLabel
                    value="Ankit_19SEP1"
                    control={<Radio />}
                    label="20 Sep 21, 4 PM - 5 PM"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Button variant="contained" fullWidth>
              Enroll
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default RevisionClassEnroll;
