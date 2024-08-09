import React from "react";
import { Box, Typography, Card, CardContent, CardActions, LinearProgress, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    box: {
        padding: '16px',
    },
    course: {
        marginBottom: '16px',
    },
    courseCard: {
        maxWidth: 345,
        margin: 'auto',
        borderRadius: '12px',
        transition: '0.3s',
        '&:hover': {
            boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
        },
    },
    pathwayCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    courseImage: {
        width: '100%',
        height: 'auto',
        borderRadius: '8px',
    },
    progressBar: {
        width: '229.896px',
    },
    cardActions: {
        padding: '8px 0', 
    },
}));

const McDigitalCourse = ({ pathwayCourseData, completedPortion }) => {
    const classes = useStyles();
    const isActive = false;
    // console.log(classes.progressBar,"done")
    const shouldDisplayCourseCard = (course) => {
       
        return course.course_type === null || !Array.isArray(course.course_type);
    };

    return (
        <Box className={classes.box}>
            <Typography
                className={classes.course}
                ml={2}
                variant="h6"
                sx={{ textAlign: isActive && "center" }}
            >
                Mandatory Courses
            </Typography>

            <Grid container spacing={3} align="center">
                {pathwayCourseData.length > 0 ? (
                    pathwayCourseData.map(course => 
                        course.isMandatory === "true" && shouldDisplayCourseCard(course) ? (
                            <Grid item xs={12} md={3} key={course.id}>
                                <Card
                                    className={classes.courseCard}
                                    elevation={0}
                                    sx={{
                                        p: "16px",
                                        mb: isActive ? "0px" : "16px",
                                    }}
                                >
                                    
                                    <Box className={classes.pathwayCard}>
                                        <img
                                            className={classes.courseImage}
                                            src={course.logo}
                                            alt="course"
                                        />
                                        <CardContent
                                            sx={{
                                                height: isActive ? "60px" : "70px",
                                                p: isActive ? "0px" : "0px 8px 0px 0px",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "0.6rem",
                                            }}
                                        >
                                            <Typography
                                                align={isActive ? "center" : "left"}
                                                variant="body1"
                                            >
                                                {course.name}
                                            </Typography>
                                        </CardContent>
                                        <CardActions
                                            sx={{ height: "8px", padding: "8px 8px 8px 0px" }}
                                        >
                                            <LinearProgress
                                                className={classes.progressBar}
                                                variant="determinate"
                                                value={parseInt(completedPortion[course.id]) || 0}
                                            />
                                        </CardActions>
                                    </Box>
                                </Card>
                            </Grid>
                        ) : null
                    )
                ) : (
                    <Typography>No mandatory courses available.</Typography>
                )}
            </Grid>

            <Typography
                className={classes.course}
                ml={2}
                variant="h6"
                sx={{ textAlign: isActive && "center" }}
            >
                Optional Courses
            </Typography>

            <Grid container spacing={3}>
                {pathwayCourseData.length > 0 ? (
                    pathwayCourseData.map(course => 
                        course.isMandatory === "false" && shouldDisplayCourseCard(course) ? (
                            <Grid item xs={12} md={3} key={course.id}>
                                <Card
                                    className={classes.courseCard}
                                    elevation={0}
                                    sx={{
                                        p: "16px",
                                        mb: isActive ? "0px" : "16px",
                                    }}
                                >
                                    <Box className={classes.pathwayCard}>
                                        <img
                                            className={classes.courseImage}
                                            src={course.logo}
                                            alt="course"
                                        />
                                        <CardContent
                                            sx={{
                                                height: isActive ? "60px" : "70px",
                                                p: isActive ? "0px" : "0px 8px 0px 0px",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "0.6rem",
                                            }}
                                        >
                                            <Typography
                                                align={isActive ? "center" : "left"}
                                                variant="body1"
                                            >
                                                {course.name}
                                            </Typography>
                                        </CardContent>
                                        <CardActions
                                            sx={{ height: "8px", padding: "8px 8px 8px 0px" }}
                                        >
                                            <LinearProgress
                                                className={classes.progressBar}
                                                variant="determinate"
                                                value={parseInt(completedPortion[course.id]) || 0}
                                            />
                                        </CardActions>
                                    </Box>
                                </Card>
                            </Grid>
                        ) : null
                    )
                ) : (
                    <Typography>No optional courses available.</Typography>
                )}
            </Grid>
            
        </Box>
    );
};

export default McDigitalCourse;