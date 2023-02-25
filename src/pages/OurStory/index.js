import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import useStyles from "./styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../theme/constant";

const OurStory = () => {
  const classes = useStyles();
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  return (
    <>
      <Container>
        <Grid>
          <Typography
            variant="h4"
            align={isActive ? "left" : "center"}
            p={!isActive ? "64px 64px 32px 64px" : "32px 0px 32px 0px"}
          >
            “Bringing the joy of learning to the students of most underserved
            communities”
          </Typography>
          <Container
            //  maxWidth = "md"
            sx={{
              mb: !isActive && 4,
              width: !isActive ? 655 : {},
              p: isActive && 0,
            }}
          >
            <Typography variant="body1" paragraph>
              Meraki, as an organization, lives by the above motivation. Meraki
              is part of NavGurukul Foundation for Social Welfare. It started in
              2020 to bring low-cost online tech education to students from
              low-income families across India. NavGurukul already runs
              successful campus programs across India, and Meraki is an
              extension of that effort.
            </Typography>
            <Typography variant="body1" mt={!isActive ? 4 : 2} paragraph>
              In our pursuit, numerous volunteers and partners helped us create
              relationships with government bodies, schools and NGOs to cater to
              their students or just individual students.
            </Typography>
          </Container>
        </Grid>
      </Container>
    </>
  );
};
export default OurStory;
