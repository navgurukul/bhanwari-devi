import CloseIcon from "@mui/icons-material/Close";
import { Grid, Box, Container, Typography } from "@mui/material";
import React from "react";
import useStyles from "./styles";
function NewVolunteerCard({ setNewVolunteer }) {
  const classes = useStyles();

  return (
    <Container
      fullWidth
      sx={{ bgcolor: "secondary.light" }}
      className={classes.NewVolunteerCardContainer}
    >
      <Grid>
        <Typography
          className={classes.NewVolunteerCardHeader}
          variant="subtitle1"
          sx={{
            marginBottom: "16px",
          }}
        >
          Hi there! Thanks for choosing to share your knowledge with our
          students
          <CloseIcon
            onClick={() => {
              setNewVolunteer(false);
              localStorage.setItem("isNewVolunteer", false);
            }}
            className={classes.NewVolunteerCardCloseIcon}
          />
        </Typography>
        <Typography variant="body1">
          If you are new to teaching with Meraki, you can enroll in one of the
          classes below to experience how tutors take classes for Meraki
          students. Wish you the best for your time with us.
        </Typography>
      </Grid>
    </Container>
  );
}

export default NewVolunteerCard;
