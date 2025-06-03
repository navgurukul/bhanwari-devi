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
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // Helper function to get question text from content array
  const getQuestionText = (content) => {
    const questionComponent = content.find(item => item.component === 'questionExpression');
    return questionComponent?.value || '';
  };

  // Helper function to get options from content array
  const getOptions = (content) => {
    const optionsComponent = content.find(item => item.component === 'options');
    return optionsComponent?.value || [];
  };

  // Helper function to get image from content array
  const getImage = (content) => {
    const imageComponent = content.find(item => item.component === 'image');
    return imageComponent?.value || null;
  };

  // Helper function to get correct answer from content array
  const getCorrectAnswer = (content) => {
    const solutionComponent = content.find(item => item.component === 'solution');
    return solutionComponent?.correct_options_value || [];
  };

  const handleSubmit = async () => {
    const token = user?.data?.token || localStorage.getItem("studentAuthToken");
    setIsSubmitting(true);

    const resultsArray = courseContent
      .filter(item => item && item.content_type === 'prequiz')
      .map(item => {
        const questionText = getQuestionText(item.content);
        const selectedOptionId = selectedAnswers[questionText];
        
        if (!selectedOptionId) {
          return null; // Skip unanswered questions
        }

        const correctAnswerIds = getCorrectAnswer(item.content).map(option => option.value);
        const isCorrect = correctAnswerIds.includes(selectedOptionId);
        const status = isCorrect ? 'Pass' : 'Fail';
        
        // Get language from course data or default to 'en'
        const language = item.lang_available ? item.lang_available[0] : 'en';
        const courseId = item.course_id ? Number(item.course_id) : 0;
        const slugId = item.slug_id ? Number(item.slug_id) : 0;

        return {
          slug_id: slugId,
          course_id: courseId,
          selected_option: [selectedOptionId], // API expects array
          status: status,
          lang: language,
        };
      })
      .filter(Boolean); // Remove null values

    // Check if all questions are answered
    const totalQuestions = courseContent.filter(item => item.content_type === 'prequiz').length;
    if (resultsArray.length < totalQuestions) {
      setSnackbarMessage("Please answer all questions before submitting.");
      setSnackbarSeverity('warning');
      setOpenSnackbar(true);
      setIsSubmitting(false);
      return;
    }

    if (resultsArray.length > 0) {
      try {
        
        const res = await axios({
          method: METHODS.POST,
          url: `${process.env.REACT_APP_MERAKI_URL}/assessment/slug/complete`,
          headers: {
            accept: "application/json",
            Authorization: token,
          },
          data: resultsArray,
        });

        setSnackbarMessage('Form submitted successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        localStorage.setItem(`preQuizSubmitted_${courseId}`, true);

        // Delay navigation to show success message
        setTimeout(() => {
          history.push(interpolatePath(PATHS.PATHWAY_COURSE_CONTENT, {
            courseId,
            exerciseId: 0,
            pathwayId,
          }));
        }, 1500);
      } catch (err) {
        console.error('API call failed', err);
        setSnackbarMessage(err.response?.data?.message || "Failed to submit quiz. Please try again.");
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    } else {
      setSnackbarMessage('No questions answered.');
      setSnackbarSeverity('warning');
      setOpenSnackbar(true);
    }

    setIsSubmitting(false);
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
              {courseContent.map((item, index) => {
                if (item.content_type !== 'prequiz') return null;
                
                const questionText = getQuestionText(item.content);
                const options = getOptions(item.content);
                const imageUrl = getImage(item.content);

                return (
                  <div key={index} style={{ marginBottom: '32px' }}>
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
                      <b>{index + 1}. {questionText}</b>
                    </FormLabel>
                    
                    {/* Display image if available */}
                    {imageUrl && (
                      <Box sx={{ my: 2, textAlign: 'center' }}>
                        <img 
                          src={imageUrl} 
                          alt="Question illustration" 
                          style={{ 
                            maxWidth: '100%', 
                            maxHeight: '300px',
                            objectFit: 'contain'
                          }} 
                        />
                      </Box>
                    )}
                    
                    <RadioGroup
                      style={{ marginTop: "8px", marginLeft: '20px' }}
                      aria-label={`question-${questionText}`}
                      name={`question-${questionText}`}
                      value={selectedAnswers[questionText] || ''}
                      onChange={(event) => handleChange(event, questionText)}
                    >
                      {options.map((option) => (
                        <FormControlLabel
                          key={option.id}
                          value={option.id}
                          control={<Radio />}
                          label={option.value}
                          style={{ marginBottom: '8px' }}
                        />
                      ))}
                    </RadioGroup>
                  </div>
                );
              })}
            </FormControl>
          )}
          <Box sx={{ mt: 'auto', mb: 2, textAlign: 'center' }}>
            <DialogActions>
              <Button
                onClick={handleSubmit}
                variant="contained"
                disabled={loading || !!error || isSubmitting}
                startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
                size="large"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Answer'}
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