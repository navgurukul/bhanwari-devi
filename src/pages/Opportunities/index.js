import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { PATHS } from "../../constant";
import axios from "axios";
import { useSelector } from "react-redux";
import { METHODS } from "../../services/api";
import { breakpoints } from "../../theme/constant";
import { getQueryVariable } from "../../common/utils";
import { Link } from "react-router-dom";
import ExternalLink from "../../components/common/ExternalLink";

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
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

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

  return (
    <>
      <Container maxWidth="lg">
        <Grid
          container
          columnSpacing={2}
          mt={isActive ? 4 : 8}
          mb={!isActive && 4}
        >
          <Grid item xs={12}>
            <Typography variant="h5">
              Curated list of opportunities to skyrocket your career
            </Typography>
            <Grid className={classes.section_Heading}>
              <Typography variant="h6">Admission Opportunities</Typography>
            </Grid>
            <Grid container>
              <Grid xs={12} sm={6} md={4}>
                <Card
                  elevation={2}
                  className={isActive ? classes.mobileCards : classes.cards}
                >
                  <CardContent>
                    <Grid container>
                      <Grid item xs={7} sm={9} md={9} mr={{ xs: 5, sm: 0 }}>
                        <Typography variant="subtitle1">
                          NavGurukul One-Year Residential Programmme
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={3}
                        sm={3}
                        md={3}
                        style={{ display: "flex", justifyContent: "right" }}
                      >
                        <Typography
                          variant="body2"
                          bgcolor="secondary.main"
                          sx={{
                            height: "24px",
                            py: "3px",
                            px: 1,
                            borderRadius: "16px",
                          }}
                        >
                          Featured
                        </Typography>
                      </Grid>
                    </Grid>
                    <Typography variant="body1" mt="16px">
                      Eligibility: Basic coding knowledge
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Grid className={classes.card_button}>
                      <ExternalLink
                        href="https://admissions.navgurukul.org/"
                        Curated
                        list
                        of
                        opportunities
                        to
                        skyrocket
                        your
                        career
                        style={{ textDecoration: "none" }}
                      >
                        <Button endIcon={<ArrowForwardIosIcon />} mr={1}>
                          Apply Now
                        </Button>
                      </ExternalLink>
                    </Grid>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4} pt={{ xs: 2, sm: 0 }}>
                <Card
                  elevation={2}
                  className={isActive ? classes.mobileCards : classes.cards}
                >
                  <CardContent>
                    <Typography variant="subtitle1">
                      HyperVerge Fellowships
                    </Typography>
                    <Typography variant="body1" mt="16px">
                      Eligibility: Basic coding knowledge
                    </Typography>
                  </CardContent>
                  <Grid
                    className={classes.card_button}
                    mt={{ xs: 0, sm: "27px" }}
                    mr={2}
                  >
                    <CardActions>
                      <ExternalLink
                        href="https://apply.workable.com/hyperverge/j/BDA16E2E25/"
                        style={{ textDecoration: "none" }}
                      >
                        <Button endIcon={<ArrowForwardIosIcon />}>
                          Apply Now
                        </Button>
                      </ExternalLink>
                    </CardActions>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
export default Opportunities;
