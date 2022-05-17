import React, { useEffect } from "react";
import {
  Typography,
  Container,
  Grid,
  Box,
  CardMedia,
  useMediaQuery,
  Card,
} from "@mui/material";
import { breakpoints } from "../../theme/constant";
import { useSelector, useDispatch } from "react-redux";
import { actions as pathwayActions } from "../PathwayCourse/redux/action";
import useStyles from "./styles";

function SelectTrack({ setDisable }) {
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const classes = useStyles();

  const { data } = useSelector((state) => state.Pathways);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(pathwayActions.getPathways());
  }, [dispatch]);

  return (
    <Container sx={{ mt: 6 }} maxWidth="lg">
      <Container maxWidth="sm" mb={3}>
        <Typography variant="h6" align="left" mb={2}>
          Please choose what you’d like to teach
        </Typography>
        <Typography variant="body1" align="left" color="text.secondary">
          We recommend giving about 2 hours per week for about 15 weeks duration
        </Typography>

        <Grid container columnSpacing={isActive ? 2 : 0} mt={2} mb={2}>
          {data &&
            data.pathways &&
            data.pathways.map((item) => {
              if (item.name == "Python" || item.name == "Spoken English") {
                return (
                  <Grid item xs={6} ms={6} md={6}>
                    <Card
                      className={classes.TrackCard}
                      onClick={() => setDisable(false)}
                    >
                      <Box className={classes.TrackImages}>
                        <CardMedia component="img" src={item.logo} />
                        <Typography mt={2}>{item.name}</Typography>
                      </Box>
                    </Card>
                  </Grid>
                );
              }
            })}
        </Grid>
      </Container>
    </Container>
  );
}

export default SelectTrack;
