import React from "react";
import { Grid, Box, Container, List, Typography, Divider } from "@mui/material";
import useStyles from "./styles";

const menu = {
  About: ["Our Story", "Meraki Team "],
  LearningTracks: [
    "Python",
    "Typing Guru",
    "Spoken English",
    "Javascript",
    "Soft Skills",
    "Open Courses",
  ],
  GetInvolved: ["Be a Partner", "Donate", "Careers", "Volunteer"],
};

const MenuList = (menuItem) => {
  const title = menuItem.split(/(?=[A-Z])/).join(" ");
  return (
    <>
      <Typography
        color="text.primary"
        sx={{ mt: 4 }}
        variant="subtitle1"
        component="div"
      >
        {title}
      </Typography>
      <List>
        {menu[menuItem].map((item) => (
          <Typography color="text.primary" sx={{ pb: "5px" }}>
            {item}
          </Typography>
        ))}
      </List>
    </>
  );
};

function FooterIcon(props) {
  const classes = useStyles();
  return (
    <Box className={classes.image}>
      <img
        src={require("./asset/" + props.name + ".svg")}
        alt={props.alt || "image of " + props.name}
        loading="lazy"
      />
    </Box>
  );
}

function Footer() {
  const classes = useStyles();
  return (
    <Box maxWidth="false" bgcolor="primary.light">
      <Container maxWidth="xl">
        <Grid container spacing={2} sx={{ mt: "40px" }}>
          <Grid xs={12} md={4} sx={{ pl: { sm: 0, md: "16px" } }}>
            <Box sx={{ display: "flex" }}>
              <Box className={classes.logo}>
                <img
                  src={require("./asset/logo.svg")}
                  alt="social media"
                  loading="lazy"
                />
              </Box>
              <Box className={classes.meraki}>
                <img
                  src={require("./asset/meraki.svg")}
                  alt="social media"
                  loading="lazy"
                />
              </Box>
            </Box>
            <Box sx={{ display: "flex" }}>
              {["facebook", "linkedIn", "twitter"].map((imgName) => (
                <FooterIcon name={imgName} />
              ))}
            </Box>
            <Box className={classes.content}>
              <Typography color="text.primary">
                © 2022 NavGurukul Foundation for Social Welfare
              </Typography>
            </Box>
          </Grid>
          <Grid xs={6} md={2} sx={{ pl: "15px" }}>
            {MenuList("About")}
          </Grid>
          <Grid xs={6} md={2}>
            {MenuList("LearningTracks")}
          </Grid>
          <Grid xs={6} md={2} sx={{ pl: "15px" }}>
            {MenuList("GetInvolved")}
          </Grid>
          <Grid xs={6} md={2}>
            <Typography
              color="text.primary"
              sx={{ mt: 4, mb: 1 }}
              variant="subtitle1"
              component="div"
            >
              Learn on Mobile
            </Typography>
            <Box sx={{ display: "flex" }}>
              <img
                src={require("./asset/playStore.svg")}
                alt="play store"
                loading="lazy"
              />
              <Box sx={{ padding: "4px 0 0 10px" }}>
                <Typography color="text.primary" component="div">
                  Now on Playstore
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Divider variant="string" sx={{ pt: "25px" }} />
        <Box>
          <Grid container spacing={2} sx={{ m: "30px 0px 30px 0px" }}>
            <Grid xs={12} md={6} sx={{ pl: { sm: 0, md: "10px" } }}>
              <Typography color="text.primary">
                Legal & Privacy Policy
              </Typography>
            </Grid>
            <Grid
              xs={12}
              md={6}
              sx={{
                pr: { sm: 0, md: "17px" },
              }}
            >
              <Typography
                color="text.primary"
                sx={{ textAlign: { sm: "left", md: "right" } }}
              >
                Made with ❤️ for our students{" "}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
