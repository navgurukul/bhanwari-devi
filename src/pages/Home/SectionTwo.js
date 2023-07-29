import React from "react";
import { Grid, Typography } from "@mui/material";

function SectionTwo({ isActive }) {
  return (
    <Grid container mt={isActive ? "16px" : "48px"} spacing={4}>
      <Grid item md={4}>
        <Grid container spacing={2}>
          <Grid item md={2} xs={2} mt="5px">
            <img
              src={require("./assets/Group.svg")}
              alt={"Homeimage"}
              sx={{ width: "47px", height: "47px" }}
            />
          </Grid>
          <Grid item md={10} xs={10}>
            <Typography variant="subtitle1">Trusted by 9+ Partners</Typography>
            <Typography variant="body1" pt="6px">
              For our hybrid and free online learning approach
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={4}>
        <Grid container spacing={2}>
          <Grid item mt="5px" md={2} xs={2}>
            <img
              src={require("./assets/girls.svg")}
              alt={"Homeimage"}
              sx={{ width: "47px", height: "47px" }}
            />
          </Grid>
          <Grid item md={10} xs={10}>
            <Typography variant="subtitle1">9000+ Active Students</Typography>
            <Typography variant="body1" pt="8px">
              From all corners of India taking first step in tech world
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={4}>
        <Grid container md={12} spacing={2}>
          <Grid item mt="8px" md={2} xs={2}>
            <img
              src={require("./assets/Layer.svg")}
              alt={"Homeimage"}
              sx={{ width: "47px", height: "47px" }}
            />
          </Grid>
          <Grid item md={10} xs={10}>
            <Typography variant="subtitle1">
              5+ Monthly Mentor Sessions
            </Typography>
            <Typography variant="body1" pt="8px">
              For direct interaction with industry experts at Amazon
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SectionTwo;
