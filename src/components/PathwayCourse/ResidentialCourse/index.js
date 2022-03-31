import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { breakpoints } from '../../theme/constant'
import {
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
} from "@mui/material";

import useStyles from "./styles";
import axios from "axios";
import { METHODS } from "../../../services/api";

const images = [
  "course1",
  "course2",
  "course3",
  "course1",
  "course2",
  "course3",
  "course1",
  "course2",
  "course3",
];

function ResidentialProgramme() {
  const [pathwayCourse, setPathwayCourse] = useState([]);
  const user = useSelector(({ User }) => User);
  // const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/pathways/4/courses?courseType=json`,
      headers: {
        accept: "application/json",
        "version-code": 40,
        Authorization: user.data.token,
      },
    }).then((res) => {
      console.log("res", res);
      setPathwayCourse(res.data.courses);
    });
  }, []);
  const classes = useStyles();
  return (
    <React.Fragment>
      <Container sx={{ mt: 10 }} maxWidth="lg">
        <Grid container spacing={2}>
          <Grid xs={12} md={6}>
            <Card align="left" elevation={0}>
              <Typography variant="body2">Learning Track</Typography>
              <Typography variant="h4">
                Residential Programme Info- Track
              </Typography>
              <Typography variant="body2">
                Learn the nuances and basics of the technology that powers the
                web. Start with learning what is Javascript and eventually build
                your own website.
              </Typography>
            </Card>
          </Grid>
          {/* <Grid xs={12} md={6} sx={{ pl: 2 }}>

                    </Grid> */}
        </Grid>

        <Box sx={{ mt: 6 }}>
          <Typography variant="h6">Courses</Typography>
          <Grid sx={{ mt: 2 }} container spacing={3} align="center">
            {pathwayCourse.map((item, index) => (
              <Grid xs={12} md={3}>
                <Card elevation={0}>
                  <img
                    src={require(`../Common/asset/${images[index]}.svg`)}
                    alt="course"
                    loading="lazy"
                  />
                  <CardContent>
                    <Typography
                      // align={isActive ? "center" : "left"}
                      variant="subtitle1"
                    >
                      {item.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Stack sx={{ mt: 8 }} alignItems="center">
          <Typography variant="h6">Have you completed the overview?</Typography>
          <Button sx={{ mt: 2 }} variant="contained" color="primary">
            Yes, let’s take the test
          </Button>
        </Stack>
      </Container>
    </React.Fragment>
  );
}

export default ResidentialProgramme;
