import React from "react";
import { Container, Box, Grid, Typography, CardMedia } from "@mui/material";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import useStyles from "./styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../theme/constant";

const OurStory = () => {
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const classes = useStyles();
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 7, mb: 7 }}>
        <Container maxWidth="md">
          <Typography variant="h5" align="center">
            Our Story
            <hr color="primary" className={classes.ourStoryHrline} />
          </Typography>
          <Typography variant="body1" paragraph>
            Meraki is part of Navgurukul Foundation for Social Welfare. It
            started in 2020 as an effort to bring low cost online tech education
            to students from low income families across India. Navgurukul
            already runs successful campus programmes across India and Meraki is
            an extension of that effort.
          </Typography>
          <Typography
            variant="body1"
            className={classes.ourStorySpace1}
            paragraph
          >
            In our pursuit, we have been helped by numerous volunteers, partners
            to help create relationships with government bodies, schools and
            NGOs to cater to their students or just individual students.
          </Typography>
        </Container>
        {/* <Box className={classes.ourStorySpace}>
          <Typography variant="h5" align="center" gutterBottom>
            In the Media
            <hr color="primary" className={classes.ourStoryHrline} />
          </Typography>
          <Grid container spacing={1} justifyContent="center">
            <Grid item xs={2} md={1}>
              <Button size="small" className={classes.ourStorybttn}>
                <KeyboardArrowLeft />
              </Button>
            </Grid>
            <Grid item xs={3} md={2}>
              <img
                src="https://w7.pngwing.com/pngs/836/272/png-transparent-forbes-logo-triggerfish-communications-ltd-graphic-design-firefly-animals-company-text.png"
                className={
                  !isActive ? classes.ourStorylogo : classes.ourStorylogo1
                }
                align="center"
                alt="Forbes logo"
              />
            </Grid>
            <Grid item xs={5} md={6}>
              <Typography variant="body1" paragraph>
                Navgurukul offers a fully-funded skilling program in software
                engineering with guaranteed job to youth from low-income
                families.
              </Typography>
            </Grid>
            <Grid item xs={2} md={1}>
              <Button size="small" className={classes.ourStorybttn}>
                <KeyboardArrowRight />
              </Button>
            </Grid>
          </Grid>
        </Box> */}
        {/* <hr align="center" className={classes.ourStoryHr} /> */}
      </Container>
    </>
  );
};
export default OurStory;
