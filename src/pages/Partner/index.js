import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
} from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import axios from "axios";
import useStyles from "./styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../theme/constant";
import IconButton from "@mui/material/IconButton";
import { PATHS } from "../../constant";

// import ExternalLink from "../../components/common/ExternalLink";

const Partner = () => {
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
    <Container maxWidth="lg" className={classes.partnerTopspacing}>
      <Container maxWidth="sm">
        <Typography variant="h5" align="center">
          Our Partners
          <hr color="primary" className={classes.partnerHrline} />
        </Typography>
        <Typography
          variant="body2"
          align={!isActive ? "center" : "left"}
          paragraph
        >
          Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui
          esse pariatur duis deserunt mollit dolore cillum minim tempor enim.
          Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate
          aute id deserunt nisi.
        </Typography>
        <Grid container justifyContent="center">
          {/* <Button
            variant="contained"
            color="primary"
            className={!isActive ? classes.partnerBtn : classes.partnerBtn1}
          >
          <Link
          //to={PATHS.AFE}
          className={classes.link1}
          
          >
            Join as a Partner
          </Link>
          </Button> */}
        </Grid>
      </Container>

      <Container
        className={
          !isActive ? classes.partnerContainer : classes.partnerContainer1
        }
      >
        <Grid container spacing={{ xs: 2, sm: 4 }}>
          <Grid item xs={12} sm={6} md={6}>
            <img
              src="https://www.linkfluence.com/hs-fs/hubfs/Amazon%20FMCG.jpg?width=689&name=Amazon%20FMCG.jpg"
              alt="Amazon box Robot"
              className={classes.partnerImg}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Stack spacing={1}>
              <Stack direction="row">
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
              </Stack>
              <Typography variant="subtitle1" gutterBottom>
                Amazon Future Engineer
              </Typography>
              <Typography variant="body2" paragraph>
                Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et.
                Sunt qui esse pariatur duis deserunt mollit dolore cillum minim
                tempor enim. Elit aute irure tempor cupidatat incididunt sint
                deserunt ut voluptate aute id deserunt nisi. Aliqua id fugiat
                nostrud irure ex duis ea quis id quis ad et. Sunt qui esse
                pariatur duis deserunt mollit dolore cillum minim tempor enim.
              </Typography>
              <Link
                to={PATHS.AFE}
                underline="hover"
                color="primary"
                align={!isActive ? "left" : "center"}
                className={classes.link}
              >
                Learn More
                <ChevronRightOutlinedIcon className={classes.partnerIcon} />
              </Link>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <Typography variant="h5" align="center">
        Partners List
        <hr color="primary" className={classes.partnerHrline} />
      </Typography>
      <Grid container spacing={5} className={classes.partnerBottomspacing}>
        {Object.keys(partners).length ? (
          Object.keys(partners).map((item) => {
            return (
              <Grid item xs={12} sm={4} md={4}>
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
                                    marginTop: "-20px",
                                    marginBottom: "15px",
                                  }
                                : {
                                    borderRadius: { xs: 25, sm: 15 },
                                    height: { xs: 34, sm: 25 },
                                    size: "small",
                                    fontSize: "caption",
                                    background: "lemonchiffon",
                                    color: "black",
                                    marginTop: "-20px",
                                    marginBottom: "15px",
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
                                    marginTop: "-20px",
                                    marginBottom: "15px",
                                  }
                                : {
                                    borderRadius: { xs: 25, sm: 15 },
                                    height: { xs: 34, sm: 25 },
                                    size: "small",
                                    fontSize: "caption",
                                    background: "lightskyblue",
                                    color: "black",
                                    marginTop: "-20px",
                                    marginBottom: "15px",
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
                                    marginTop: "-20px",
                                    marginBottom: "15px",
                                  }
                                : {
                                    borderRadius: { xs: 25, sm: 15 },
                                    height: { xs: 34, sm: 25 },
                                    size: "small",
                                    fontSize: "caption",
                                    background: "silver",
                                    color: "black",
                                    marginTop: "-20px",
                                    marginBottom: "15px",
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
                                    marginTop: "-20px",
                                    marginBottom: "15px",
                                  }
                                : {
                                    borderRadius: { xs: 25, sm: 15 },
                                    height: { xs: 34, sm: 25 },
                                    size: "small",
                                    fontSize: "caption",
                                    color: "black",
                                    marginTop: "-20px",
                                    marginBottom: "15px",
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
};
export default Partner;
