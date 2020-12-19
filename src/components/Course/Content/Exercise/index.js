import React, { useEffect } from 'react';
import get from "lodash/get";
import { useParams } from "react-router-dom";
import ExerciseContent from '../ExerciseContent';
import { actions as courseActions } from "../../redux/action";
import { useDispatch } from "react-redux";

const EditOnGithub = (props) => {
    return (
        <a
        href={props.link}
        target="_blank"
        rel="noopener noreferrer"
        className="github-link"
        >
            Edit on Github
        </a>
    );
};

const Exercise = (props) => {
    const { selectedExercise, data } = props;
    const dispatch = useDispatch();
    const { exerciseId: exerciseIdFromParams } = useParams();

    useEffect(() => {
        let defaultExercise, defaultExerciseIndex;
        const firstExercise = get(data, 'exerciseList[0]');

        // exercises loaded
        if (firstExercise) {
            if (exerciseIdFromParams) {
                const exerciseFromParams = data.exerciseList.find((exercise) => {
                    return exercise.id === exerciseIdFromParams;
                });
                if (exerciseFromParams) {
                    defaultExercise = exerciseFromParams;
                    defaultExerciseIndex = data.exerciseList.findIndex((exercise) => {
                        return exercise.id === exerciseIdFromParams;
                    });
                }
            }

            // exerciseId not params or exerciseId in params not there in exercise list (eg: invalid exercise id in url)
            if (!defaultExercise) {
                defaultExercise = firstExercise;
                defaultExerciseIndex = 0;
            }
            const selectedExerciseInfo = { exercise: defaultExercise, index: defaultExerciseIndex };
            dispatch(courseActions.updateSelectedExercise(selectedExerciseInfo));
        }
      }, [dispatch, data]);

    return (
        <>
            <h2>{get(selectedExercise, "exercise.name")}</h2>
            <ExerciseContent content={get(selectedExercise, "exercise.content")} />
            <EditOnGithub
                link={`${get(selectedExercise, "exercise.githubLink")}`}
            />
        </>
    )
}

export default Exercise;