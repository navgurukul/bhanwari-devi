import React, { useEffect, useState } from "react";
import axios from "axios";
import { METHODS } from "../../services/api";
import { format } from "../../common/date";
import { useSelector } from "react-redux";
import ClassJoinTimerButton from "../Class/ClassJoinTimerButton";
import {
  Typography,
  Grid,
  Button,
  Container,
  Card,
  CardContent,
  Chip,
  CardActions,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DateRangeIcon from "@mui/icons-material/DateRange";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import useStyles from "./styles";
import { breakpoints } from "../../theme/constant";
import useMediaQuery from "@mui/material/useMediaQuery";
import DoubtClassCard from "./DoubtClassCard";

function AmazonBootcampBatch({ enrolledBatches }) {
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const classes = useStyles();
  const [enrollClasses, setEnrollClasses] = useState([]);
  const [doubtclasses, setDoubtclasses] = useState([]);
  const user = useSelector(({ User }) => User);

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/pathways/7/ACBEnrolledBatches`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
    }).then((res) => {
      setEnrollClasses(res.data);
    });
  }, []);

  

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/pathways/doubtclasses/7`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
    }).then((res) => {
      setDoubtclasses(res.data);
    });
  }, []);

  const enrolledBatcheClasses = enrollClasses.filter(
    (item) => item.type === "batch"
  );

  return (
    <>
      <Grid
        container
        bgcolor="#E9F5E9"
        justifyContent="space-between"
        sx={
          isActive
            ? { padding: "32px 16px" }
            : { padding: "22px 80px 22px 80px" }
        }
      >
        <Grid item>
          <Typography variant="h6" marginTop="8px">
            {enrolledBatches}
          </Typography>
        </Grid>
        {/* <Grid item justifyContent="right">
          <Button startIcon={<SettingsIcon />} color="inherit">
            Preferences
          </Button>
        </Grid> */}
      </Grid>
      <Container maxWidth="lg">
        <Typography variant="h6" sx={{ margin: "32px 0px" }}>
          Live Classes
        </Typography>

        <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container spacing={isActive ? 2 : 4}>
            {enrolledBatcheClasses.map((item, index) => (
              <Grid item xs={12} ms={6} md={4}>
                {index === 0 && (
                  <Chip
                    label="Upcoming Class"
                    color="secondary"
                    sx={{
                      transform: "rotate(-4.29deg)",
                      marginLeft: "8px",
                      position: "absolute",
                      height: "21px",
                    }}
                  />
                )}
                <Card
                  sx={{
                    padding: "32px 16px",
                    maxWidth: "384px",
                    background: index === 0 ? "#E9F5E9" : "#FAFAFA",
                  }}
                  elevation={1}
                >
                  <CardContent>
                    <Grid container>
                      <Grid item sm={2}>
                        <img
                          src={require("./assets/playButton.svg")}
                          alt="Students Img"
                        />
                      </Grid>
                      <Grid item md={10} sm={8} xs={8}>
                        <Typography marginLeft="16px" variant="subtitle1">
                          {item.title}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container mt="32px">
                      <Grid item md={7} xs={7} sx={{ display: "flex" }}>
                        <DateRangeIcon />
                        <Typography variant="body1" ml="8px">
                          {format(item.start_time, "dd MMM yy")}
                        </Typography>
                      </Grid>
                      <Grid display="flex">
                        <AccessTimeIcon />
                        <Typography variant="body1" marginLeft="8px">
                          {/* 2 PM */}
                          {format(item.start_time, "hh:mm aaa")}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "right" }}>
                    <Button endIcon={<ArrowForwardIcon color="grey" />}>
                      <ClassJoinTimerButton
                        buttonType="text"
                        startTime={item?.start_time}
                        link={item?.meet_link}
                      />
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        {doubtclasses.length > 0 && (
          <Typography variant="h6" margin="32px 0px">
            Doubt Class
          </Typography>
        )}

        <Grid container spacing={isActive ? 2 : 4}>
          {doubtclasses.length > 0 &&
            doubtclasses?.map((item, index) => (
              <DoubtClassCard item={item} setDoubtclasses={setDoubtclasses} />
            ))}
        </Grid>
      </Container>
    </>
  );
}

export default AmazonBootcampBatch;
