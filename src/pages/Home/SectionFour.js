import React from "react";
import { Container, Typography, Grid } from "@mui/material";
import PathwayCard from "./PathwayCard";

function SectionFour({ pathwayData, isActive, classes }) {
  return (
    <>
      <Container sx={{ mt: 8 }} maxWidth="sm">
        <Typography
          variant="h5"
          component="h6"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Explore the Learning Tracks
        </Typography>
      </Container>
      <Container className={classes.cardGrid} maxWidth="lg">
        <Grid container spacing={isActive ? 2 : 4}>
          {pathwayData?.map((item, i) => (
            <Grid item xs={12} ms={6} md={4} key={i}>
              <PathwayCard
                id={item.id}
                name={item.name}
                description={item.sub_description}
                logo={item.logo}
                hover={true}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default SectionFour;
