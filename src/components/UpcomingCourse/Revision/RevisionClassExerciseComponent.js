import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Container, Grid, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import useStyles from "../styles";
import { breakpoints } from "../../../theme/constant";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const RevisionClassExerciseComponent = () => {
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const classes = useStyles();

  return (
    <>
      <Container>
        <Box backgroundColor="primary.light" p={2} borderRadius="8px">
          <Grid container spacing={2}>
            <Grid item xs={1}>
              <img
                pb={1}
                className={classes.icons}
                src={require("./assets/Group.svg")}
                alt="Students Img"
              />
            </Grid>
            <Grid item xs={11}>
              <Typography
                variant="body1"
                mb={1}
                align="left"
                style={{
                  display: "flex",
                }}
              >
                Need help? We got you covered. Enroll in the doubt class on 15
                Oct, 21 at 4 PM - 5 PM
              </Typography>
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button endIcon={<ArrowForwardIosIcon />}>
              View Class Details
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};
export default RevisionClassExerciseComponent;
