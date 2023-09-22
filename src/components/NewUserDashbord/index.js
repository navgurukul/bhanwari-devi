import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import PathwayCard from "../../pages/Home/PathwayCard";
import { Container, Grid, Typography, useMediaQuery } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import ReturningUserPage from "../ReturningUser/ReturningUserPage";
import axios from "axios";
import { METHODS } from "../../services/api";
import { versionCode } from "../../constant";
import { breakpoints } from "../../theme/constant";
import { PATHWAYS_INFO } from "../../constant";

const NewUserDashbord = () => {
  const user = useSelector(({ User }) => User);
  const UserName = user.data.user.name;
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const classes = useStyles();
  const dispatch = useDispatch();
  const [learningTracks, setLearningTracks] = useState([]);
  const { loading, data } = useSelector((state) => state.PathwaysDropdow);

  // useEffect(() => {
  //   dispatch(
  //     pathwayActions.getPathwaysDropdown({
  //       authToken: user,
  //     })
  //   );
  // }, [dispatch, user]);

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/pathways/ongoingTopic`,
      headers: {
        "version-code": versionCode,
        accept: "application/json",
        Authorization: user?.data?.token || "",
      },
    }).then((res) => {
      const data = res.data;
      setLearningTracks(res.data);
    });
  }, []);

  const miscellaneousPathway = data?.pathways.filter((pathway) =>
    PATHWAYS_INFO.some((miscPathway) => pathway.name === miscPathway.name)
  );
  const pathwayData = data?.pathways
    .filter((pathway) => !miscellaneousPathway.includes(pathway))
    .concat(miscellaneousPathway);

  return (
    <>
      {learningTracks.length <= 0 ? (
        <>
          <Container className={classes.DashboardContainer}>
            <Typography variant="h5" align="center" mt={4} mb={3}>
              Hello, {UserName} 👋
            </Typography>
            <Typography variant="h6" align="center" mb={2}>
              Please choose a learning track to begin!
            </Typography>
          </Container>
          <Container maxWidth="lg">
            <Grid container align="center" rowSpacing={6} mb={10}>
              {pathwayData?.map((item) => (
                <Grid
                  item
                  xs={6}
                  ms={6}
                  md={3}
                  className={classes.cardGrid}
                  maxHeight={isActive && item.name.length < 12 ? 170 : 210}
                >
                  <PathwayCard
                    id={item.id}
                    name={item.name}
                    logo={item.logo}
                    hover={true}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
        </>
      ) : (
        <ReturningUserPage learningTracks={learningTracks} />
      )}
    </>
  );
};
export default NewUserDashbord;
