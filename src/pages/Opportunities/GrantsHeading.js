import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import ExternalLink from "../../components/common/ExternalLink";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import useStyles from "./styles";

const GrantsHeading = ({ isActive }) => {
  const classes = useStyles();
  return (
    <>
      <Grid className={classes.section_Heading} mt={4}>
        <Typography variant="h6">
          Grants / Advanced Courses / Mentorships
        </Typography>
      </Grid>
      <Grid>
        <Typography variant="body1" color="text.primary">
          By learning with Meraki, you can avail benefits such as:
          <ul style={{ margin: "0px" }}>
            <li> Grants such as free keyboards for typing practice</li>
            <li> Coursera Membership</li>
            <li> Advanced english courses</li>
            <li> 1:1 Mentorship sessions</li>
          </ul>
        </Typography>
        <Grid mt={2}>
          <ExternalLink
            href="https://docs.google.com/forms/d/e/1FAIpQLSd7XgipoTYVME5xovEffKOLr0vzjDIfbnJ-fDK5KpIjZSqZgA/viewform"
            style={{ textDecoration: "none" }}
          >
            <Button
              endIcon={<ArrowForwardIosIcon />}
              variant="outlined"
              sx={{ width: isActive ? "100%" : "255px" }}
            >
              Apply Now
            </Button>
          </ExternalLink>
        </Grid>
      </Grid>
    </>
  );
};

export default GrantsHeading;
