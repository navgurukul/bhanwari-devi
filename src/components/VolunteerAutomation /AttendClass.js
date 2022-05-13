import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { actions as classActions } from "../../components/Class/redux/action";
import {
  Typography,
  Container,
  Grid,
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";

function AttendClass() {
  const dispatch = useDispatch();
  const { data = [] } = useSelector(({ Class }) => Class.allClasses);

  useEffect(() => {
    dispatch(classActions.getClasses());
  }, [dispatch]);

  console.log(data);
  return (
    <Container sx={{ mt: 5, mb: 15 }} maxWidth="lg">
      <Container maxWidth="md">
        <Typography variant="h6" gutterBottom>
          Please choose a class to attend
        </Typography>
        <Typography variant="body1" gutterBottom>
          Attending a class will help you observe how the teacher and students
          interact with each other. You may also stay a bit after the class to
          chat with the teacher. Once, completed please return to complete the
          onboarding
        </Typography>
      </Container>
      <Grid sx={{ mt: 5 }} container spacing={4}>
        {data &&
          data.slice(0, 3).map((item) => (
            <Grid item xs={12} ms={6} md={4}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="subtitle1">
                    {item.title}
                  </Typography>
                  <Box sx={{ display: "flex", mt: 2 }}>
                    <Button
                      sx={{
                        borderRadius: "45%",
                      }}
                      variant="contained"
                    >
                      {item.type}
                    </Button>
                    <Button
                      sx={{
                        marginLeft: "10px",
                        borderRadius: "45%",
                      }}
                      variant="outlined"
                    >
                      {item.lang}
                    </Button>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography>
                      {moment(item.start_time).format("DD-MM-YYYY")}
                      <Typography>
                        {moment(item.start_time).format("hh:mm a")} -{" "}
                        {moment(item.end_time).format("hh:mm a")}
                      </Typography>
                    </Typography>
                  </Box>
                  <Typography sx={{ mt: 2 }} gutterBottom variant="subtitle1">
                    {item.facilitator.name}
                  </Typography>

                  <Typography gutterBottom variant="body2">
                    Please join at least 10 mintues before the scheduled time
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button variant="contained" color="primary" fullWidth>
                    Enroll
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}

export default AttendClass;
