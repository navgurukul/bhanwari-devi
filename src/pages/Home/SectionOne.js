import React from "react";
import { Typography, Container, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { PATHS } from "../../constant";

function SectionOne({ isActive, classes }) {
  return (
    <div className={isActive ? classes.mobileContainer : classes.container}>
      <Container maxWidth="lg">
        <Grid container>
          <Grid md={6} sm={12}>
            <Typography variant="h4">
              India’s Premier Learning Platform for Underserved Communities
            </Typography>
            <Typography variant="body1" sx={{ margin: "16px 0px 32px 0px" }}>
              Affordable and accessible programming education to the makers of
              the future India
            </Typography>
            <Link to={PATHS.LOGIN} className={classes.link}>
              <Button
                variant="contained"
                className={
                  isActive ? classes.responsiveBtn : classes.LearningBtn
                }
              >
                Start Learning
              </Button>
            </Link>
          </Grid>
          <Grid md={6} mt={isActive ? "16px" : "0px"} sm={12}>
            <img
              src={require("./assets/main_image.svg")}
              alt={"Homeimage"}
              heigh={isActive ? "228px" : "413px"}
              width={isActive ? "328px" : "592px"}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default SectionOne;
