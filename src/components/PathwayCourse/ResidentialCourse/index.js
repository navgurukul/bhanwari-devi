import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import { actions as pathwayActions } from "../../PathwayCourse/redux/action";
import { useDispatch } from "react-redux";
import { breakpoints } from "../../../theme/constant";
import {
  Container,
  Box,
  Grid,
  Card,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import { interpolatePath, PATHS } from "../../../constant";
import useStyles from "../styles";

function ResidentialProgramme() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.Pathways);
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const classes = useStyles();

  useEffect(() => {
    dispatch(pathwayActions.getPathways());
  }, [dispatch]);

  const resPathway =
    data && data.pathways.find((pathway) => pathway.code === "PRCRSE");
  const pathwayCourse = resPathway && resPathway.courses;

  return (
    <Container
      sx={{ mt: 5 }}
      className={classes.pathwayContainer}
      maxWidth="lg"
    >
      <Grid sx={{ mt: 3 }} container spacing={2}>
        <Grid xs={12} md={6}>
          <Card align="left" elevation={0}>
            <Typography
              variant="body2"
              className={classes.cardSubtitle}
              sx={{ textAlign: isActive && "center", pb: "8px" }}
            >
              Learning Track
            </Typography>
            <Typography
              variant="h4"
              sx={{ textAlign: isActive && "center", pb: "16px" }}
            >
              Residential Programme Info- Track
            </Typography>
            <Typography variant="body1">
              Navgurukul, our parent organization, offers fully funded 1 year
              software engineering programme. Learn all about it in this
              introductory course and get ready to apply for it.
            </Typography>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h6" sx={{ textAlign: isActive && "center" }}>
          Courses
        </Typography>
        <Grid sx={{ mt: 2 }} container spacing={3} align="center">
          {pathwayCourse &&
            pathwayCourse.map((item, index) => (
              <Grid xs={12} md={3} className={classes.courseCard}>
                <Link
                  className={classes.pathwayLink}
                  to={interpolatePath(PATHS.PATHWAY_COURSE_CONTENT, {
                    courseId: item.id,
                    exerciseId: 0,
                    pathwayId: "residential",
                  })}
                >
                  <Card
                    className={classes.pathwayCard}
                    elevation={0}
                    sx={{ ml: 2, p: "16px" }}
                  >
                    <img
                      className={classes.courseImage}
                      src={item.logo}
                      alt="course"
                      loading="lazy"
                    />
                    <div className={classes.courseTitleNumber} disableGutters>
                      <Typography
                        align={isActive ? "center" : "left"}
                        variant="body2"
                        className={classes.courseName}
                        sx={{
                          mr: "10px",
                          padding: isActive ? "5px" : "5px 0 5px 13px",
                          verticalAlign: "top",
                        }}
                      >
                        {index + 1}
                      </Typography>
                      <Typography
                        align={isActive ? "center" : "left"}
                        variant="body1"
                        // sx={{ mt: "16px" }}
                      >
                        {item.name}
                      </Typography>
                    </div>
                  </Card>
                </Link>
              </Grid>
            ))}
        </Grid>
      </Box>

      {/* <Stack sx={{ mt: isActive ? 4 : 8 }} alignItems="center">
        <Typography variant="h6">Have you completed the overview?</Typography>
        <Link
          style={{
            textDecoration: "none",
          }}
          to={PATHS.ADMISSION}
        >
          <Button sx={{ mt: 2 }} variant="contained" color="primary">
            Yes, let's take the test
          </Button>
        </Link>
      </Stack> */}
    </Container>
  );
}

export default ResidentialProgramme;
