import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../../theme/constant";

import {
  Container,
  Box,
  Grid,
  Card,
  Button,
  CardContent,
  Typography,
} from "@mui/material";

const PathwayCards = () => {
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  const pathwaysCardsData = [
    {
      name: "Class 1 - Intro to python",
      date: "26 jul '21",
      language: "Hindi",
      classTitle: "Batch",
    },

    {
      name: "Class 1 - Intro to python",
      date: "26 jul '21",
      language: "Hindi",
      classTitle: "Revision Class",
    },
    {
      name: "Class 1 - Intro to python",
      date: "26 jul '21",
      language: "Hindi",
      classTitle: "Doubt Class",
    },
    {
      name: "Class 1 - Intro to python",
      date: "26 jul '21",
      language: "Hindi",
      classTitle: "Batch",
    },
  ];

  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {Object.keys(pathwaysCardsData).length ? (
            Object.keys(pathwaysCardsData)
              .slice(0, 3)
              .map((item) => {
                return (
                  <Grid item xs={12} sm={4} md={4}>
                    <Card>
                      {pathwaysCardsData[item].classTitle == "Doubt Class" ? (
                        <Box sx={{ borderTop: 5, color: "darkblue" }} />
                      ) : (
                        <Box sx={{ borderTop: 5, color: "ForestGreen" }} />
                      )}
                      <CardContent>
                        <Grid container spacing={1}>
                          <Grid item xs={6} md={8}>
                            <Typography variant="body1" gutterBottom>
                              {pathwaysCardsData[item].name}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} md={4}>
                            <Button
                              variant="contained"
                              sx={
                                pathwaysCardsData[item].classTitle ==
                                "Doubt Class"
                                  ? {
                                      borderRadius: { xs: 25, sm: 15 },
                                      height: { xs: 34, sm: 25 },
                                      fontSize: "11px",
                                      backgroundColor: "lightsteelblue",
                                      color: "darkblue",
                                    }
                                  : {
                                      borderRadius: { xs: 25, sm: 15 },
                                      height: { xs: 34, sm: 25 },
                                      fontSize: "11px",
                                      backgroundColor: "Azure",
                                      color: "green",
                                    }
                              }
                              size="small"
                            >
                              {pathwaysCardsData[item].classTitle}
                            </Button>
                          </Grid>
                        </Grid>

                        <Grid container spacing={1}>
                          <Grid item xs={6} md={3}>
                            <Typography variant="body2">
                              {pathwaysCardsData[item].date}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} md={3}>
                            <Typography variant="body2">
                              <li>{pathwaysCardsData[item].language}</li>
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })
          ) : (
            <></>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default PathwayCards;
