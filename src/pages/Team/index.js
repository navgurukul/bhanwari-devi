import React, { useState, useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import Tippy from "@tippyjs/react";
import { breakpoints } from "../../theme/constant";
import LinkedIn from "../../components/common/SocialMediaIcons/LinkedIn";
import Twitter from "../../components/common/SocialMediaIcons/Twitter";
import { Container, Grid, Typography, Button, Box } from "@mui/material";
import { PATHS } from "../../constant";
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
  });

  useEffect(() => {
    axios({
      url: `https://navgurukul.github.io/tarabai-shinde/data/meraki_team.json`,
    }).then((res) => {
      setTeam(res.data);
    });
  }, []);

  const condition = members.teamMembers ? "teamMembers" : "volunteers";
  let teamMember = [];
  let supporters = [];

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
      } else {
        teamMember.push(item);
      }
      return item;
    }
  });

  const name = "Awaiting Member's Name";

  return (
    <Container
      maxWidth="lg"
      sx={isActive ? { padding: 0, marginTop: "24px" } : { marginTop: "40px" }}
    >
      <Container maxWidth="md">
        <Box
          className={classes.team_conainerLeft}
          sx={
            isActive
              ? {
                  flexDirection: "column",
                  alignItems: "flex-start",
                  marginBottom: "1rem",
                }
              : {}
          }
        >
          <Box mr={2}>
            <Typography variant="h1" align="left">
              {teamMember.length}
            </Typography>
          </Box>
          <Typography variant="h4">Core Members</Typography>
        </Box>
        <hr color="primary" className={classes.team_hrline} />
        <Box align="right" className={classes.team_alignRight}>
          <Box
            className={classes.team_conainerRight}
            sx={
              isActive
                ? {
                    flexDirection: "column",
                    alignItems: "flex-end",
                    marginBottom: "1rem",
                  }
                : {}
            }
          >
            <Box mr={2}>
              <Typography className={"d"} variant="h1" align="right">
                {supporters.length}
              </Typography>
            </Box>
            <Typography className={"d"} variant="h4" align="right">
              Supporters
            </Typography>
          </Box>
          <hr color="primary" className={classes.team_hrline} />
        </Box>
        <Box mt={isActive ? "32px" : "40px"}>
          <Typography
            variant="body1"
            align={!isActive ? "center" : "left"}
            paragraph
          >
            We are a collective of full timers and volunteers that form the
            backbone aiming to bring affordable education to underprivileged
            students across India by making Tech education available. accessible
            and usable through our Meraki platform.
          </Typography>
          <Grid
            container
            justifyContent="center"
            maxWidth="md"
            mt={isActive ? 0 : "40px"}
          >
            <Button
              variant="contained"
              color="primary"
              href="https://recruiterflow.com/navgurukul/jobs"
              target="_blank"
              className={!isActive ? classes.team_btn : classes.team_btn1}
              sx={
                !isActive
                  ? { marginRight: 4 }
                  : { marginRight: 0, marginBottom: 2 }
              }
            >
              Join Us
            </Button>

            <Button
              variant="outlined"
              color="primary"
              href={PATHS.VOLUNTEER_AUTOMATION}
              // href="https://docs.google.com/forms/d/e/1FAIpQLScHvysncnhJkSMtpdpGl_uPhJWlE81hp6l5m2mvuE1hoxX-dQ/viewform"
              // target="_blank"
              target="_self"
              spacing={2}
              container
              className={!isActive ? classes.team_btn : classes.team_btn1}
            >
              Volunteer With Us
            </Button>
          </Grid>
        </Box>
      </Container>
      <Container
        className={
          !isActive
            ? classes.team_containerTopSpace
            : `${classes.team_responsiveContainer}`
        }
      >
        <Grid
          container
          style={{
            justifyContent: isActive ? "space-around" : "center",
            marginInlineStart: isActive ? "15px" : {},
          }}
        >
          <Typography
            onClick={() => {
              setMembers({ volunteers: false, teamMembers: true });
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
          <Typography
            onClick={() => {
              setMembers({ teamMembers: false, volunteers: true });
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
        </Grid>
        <Container
          className={
            !isActive
              ? classes.team_infoCardContaier
              : classes.team_infoResponsiveContainer
          }
          sx={{ marginTop: isActive ? 2 : 4 }}
        >
          <Grid container>
            {teamData ? (
              shuffleArray(teamData).map((item) => {
                if (
                  (condition === "volunteers" &&
                    item.Association === "Volunteer") ||
                  (condition === "teamMembers" &&
                    item.Association !== "Volunteer")
                ) {
                  return (
                    <Grid item xs={6} sm={6} md={3}>
                      <Tippy
                        animation="fade"
                        interactive="true"
                        duration={[500, 0]}
                        placement={
                          window.screen.availWidth < 650 ? "bottom" : "right"
                        }
                        content={
                          <Popup
                            Name={item.Name || name}
                            Content={
                              (item.Content.length && item.Content) || content
                            }
                            linkedin={item.Linkedin}
                            twitter={item.Twitter}
                          />
                        }
                      >
                        <Box
                          className={`${classes.team_cardDetails} card-details`}
                          pt={isActive ? "0px 0px" : "30px 0px"}
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
                          <Typography
                            variant="body1"
                            className={classes.team_cardTitle}
                            style={!isActive ? {} : { textAlign: "center" }}
                          >
                            {item.Name}
                          </Typography>
                          <Typography
                            variant="body1"
                            className={classes.team_cardDescription}
                          >
                            {item.Designation}
                          </Typography>
                        </Box>
                      </Tippy>
                    </Grid>
                  );
                }
              })
            ) : (
              <></>
            )}
          </Grid>
        </Container>
      </Container>
    </Container>
  );
}

export default Team;
