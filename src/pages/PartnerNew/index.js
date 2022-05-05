import React, { useEffect, useState } from "react";
import {
  Typography,
  CssBaseline,
  Container,
  Button,
  Card,
  Stack,
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
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";

function NewParnter() {
  const classes = useStyles();
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    axios({
      url: `https://anandpatel504.github.io/tarabai-shinde/data/meraki_partners.json`,
    }).then((res) => {
      setPartners(res.data);
    });
  }, []);

  return (
    <Container maxWidth="lg">
      <Container maxWidth="sm">
        <Typography variant="h5" align="center">
          Our Partners
        </Typography>
        <hr color="primary" className={classes.underLine} />

        <Typography
          variant="body2"
          align={isActive ? "center" : "left"}
          paragraph
        >
          Meraki has partnered with individual schools, NGOs and state
          governments to provide students from low income families a step in the
          door of tech industry. Do you work with students that want to explore
          the world of programming? If so, look no further.
        </Typography>
      </Container>
      <Container
      // className={
      //   !isActive ? classes.partnerContainer : classes.partnerContainer1
      // }
      >
        <Grid container spacing={{ xs: 2, sm: 4 }}>
          <Grid item xs={12} sm={6} md={6}>
            <img
              // className={classes.playstoreImg}
              src={require("./assest/partnerLogo.svg")}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Button
              variant="contained"
              color="warning"
              sx={{
                borderRadius: { xs: 25, sm: 15 },
                height: { xs: 34, sm: 25 },
              }}
              size="small"
            >
              <Link
                // to={PATHS.AFE}
                className={classes.link2}
              >
                featured
              </Link>
            </Button>

            <Typography variant="subtitle1" gutterBottom>
              Amazon Future Engineer
            </Typography>
            <Typography variant="body2" paragraph>
              Amazon Future Engineer is a complete package of
              childhood-to-career program aimed at increasing access to computer
              science education for children and young adults from underserved
              and underrepresented communities. Amazon has partnered with Meraki
              to further our cause.
            </Typography>
            <Link
              to={PATHS.AFE}
              underline="hover"
              color="primary"
              align={!isActive ? "left" : "center"}
              className={classes.link}
            >
              Learn More
              {/* <ArrowForwardIosIcon sx={{ padding: "2px " }} /> */}
              {/* <ChevronRightOutlinedIcon className={classes.partnerIcon} /> */}
            </Link>
            {/* </Stack> */}
          </Grid>
        </Grid>
      </Container>

      <Typography variant="h5" align="center">
        Partners List
        <hr color="primary" className={classes.underLine} />
      </Typography>

      <Grid container spacing={4} className={classes.partnerBottomspacing}>
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
                        title={partners[item].Name}
                        titleTypographyProps={{ variant: "subtitle1" }}
                        className={classes.partnerCardContainer}
                      />
                      <CardContent
                        className={
                          !isActive
                            ? classes.partnerCardContainer
                            : classes.partnerCardContainer1
                        }
                      >
                        {partners[item].OrganisationType == "Non - Profit" ? (
                          <Button
                            variant="contained"
                            rounded
                            sx={
                              !isActive
                                ? {
                                    borderRadius: { xs: 25, sm: 15 },
                                    height: { xs: "60", sm: "30px" },
                                    fontSize: "caption",
                                    background: "lemonchiffon",
                                    color: "black",
                                    // marginTop: "-20px",
                                    // marginBottom: "15px",
                                  }
                                : {
                                    borderRadius: { xs: 25, sm: 15 },
                                    height: { xs: 34, sm: 25 },
                                    size: "small",
                                    fontSize: "caption",
                                    background: "lemonchiffon",
                                    color: "black",
                                    // marginTop: "-20px",
                                    // marginBottom: "15px",
                                  }
                            }
                          >
                            {partners[item].OrganisationType}
                          </Button>
                        ) : partners[item].OrganisationType ==
                          "Educational Institution" ? (
                          <Button
                            variant="contained"
                            rounded
                            sx={
                              !isActive
                                ? {
                                    borderRadius: { xs: 25, sm: 15 },
                                    height: { xs: "60", sm: "30px" },
                                    fontSize: "caption",
                                    background: "lightskyblue",
                                    color: "black",
                                    // marginTop: "-20px",
                                    // marginBottom: "15px",
                                  }
                                : {
                                    borderRadius: { xs: 25, sm: 15 },
                                    height: { xs: 34, sm: 25 },
                                    size: "small",
                                    fontSize: "caption",
                                    background: "lightskyblue",
                                    color: "black",
                                    // marginTop: "-20px",
                                    // marginBottom: "15px",
                                  }
                            }
                          >
                            {partners[item].OrganisationType}
                          </Button>
                        ) : partners[item].OrganisationType == "Government" ? (
                          <Button
                            variant="contained"
                            rounded
                            sx={
                              !isActive
                                ? {
                                    borderRadius: { xs: 25, sm: 15 },
                                    height: { xs: "60", sm: "30px" },
                                    fontSize: "caption",
                                    background: "silver",
                                    color: "black",
                                    // marginTop: "-20px",
                                    // marginBottom: "15px",
                                  }
                                : {
                                    borderRadius: { xs: 25, sm: 15 },
                                    height: { xs: 34, sm: 25 },
                                    size: "small",
                                    fontSize: "caption",
                                    background: "silver",
                                    color: "black",
                                    // marginTop: "-20px",
                                    // marginBottom: "15px",
                                  }
                            }
                          >
                            {partners[item].OrganisationType}
                          </Button>
                        ) : partners[item].OrganisationType ==
                          "Community based organisation" ? (
                          <Button
                            variant="contained"
                            rounded
                            sx={
                              !isActive
                                ? {
                                    borderRadius: { xs: 25, sm: 15 },
                                    height: { xs: "60", sm: "30px" },
                                    fontSize: "caption",
                                    color: "black",
                                    // marginTop: "-20px",
                                    // marginBottom: "15px",
                                  }
                                : {
                                    borderRadius: { xs: 25, sm: 15 },
                                    height: { xs: 34, sm: 25 },
                                    size: "small",
                                    fontSize: "caption",
                                    color: "black",
                                    // marginTop: "-20px",
                                    // marginBottom: "15px",
                                  }
                            }
                          >
                            {partners[item].OrganisationType}
                          </Button>
                        ) : (
                          ""
                        )}

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
                                className={classes.partnerIconSize}
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
                                className={classes.partnerIconSize}
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
                                className={classes.partnerIconSize}
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
  );
}

export default NewParnter;

{
  /* <Container  maxWidth="lg">
<Grid container spacing={4}>
  {merakiConcerns.map((item, index) => (
    <Grid item xs={12} ms={6} md={4}>
  
  
    </Grid>
  ))}
</Grid>
</Container> */
}
