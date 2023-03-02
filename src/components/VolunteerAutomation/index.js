import React from "react";
import { useHistory } from "react-router-dom";
import {
  Typography,
  Container,
  Grid,
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  useMediaQuery,
} from "@mui/material";
import { PATHS } from "../../constant";
import { useSelector } from "react-redux";
import useStyles from "./styles";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { breakpoints } from "../../theme/constant";

function VolunteerAutomation() {
  const classes = useStyles();
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const isActiveIpad = useMediaQuery("(max-width:1300px)");

  const user = useSelector(({ User }) => User);
  let history = useHistory();

  const pathname = window.location.pathname;
  const rolesList = user?.data?.user.rolesList; // TODO: Use selector

  const handleClick = () => {
    if (rolesList) {
      if (rolesList.includes("volunteer")) {
        history.push(PATHS.CLASS);
      } else {
        history.push(PATHS.VOLUNTEER_FORM);
      }
    } else {
      history.push(PATHS.LOGIN, pathname);
    }
  };

  return (
    <Container maxWidth="lg">
      <Grid container mt={8}>
        <Grid item xs={12} ms={6} md={6}>
          <Box>
            <Typography variant="h4" gutterBottom>
              Help Students Get their Dream Job in Tech
            </Typography>
            <Typography variant="h6" sx={{ mt: 4 }}>
              Why Volunteer?
            </Typography>
            <Box className={classes.displayIcon} sx={{ mt: 2 }}>
              <ArrowRightAltIcon />
              <Typography
                variant="body1"
                color="text.primary"
                className={classes.TextContent}
              >
                Gain a wide network to leverage for advancing your skills and
                career prospects.
              </Typography>
            </Box>
            <Box className={classes.displayIcon} sx={{ mt: 2 }}>
              <ArrowRightAltIcon />
              <Typography variant="body1" pl="10px" color="text.primary">
                Help students from low-income families to get their first job in
                tech.
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} ms={6} md={6} sx={{ display: "flex" }}>
          <Box align="right">
            <img
              className={
                !isActive ? classes.volunteerImg : classes.volunteerImg1
              }
              alt="img"
              src={require("./assets/Group.svg")}
            />
          </Box>
        </Grid>
      </Grid>
      <Typography my={4} variant="h5" align="center" gutterBottom>
        Areas to Volunteer In
      </Typography>

      <Grid container spacing={4} mb={8}>
        <Grid item xs={12} ms={6} md={6} mb={isActiveIpad && 2}>
          <Card elevation={4} className={classes.volunteerCard}>
            <Box>
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  Teaching
                </Typography>
                <Box className={classes.displayIcon}>
                  <ArrowRightAltIcon className={classes.IconColor} />
                  <Typography
                    variant="subtitle1"
                    className={classes.TextContent}
                    Typography
                  >
                    Python
                  </Typography>
                </Box>
                <Box className={classes.displayIcon}>
                  <ArrowRightAltIcon className={classes.IconColor} />
                  <Typography
                    variant="subtitle1"
                    className={classes.TextContent}
                  >
                    Spoken English
                  </Typography>
                </Box>
                <Typography sx={{ mt: 2 }} variant="body1">
                  <span style={{ color: "#2E2E2E", fontWeight: "bold" }}>
                    {" "}
                    Expected effort
                  </span>
                  : 2 hours / week for 15 weeks
                </Typography>
                <Typography
                  sx={{ mt: 2 }}
                  variant="body1"
                  color="text.secondary"
                >
                  Please volunteer only if you are professional who has worked
                  with Python or have great command over English.
                </Typography>
              </CardContent>
              <CardActions sx={{ mt: 9.9 }}>
                <Button
                  onClick={handleClick}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Start Now
                </Button>
              </CardActions>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} ms={6} md={6}>
          <Card elevation={4} className={classes.volunteerCard1}>
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Tech
              </Typography>
              <Box className={classes.displayIcon}>
                <ArrowRightAltIcon className={classes.IconColor} />
                <Typography variant="subtitle1" className={classes.TextContent}>
                  UX/Graphic Design
                </Typography>
              </Box>
              <Box className={classes.displayIcon}>
                <ArrowRightAltIcon className={classes.IconColor} />
                <Typography variant="subtitle1" className={classes.TextContent}>
                  Android (Kotlin)
                </Typography>
              </Box>
              <Box className={classes.displayIcon}>
                <ArrowRightAltIcon className={classes.IconColor} />
                <Typography variant="subtitle1" className={classes.TextContent}>
                  Front End Dev (React)
                </Typography>
              </Box>

              <Box className={classes.displayIcon}>
                <ArrowRightAltIcon className={classes.IconColor} />
                <Typography variant="subtitle1" className={classes.TextContent}>
                  Back End Dev
                </Typography>
              </Box>

              <Box className={classes.displayIcon}>
                <ArrowRightAltIcon className={classes.IconColor} />
                <Typography variant="subtitle1" className={classes.TextContent}>
                  Project Management
                </Typography>
              </Box>
              <Box className={classes.displayIcon}>
                <ArrowRightAltIcon className={classes.IconColor} />
                <Typography variant="subtitle1" className={classes.TextContent}>
                  Curriculum Creation & Translation
                </Typography>
              </Box>
              <Box sx={{ mt: isActive ? "16px" : "12px" }}>
                <Typography variant="body1">
                  <span style={{ color: "#2E2E2E", fontWeight: "bold" }}>
                    Expected effort
                  </span>
                  : 4 hours / week for 15 weeks
                </Typography>
                <Typography
                  sx={{ mt: 1.5 }}
                  color="text.secondary"
                  variant="body1"
                >
                  You will be taken to a Google form.
                </Typography>
              </Box>
            </CardContent>
            <CardActions>
              <Button
                href="https://docs.google.com/forms/d/e/1FAIpQLScHvysncnhJkSMtpdpGl_uPhJWlE81hp6l5m2mvuE1hoxX-dQ/viewform"
                target="_blank"
                variant="contained"
                color="secondary"
                fullWidth
              >
                Start Now
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default VolunteerAutomation;
