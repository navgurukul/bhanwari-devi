import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Box,
  Container,
  Stack,
  CssBaseline,
  Card,
} from "@mui/material";
import { Grid } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import useStyles from "./style";
import axios from "axios";
import Tippy from "@tippyjs/react";
import "./style.css";
import { breakpoints } from "../../theme/constant";
import LinkedIn from "../../components/common/SocialMediaIcons/LinkedIn";
import Twitter from "../../components/common/SocialMediaIcons/Twitter";

function shuffleObject(obj) {
  let newObj = {};
  var keys = Object.keys(obj);
  keys.sort(function (a, b) {
    return Math.random() - 0.5;
  });
  keys.forEach(function (k) {
    newObj[k] = obj[k];
  });
  return newObj;
}

function TeamPage() {
  useEffect(() => {
    axios({
      url: `https://anandpatel504.github.io/tarabai-shinde/data/ng_team.json`,
    }).then((res) => {
      setTeam(res.data);
    });
  }, []);
  const [team, setTeam] = useState([]);
  const [members, setMembers] = useState({
    teamMembers: true,
    volunteers: false,
  });
  const classes = useStyles();
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const isActiveIpad = useMediaQuery("(max-width:1300px)");
  // console.log(breakpoints.values.sm);
  console.log(isActive);
  function Popup(props) {
    return (
      <div className={classes.team_descriptionPopup}>
        {/* <div className="d-flex align-items-center"> */}
        <div className={classes.team_popupDetails}>
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
        </div>

        <Typography
          variant="body1"
          style={
            props.Content === "Awaiting content from team member"
              ? { color: "grey" }
              : {}
          }
          paragraph
        >
          {props.Content}
        </Typography>
      </div>
    );
  }
  return (
    <>
      <CssBaseline />
      <div>
        <Container
          maxWidth="lg"
          style={
            isActive ? { padding: 0, marginTop: "24px" } : { marginTop: "40px" }
          }
        >
          <Container maxWidth="sm">
            <Stack spacing={5}>
              <Box>
                <div
                  className={classes.team_conainerLeft}
                  style={
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
                    <Typography className={"d"} variant="h1" align="left">
                      30+
                    </Typography>
                  </Box>
                  <Typography className={"d"} variant="h4">
                    Core Members
                  </Typography>
                </div>

                <hr color="primary" className={classes.team_hrline} />
              </Box>
              <Box align="right" className={classes.team_alignRight}>
                <div
                  className={classes.team_conainerRight}
                  style={
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
                      100+
                    </Typography>
                  </Box>
                  <Typography className={"d"} variant="h4" align="right">
                    Supporters
                  </Typography>
                </div>
                <hr color="primary" className={classes.team_hrline} />
              </Box>
              <Typography
                variant="body1"
                align={!isActive ? "center" : "left"}
                paragraph
              >
                Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et.
                Sunt qui esse pariatur duis deserunt mollit dolore cillum minim
                tempor enim. Elit aute irure tempor cupidatat incididunt sint
                deserunt ut voluptate aute id deserunt nisi.
              </Typography>
              <Grid container justify="center" maxWidth="md">
                <Button
                  variant="contained"
                  color="primary"
                  className={!isActive ? classes.team_btn : classes.team_btn1}
                  sx={
                    !isActive
                      ? { marginRight: 4 }
                      : { marginRight: 0, marginBottom: 2 }
                  }
                >
                  Join as a Partner
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  spacing={2}
                  container
                  className={!isActive ? classes.team_btn : classes.team_btn1}
                >
                  Volunteer at Meraki
                </Button>
              </Grid>
            </Stack>
          </Container>
          <Container
            className={
              !isActive
                ? classes.team_containerTopSpace
                : `${classes.team_responsiveContainer}`
            }
          >
            <Grid container style={{ justifyContent: "center" }}>
              <Typography
                onClick={() => {
                  setMembers({ volunteers: false, teamMembers: true });
                }}
                variant="subtitle1"
                className={
                  !isActive
                    ? classes.team_selector
                    : classes.team_MobileSelector
                }
                style={
                  members.teamMembers
                    ? {
                        fontWeight: "bold",
                        borderBottom: "3px solid #48a145",
                      }
                    : {}
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
                  !isActive
                    ? classes.team_selector
                    : classes.team_MobileSelector
                }
                style={
                  members.volunteers
                    ? {
                        fontWeight: "bold",
                        borderBottom: "3px solid #48a145",
                      }
                    : {}
                }
              >
                Our Supporters
              </Typography>
            </Grid>
            <Container
              className={
                !isActive
                  ? `${classes.team_infoCardContaier} team-info-cards-container`
                  : `${classes.team_infoResponsiveContainer} team-info-cards-container`
              }
              sx={{ marginTop: 4 }}
            >
              <Grid container>
                {Object.keys(shuffleObject(team)).length ? (
                  Object.keys(shuffleObject(team)).map((item) => {
                    const condition = members.teamMembers
                      ? "teamMembers"
                      : "volunteers";
                    if (
                      (condition === "volunteers" &&
                        team[item].Association === "Volunteer") ||
                      (condition === "teamMembers" &&
                        team[item].Association !== "Volunteer")
                    ) {
                      if (
                        team[item].Photo &&
                        team[item].Name &&
                        team[item].Content.length &&
                        team[item].Content &&
                        team[item].Designation
                      )
                        return (
                          <Grid item xs={6} sm={4} md={3}>
                            <Tippy
                              animation="fade"
                              interactive="true"
                              duration={[500, 0]}
                              placement={
                                window.screen.availWidth < 650
                                  ? "bottom"
                                  : "right"
                              }
                              content={
                                <Popup
                                  Name={
                                    team[item].Name || "Awaiting Member's Name"
                                  }
                                  Content={
                                    (team[item].Content.length &&
                                      team[item].Content) ||
                                    "Awaiting content from team member"
                                  }
                                  linkedin={team[item].Linkedin}
                                  twitter={team[item].Twitter}
                                />
                              }
                            >
                              <div>
                                <div
                                  className={`${classes.team_cardDetails} card-details`}
                                >
                                  <img
                                    // className="card-img-top team-info-card-img img-card-hover"
                                    className={
                                      !isActive
                                        ? `${classes.team_cardImg} img-hover`
                                        : `${classes.team_mobileCardImg} img-hover`
                                    }
                                    src={team[item].Photo}
                                    alt={team[item].Name.substring(
                                      0,
                                      team[item].Name.indexOf(" ")
                                    )}
                                  />
                                  <Typography
                                    variant="body1"
                                    className={classes.team_cardTitle}
                                    style={
                                      !isActive ? {} : { textAlign: "center" }
                                    }
                                  >
                                    {team[item].Name}
                                  </Typography>
                                  <Typography
                                    variant="body1"
                                    className={classes.team_cardDescription}
                                  >
                                    {team[item].Designation}
                                  </Typography>
                                </div>
                              </div>
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
      </div>
    </>
  );
}

export default TeamPage;
