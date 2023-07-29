import React from "react";
import { Container, Typography, Grid, Box } from "@mui/material";

function SectionThree({ isActive }) {
  return (
    <Container maxWidth="lg">
      <Grid container mt={isActive ? "32px" : "64px"} spacing={4}>
        <Grid item md={4}>
          <Box>
            <Typography variant="h5">Why Meraki?</Typography>
            <Typography variant="body1">
              Learning with Meraki is like taking the first steps into the world
              of tech.You can explore your interests before committing to longer
              and often paid learning programs.
            </Typography>
          </Box>
        </Grid>
        <Grid item md={4}>
          <Box
            sx={{
              background: "#FFF5CC",
              padding: "32px",
              borderRadius: "8px",
            }}
          >
            <img
              src={require("./assets/scale.svg")}
              alt={"Homeimage"}
              sx={{ Maxwidth: "48px", Maxheight: "50px" }}
            />
            <Typography variant="subtitle1" mt="16px">
              Courses from the very basics
            </Typography>
            <Typography variant="body1" mt={1}>
              Start from scratch and work your way through the basics
            </Typography>
          </Box>
          <Box
            sx={{
              background: "#FFE5E3",
              padding: "32px",
              borderRadius: "8px",
              marginTop: "32px",
            }}
          >
            <img
              src={require("./assets/butterfly.svg")}
              alt={"Homeimage"}
              sx={{ Maxwidth: "48px", Maxheight: "50px" }}
            />
            <Typography variant="subtitle1" mt="16px">
              Free of cost
            </Typography>
            <Typography variant="body1" mt={1}>
              Meraki is free forever in line with our goal to make tech
              education reach every underserved student in India
            </Typography>
          </Box>
        </Grid>
        <Grid item md={4}>
          <Box
            sx={{
              background: "#D3EAFD",
              padding: "32px",
              borderRadius: "8px",
            }}
          >
            <img
              src={require("./assets/livelessons.svg")}
              alt={"Homeimage"}
              sx={{ Maxwidth: "48px", Maxheight: "50px" }}
            />
            <Typography variant="subtitle1" mt="16px">
              Live lessons from teachers
            </Typography>
            <Typography variant="body1" mt={1}>
              Structured classes from each topic from people in the industry to
              help you with every large or small concept and doubt
            </Typography>
          </Box>
          <Box
            sx={{
              background: "#E9F5E9",
              padding: "32px",
              borderRadius: "8px",
              marginTop: "32px",
            }}
          >
            <img
              src={require("./assets/lang.svg")}
              alt={"Homeimage"}
              sx={{ Maxwidth: "48px", Maxheight: "50px" }}
            />
            <Typography variant="subtitle1" mt="16px">
              In multiple regional languages
            </Typography>
            <Typography variant="body1" mt={1}>
              Learn in your own mother tongue with clarity while also developing
              your English skills with our program
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SectionThree;
