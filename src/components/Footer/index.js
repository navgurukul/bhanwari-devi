import React, { useEffect } from "react";
import { Grid, Box, Container, List, Typography, Divider } from "@mui/material";
import useStyles from "./styles";
import { Link, useHistory } from "react-router-dom";
const menu = {
  About: [
    {
      title: "Our Story",
      type: "external",
      link: "https://www.navgurukul.org/about",
    },
    {
      title: "Meraki Team",
      type: "external",
      link: "https://www.navgurukul.org/team",
    },
  ],
  LearningTracks: [
    {
      title: "Python",
      type: "internal",
      link: "/pathway/1",
    },
    { title: "Typing Guru", type: "internal", link: "/pathway/3" },
    { title: "Spoken English", type: "internal", link: "/pathway/5" },
    { title: "Javascript", type: "internal", link: "/pathway/2" },
    {
      title: "Residential Programm",
      type: "internal",
      link: "/residential-course",
    },
    { title: "Open Courses", type: "internal", link: "/open-course" },
  ],
  GetInvolved: [
    { title: "Be a Partner", type: "internal", link: "/our-partner" },

    {
      title: "Donate",
      type: "external",
      link: "https://www.navgurukul.org/donate",
    },
    {
      title: "Careers",
      type: "exernal",
      link: "https://recruiterflow.com/navgurukul/jobs",
    },
  ],
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
        {menu[menuItem].map((item) => {
          if (item.type === "internal") {
            return (
              <Link
                to={item.link}
                style={{
                  textDecoration: "none",
                }}
              >
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{ pb: "5px" }}
                >
                  {item.title}
                </Typography>
              </Link>
            );
          } else {
            return (
              <a
                style={{
                  textDecoration: "none",
                }}
                target="_blank"
                href={item.link}
              >
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{ pb: "5px" }}
                >
                  {item.title}
                </Typography>
              </a>
            );
          }
        })}
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
  const [showHeader, setShowHeader] = React.useState(true);
  useEffect(() => {
    if (
      window.location.pathname.split("/").includes("course-content") ||
      window.location.pathname.split("/").includes("login") ||
      window.location.pathname.split("/").includes("profile")
    ) {
      console.log("here");
      setShowHeader(false);
    }
  }, []);

  const history = useHistory();
  history.listen((location, action) => {
    if (
      location.pathname.split("/").includes("course-content") ||
      location.pathname.split("/").includes("login") ||
      location.pathname.split("/").includes("profile")
    ) {
      console.log("not in header");
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
  });
  return (
    <Box
      style={{
        display: showHeader ? "inherit" : "none",
      }}
      maxWidth="false"
      bgcolor="primary.light"
    >
      <Container maxWidth="xl">
        <Grid container spacing={2} sx={{ mt: "50px" }}>
          <Grid xs={12} md={4} sx={{ pl: { sm: 0, md: "16px" } }}>
            <Box sx={{ display: "flex" }}>
              <Box className={classes.logo}>
                <img
                  src={require("./asset/logo.svg")}
                  alt="social media"
                  loading="lazy"
                />
              </Box>
            </Box>
            <Box className={classes.socialMedia} sx={{ display: "flex" }}>
              {["facebook", "linkedIn", "twitter"].map((imgName) => (
                <FooterIcon name={imgName} />
              ))}
            </Box>
            <Box className={classes.content}>
              <Typography variant="body2" color="text.primary">
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
            <a
              href="https://play.google.com/store/apps/details?id=org.merakilearn&hl=en_IN&gl=US"
              target="_blank"
              rel="external"
              style={{
                textDecoration: "none",
              }}
            >
              <Box sx={{ display: "flex" }}>
                <img
                  src={require("./asset/playStore.svg")}
                  alt="play store"
                  loading="lazy"
                />
                <Box sx={{ padding: "4px 0 0 10px" }}>
                  <Typography
                    variant="body2"
                    color="text.primary"
                    component="div"
                  >
                    Now on Playstore
                  </Typography>
                </Box>
              </Box>
            </a>
          </Grid>
        </Grid>
        <Divider variant="string" sx={{ pt: "25px" }} />
        <Box>
          <Grid container spacing={2} sx={{ m: "30px 0px 30px 0px" }}>
            <Grid xs={12} md={6} sx={{ pl: { sm: 0, md: "10px" } }}>
              <Typography variant="body2" color="text.primary">
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
                variant="body2"
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
