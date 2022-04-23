import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import useStyles from "./styles";
import { breakpoints } from "../../theme/constant";
import { useSelector, useDispatch } from "react-redux";
import PathwayCard from "../../pages/Home/PathwayCard";

import { Container, Grid, Typography } from "@mui/material";

const pathwayData = [
  {
    title: "Python",
    code: "PRGPYT",
    image: "python",
    description: "Get familiar with programming with bite sized lessons",
  },
  {
    title: "Typing",
    code: "TYPGRU",
    image: "typing",
    description: "Learn to type with pinpoint accuracy and speed.",
  },
  {
    title: "Spoken English",
    code: "SPKENG",
    image: "language",
    description: "Master English with easy to understand courses",
  },
  {
    title: "Web Development",
    code: "JSRPIT",
    image: "web-development",
    description: "Learn the basics of tech that powers the web",
  },
  {
    title: "Residential Programmes",
    image: "residential",
    description: "Explore Navgurukul’s on campus Software Engineering courses",
  },
  {
    title: "Open Courses",
    image: "misc",
    description: "Courses on Android, Game dev projects and more",
  },
];

const NewUserDashbord = () => {
  const user = useSelector(({ User }) => User);
  const UserName = user.data.user.name;

  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const classes = useStyles();

  return (
    <>
      <Container>
        <Typography variant="h5" align="center" mt={4} mb={3}>
          Hello, {UserName} 👋
        </Typography>
        <Typography variant="h6" align="center" mb={2}>
          Please choose a learning track to begin!
        </Typography>
      </Container>
      <Container maxWidth="lg">
        <Grid container align="center" rowSpacing={10} mb={10}>
          {pathwayData.map((item) => (
            <Grid
              item
              xs={12}
              ms={6}
              md={4}
              className={classes.cardGrid}
              maxHeight={310}
            >
              <PathwayCard
                id={item.id}
                title={item.title}
                description={item.description}
                image={item.image}
                hover={true}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};
export default NewUserDashbord;
