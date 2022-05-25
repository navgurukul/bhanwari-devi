import React from "react";
import { PATHS } from "../../constant";
import useStyles from "./Styles";
import Image from "./assest/dicto.jpg";
import axios from "axios";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState, useEffect } from "react";
import PublicIcon from "@mui/icons-material/Public";
import { styled } from "@mui/material/styles";
import {
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

const NewParnter = () => {
  const classes = useStyles();
  const [partner, setPartner] = useState([]);

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
          <Typography variant="h5" align="center">
            Our Partners
          </Typography>
          <hr className={classes.underline} />
          <Typography variant="body1" className={classes.typography} mb={4}>
            Meraki has partnered with individual schools, NGOs and state
            governments to provide students from low income families a step in
            the door of tech industry. Do you work with students that want to
            explore the world of programming? If so, look no further.
          </Typography>
          <Typography variant="div" sx={{ align: "center" }}>
            <Button
              variant="contained"
              color="primary"
              mb={10}
              className={classes.Join_btn}
            >
              Join As a Partner
            </Button>
          </Typography>
        </Container>
        <Container sx={{ mt: 10 }}>
          <Grid container md={12} spacing={{ xs: 2, sm: 4 }}>
            <Grid item xs={12} sm={6} md={6}>
              <img src={Image} className={classes.image} />
            </Grid>
            <Grid item xs={12} sm={6} md={6} spacing={4}>
              <Button
                size="small"
                color="warning"
                variant="contained"
                sx={{
                  borderRadius: { xs: 25, sm: 15 },
                  height: "30px",
                }}
              >
                Featured
              </Button>
              <Typography variant="h6">Amazon Future Engineer</Typography>
              <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                Amazon Future Engineer is a complete package of
                childhood-to-career program aimed at increasing access to
                computer science education for children and young adults from
                underserved and underrepresented communities. Amazon has
                partnered with Meraki to further our cause.
              </Typography>
              <Button ml={6} href={PATHS.AFE}>
                Learn More <ArrowForwardIosIcon />{" "}
              </Button>
            </Grid>
          </Grid>
        </Container>
        <Container sx={{ mt: 10 }}>
          <Typography variant="h4" align="center">
            Partner List{" "}
          </Typography>
          <hr className={classes.underline} />
          <Grid container spacing={3}>
            {Object.keys(partner).map((item) => {
              return (
                <Grid item xs={12} sm={6} md={4}>
                  {partner[item].Name !== null &&
                    partner[item].OrganisationType !== null &&
                    !partner[item].State !== null &&
                    !partner[item].City !== null && (
                      <Card sx={{ minWidth: 275, height: 250, mb: 4 }}>
                        <CardContent sx={{ height: "170px" }}>
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            gutterBottom
                          >
                            {partner[item].Name}
                          </Typography>
                          {partner[item].OrganisationType === "Non - Profit" ? (
                            <Button
                              variant="contained"
                              rounded
                              sx={{
                                background: "#FFF3CD",
                                height: "50px",
                                borderRadius: "20px",
                                color: "black",
                              }}
                            >
                              {partner[item].OrganisationType}
                            </Button>
                          ) : partner[item].OrganisationType ===
                            "Government" ? (
                            <Button
                              variant="contained"
                              rounded
                              sx={{
                                background: "#DADAEC",
                                borderRadius: "20px",
                                color: "black",
                              }}
                            >
                              {partner[item].OrganisationType}
                            </Button>
                          ) : partner[item].OrganisationType ===
                            "Educational Institution" ? (
                            <Button
                              variant="contained"
                              rounded
                              sx={{
                                background: "#D3EAFD",
                                borderRadius: "20px",
                                color: "black",
                              }}
                            >
                              {partner[item].OrganisationType}
                            </Button>
                          ) : partner[item].OrganisationType ===
                            "Community based organisation" ? (
                            <Button
                              variant="contained"
                              rounded
                              sx={{
                                background: "#FFE6E8",
                                borderRadius: "20px",
                                color: "black",
                                fontSize: "small",
                              }}
                            >
                              {partner[item].OrganisationType}
                            </Button>
                          ) : (
                            ""
                          )}
                          <Typography variant="body2" mt={2}>
                            {`${partner[item].City} , ${partner[item].State}`}
                          </Typography>
                        </CardContent>
                        <CardActions sx={{ height: "10px" }}>
                          {partner[item].Url !== null ? (
                            <IconButton>
                              <Link href={partner[item].Url} target="_blank">
                                <PublicIcon variant="outlined" />
                              </Link>
                            </IconButton>
                          ) : (
                            ""
                          )}
                          {/* {!partner[item].Linkedin Id === null?(
                          <IconButton>
                            <Link href={partner[item].Linkedin Id}>
                              <PublicIcon/>
                            </Link>
                          </IconButton>
                        ):("")} */}
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

export default NewParnter;
