import React from "react";
import { Typography, Container, Box, Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../../theme/constant";
import { interpolatePath, PATHS } from "../../../constant";
import { useHistory, useParams } from "react-router-dom";

function CourseCompletionPage(props) {
  const { data, nextPathwayIndex, setSuccessfulExerciseCompletion } = props;
  const params = useParams();
  const history = useHistory();
  return (
    <>
      <Container maxWidth="lg" align="center">
        <Box>
          <img src={require("../asset/specialdeals.svg")} />
          <Typography variant="h6" width="400px" mt={3} mb={4}>
            Congratulations! You completed {data?.[nextPathwayIndex - 1]?.name}
          </Typography>
          <Button
            onClick={() => {
              history.push(
                interpolatePath(PATHS.PATHWAY_COURSE_CONTENT, {
                  courseId: data?.[nextPathwayIndex]?.id,
                  exerciseId: 0,
                  pathwayId: params.pathwayId,
                })
              );
              setSuccessfulExerciseCompletion(false);
            }}
            variant="contained"
          >
            Next Up: {data?.[nextPathwayIndex]?.name}
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default CourseCompletionPage;
