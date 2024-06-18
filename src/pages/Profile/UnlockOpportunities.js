import React from "react";
import {
  Typography,
  Container,
  CardContent,
  Button,
  Box,
  Modal,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { interpolatePath, PATHS } from "../../constant";
import { Link } from "react-router-dom";
import LockOpenIcon from "@mui/icons-material/LockOpen";
function UnlockOpportunities(props) {
  const { item, completedPortion } = props;

  const completedAll = completedPortion >= 100;

  // useEffect(() => {
  //   dispatch(pathwayActions.getPathwaysCourse({ pathwayId: pathwayId }));
  // }, [dispatch, pathwayId]);

  return (
    <Container sx={{ marginTop: "16px" }} maxWidth="lg" align="left">
      {completedAll ? (
        <>
          <Typography variant="h6" mt="32px" mb="16px">
            Opportunities
            <LockOpenIcon sx={{ ml: "10px", marginTop: "10px" }} />
          </Typography>
          <Typography variant="body1">
            Get Coursera paid subscriptions, free keyboards and scholarships to
            bootcamps
          </Typography>
          <Link
            to={{
              pathname: PATHS.OPPORTUNITIES,

              pathwayId: item.id,
            }}
            style={{ textDecoration: "none" }}
          >
            <Button variant="contained" sx={{ marginTop: "16px" }}>
              Explore Opportunities
            </Button>
          </Link>
        </>
      ) : (
        <>
          <Typography variant="h6" mt="32px" mb="16px">
            Opportunities
            <LockOutlinedIcon sx={{ ml: "10px", marginTop: "10px" }} />
          </Typography>
          <Typography variant="body1">
            Unlock access to Coursera paid subscriptions, free keyboards and
            scholarships to bootcamps by completing the Python learning track.
          </Typography>
        </>
      )}
    </Container>
  );
}

export default UnlockOpportunities;
