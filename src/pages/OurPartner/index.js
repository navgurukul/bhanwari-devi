import React from "react";
import { PATHS } from "../../constant";
import useStyles from "./Styles";
import Image from "./assest/dicto.jpg";
import axios from "axios";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState, useEffect } from "react";
import PublicIcon from "@mui/icons-material/Public";
import {
  Stack,
  Chip,
  Typography,
  Button,
  Container,
  Card,
  CardActions,
  Link,
  CardContent,
  Grid,
  IconButton,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../theme/constant";

const OurPartner = () => {
  const classes = useStyles();
  const [partner, setPartner] = useState([]);
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  useEffect(() => {
    axios
      .get(
        "https://navgurukul.github.io/tarabai-shinde/data/meraki_partners.json"
      )
      .then((response) => {
        setPartner(response.data);
      });
  }, []);

  return (
    <>
      <Container maxWidth="lg">
        <Container maxWidth="md">
          <Typography
            variant="h5"
            align="center"
            mt={isActive ? 3 : 0}
            mb={isActive && 2}
          >
            Our Partners
          </Typography>
          {!isActive && <hr className={classes.underline} />}

          <Typography
            variant="body1"
            className={classes.typography}
            mb={isActive ? 2 : 4}
          >
            Meraki has partnered with individual schools, NGOs and state
            governments to provide students from low income families a step in
            the door of tech industry. Do you work with students that want to
            explore the world of programming? If so, look no further.
          </Typography>
          <Stack alignItems="center">
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSeUD5vhzlXS46KqeKk7AiBBE4U8I3o5SOkr7oFzc6ax7C_Ojg/viewform"
              target="_blank"
            >
              <Button
                component="span"
                size="larger"
                variant="contained"
                color="primary"
                mb={10}
                style={{ width: isActive && "355px" }}
              >
                Join As a Partner
              </Button>
            </Link>
          </Stack>
        </Container>
        <Container sx={{ mt: isActive ? 6 : 10 }}>
          <Grid container md={12} spacing={{ xs: 2, sm: 4 }}>
            <Grid item xs={12} sm={6} md={6}>
              <img src={Image} className={classes.image} />
            </Grid>
            <Grid item xs={12} sm={6} md={6} spacing={4}>
              <Chip label="Featured" color="warning" mt={2} />
              <Typography variant="h6" mt={2}>
                Amazon Future Engineer
              </Typography>
              <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                Amazon Future Engineer is a complete package of
                childhood-to-career program aimed at increasing access to
                computer science education for children and young adults from
                underserved and underrepresented communities. Amazon has
                partnered with Meraki to further our cause.
              </Typography>
              <Stack sx={{ alignItems: isActive ? "center" : "start" }}>
                <Button ml={6} href={PATHS.AFE}>
                  Learn More <ArrowForwardIosIcon />{" "}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Container>
        <Container sx={{ mt: isActive ? 8 : 10 }}>
          <Typography variant="h4" align="center" mb={isActive && 2}>
            Partner List{" "}
          </Typography>
          {!isActive && <hr className={classes.underline} />}
          <Grid container spacing={isActive ? 2 : 3}>
            {Object.keys(partner).map((item) => {
              return (
                <Grid item xs={12} sm={6} md={4}>
                  {partner[item].Name !== null &&
                    partner[item].OrganisationType !== null &&
                    !partner[item].State !== null &&
                    !partner[item].City !== null && (
                      <Card
                        sx={{
                          minWidth: 275,
                          height: isActive ? 185 : 250,
                          mb: isActive ? 1 : 4,
                        }}
                      >
                        <CardContent
                          sx={{ height: isActive ? "110px" : "170px" }}
                        >
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            gutterBottom
                            mb={1}
                          >
                            {partner[item].Name}
                          </Typography>
                          {partner[item].OrganisationType === "Non - Profit" ? (
                            <Chip
                              label={partner[item].OrganisationType}
                              mt={2}
                              sx={{ background: "#FFF3CD" }}
                            />
                          ) : partner[item].OrganisationType ===
                            "Government" ? (
                            <Chip
                              label={partner[item].OrganisationType}
                              mt={2}
                              variant="contained"
                              sx={{ background: "#DADAEC" }}
                            />
                          ) : partner[item].OrganisationType ===
                            "Educational Institution" ? (
                            <Chip
                              label={partner[item].OrganisationType}
                              mt={2}
                              variant="contained"
                              sx={{ background: "#D3EAFD" }}
                            />
                          ) : partner[item].OrganisationType ===
                            "Community based organisation" ? (
                            <Chip
                              label={partner[item].OrganisationType}
                              mt={2}
                              variant="contained"
                              sx={{ background: "#FFE6E8" }}
                            />
                          ) : (
                            ""
                          )}
                          <Typography variant="body2" mt={2}>
                            {`${partner[item].City} , ${partner[item].State}`}
                          </Typography>
                        </CardContent>
                        <CardActions sx={{ height: "8px" }}>
                          {partner[item].Url !== "NA" &&
                            partner[item].Url !== null && (
                              <IconButton>
                                <Link href={partner[item].Url} target="_blank">
                                  <PublicIcon variant="outlined" />
                                </Link>
                              </IconButton>
                            )}
                        </CardActions>
                      </Card>
                    )}
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Container>
    </>
  );
};

export default OurPartner;
