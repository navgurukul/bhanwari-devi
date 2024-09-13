import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, IconButton, DialogContent,
  Typography, DialogActions, Button, Radio, RadioGroup,
  FormControlLabel, FormControl, FormLabel, Divider, Box,
  CircularProgress, Snackbar, Alert
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { METHODS } from "../../services/api";
import { PATHS, interpolatePath } from "../../constant";


const PreQuiz = ({ open, handleClose, courseId, courseName, courseData, pathwayId }) => {
  const user = useSelector(({ User }) => User);
  const [courseContent, setCourseContent] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [slugId, setSlugId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const history = useHistory();
  useEffect(() => {
    const formSubmitted = localStorage.getItem(`preQuizSubmitted_${courseId}`);
    if (formSubmitted) {
      history.push(interpolatePath(PATHS.PATHWAY_COURSE_CONTENT, {
        courseId,
        exerciseId: 0,
        pathwayId,
      }));
    }
  }, [courseId, history, pathwayId]);



  useEffect(() => {
    if (!courseId) return;
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_MERAKI_URL}/courses/${courseId}/prequiz`,
      headers: {
        accept: "application/json",
        Authorization: user?.data?.token || localStorage.getItem("studentAuthToken"),
      },
    })
      .then((response) => {
        console.log('Fetched Data:', response.data);

        if (response.data.course.course_content) {
          setCourseContent(response.data.course.course_content);
          setSlugId(response.data.course.course_content[0]?.slug_id);
        } else {
          console.error('Unexpected data structure:', response.data);
          setError('Unexpected data structure.');
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error('API call failed:', err);
        setError('Failed to fetch questions.');
        setLoading(false);
      });
  }, [courseId]);

  const handleChange = (event, questionText) => {
    const selectedOptionId = parseInt(event.target.value, 10);
    setSelectedAnswers(prevState => ({
      ...prevState,
      [questionText]: selectedOptionId,
    }));
  };



  const handleSubmit = async () => {
    const token = user?.data?.token || localStorage.getItem("studentAuthToken");

    const resultsArray = courseContent
      .filter(item => item && item.content_type === 'prequiz')
      .map(item => {
        const selectedOptionId = Array.isArray(selectedAnswers[item.content[0]?.value])
          ? selectedAnswers[item.content[0]?.value]
          : [selectedAnswers[item.content[0]?.value]];

        const correctAnswerIds = Array.isArray(item.content[2]?.correct_options_value)
          ? item.content[2].correct_options_value.map(option => option.value)
          : [];

        const isCorrect = selectedOptionId[0] === correctAnswerIds[0];
        const status = isCorrect ? 'Pass' : 'Fail';
        const language = item.lang_available ? item.lang_available[0] : 'en';
        const courseId = item.course_id ? Number(item.course_id) : 0;
        const slugId = item.slug_id ? Number(item.slug_id) : 0;

        if (selectedOptionId.length > 0) {
          return {
            slug_id: slugId,
            course_id: courseId,
            selected_option: selectedOptionId,
            status: status,
            lang: language,
          };
        }
        return null;
      }).filter(Boolean);

    if (resultsArray.length > 0) {
      console.log('Payload being sent:', resultsArray);

      axios({
        method: METHODS.POST,
        url: `${process.env.REACT_APP_MERAKI_URL}/assessment/slug/complete`,
        headers: {
          accept: "application/json",
          Authorization: token,
        },
        data: resultsArray,
      })
        .then((res) => {
          console.log('API call successful', res);
          setSnackbarMessage('Form submitted successfully!');
          setSnackbarSeverity('success');
          setOpenSnackbar(true);

          localStorage.setItem(`preQuizSubmitted_${courseId}`, true);

          history.push(interpolatePath(PATHS.PATHWAY_COURSE_CONTENT, {
            courseId,
            exerciseId: 0,
            pathwayId,
          }));
        })
        .catch((err) => {
          console.error('API call failed', err);
          setSnackbarMessage("Please select every question's answer");
          setSnackbarSeverity('error');
          setOpenSnackbar(true);
        });
    } else {
      setSnackbarMessage('No questions answered.');
      setSnackbarSeverity('warning');
      setOpenSnackbar(true);
    }
    console.log('Prepared Result:', resultsArray);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleDialogClose = (event, reason) => {
    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
      handleClose();
    }
  };

  return (
    <Dialog fullScreen open={open} onClose={handleDialogClose}>
      <Typography variant="h6" style={{ fontWeight: 'bold', textAlign: 'center', marginTop: '16px' }}>
        {courseName}
      </Typography>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          left: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <Divider sx={{ my: 2 }} />
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            width: '80%',
            mx: 'auto',
            '@media (min-width: 600px)': {
              width: '60%',
            },
            '@media (min-width: 900px)': {
              width: '50%',
            },
          }}
        >
          <DialogTitle sx={{ textAlign: 'left', width: '100%' }}>
            Welcome to the Pre-Quiz
          </DialogTitle>
          <Box sx={{ mb: 2 }}>
            <Typography gutterBottom>
              1. This quiz is to test your basic proficiency.
            </Typography>
            <Typography gutterBottom>
              2. It consists of multiple choice questions.
            </Typography>
            <Typography gutterBottom>
              3. It is mandatory to complete the pre-quiz to access course material.
            </Typography>
          </Box>
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <FormControl component="fieldset" fullWidth>
              {courseContent.map((item, index) => (
                <div key={index}>
                  {item.content_type === 'prequiz' && (
                    <>
                      <FormLabel
                        component="legend"
                        style={{
                          marginTop: index > 0 ? "48px" : "0px",
                          fontFamily: "Noto Sans",
                          lineHeight: "170%",
                          fontSize: "18px",
                          color: "Black"
                        }}
                      >
                        <b>{index + 1}. {item.content[0].value}</b>
                      </FormLabel>
                      <RadioGroup
                        style={{ marginTop: "8px", marginLeft: '20px' }}
                        aria-label={`question-${item.content[0].value}`}
                        name={`question-${item.content[0].value}`}
                        value={selectedAnswers[item.content[0].value] || ''}
                        onChange={(event) => handleChange(event, item.content[0].value)}
                      >
                        {item.content[1].value.map((option, idx) => (
                          <FormControlLabel
                            key={option.id}
                            value={option.id}
                            control={<Radio />}
                            label={option.value}
                          />
                        ))}
                      </RadioGroup>
                    </>
                  )}
                </div>
              ))}
            </FormControl>
          )}
          <Box sx={{ mt: 'auto', mb: 2, textAlign: 'center' }}>
            <DialogActions>
              <Button onClick={handleSubmit} variant="contained" disabled={loading || !!error}>
                Submit Answer
              </Button>
            </DialogActions>
          </Box>
        </Box>
      </DialogContent>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default PreQuiz;
