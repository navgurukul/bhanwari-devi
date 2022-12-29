import React from "react";
import { useHistory, useParams } from "react-router-dom";
import useStyles from "../styles";
import { PATHS, interpolatePath, versionCode } from "../../../constant";
import { Tooltip } from "@mui/material";

export default function ExerciseImage({
  selected,
  contentType,
  setExerciseId,
  onClick,
  index,
  progressTrackId,
  id,
  exerciseName,
  imageRef,
  setSuccessfulExerciseCompletion,
}) {
  const classes = useStyles();
  const history = useHistory();
  // console.log(progressTrackId);
  // console.log(id);
  // console.log(
  //   progressTrackId.assessments,
  //   progressTrackId.classes,
  //   progressTrackId.exercises
  // );
  const params = useParams();
  const contentTypeMap = {
    assessment: selected
      ? progressTrackId?.assessments?.includes(id)
        ? "assessmentRevisit"
        : "assessmentSelected"
      : progressTrackId?.assessments?.includes(id)
      ? "assessmentCompleted"
      : "assessment",
    class_topic: selected
      ? progressTrackId?.classes?.includes(id)
        ? "classTypeRevisit"
        : "classTypeSelected"
      : progressTrackId?.classes?.includes(id)
      ? "classTypeCompleted"
      : "classtype",
    exercise: selected
      ? progressTrackId?.exercises?.includes(id)
        ? "contentTypeRevist"
        : "contentTypeSelected"
      : progressTrackId?.exercises?.includes(id)
      ? "ContentTypeCompleted"
      : "contenttype",
  };

  return (
    <Tooltip title={exerciseName}>
      <img
        onClick={() => {
          history.push(
            interpolatePath(PATHS.PATHWAY_COURSE_CONTENT, {
              courseId: params.courseId,
              exerciseId: index,
              pathwayId: params.pathwayId,
            })
          );
          setSuccessfulExerciseCompletion(false);
          setExerciseId(index);
        }}
        ref={imageRef}
        src={require(`../asset/${contentTypeMap[contentType]}.svg`)}
        loading="lazy"
        className={classes.contentImg}
      />
    </Tooltip>
  );
}
