import React from 'react';
import get from "lodash/get";
import ExerciseContent from '../ExerciseContent';

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
    const { selectedExercise } = props;

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