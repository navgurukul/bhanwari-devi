import React from "react";
import useStyles from "./styles";
import { breakpoints } from "../../theme/constant";
import {
  Container,
  Typography,
  Grid,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import SmallScreenAbbreviate from "./SmallScreenAbbreviate";

function AFEpage() {
  const classes = useStyles();
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  return (
    <>
      <Container maxWidth="lg">
        <Grid className={classes.Grid_Space}>
          <Grid>
            <img
              src={require("./asset/amazon.png")}
              alt="Closing The Gender Gap in Technology"
            />
          </Grid>
          <Grid>
            <img
              src={require("./asset/futurengineer.png")}
              alt="Closing The Gender Gap in Technology"
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={{ xs: 4, sm: 3 }}
          className={classes.Grid_Space}
        >
          <Grid item xs={12} sm={6}>
            <img
              className={classes.IMG}
              src={require("./asset/First-img.svg")}
              alt="Closing The Gender Gap in Technology"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Typography variant="body1" paragraph>
              India’s tech industry employs 10 million people; however, women
              only make up 34% of the workforce. Women represent 40% of
              entry-level tech jobs & the representation gets lower as they move
              up with 30% at the mid-level positions and as low as 20% in senior
              roles.
            </Typography>

            <Typography variant="body1" paragraph>
              To reduce the gender gap in technology and equip them with CS
              readiness skills, we work with young women from underserved
              communities.
            </Typography>
          </Grid>
        </Grid>
        <Grid className={classes.Hadings}>
          <Typography
            gutterbottom
            variant="h5"
            textAlign={{ xs: "center", sm: "left" }}
          >
            Our Mission
          </Typography>
        </Grid>

        <Grid
          container
          spacing={{ xs: 4, sm: 3 }}
          className={classes.Grid_Space}
        >
          <Grid item xs={12} sm={6} order={{ xs: 2, sm: 1 }}>
            <Typography variant="body1" paragraph>
              NavGurukul is a registered non-profit organization working towards
              the financial empowerment of students from underserved
              communities. Started in 2016 by IIT-D Alumnus, the organization
              equips the youth with 21st-century skills through programming,
              coding, critical thinking, and problem-solving with a commitment
              to support its students until their placements.
            </Typography>

            <Typography variant="body1" paragraph>
              Navgurukul offers a 1-year fully-funded skilling and recruitment
              program in software engineering that enables them to secure
              aspirational careers.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} order={{ xs: 1, sm: 2 }}>
            <img
              className={classes.IMG}
              src={require("./asset/Second-img.svg")}
              alt="Students Img"
            />
          </Grid>
        </Grid>

        <Grid
          container
          spacing={{ xs: 4, sm: 3 }}
          className={classes.Grid_Space}
        >
          <Grid item xs={12} sm={6}>
            <img
              className={classes.IMG}
              src={require("./asset/Second-img.svg")}
              alt="Students Img"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid className={classes.Hadings}>
              <Typography
                gutterbottom
                variant="h5"
                textAlign={{ xs: "center", sm: "left" }}
              >
                Our Approach
              </Typography>
            </Grid>
            <Typography variant="body1" paragraph align="left">
              Navgurukul is working with a two-step approach to make our
              students CS ready and placed in tech jobs.
              <List>
                <ListItem>
                  <Grid className={classes.AFE_approaches}>
                    <FiberManualRecordIcon
                      fontSize="10px"
                      className={classes.Fiber_space}
                    />
                    Accessibility and readiness program: Meraki
                    <ListItemText className={classes.Approaches_text}>
                      Age group: 13+ girls/ women
                    </ListItemText>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid className={classes.AFE_approaches}>
                    <FiberManualRecordIcon
                      className={classes.Fiber_space}
                      fontSize="Small"
                    />
                    Skilling and job placement program: Residential Program
                    <ListItemText className={classes.Approaches_text}>
                      Age group 18 - 29 years
                    </ListItemText>
                  </Grid>
                </ListItem>
              </List>
            </Typography>
          </Grid>
        </Grid>

        <Grid spacing={8} align="center" className={classes.Ng_AFE}>
          <Typography gutterbottom variant="h5">
            NavGurukul 🤝{" "}
            <SmallScreenAbbreviate
              isActive={isActive}
              text="Amazon Future Engineer"
            />
          </Typography>
        </Grid>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          className={classes.Grid_Space}
        >
          <Grid item xs={{ xs: 11, sm: 8 }}>
            <Typography variant="body1" paragraph>
              Amazon Future Engineer (AFE) is a comprehensive
              childhood-to-career program to increase access to computer science
              education for children and young adults who typically lack these
              opportunities.
            </Typography>
            <Typography variant="body1" paragraph>
              To take its mission forward in India, AFE has partnered with
              Navguruku in its Meraki program to close the gender gap in
              technology. Meraki is an android application focused on making
              programming and digital skills accessible to learners from
              different communities through a smartphone to create direct job
              opportunities or admissions to aspirational training programs. The
              focus area is young women and girls to bridge the gender gap in
              the digital literacy sector.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
export default AFEpage;
