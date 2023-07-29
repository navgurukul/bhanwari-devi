/* eslint-disable react/no-unescaped-entities */
import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
} from "@mui/material";

function SectionFive() {
  return (
    <Container maxWidth="lg" sx={{ marginTop: "64px" }}>
      <Typography variant="h5" textAlign="center" marginBottom="32px">
        Hear from our Users
      </Typography>
      <Grid container spacing={4}>
        <Grid item md={4}>
          <Card
            sx={{
              padding: "16px",
            }}
            align="center"
          >
            <CardContent align="left">
              <Box height="250px !important">
                <img
                  src={require("./assets/leftquote.svg")}
                  alt={"Homeimage"}
                />
                <Typography variant="body1">
                  I learned python very well from meraki-classes. The class was
                  brilliant. Meraki classes provide us all session of python
                  classes. It is very usefull in future. so Thank you for
                  providing us for free classes.
                </Typography>
                <img
                  src={require("./assets/doublequote.svg")}
                  alt={"Homeimage"}
                  align="right"
                />
              </Box>
            </CardContent>

            <Box p="16px">
              <img
                src={require("./assets/user-3.png")}
                alt={"Homeimage"}
                height="100px !important"
                width="100px !important"
                style={{ borderRadius: "50%" }}
              />
              <Typography variant="subtitle1">Rudresh Bhaleshwar</Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item md={4}>
          <Card
            sx={{
              padding: "16px",
            }}
            align="center"
          >
            <CardContent align="left">
              <Box height="250px">
                <img
                  src={require("./assets/leftquote.svg")}
                  alt={"Homeimage"}
                />
                <Typography variant="body1">
                  I took Meraki classes so I learned lot of things about
                  programming like python and learn how codes are execute . So
                  after taking Meraki classes I learnt more about programming
                  how it's work in application .
                </Typography>
                <img
                  src={require("./assets/doublequote.svg")}
                  alt={"Homeimage"}
                  align="right"
                />
              </Box>
            </CardContent>
            <Box p="16px">
              <img
                src={require("./assets/user-2.png")}
                alt={"Homeimage"}
                height="100px !important"
                width="100px !important"
                style={{ borderRadius: "50%" }}
              />
              <Typography variant="subtitle1">Durganand Sahu</Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item md={4}>
          <Card
            sx={{
              padding: "16px",
            }}
            align="center"
          >
            <CardContent align="left">
              <Box height="250px">
                <img
                  src={require("./assets/leftquote.svg")}
                  alt={"Homeimage"}
                />
                <Typography variant="body1">
                  I have enjoyed learning python in Meraki class. The teachers
                  were teaching greatly. I thank thank to Sainath sir and Meraki
                  class for doing available these python classes.
                </Typography>
                <img
                  src={require("./assets/doublequote.svg")}
                  alt={"Homeimage"}
                  align="right"
                />
              </Box>
            </CardContent>
            <Box p="16px">
              <img
                src={require("./assets/user-1.png")}
                alt={"Homeimage"}
                height="100px !important"
                width="100px !important"
                style={{ borderRadius: "50%" }}
              />
              <Typography variant="subtitle1">Gayatri Panchal</Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SectionFive;
