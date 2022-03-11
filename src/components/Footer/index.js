// import React from "react";
// import "./styles.scss";
// import { PATHS } from "../../constant";
// import { Link } from "react-router-dom";

// function Footer() {
//   return (
//     <div className="footer">
//       <Link className="footer-link" to={PATHS.PRIVACY_POLICY}>
//         Privacy Policy
//       </Link>
//     </div>
//   );
// }

// export default Footer;

// import React from "react";
// import "./styles.scss";
// import useStyles from "./styles";

// function Footer() {
//   const classes = useStyles();
//   return (
//     <div className="meraki-footer">
//       <div className="footer-logo"></div>
//       <div className={classes.footerItems}>
//         {/* <div className="footer-items">  */}
//         <div className="footer-items-column">
//           <h3>About</h3>
//           <p>Our Story</p>
//           <p>Team</p>
//         </div>
//         <div className="footer-items-column">
//           <h3>Learning Tracks</h3>
//           <span>Python</span>
//           <span>Typing Guru</span>
//           <span>Spoken English</span>
//           <span>Javascript</span>
//           <span>Soft Skills</span>
//           <span>Open Courses</span>
//         </div>
//         <div className="footer-items-column">
//           <h3>Get Involved</h3>
//           <span>Be a Partner</span>
//           <span>Donate</span>
//           <span>Careers</span>
//           <span>Volunteer</span>
//         </div>
//         <div className="footer-items-column">
//           <h3>Learn on Mobile</h3>
//           <span>
//             <div className="footer-playstore-icon"></div>Now on Playstore
//           </span>
//         </div>
//       </div>
//       <hr />
//       <div className="footer-row">
//         <span>Legal & Privacy Policy</span>
//         <span>Made with ❤️ for our students </span>
//         <span>
//           <div className="footer-social-media-icons">
//             <div className="footer-social-icon footer-icon-facebook"></div>
//             <div className="footer-social-icon footer-icon-linkedin"></div>
//             <div className="footer-social-icon footer-icon-twitter"></div>
//           </div>
//         </span>
//       </div>
//       {/* <div className="footer-row footer-NG-info">
//         <span>Part of NavGurukul Foundation for Social Welfare</span>
//       </div> */}
//     </div>
//   );
// }

// export default Footer;

import React from "react";
import playStore from "./asset/playStore.svg";
import logo from "./asset/logo.svg";
import meraki from "./asset/meraki.svg";
import facebook from "./asset/facebook.svg";
import twitter from "./asset/twitter.svg";
import linkedIn from "./asset/linkedIn.svg";

import {
  Grid,
  Paper,
  Box,
  Container,
  ListItem,
  List,
  ListItemText,
  Stack,
  Typography,
  Demo,
  dense,
  styled,
  CardMedia,
  CardContent,
  Divider,
} from "@mui/material";
import "./styles.scss";
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
      <Typography sx={{ mt: 4, mb: 2 }} variant="subtitle1" component="div">
        {title}
      </Typography>
      <List>
        {menu[menuItem].map((item) => (
          <Typography sx={{ paddingBottom: "5px" }}>{item}</Typography>
        ))}
      </List>
    </>
  );
};

function Footer() {
  const classes = useStyles();
  return (
    <Box maxWidth="false" sx={{ bgcolor: "#e9f5e9" }}>
      <Container maxWidth="xl">
        {/* sx={{ bgcolor: "#cfe8fc", height: "100vh" }}> */}
        <Grid container spacing={2} sx={{ marginTop: "40px" }}>
          <Grid xs={12} md={4} sx={{ paddingLeft: { sm: "none", md: "16px" } }}>
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
              <Box className={classes.image}>
                <img
                  src={require("./asset/facebook.svg")}
                  alt="social media"
                  loading="lazy"
                />
              </Box>
              <Box className={classes.image}>
                <img
                  src={require("./asset/linkedIn.svg")}
                  alt="social media"
                  loading="lazy"
                />
              </Box>
              <Box className={classes.image}>
                <img
                  src={require("./asset/twitter.svg")}
                  alt="social media"
                  loading="lazy"
                />
              </Box>
            </Box>
            <Box className={classes.content}>
              <Typography>
                © 2022 NavGurukul Foundation for Social Welfare
              </Typography>
            </Box>
          </Grid>
          <Grid xs={6} md={2} sx={{ paddingLeft: "15px" }}>
            {MenuList("About")}
          </Grid>
          <Grid xs={6} md={2}>
            {MenuList("LearningTracks")}
          </Grid>
          <Grid xs={6} md={2} sx={{ paddingLeft: "15px" }}>
            {MenuList("GetInvolved")}
          </Grid>
          <Grid xs={6} md={2}>
            <Typography
              sx={{ mt: 4, mb: 2 }}
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
                <Typography component="div">Now on Playstore</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Divider variant="string" sx={{ paddingTop: "25px" }} />
        <Box>
          <Grid container spacing={2} sx={{ margin: "30px 0px 30px 0px" }}>
            <Grid
              xs={12}
              md={6}
              sx={{ paddingLeft: { sm: "none", md: "10px" } }}
            >
              <Typography>Legal & Privacy Policy</Typography>
            </Grid>
            <Grid
              xs={12}
              md={6}
              sx={{
                paddingRight: { sm: "none", md: "17px" },
              }}
            >
              <Typography sx={{ textAlign: { sm: "none", md: "right" } }}>
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
//337
