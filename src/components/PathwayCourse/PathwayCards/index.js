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
import { dateTimeFormat } from "../../../constant";

const PathwayCards = (props) => {
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  const language = {
    hi: "Hindi",
    en: "English",
    mr: "Marathi",
  };
  const { userEnrolledClasses } = props;

  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {userEnrolledClasses?.slice(0, 3).map((item) => {
            return (
              <Grid item xs={12} sm={4} md={4}>
                <Card>
                  {item.type == "batch" ? (
                    <Box sx={{ borderTop: 5, color: "ForestGreen" }} />
                  ) : (
                    <Box sx={{ borderTop: 5, color: "darkblue" }} />
                  )}
                  <CardContent>
                    <Grid container spacing={1}>
                      <Grid item xs={6} md={8}>
                        <Typography variant="body1" gutterBottom>
                          {item.title}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={4}>
                        <Button
                          variant="contained"
                          sx={
                            item.type === "batch"
                              ? {
                                  borderRadius: { xs: 25, sm: 15 },
                                  height: { xs: 34, sm: 25 },
                                  fontSize: "11px",
                                  backgroundColor: "#E9F5E9",
                                  color: "green",
                                }
                              : {
                                  borderRadius: { xs: 25, sm: 15 },
                                  height: { xs: 34, sm: 25 },
                                  fontSize: "11px",
                                  backgroundColor: "lightsteelblue",
                                  color: "darkblue",
                                }
                          }
                          size="small"
                        >
                          {item.type}
                        </Button>
                      </Grid>
                    </Grid>

                    <Grid container spacing={1}>
                      <Grid item xs={8} md={5}>
                        <Typography variant="body2">
                          {dateTimeFormat(item.start_time).finalDate}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <Typography variant="body2">
                          <li>{language[item.lang]}</li>
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
};

export default PathwayCards;
