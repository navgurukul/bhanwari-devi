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
import { Box } from "@mui/system";

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
      <Container maxWidth="lg" sx={{ py: "32px" }}>
        <Container sx={{ my: isActive ? 2 : 4, p: 0 }}>
          <Grid container md={12} spacing={{ xs: 4, sm: 4 }}>
            <Grid item xs={12} sm={7} md={7}>
              <Typography
                variant="h4"
                // align="center"
                // mt={isActive ? 3 : 0}
                // mb={isActive && 2}
              >
                Partners are ones who open the doors to quality education for
                our students
              </Typography>
              {/* {!isActive && <hr className={classes.underline} />} */}

              <Typography
                // variant="body1"
                // className={classes.typography}
                my={2}
              >
                Do you want to be a part and help out your students through
                Meraki? Look no further and make the move.
              </Typography>
              <Stack
              // alignItems="center"
              >
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
                    style={{ width: isActive ? "100%" : "50%" }}
                  >
                    Join as a Partner
                  </Button>
                </Link>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={5} md={5}>
              <img
                src={require("./assest/undraw_agreement.svg")}
                alt="undraw Agreement"
                className={classes.image}
              />
            </Grid>
          </Grid>
        </Container>
      </Container>
      <Container
        maxWidth={false}
        // sx={{ mt: isActive ? 6 : 8 }}
        className={classes.containerColor}
      >
        <Container>
          <Grid
            md={12}
            container
            columnSpacing={{ xs: 2, sm: 4 }}
            paddingY={isActive ? 4 : 8}
          >
            <Grid item xs={12} sm={6} md={6}>
              <img src={Image} className={classes.image} />
            </Grid>
            <Grid item xs={12} sm={6} md={6} spacing={4}>
              {/* <Typography
                mt={isActive && 2}
                variant="body2"
                bgcolor="secondary.main"
                sx={{
                  height: "24px",
                  width: "59px",
                  py: "3px",
                  px: 1,
                  borderRadius: "16px",
                }}
              >
                Featured
              </Typography> */}
              <Chip
                label="Featured"
                color="warning"
                mt={2}
                sx={{ fontFamily: "Noto sans" }}
              />
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
      </Container>
      <Container sx={{ mt: 8, p: 0 }}>
        <Typography variant="h4" align="center" mb={isActive ? 2 : 4}>
          Partner List{" "}
        </Typography>
        <Grid container spacing={isActive ? 2 : 3}>
          {Object.keys(partner).map((item) => {
            return (
              <Grid item xs={12} sm={3} md={3} columnSpacing={4}>
                {partner[item].Name !== null &&
                  partner[item].OrganisationType !== null &&
                  !partner[item].State !== null &&
                  !partner[item].City !== null && (
                    <Card
                      sx={{
                        minWidth: "280px",
                        height: isActive ? 185 : 210,
                        mb: isActive ? 1 : 4,
                      }}
                    >
                      <CardContent
                        sx={{ height: isActive ? "110px" : "120px" }}
                      >
                        <Typography
                          variant="subtitle1"
                          // color="text.secondary"
                          gutterBottom
                          mb={1}
                        >
                          {partner[item].Name}
                        </Typography>
                        {partner[item].OrganisationType === "Non - Profit" ? (
                          <Chip
                            label={partner[item].OrganisationType}
                            mt={2}
                            variant="caption"
                            sx={{
                              background: "#FFF3CD",
                              fontFamily: "Noto sans",
                            }}
                          />
                        ) : partner[item].OrganisationType === "Government" ? (
                          <Chip
                            label={partner[item].OrganisationType}
                            mt={2}
                            variant="caption"
                            sx={{
                              background: "#DADAEC",
                              fontFamily: "Noto sans",
                            }}
                          />
                        ) : partner[item].OrganisationType ===
                          "Educational Institution" ? (
                          <Chip
                            label={partner[item].OrganisationType}
                            mt={2}
                            variant="contained"
                            sx={{
                              background: "#D3EAFD",
                              fontFamily: "Noto sans",
                            }}
                          />
                        ) : partner[item].OrganisationType ===
                          "Community based organisation" ? (
                          <Chip
                            label={partner[item].OrganisationType}
                            mt={2}
                            variant="contained"
                            sx={{
                              background: "#FFE6E8",
                              fontFamily: "Noto sans",
                            }}
                          />
                        ) : (
                          ""
                        )}
                        {/* <Typography variant="body2" mt={2}>
                            {`${partner[item].City} , ${partner[item].State}`}
                          </Typography> */}
                      </CardContent>
                      <CardActions sx={{ height: "8px" }}>
                        {partner[item].Url !== "NA" &&
                          partner[item].Url !== null && (
                            <IconButton>
                              <Link href={partner[item].Url} target="_blank">
                                <img
                                  className={classes.icons}
                                  src={require("./assest/world_icon.svg")}
                                  alt="World Img"
                                />
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
      {/* </Container> */}
    </>
  );
};

export default OurPartner;
