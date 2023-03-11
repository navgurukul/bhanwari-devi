import React, { useState, useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import { breakpoints } from "../../theme/constant";
import LinkedIn from "../../components/common/SocialMediaIcons/LinkedIn";
import Twitter from "../../components/common/SocialMediaIcons/Twitter";
import { Container, Grid, Typography, Button, Box } from "@mui/material";
import useStyles from "./styles";

function shuffleArray(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    const newIndex = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[newIndex]] = [arr[newIndex], arr[i]];
  }
  return arr;
}

const content = "Awaiting content from team member";

const Popup = (props) => {
  const classes = useStyles();
  return (
    <Box className={classes.team_descriptionPopup}>
      <Box className={classes.team_popupDetails}>
        <Typography variant="subtitle1" className={classes.team_cardTitle}>
          {props.Name}
        </Typography>
        {props.linkedin ? (
          <a
            href={props.linkedin}
            target="_blank"
            className={classes.team_socialIcon}
          >
            <LinkedIn />
          </a>
        ) : (
          <></>
        )}
        {props.twitter ? (
          <a
            href={props.twitter}
            target="_blank"
            className={classes.team_socialIcon}
          >
            <Twitter />
          </a>
        ) : (
          <></>
        )}
      </Box>

      <Typography
        variant="body1"
        style={props.Content === content ? { color: "grey" } : {}}
        paragraph
      >
        {props.Content}
      </Typography>
    </Box>
  );
};

function Team() {
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const classes = useStyles();
  const [team, setTeam] = useState([]);
  const [members, setMembers] = useState({
    teamMembers: true,
    volunteers: false,
    exTeam: false,
  });

  useEffect(() => {
    axios({
      url: `https://navgurukul.github.io/tarabai-shinde/data/meraki_team.json`,
    }).then((res) => {
      setTeam(res.data);
    });
  }, []);

  const condition = members.teamMembers
    ? "teamMembers"
    : members.volunteers
    ? "volunteers"
    : "exTeam";
  let teamMember = [];
  let supporters = [];
  let exTeam = [];

  const teamData = Object.values(team).filter((item) => {
    if (
      item.Association !== null &&
      item.Photo !== null &&
      item.Name !== null &&
      item.Content &&
      item.Content.length > 0 &&
      item.Designation !== null
    ) {
      if (item.Association === "Volunteer") {
        supporters.push(item);
      } else if (item.Association === "Ex-Team") {
        exTeam.push(item);
      } else {
        teamMember.push(item);
      }
      return item;
    }
  });

  const name = "Awaiting Member's Name";

  return (
    <Container maxWidth="lg" sx={{ mt: isActive ? 4 : 8 }}>
      <Grid container spacing={{ xs: 4, sm: 4 }}>
        <Grid item xs={12} sm={7} md={7}>
          <Typography variant="h4">
            Meet the team of core members, a ton of volunteers, and past members
            that have made it all possible.
          </Typography>

          <Typography variant="body1" mt={2}>
            Meraki aims to remain free for underserved communities in India. We
            have been fortunate to find passionate people sharing our goals and
            helping us build one of the best learning platforms out there.
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={5}
          md={5}
          // sx={isActive && {marginTop:"32px"}}
          // align="center"
        >
          <img
            src={require("./Asset/real_time.svg")}
            alt="undraw Agreement"
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: isActive && "290px",
            }}
          />
        </Grid>
      </Grid>
      <Box
        disablePadding
        className={
          !isActive
            ? classes.team_containerTopSpace
            : `${classes.team_responsiveContainer}`
        }
        // sx={{ p: 0 }}
      >
        <Box
          container
          disablePadding
          className={
            isActive ? classes.team_button_box_mob : classes.team_button_box
          }
        >
          <Button>
            <Typography
              onClick={() => {
                setMembers({
                  exTeam: false,
                  volunteers: false,
                  teamMembers: true,
                });
              }}
              variant="subtitle1"
              className={
                !isActive ? classes.team_selector : classes.team_MobileSelector
              }
              style={
                members.teamMembers
                  ? {
                      fontWeight: "bold",
                      borderBottom: "3px solid #48a145",
                    }
                  : { color: "#9c9999" }
              }
            >
              Core Team
            </Typography>
          </Button>
          <Button>
            <Typography
              onClick={() => {
                setMembers({
                  exTeam: false,
                  teamMembers: false,
                  volunteers: true,
                });
              }}
              variant="subtitle1"
              className={
                !isActive ? classes.team_selector : classes.team_MobileSelector
              }
              style={
                members.volunteers
                  ? {
                      fontWeight: "bold",
                      borderBottom: "3px solid #48a145",
                    }
                  : { color: "#9c9999" }
              }
            >
              Our Supporters
            </Typography>
          </Button>
        </Box>
        {/* Commented code is containing & sowing the data of Ex-team members */}
        {/* <Button>
            <Typography
              onClick={() => {
                setMembers({
                  exTeam: true,
                  teamMembers: false,
                  volunteers: false,
                });
              }}
              variant="subtitle1"
              className={
                !isActive ? classes.team_selector : classes.team_MobileSelector
              }
              style={
                members.exTeam
                  ? {
                      fontWeight: "bold",
                      borderBottom: "3px solid #48a145",
                    }
                  : { color: "#9c9999" }
              }
            >
              Ex-Team
            </Typography>
          </Button> */}

        <Box
          className={
            !isActive
              ? classes.team_infoCardContaier
              : classes.team_infoResponsiveContainer
          }
          sx={{
            marginTop: isActive ? 2 : 4,
            // px: 0
          }}
        >
          <Grid
            container
            // sx={{ p: 0, m: 0 }}
            // disablePadding
          >
            {teamData ? (
              shuffleArray(teamData).map((item) => {
                if (
                  (condition === "volunteers" &&
                    item.Association === "Volunteer") ||
                  (condition === "exTeam" && item.Association === "Ex-Team") ||
                  (condition === "teamMembers" &&
                    item.Association !== "Volunteer" &&
                    item.Association !== "Ex-Team")
                ) {
                  return (
                    <Grid item xs={12} sm={6} md={3}>
                      <Box
                        className={`${classes.team_cardDetails} card-details`}
                        sx={
                          !isActive
                            ? { width: "256px", height: "320px" }
                            : { width: "100%", height: "312px" }
                        }
                      >
                        <img
                          className={
                            !isActive
                              ? `${classes.team_cardImg} img-hover`
                              : `${classes.team_mobileCardImg} img-hover`
                          }
                          src={item.Photo}
                          alt={item.Name.substring(0, item.Name.indexOf(" "))}
                        />
                        <Box className={classes.middle}>
                          <Typography variant="body1" className={classes.text}>
                            {(item.Content.length && item.Content) || content}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography
                        variant="subtitle1"
                        className={classes.team_cardTitle}
                      >
                        {item.Name}
                      </Typography>
                      <Typography
                        variant="body1"
                        className={classes.team_cardDescription}
                      >
                        {item.Designation}
                      </Typography>
                    </Grid>
                  );
                }
              })
            ) : (
              <></>
            )}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Team;
