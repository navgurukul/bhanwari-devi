import React from "react";
import {
  Typography,
  Container,
  Grid,
  Box,
  Button,
  useMediaQuery,
  Card,
  CardContent,
} from "@mui/material";
import { breakpoints } from "../../theme/constant";
// import { useSelector, useDispatch } from "react-redux";
// import { actions as pathwayActions } from "../../components/PathwayCourse/redux/action";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { CardActionArea } from "@mui/material";

function SelectTrack() {
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  // const { data } = useSelector((state) => state.Pathways);

  // useEffect(() => {
  //   dispatch(pathwayActions.getPathways());
  // }, [dispatch]);

  return (
    <Container maxWidth="lg" align="center">
      <Box maxWidth={550} mb={3}>
        <Typography variant="h6" align="left" mb={2}>
          Please choose what you’d like to teach
        </Typography>
        <Typography variant="body1" align="left">
          We recommend giving about 2 hours per week for about 15 weeks duration
        </Typography>

        <Grid container columnSpacing={isActive ? 2 : 0} mt={2} mb={2}>
          <Grid item xs={6} ms={6} md={6}>
            <Card
              sx={{
                boxShadow: "1px 1px 0px #E9F5E9",
                border: "1px solid #48A145",
                maxWidth: 256,
                height: 171,
              }}
            >
              <CardActionArea>
                <CardContent>
                  <img src={require("./assets/course.svg")} />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={6} ms={6} md={6}>
            <Card
              sx={{
                maxWidth: 256,
                height: 171,
              }}
            >
              <CardActionArea>
                <CardContent>
                  <img src={require("./assets/eng.svg")} />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "20px",
          }}
        >
          <Button
            variant="text"
            startIcon={<ArrowBackIosIcon />}
            ml={2}
            sx={{
              color: "#6D6D6D",
            }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            endIcon={<ArrowForwardIosIcon />}
          >
            Next Step
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default SelectTrack;
