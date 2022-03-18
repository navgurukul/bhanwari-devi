import React from "react";
import {
  Typography,
  Container,
  CssBaseline,
  Grid,
  Card,
  CardContent,
} from "@material-ui/core";
import PublicIcon from "@mui/icons-material/Public";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import useStyles from "./styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Partners_data from "./Partnerdata";

const Partner = () => {
  const classes = useStyles();
  const isActive = useMediaQuery("(max-width:600px)");
  const isActiveIpad = useMediaQuery("(max-width:1300px)");
  return (
    <>
      <CssBaseline />
      <main>
        <Container maxWidth="lg">
          <Container
            maxWidth="sm"
            className={isActive && classes.partner_Topspacing}
          >
            <Typography
              variant="h5"
              align="center"
              className={classes.partner_textBold}
              gutterBottom
            >
              Our Partners
              <hr color="primary" className={classes.partner_hrline} />
            </Typography>
            <Typography
              variant="body2"
              align={!isActive ? "center" : "left"}
              paragraph
            >
              Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt
              qui esse pariatur duis deserunt mollit dolore cillum minim tempor
              enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut
              voluptate aute id deserunt nisi.
            </Typography>
            <Grid container justify="center">
              <Button
                variant="contained"
                color="primary"
                className={
                  !isActive ? classes.partner_btn : classes.partner_btn1
                }
              >
                Join as a Partner
              </Button>
            </Grid>
          </Container>
          <Container
            maxWidth="md"
            className={
              !isActive ? classes.partner_container : classes.partner_container1
            }
          >
            <Grid container spacing={!isActive ? 4 : 2}>
              <Grid item xs={12} sm={6} md={6}>
                <img
                  src="https://www.linkfluence.com/hs-fs/hubfs/Amazon%20FMCG.jpg?width=689&name=Amazon%20FMCG.jpg"
                  alt="Amazon box Robot"
                  className={classes.partner_img}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Stack spacing={1}>
                  <Stack direction="row">
                    <Button
                      variant="contained"
                      color="warning"
                      sx={{ borderRadius: 25 }}
                      size="small"
                    >
                      featured
                    </Button>
                  </Stack>
                  <Typography
                    variant="subtitle1"
                    className={classes.partner_textBold}
                    gutterBottom
                  >
                    Amazon Future Engineer
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Aliqua id fugiat nostrud irure ex duis ea quis id quis ad
                    et. Sunt qui esse pariatur duis deserunt mollit dolore
                    cillum minim tempor enim. Elit aute irure tempor cupidatat
                    incididunt sint deserunt ut voluptate aute id deserunt nisi.
                    Aliqua id fugiat nostrud irure ex duis ea quis id quis ad
                    et. Sunt qui esse pariatur duis deserunt mollit dolore
                    cillum minim tempor enim.
                  </Typography>
                  <Link
                    href="#"
                    underline="hover"
                    color="primary"
                    align={!isActive ? "left" : "center"}
                    className={classes.partner_Topspacing1}
                  >
                    Learn More
                    <ChevronRightOutlinedIcon
                      className={classes.partner_icon}
                    />
                  </Link>
                </Stack>
              </Grid>
            </Grid>
          </Container>
          <Typography
            variant="h5"
            className={classes.partner_textBold}
            align="center"
          >
            Partners List
            <hr color="primary" className={classes.partner_hrline} />
          </Typography>
          <Container maxWidth="md">
            <Grid container spacing={3}>
              {Partners_data.map((value, index) => {
                return (
                  <Grid item xs={12} sm={4} md={4}>
                    <Card className={classes.partner_card} key={index}>
                      <CardContent>
                        <Typography
                          variant="subtitle2"
                          className={classes.partner_textBold}
                          gutterBottom
                        >
                          {value.name}
                        </Typography>
                        <Typography variant="body2" paragraph>
                          {value.description}
                        </Typography>
                        <Stack direction="row" spacing={1}>
                          <PublicIcon
                            variant="outlined"
                            fontSize="Xsmall"
                            className={classes.partner_iconSize}
                          />
                          <LinkedInIcon
                            variant="outlined"
                            fontSize="Xsmall"
                            className={classes.partner_iconSize}
                          />
                          <TwitterIcon
                            variant="outlined"
                            fontSize="Xsmall"
                            className={classes.partner_iconSize}
                          />
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </Container>
      </main>
    </>
  );
};
export default Partner;
