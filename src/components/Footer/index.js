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
import { PATHWAYS_INFO } from "../../constant";

const menu = {
  About: [
    { name: "Our Story", type: "internal", path: PATHS.OUR_STORY },
    { name: "Meraki Team", type: "internal", path: PATHS.TEAM },
  ],
  LearningTracks: [],
  GetInvolved: [
    {
      name: "Volunteer With Us",
      type: "internal",
      path: PATHS.VOLUNTEER_AUTOMATION,
    },
    {
      name: "Our Partners",
      type: "internal",
      path: PATHS.OUR_PARTNER,
    },
    {
      name: "Careers",
      type: "external",
      path: "https://recruiterflow.com/navgurukul/jobs",
    },
  ],
};

const MenuList = (menuItem) => {
  const title = menuItem.split(/(?=[A-Z])/).join(" ");
  const user = useSelector(({ User }) => User);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => {
    return state.PathwaysDropdow;
  });

  // useEffect(() => {
  //   dispatch(
  //     pathwayActions.getPathwaysDropdown({
  //       authToken: user,
  //     })
  //   );
  // }, [dispatch, user]);

  const miscellaneousPathway = data?.pathways.filter((pathway) =>
    PATHWAYS_INFO.some((miscPathway) => pathway.name === miscPathway.name)
  );
  const pathwayData = data?.pathways
    .filter((pathway) => !miscellaneousPathway.includes(pathway))
    .concat(miscellaneousPathway);

  if (menuItem === "LearningTracks") {
    menu[menuItem] = pathwayData;
  }

  const subMenu = menu[menuItem];

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
        {subMenu?.map((item) => {
          if (item.type === "external") {
            return (
              <ExternalLink
                className={classes.link}
                href={item.path}
                key={item.path}
              >
                <Typography
                  variant="body2"
                  color="text.primary"
                  mb={1}
                  className={classes.CareerNDoner}
                >
                  {item.name} <LaunchOutlinedIcon sx={{ pl: "5px" }} />
                </Typography>
              </ExternalLink>
            );
          } else {
            const toLink = item.id
              ? interpolatePath(PATHS.PATHWAY_COURSE, {
                  pathwayId: item.id,
                })
              : item.path;
            return (
              <Link key={toLink} to={toLink} className={classes.link}>
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{ pb: "8px" }}
                  className={classes.hover}
                >
                  {item.name}
                </Typography>
              </Link>
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
  const user = useSelector(({ User }) => User);
  const dispatch = useDispatch();
  const { data } = useSelector((state) => {
    return state.PathwaysDropdow;
  });

  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  // useEffect(() => {
  //   dispatch(
  //     pathwayActions.getPathwaysDropdown({
  //       authToken: user,
  //     })
  //   );
  // }, [dispatch, user]);

  menu.LearningTracks &&
    data &&
    data.pathways &&
    data.pathways.forEach((pathway) => {
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
          <Grid item xs={12} md={4} sx={{ pl: { sm: 0, md: "16px" } }}>
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
                <FooterIcon key={imgName} name={imgName} />
              ))}
            </Box>
            <Box className={classes.content}>
              <Typography variant="body2" color="text.primary">
                © 2022 NavGurukul Foundation for Social Welfare
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={2} sx={{ pl: "15px" }}>
            {MenuList("About")}
          </Grid>
          <Grid item xs={6} md={2}>
            {MenuList("LearningTracks")}
          </Grid>
          <Grid item xs={6} md={2} sx={{ pl: "15px" }}>
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
                mt={-1}
                className={classes.CareerNDoner}
              >
                Donate <LaunchOutlinedIcon sx={{ pl: "5px" }} />
              </Typography>
            </ExternalLink>
          </Grid>
          <Grid item xs={6} md={2}>
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
            <Grid item xs={12} md={6} sx={{ pl: { sm: 0, md: "10px" } }}>
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
              item
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
