import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { PATHS } from "../../constant";
import axios from "axios";
import { useSelector } from "react-redux";
import { METHODS } from "../../services/api";
import { getQueryVariable } from "../../common/utils";
import { Link } from "react-router-dom";

import {
  Container,
  Typography,
  Chip,
  Grid,
  Button,
  CardContent,
  CardActions,
  useMediaQuery,
  Card,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function Opportunities() {
  const classes = useStyles();
  const isActive = useMediaQuery("(max-width: 600px)");

  const [partner, setPartner] = useState([]);
  const user = useSelector(({ User }) => User);

  const partnerId = user.data && user.data.user.partner_id;

  const partnerIdFromAndroid = getQueryVariable("partner_id");

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/partners`,
      headers: {
        accept: "application/json",
        Authorization: user.data ? user.data.token : "",
      },
    }).then((res) => {
      setPartner(res.data.partners);
    });
  }, []);

  let slug;
  for (const item of partner) {
    if (item.id == partnerId || item.id == partnerIdFromAndroid) {
      slug = item.slug;
    }
  }

  return (
    <>
      <Container maxWidth="lg">
        <Grid container columnSpacing={2} mb={8} mt={5}>
          <Grid item xs={12}>
            <Typography variant="h5">
              Curated list of opportunities to skyrocket your career
            </Typography>
            <Grid className={classes.section_Heading}>
              <Typography variant="subtitle1" color="text.secondary">
                Admission Opportunities
              </Typography>
            </Grid>
            <Grid container>
              <Grid>
                <Card elevation={2} className={classes.cards}>
                  <CardContent>
                    <Grid container Spacing={2}>
                      <Grid item xs={isActive ? 7 : 8.5} mr={isActive ? 5 : 3}>
                        <Typography variant="subtitle1">
                          NavGurukul One-Year Residential Programmme
                        </Typography>
                      </Grid>
                      <Grid item xs={isActive ? 3 : 1.5}>
                        <Chip
                          label="Featured"
                          variant="caption"
                          color="warning"
                        />
                      </Grid>
                    </Grid>
                    <Typography variant="body1" mt="13px">
                      Eligibility: Basic coding knowledge
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Grid className={classes.card_button}>
                      <Link
                        to={{
                          pathname: "/admission",
                          state: { partnerId: partnerId },
                        }}
                        style={{ textDecoration: "none" }}
                      >
                        <Button>
                          <Typography mr={1}>Take a Test Today</Typography>
                          <ArrowForwardIosIcon />
                        </Button>
                      </Link>
                    </Grid>
                  </CardActions>
                </Card>
              </Grid>
              <Grid
                item
                xs={5}
                sm={6}
                md={6}
                pl={isActive ? 0 : 2}
                pt={!isActive ? 0 : 2}
              >
                <Card
                  elevation={2}
                  className={classes.cards}
                  sx={{ width: isActive ? "342px" : "452px" }}
                >
                  <CardContent>
                    <Typography variant="subtitle1">
                      HyperVerge Fellowships
                    </Typography>
                    <Typography variant="body1" mt="13px">
                      Eligibility: Basic coding knowledge
                    </Typography>
                  </CardContent>
                  <Grid
                    className={classes.card_button}
                    mt={isActive ? "0px" : "27px"}
                  >
                    <CardActions>
                      <Link
                        href="https://apply.workable.com/hyperverge/j/BDA16E2E25/"
                        style={{ textDecoration: "none" }}
                        target="blank"
                      >
                        <Button>
                          <Typography mr={1}>Apply Now</Typography>
                          <ArrowForwardIosIcon />
                        </Button>
                      </Link>
                    </CardActions>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid className={classes.section_Heading}>
              <Typography variant="subtitle1" color="text.secondary">
                Grants / Advanced Courses / Mentorships
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="body1" color="text.primary">
                By learning with Meraki, you can avail benefits such as:
                <ul>
                  <li> Grants such as free keyboards for typing practice</li>
                  <li> Coursera Membership</li>
                  <li> Advanced english courses</li>
                  <li> 1:1 Mentorship sessions</li>
                </ul>
              </Typography>
              <Grid>
                <Typography variant="subtitle1" color="text.primary" mb={2}>
                  Are you interested in one or more of the above opportunities?
                </Typography>
              </Grid>
              <Grid>
                <Link
                  href="https://docs.google.com/forms/d/e/1FAIpQLSd7XgipoTYVME5xovEffKOLr0vzjDIfbnJ-fDK5KpIjZSqZgA/viewform"
                  style={{ textDecoration: "none" }}
                  target="blank"
                >
                  <Button
                    variant="outlined"
                    sx={{ width: isActive ? "100%" : "255px" }}
                  >
                    <Typography mr={1}>Apply Now</Typography>
                    <ArrowForwardIosIcon />
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
export default Opportunities;
