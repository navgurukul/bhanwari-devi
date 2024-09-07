import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, IconButton, DialogContent,
  Typography, DialogActions, Button, Radio, RadioGroup,
  FormControlLabel, FormControl, FormLabel, Divider, Box,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';

const PreQuiz = ({ open, handleClose, courseId, courseName, courseData }) => {
  const user = useSelector(({ User }) => User);
  const [courseContent, setCourseContent] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [slugId, setSlugId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const history = useHistory();

  useEffect(() => {
    if (!courseId) return; // Return early if courseId is not available

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
  }, [courseId]); // Add courseId as a dependency

  const handleChange = (event, questionText) => {
    const selectedOptionId = parseInt(event.target.value, 10);
    setSelectedAnswers(prevState => ({
      ...prevState,
      [questionText]: selectedOptionId,
    }));
  };

  const handleSubmit = () => {
    const resultsArray = courseContent.map((item) => {
      if (item.content_type === 'prequiz') {
        const selectedOptionId = selectedAnswers[item.content[0].value];
        const correctAnswerIds = item.content[2]?.correct_options_value.map(option => option.value) || [];
        const isCorrect = correctAnswerIds.includes(selectedOptionId);
        const status = isCorrect ? 'Pass' : 'Fail';
        const courseId = item.course_id ? String(item.course_id) : '';

        return {
          slug_id: slugId,
          selected_option: [selectedOptionId],
          status: status,
          course_id: courseId,
          // lang: language,
        };
      }
      return null;
    }).filter(Boolean);

    console.log('Results Array:', resultsArray);

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_MERAKI_URL}/assessment/slug/complete`,
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: user?.data?.token || localStorage.getItem('studentAuthToken'),
      },
      data: resultsArray,
    })
      .then((response) => {
        console.log('API Response:', response.data);
      })
      .catch((error) => {
        console.error('API call failed:', error);
      });
      handleClose();

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
    </Dialog>
  );
};

export default PreQuiz;
