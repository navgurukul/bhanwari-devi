import React from "react";
import { Container, Typography } from "@mui/material";
import useStyles from "./styles";

const OurStory = () => {
  const classes = useStyles();
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 7, mb: 7 }}>
        <Container maxWidth="md">
          <Typography variant="h5" align="center" mb={"35px"}>
            Our Story
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
      </Container>
    </>
  );
};
export default OurStory;
