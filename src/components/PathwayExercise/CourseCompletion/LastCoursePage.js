import React from "react";
import { Typography, Container, Box, Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../../theme/constant";
import { interpolatePath, PATHS } from "../../../constant";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

function LastCoursePage() {
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const history = useHistory();
  const params = useParams();
  return (
    <>
      <Container maxWidth="lg" align="center">
        <Box sx={{ mb: isActive && 5, mt: isActive ? 8 : 25 }}>
          <img src={require("../asset/specialdeals.svg")} alt="icon" />
          <Typography variant="h6" mt={3} mb={4}>
            Congratulations! You completed the track
          </Typography>
          <Button
            onClick={() => {
              history.push(
                interpolatePath(PATHS.PATHWAY_COURSE, {
                  pathwayId: params.pathwayId,
                })
              );
            }}
            variant="contained"
          >
            Return to Dashboard
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default LastCoursePage;
