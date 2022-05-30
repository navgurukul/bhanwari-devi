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
} from "@mui/material";
import { PATHS } from "../../constant";
import { useSelector } from "react-redux";
import { METHODS } from "../../services/api";
import axios from "axios";
import useStyles from "./styles";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

function VolunteerAutomation() {
  const classes = useStyles();
  const user = useSelector(({ User }) => User);
  let history = useHistory();

  const handleClick = () => {
    return axios({
      url: `${process.env.REACT_APP_MERAKI_URL}/users/volunteerRole`,
      method: METHODS.POST,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
    }).then(
      (res) => {
        console.log("res", res);
        history.push(PATHS.VOLUNTEER_FORM);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12} ms={6} md={5}>
          <Box className={classes.volunteerFlow}>
            <Typography variant="h4" gutterBottom>
              Help Students Get their Dream Job in Tech
            </Typography>

            <Typography sx={{ mt: 4 }}>
              <hr align="left" className={classes.VolunteerHrline} />
            </Typography>

            <Typography variant="h6" sx={{ mt: 4 }}>
              Why Volunteer?
            </Typography>

            <Box className={classes.displayIcon} sx={{ mt: 2 }}>
              <ArrowRightAltIcon />
              <Typography className={classes.TextContent}>
                Gain wide network to leverage for advancing your own skills and
                career prospects.
              </Typography>
            </Box>

            <Box className={classes.displayIcon} sx={{ mt: 2 }}>
              <ArrowRightAltIcon />
              <Typography className={classes.TextContent}>
                Help students from low income families to get their first job in
                tech
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          ms={6}
          md={6}
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          <Box>
            <img
              className={classes.volunteerImg}
              src={require("./assets/Group.svg")}
            />
          </Box>
        </Grid>
      </Grid>

      <Typography sx={{ mt: 3 }} variant="h5" align="center" gutterBottom>
        Areas to Volunteer In
      </Typography>

      <Grid sx={{ mt: 3, mb: 15 }} container spacing={2}>
        <Grid item xs={12} ms={6} md={6}>
          <Card elevation={8} className={classes.volunteerCard}>
            <Box>
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  Teaching
                </Typography>
                <Box className={classes.displayIcon}>
                  <ArrowRightAltIcon />
                  <Typography
                    variant="subtitle1"
                    className={classes.TextContent}
                    Typography
                  >
                    Python
                  </Typography>
                </Box>
                <Box className={classes.displayIcon}>
                  <ArrowRightAltIcon />
                  <Typography
                    variant="subtitle1"
                    className={classes.TextContent}
                    Typography
                  >
                    Spoken English
                  </Typography>
                </Box>
                <Typography
                  sx={{ mt: 2 }}
                  variant="body1"
                  color="text.secondary"
                >
                  <span style={{ color: "#2E2E2E", fontWeight: "bold" }}>
                    {" "}
                    Expected effort
                  </span>
                  : 2 hours / week for 15 weeks
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Please volunteer only if you are professional who has worked
                  with Python or have great command over English
                </Typography>
              </CardContent>
              <CardActions sx={{ mt: 12 }}>
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
          <Card elevation={8} className={classes.volunteerCard1}>
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Tech
              </Typography>

              <Box className={classes.displayIcon}>
                <ArrowRightAltIcon />
                <Typography
                  variant="subtitle1"
                  className={classes.TextContent}
                  Typography
                >
                  UX/Graphic Design
                </Typography>
              </Box>
              <Box className={classes.displayIcon}>
                <ArrowRightAltIcon />
                <Typography
                  variant="subtitle1"
                  className={classes.TextContent}
                  Typography
                >
                  Android (Kotlin)
                </Typography>
              </Box>
              <Box className={classes.displayIcon}>
                <ArrowRightAltIcon />
                <Typography
                  variant="subtitle1"
                  className={classes.TextContent}
                  Typography
                >
                  Front End Dev (React)
                </Typography>
              </Box>

              <Box className={classes.displayIcon}>
                <ArrowRightAltIcon />
                <Typography variant="subtitle1" className={classes.TextContent}>
                  {" "}
                  Back End Dev{" "}
                </Typography>
              </Box>

              <Box className={classes.displayIcon}>
                <ArrowRightAltIcon />
                <Typography variant="subtitle1" className={classes.TextContent}>
                  {" "}
                  Project Management
                </Typography>
              </Box>
              <Box className={classes.displayIcon}>
                <ArrowRightAltIcon />
                <Typography variant="subtitle1" className={classes.TextContent}>
                  Curriculum Creation & Translation{" "}
                </Typography>
              </Box>
              <Box sx={{ mt: 1 }}>
                <Typography variant="body1" color="text.secondary">
                  <span style={{ color: "#2E2E2E", fontWeight: "bold" }}>
                    {" "}
                    Expected effort
                  </span>
                  : 4 hours / week for 15 weeks
                </Typography>
                <Typography variant="body1">
                  You will taken to a Google form
                </Typography>
              </Box>
            </CardContent>
            <CardActions sx={{ mt: 3 }}>
              <Button variant="contained" color="secondary" fullWidth>
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
