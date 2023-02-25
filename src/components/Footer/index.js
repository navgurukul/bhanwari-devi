import React, { useEffect } from "react";
import { Grid, Box, Container, List, Typography, Divider } from "@mui/material";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import { PATHS, interpolatePath } from "../../constant";
import LaunchOutlinedIcon from "@mui/icons-material/LaunchOutlined";
import { useSelector, useDispatch } from "react-redux";
import { actions as pathwayActions } from "../PathwayCourse/redux/action";
import ExternalLink from "../common/ExternalLink";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../theme/constant";

const menu = {
  About: [
    { title: "Our Story", type: "internal", link: PATHS.OUR_STORY },
    { title: "Meraki Team", type: "internal", link: PATHS.TEAM },
  ],
  LearningTracks: [
    { title: "Python", code: "PRGPYT", type: "internal" },
    { title: "Scratch (CEL)", code: "SHCEL", type: "internal" },
    { title: "Typing ", code: "TYPGRU", type: "internal" },
    { title: "Spoken English", code: "SPKENG", type: "internal" },
    // Changed the code for javascript JVSCPT => JSRPIT
    { title: "Javascript", code: "JSRPIT", type: "internal" },
    {
      title: "Residential Programmes",
      type: "internal",
      link: PATHS.RESIDENTIAL_COURSE,
    },
    {
      title: "Miscellaneous Courses",
      type: "internal",
      link: PATHS.MISCELLANEOUS_COURSE,
    },
  ],

  GetInvolved: [
    // { title: "Be a Partner", type: "internal", link: PATHS.OUR_PARTNER },
    {
      title: "Volunteer With Us",
      type: "internal",
      link: PATHS.VOLUNTEER_AUTOMATION,
    },
    {
      title: "Our Partners",
      type: "internal",

      link: PATHS.OUR_PARTNER,
    },

    // {
    //   title: "Donate",
    //   type: "external",
    //   link: "https://www.navgurukul.org/donate",
    // },
    {
      title: "Careers",
      type: "exernal",
      link: "https://recruiterflow.com/navgurukul/jobs",
    },
  ],
};

const MenuList = (menuItem) => {
  const title = menuItem.split(/(?=[A-Z])/).join(" ");
  const classes = useStyles();

  return (
    <>
      <Typography
        color="text.primary"
        // sx={{ mt: 4 }}
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
                to={
                  item.id
                    ? interpolatePath(PATHS.PATHWAY_COURSE, {
                        pathwayId: item.id,
                      })
                    : item.link
                }
                className={classes.link}
              >
                {/* {if (item?.title === "Donate"){
                    
                  }} */}
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{ pb: "8px" }}
                  className={classes.hover}
                >
                  {item.title}
                </Typography>
              </Link>
            );
          } else {
            return (
              <ExternalLink className={classes.link} href={item.link}>
                <Typography
                  variant="body2"
                  color="text.primary"
                  mb={1}
                  className={classes.CareerNDoner}
                >
                  {item.title} <LaunchOutlinedIcon sx={{ pl: "5px" }} />
                </Typography>
              </ExternalLink>
            );
          }
        })}
      </List>
    </>
  );
};

function FooterIcon(props) {
  const classes = useStyles();

  const socialMediaLink = {
    facebook: "https://www.facebook.com/navgurukul/",
    linkedIn: "https://www.linkedin.com/company/navgurukul/",
    twitter: "https://twitter.com/navgurukul",
  };

  return (
    <Box className={classes.image}>
      <ExternalLink href={socialMediaLink[props.name]}>
        <img
          src={require("./asset/" + props.name + ".svg")}
          alt={props.alt || "image of " + props.name}
          loading="lazy"
        />
      </ExternalLink>
    </Box>
  );
}

function Footer() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.Pathways);

  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  useEffect(() => {
    dispatch(pathwayActions.getPathways());
  }, [dispatch]);

  data &&
    data.pathways &&
    data.pathways.forEach((pathway) => {
      // console.log(pathway);
      menu.LearningTracks.forEach((item) => {
        if (pathway.code === item.code) {
          item.id = pathway.id;
        }
      });
    });

  return (
    <Box maxWidth="false" bgcolor="primary.light">
      <Container maxWidth="xl">
        <Grid container spacing={2} sx={{ mt: isActive ? "32px" : "64px" }}>
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
            <ExternalLink
              className={classes.link}
              sx={{ mt: "8px" }}
              href="https://www.navgurukul.org/donate"
            >
              <Typography
                variant="body2"
                color="text.primary"
                mb={1}
                mt={1}
                className={classes.CareerNDoner}
              >
                Donate <LaunchOutlinedIcon sx={{ pl: "5px" }} />
              </Typography>
            </ExternalLink>
          </Grid>
          <Grid xs={6} md={2}>
            <Typography
              color="text.primary"
              sx={{ mb: 1 }}
              variant="subtitle1"
              component="div"
            >
              Learn on Mobile
            </Typography>
            <ExternalLink
              href="https://play.google.com/store/apps/details?id=org.merakilearn&hl=en_IN&gl=US"
              className={classes.link}
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
            </ExternalLink>
          </Grid>
        </Grid>
        <Divider variant="string" sx={{ pt: "25px" }} />
        <Box>
          <Grid container spacing={2} sx={{ m: "30px 0px 30px 0px" }}>
            <Grid xs={12} md={6} sx={{ pl: { sm: 0, md: "10px" } }}>
              <Link to={PATHS.PRIVACY_POLICY} className={classes.link}>
                <Typography
                  className={classes.hover}
                  variant="body2"
                  color="text.primary"
                >
                  Legal & Privacy Policy
                </Typography>
              </Link>
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
