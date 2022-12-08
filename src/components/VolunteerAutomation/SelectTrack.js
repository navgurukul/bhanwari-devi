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

function SelectTrack({ setDisable, pathwayId, setPathwayId }) {
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const classes = useStyles();
  const { data } = useSelector((state) => state.Pathways);
  console.log(pathwayId);
  useEffect(() => {
    if (pathwayId.length === 0) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [pathwayId]);
  const handleChange = (id) => {
    if (pathwayId.includes(id)) {
      setPathwayId(pathwayId.filter((item) => item !== id));
    } else {
      setPathwayId([...pathwayId, id]);
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(pathwayActions.getPathways());
  }, []);
  return (
    <Container sx={{ mt: 6 }} maxWidth="lg">
      <Container maxWidth="sm" mb={3}>
        <Typography variant="h6" align="left" mb={2}>
          Please choose what you’d like to teach
        </Typography>
        <Typography variant="body1" align="left" color="text.secondary">
          We run the learning tracks in a batch format with multiple live
          classes.
        </Typography>

        <Grid container columnSpacing={isActive ? 2 : 0} mt={2} mb={2}>
          {data &&
            data.pathways &&
            data.pathways.map((item) => {
              if (item.name == "Python" || item.name == "Spoken English") {
                return (
                  <Grid item xs={6} ms={6} md={6}>
                    <Card
                      elevation={2}
                      className={
                        pathwayId?.includes(item.id)
                          ? classes.selectedTrack
                          : classes.TrackCard
                      }
                      onClick={() => handleChange(item.id)}
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
