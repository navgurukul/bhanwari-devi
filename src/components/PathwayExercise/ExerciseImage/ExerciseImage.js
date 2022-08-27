import React from "react";
import useStyles from "../styles";

export default function ExerciseImage({
  selected,
  contentType,
  setExerciseId,
  onClick,
  index,
  progressTrackId,
  id,
}) {
  const classes = useStyles();
  // console.log(progressTrackId);
  // console.log(id);
  // console.log(
  //   progressTrackId.assessments,
  //   progressTrackId.classes,
  //   progressTrackId.exercises
  // );

  const contentTypeMap = {
    assessment: selected
      ? progressTrackId.assessments.includes(id)
        ? "assessmentRevisit"
        : "assessmentSelected"
      : progressTrackId.assessments.includes(id)
      ? "assessmentCompleted"
      : "assessment",
    class_topic: selected
      ? progressTrackId.classes.includes(id)
        ? "classTypeRevisit"
        : "classTypeSelected"
      : progressTrackId.classes.includes(id)
      ? "classTypeCompleted"
      : "classtype",
    exercise: selected
      ? progressTrackId.exercises.includes(id)
        ? "contentTypeRevist"
        : "contentTypeSelected"
      : progressTrackId.exercises.includes(id)
      ? "ContentTypeCompleted"
      : "contenttype",
  };

  console.log(
    "For id",
    id,
    " ",
    progressTrackId.assessments.includes(id),
    " and file ",
    contentTypeMap[contentType]
  );

  return (
    <img
      onClick={() => {
        setExerciseId(index);
      }}
      src={require(`../asset/${contentTypeMap[contentType]}.svg`)}
      loading="lazy"
      className={classes.contentImg}
    />
  );
}
