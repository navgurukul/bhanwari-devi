import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Button,
  Card,
  Box,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
} from "@mui/material";
import useStyles from "./styles";
import axios from "axios";
import PublicIcon from "@mui/icons-material/Public";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../theme/constant";
import { Link } from "react-router-dom";
import { PATHS } from "../../constant";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function NewParnter() {
  const classes = useStyles();
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    axios({
      url: `https://navgurukul.github.io/tarabai-shinde/data/meraki_partners.json`,
    }).then((res) => {
      setPartners(res.data);
    });
  }, []);

  return (
    <Container sx={{ mt: 5 }} maxWidth="lg">
      <Container maxWidth="md">
        <Typography variant="h5" align="center">
          Our Partners
        </Typography>
        <hr color="primary" className={classes.underLine} />

        <Typography
          variant="body1"
          align={isActive ? "center" : "left"}
          paragraph
        >
          Meraki has partnered with individual schools, NGOs and state
          governments to provide students from low income families a step in the
          door of tech industry. Do you work with students that want to explore
          the world of programming? If so, look no further.
        </Typography>
      </Container>
      <Container sx={{ mt: 10 }}>
        <Grid container spacing={{ xs: 2, sm: 4 }}>
          <Grid item xs={12} sm={6} md={6}>
            <img
              className={classes.partnerLogo}
              src={require("./assest/partnerLogo.svg")}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Button
              variant="contained"
              color="warning"
              sx={{
                borderRadius: { xs: 25, sm: 15 },
                height: "30px",
              }}
              size="small"
            >
              featured
            </Button>

            <Typography sx={{ mt: 2 }} variant="subtitle1" gutterBottom>
              Amazon Future Engineer
            </Typography>
            <Typography variant="body1" paragraph>
              Amazon Future Engineer is a complete package of
              childhood-to-career program aimed at increasing access to computer
              science education for children and young adults from underserved
              and underrepresented communities. Amazon has partnered with Meraki
              to further our cause.
            </Typography>
            <Button
              // align={!isActive ? "left" : "center"}
              href={PATHS.AFE}
            >
              Learn More
              <ArrowForwardIosIcon />
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Container sx={{ mt: 6 }}>
        <Typography variant="h5" align="center">
          Partners List
          <hr color="primary" className={classes.underLine} />
        </Typography>
        <Grid container spacing={4}>
          {Object.keys(partners).length ? (
            Object.keys(partners).map((item) => {
              return (
                <Grid item xs={12} sm={6} md={4}>
                  {!partners[item].Name == "" &&
                    !partners[item].OrganisationType == "" &&
                    !partners[item].State == "" &&
                    !partners[item].City == "" && (
                      <Card className={classes.partnerCard}>
                        <CardHeader
                          sx={{ height: "35px" }}
                          title={partners[item].Name}
                          titleTypographyProps={{ variant: "subtitle1" }}
                        />
                        <Box className={classes.cardsContent}>
                          {partners[item].OrganisationType == "Non - Profit" ? (
                            <Button
                              variant="contained"
                              rounded
                              sx={{
                                borderRadius: { xs: 25, sm: 15 },
                                height: { xs: "60", sm: "30px" },
                                fontSize: "caption",
                                background: "lemonchiffon",
                                color: "black",
                              }}
                            >
                              {partners[item].OrganisationType}
                            </Button>
                          ) : partners[item].OrganisationType ==
                            "Educational Institution" ? (
                            <Button
                              variant="contained"
                              rounded
                              sx={{
                                borderRadius: { xs: 25, sm: 15 },
                                height: { xs: "60", sm: "30px" },
                                fontSize: "caption",
                                background: "lightskyblue",
                                color: "black",
                              }}
                            >
                              {partners[item].OrganisationType}
                            </Button>
                          ) : partners[item].OrganisationType ==
                            "Government" ? (
                            <Button
                              variant="contained"
                              rounded
                              sx={{
                                borderRadius: { xs: 25, sm: 15 },
                                height: { xs: "60", sm: "30px" },
                                fontSize: "caption",
                                background: "silver",
                                color: "black",
                              }}
                            >
                              {partners[item].OrganisationType}
                            </Button>
                          ) : partners[item].OrganisationType ==
                            "Community based organisation" ? (
                            <Button
                              variant="contained"
                              rounded
                              sx={{
                                borderRadius: { xs: 25, sm: 15 },
                                height: { xs: "60", sm: "30px" },
                                fontSize: "caption",
                                color: "black",
                              }}
                            >
                              {partners[item].OrganisationType}
                            </Button>
                          ) : (
                            ""
                          )}
                        </Box>
                        <CardContent>
                          <Typography variant="body1">
                            {!partners[item].City == "" &&
                              `${partners[item].City}, `}
                            {partners[item].State}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          {partners[item].Url ? (
                            <IconButton>
                              <Link href={partners[item].Url}>
                                <PublicIcon
                                  variant="outlined"
                                  fontSize="small"
                                  className={classes.iconsOfPartner}
                                />
                              </Link>
                            </IconButton>
                          ) : (
                            <></>
                          )}
                          {partners[item].LinkedinId ? (
                            <IconButton>
                              <Link href={partners[item].LinkedinId}>
                                <LinkedInIcon
                                  variant="outlined"
                                  fontSize="small"
                                  className={classes.iconsOfPartner}
                                />
                              </Link>
                            </IconButton>
                          ) : (
                            <></>
                          )}
                          {partners[item].TwitterId ? (
                            <IconButton>
                              <Link href={partners[item].TwitterId}>
                                <TwitterIcon
                                  variant="outlined"
                                  fontSize="small"
                                  className={classes.iconsOfPartner}
                                />
                              </Link>
                            </IconButton>
                          ) : (
                            <></>
                          )}
                        </CardActions>
                      </Card>
                    )}
                </Grid>
              );
            })
          ) : (
            <></>
          )}
        </Grid>
      </Container>
    </Container>
  );
}

export default NewParnter;
