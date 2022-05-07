import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../../theme/constant";

import {
  Container,
  Box,
  Grid,
  Card,
  Button,
  CardContent,
  Typography,
} from "@mui/material";

const PathwayCards = (props) => {
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  // {
  //     "id": 27508,
  //     "title": "revision-3 by muskan",
  //     "description": "What are computers and what do they do? What is programming? Instances of programming in daily life. Basic definitions.Continue with basic definitions. Why Python? Explore the interface of Python. How to use indentation and comments in the Meraki app.",
  //     "facilitator_id": 1343,
  //     "start_time": "2022-05-15T05:56:42.000+05:30",
  //     "end_time": "2022-05-15T06:56:42.000+05:30",
  //     "category_id": 3,
  //     "video_id": null,
  //     "lang": "hi",
  //     "type": "batch",
  //     "meet_link": "https://meet.google.com/har-nxqs-fef",
  //     "calendar_event_id": "8t8ufp5pme9oegtnkjp7srthnc_20220515T002642Z",
  //     "material_link": null,
  //     "max_enrolment": 5,
  //     "recurring_id": 385,
  //     "sub_title": "Class 1 - Introduction to Computers, Programming and Python",
  //     "course_version": "v2",
  //     "facilitator": {
  //         "name": "Anand Patel",
  //         "email": "anandnavgurukul@gmail.com"
  //     },
  //     "parent_class": {
  //         "id": 385,
  //         "frequency": "DAILY",
  //         "occurrence": 28,
  //         "until": null,
  //         "on_days": null,
  //         "calendar_event_id": "8t8ufp5pme9oegtnkjp7srthnc",
  //         "cohort_room_id": "!SZokxMutQQfbefCOJK:navgurukul.org"
  //     },
  //     "registrations": [
  //         {
  //             "id": 7410,
  //             "class_id": 27508,
  //             "user_id": 77,
  //             "registered_at": "2022-04-28T05:26:07.890Z",
  //             "feedback": null,
  //             "feedback_at": null
  //         },
  //         {
  //             "id": 7439,
  //             "class_id": 27508,
  //             "user_id": 1899,
  //             "registered_at": "2022-04-28T07:54:11.481Z",
  //             "feedback": null,
  //             "feedback_at": null
  //         },
  //         {
  //             "id": 7556,
  //             "class_id": 27508,
  //             "user_id": 2025,
  //             "registered_at": "2022-04-28T11:55:21.936Z",
  //             "feedback": null,
  //             "feedback_at": null
  //         },
  //         {
  //             "id": 7558,
  //             "class_id": 27508,
  //             "user_id": 1902,
  //             "registered_at": "2022-04-28T16:06:29.215Z",
  //             "feedback": null,
  //             "feedback_at": null
  //         },
  //         {
  //             "id": 7617,
  //             "class_id": 27508,
  //             "user_id": 1889,
  //             "registered_at": "2022-04-28T17:39:55.733Z",
  //             "feedback": null,
  //             "feedback_at": null
  //         }
  //     ],
  //     "course_id": 370,
  //     "pathway_id": 1,
  //     "exercise_id": 4137,
  //     "is_enrolled": true,
  //     "rules": {
  //         "en": "## Rules\n- Join the class atleast\n10 minutes before schedule.\n\n- Watch [this video](https://www.youtube.com/watch?v=QfBnS1Gnw2c) if you are new to\nMeraki, to follow the instructions."
  //     }
  // }
  const language = {
    hi: "Hindi",
    en: "English",
    mr: "Marathi",
  };
  const { userEnrolledClasses } = props;

  const pathwaysCardsData = [
    {
      name: "Class 1 - Intro to python",
      date: "26 jul '21",
      language: "Hindi",
      classTitle: "Batch",
    },

    {
      name: "Class 1 - Intro to python",
      date: "26 jul '21",
      language: "Hindi",
      classTitle: "Revision Class",
    },
    {
      name: "Class 1 - Intro to python",
      date: "26 jul '21",
      language: "Hindi",
      classTitle: "Doubt Class",
    },
    {
      name: "Class 1 - Intro to python",
      date: "26 jul '21",
      language: "Hindi",
      classTitle: "Batch",
    },
  ];

  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {userEnrolledClasses?.slice(0, 3).map((item) => {
            return (
              <Grid item xs={12} sm={4} md={4}>
                <Card>
                  {item.type == "batch" ? (
                    <Box sx={{ borderTop: 5, color: "darkblue" }} />
                  ) : (
                    <Box sx={{ borderTop: 5, color: "ForestGreen" }} />
                  )}
                  <CardContent>
                    <Grid container spacing={1}>
                      <Grid item xs={6} md={8}>
                        <Typography variant="body1" gutterBottom>
                          {item.title}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={4}>
                        <Button
                          variant="contained"
                          sx={
                            item.type == "batch"
                              ? {
                                  borderRadius: { xs: 25, sm: 15 },
                                  height: { xs: 34, sm: 25 },
                                  fontSize: "11px",
                                  backgroundColor: "lightsteelblue",
                                  color: "darkblue",
                                }
                              : {
                                  borderRadius: { xs: 25, sm: 15 },
                                  height: { xs: 34, sm: 25 },
                                  fontSize: "11px",
                                  backgroundColor: "Azure",
                                  color: "green",
                                }
                          }
                          size="small"
                        >
                          {item.type}
                        </Button>
                      </Grid>
                    </Grid>

                    <Grid container spacing={1}>
                      <Grid item xs={6} md={3}>
                        <Typography variant="body2">
                          {item.start_time?.split("T")[0]}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <Typography variant="body2">
                          <li>{language[item.lang]}</li>
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
};

export default PathwayCards;
