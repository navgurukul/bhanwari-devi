
import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Checkbox,
  CircularProgress,
  IconButton,
  Slider,
  FormGroup
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const FeedbackForm = ({ open, onClose, user, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const RequiredAsterisk = () => <span style={{ color: "red" }}>*</span>;
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    easeNavigation: "",
    videoUnderstanding: "",
    videoDuration: "",
    timeToComplete: "",
    learnedTopics: {
      scratch: false,
      word: false,
      excel: false,
      ai: false,
      none: false,
    },
    mostTimeSpent: "",
    recommendCourse: "",
    facedChallenges: "",
    suggestions: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        id: user.id || "",
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);


  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: "800px",
    bgcolor: "background.paper",
    borderRadius: "8px",
    boxShadow: 24,
    p: 8,
    maxHeight: "calc(100vh - 64px)",
    overflowY: "auto",
    overflowX: "hidden", 
    boxSizing: "border-box",
    "&:focus": {
      outline: "none",
      boxShadow: "none",
    },
  };

  const questions = [
    {
      id: "easeNavigation",
      question: "On a scale of 1-4 how easy was it to navigate across MCDigital 2.0 course platform?",
      hindi: "1-4 के पैमाने पर MCDigital 2.0 कोर्स प्लेटफॉर्म पर navigate करना कितना आसान था?",
      type: "slider",
      marks: [
        { value: 1, label: "Very difficult / बहुत कठिन" },
        { value: 2, label: "Difficult / कठिन" },
        { value: 3, label: "Easy / सरल" },
        { value: 4, label: "Very easy / बहुत सरल" },
      ],
      required: true
    },
    {
      id: "videoUnderstanding",
      question: "Were the course videos easy to understand?",
      hindi: "क्या course के videos समझने में सरल थे?",
      type: "slider",
      marks: [
        { value: 1, label: "Absolutely No / बिलकुल नहीं" },
        { value: 2, label: "No / नहीं" },
        { value: 3, label: "Yes / हाँ" },
        { value: 4, label: "Absolutely Yes / हाँ, बिलकुल" },
      ],
      required: true
    },
    {
      id: "videoDuration",
      question: "Were the course videos of appropriate duration?",
      hindi: "क्या course के videos उचित अवधि के थे?",
      type: "slider",
      marks: [
        { value: 1, label: "Absolutely No / बिलकुल नहीं" },
        { value: 2, label: "No / नहीं" },
        { value: 3, label: "Yes / हाँ" },
        { value: 4, label: "Absolutely Yes / हाँ, बिलकुल" },
      ],
      required: true
    },
    {
      id: "timeToComplete",
      question: "On average, how much time did it take to complete the course?",
      hindi: "आपको लगभग कितना समय लगा ये course पूरा करने में?",
      type: "radio",
      options: [
        { value: "1 hour", label: "1 hour / 1 घंटा" },
        { value: "Less than 1 hour", label: "Less than 1 hour / 1 घंटे से कम" },
        { value: "2-6 hours", label: "2-6 hours / 2-6 घंटे" },
        { value: "More than 6 hours", label: "More than 6 hours / 6 घंटे से अधिक" },
      ],
      required: true
    },
    {
      id: "learnedTopics",
      question: "What new things did you learn?",
      hindi: "इस course के साथ आपका अनुभव कैसा रहा? क्या आपने कुछ नया सीखा?",
      type: "checkbox",
      options: [
        { value: "scratch", label: "Yes, Scratch Jr." },
        { value: "word", label: "Yes, MS WORD" },
        { value: "excel", label: "Yes, MS EXCEL" },
        { value: "ai", label: "Yes, AI" },
        { value: "none", label: "No, nothing was new for me / नहीं, मेरे लिए कुछ भी नया नहीं था" },
      ],
      required: true
    },
    {
      id: "mostTimeSpent",
      question: "In which course did you spend the most time?",
      hindi: "कौनसे course में आपको सबसे अधिक समय लगा?",
      type: "radio",
      options: [
        { value: "Scratch Jr.", label: "Scratch Jr." },
        { value: "MS WORD", label: "MS WORD" },
        { value: "MS EXCEL", label: "MS EXCEL" },
        { value: "AI", label: "AI" },
      ],
      required: true
    },
    {
      id: "recommendCourse",
      question: "Would you recommend this course to a friend?",
      hindi: "क्या आप अपने साथियों को यह course recommend करेंगे?",
      type: "slider",
      marks: [
        { value: 1, label: "Absolutely No / बिलकुल नहीं" },
        { value: 2, label: "No / नहीं" },
        { value: 3, label: "Yes / हाँ" },
        { value: 4, label: "Absolutely Yes / हाँ, बिलकुल" },
      ],
      required: true
    },
    {
      id: "facedChallenges",
      question: "If you faced any challenges, please share them here:",
      hindi: "यदि module में आपको कुछ कठिनायिया आई, तोह उन्हें यहाँ साँझा करे",
      type: "text",
      required: false
    },
    {
      id: "suggestions",
      question: "Please share any suggestions for this course:",
      hindi: "इस course के लिए अपना सुझाव साँझा करें",
      type: "text",
      required: false
    }
  ];

  const validateForm = () => {
    const newErrors = {};

    questions.forEach(question => {
      if (question.required) {
        if (question.type === 'checkbox') {
          const isChecked = Object.values(formData[question.id]).some(val => val);
          if (!isChecked) {
            newErrors[question.id] = "Please select at least one option";
          }
        } else if (!formData[question.id]) {
          newErrors[question.id] = "This field is required";
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRadioChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      learnedTopics: {
        ...formData.learnedTopics,
        [e.target.name]: e.target.checked,
      },
    });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSliderChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      const formPayload = new FormData();

      const likertScale = {
        1: "Very difficult",
        2: "Difficult",
        3: "Easy",
        4: "Very easy",
      };

      const understandingScale = {
        1: "Absolutely No",
        2: "No",
        3: "Yes",
        4: "Absolutely Yes",
      };

      // Add form data to payload
      formPayload.append("entry.1625588101", formData.id);
      formPayload.append("entry.780533742", formData.name);
      formPayload.append("entry.1605918256", formData.email);
      formPayload.append("entry.1624746621", likertScale[formData.easeNavigation]);
      formPayload.append("entry.1694874747", understandingScale[formData.videoUnderstanding]);
      formPayload.append("entry.369360666", understandingScale[formData.videoDuration]);
      formPayload.append("entry.1953866777", formData.timeToComplete);

      // Handle checkbox options
      if (formData.learnedTopics.scratch) formPayload.append("entry.801016796", "Yes, Scratch Jr.");
      if (formData.learnedTopics.word) formPayload.append("entry.801016796", "Yes, MS WORD");
      if (formData.learnedTopics.excel) formPayload.append("entry.801016796", "Yes, MS EXCEL");
      if (formData.learnedTopics.ai) formPayload.append("entry.801016796", "Yes, AI");
      if (formData.learnedTopics.none) formPayload.append("entry.801016796", "No, nothing was new for me");

      formPayload.append("entry.398186557", formData.mostTimeSpent);
      formPayload.append("entry.1311574657", understandingScale[formData.recommendCourse]);
      formPayload.append("entry.1481877636", formData.facedChallenges || "N/A");
      formPayload.append("entry.1941183160", formData.suggestions || "N/A");

      const scriptURL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfexy-v_4WdhMDYmfVrrFFN2QTVH3OsqeZTMnW8eFrfA-MhtQ/formResponse";

      await fetch(scriptURL, {
        method: "POST",
        mode: "no-cors",
        body: formPayload,
      });
      localStorage.setItem(`feedbackSubmitted_${user.id}`, 'true');
      setHasSubmitted(true);

      onClose();
      if (hasSubmitted) {
        return null; // Or return a message that feedback was already submitted
      }
      // Reset form
      setFormData({
        id: user?.id || "",
        name: user?.name || "",
        email: user?.email || "",
        easeNavigation: "",
        videoUnderstanding: "",
        videoDuration: "",
        timeToComplete: "",
        learnedTopics: {
          scratch: false,
          word: false,
          excel: false,
          ai: false,
          none: false,
        },
        mostTimeSpent: "",
        recommendCourse: "",
        facedChallenges: "",
        suggestions: "",
      });

      onClose();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderQuestionInput = (question, index) => {
    return (
      <>
        <FormLabel component="legend">
          <Typography variant="h6">
            {index + 1}. {question.question}
            {question.required && <RequiredAsterisk />}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {question.hindi}
            {question.required && <RequiredAsterisk />}
          </Typography>
        </FormLabel>

        {question.type === "slider" && (
          <Box
            sx={{
              width: "100%",
              px: 2,
              mt: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box sx={{ width: "85%", px: 3 }}>
              <Slider
                value={Number(formData[question.id]) || 0}
                onChange={(e, newValue) => handleSliderChange(question.id, newValue)}
                step={1}
                marks={question.marks}
                min={1}
                max={4}
                valueLabelDisplay="auto"
              />
            </Box>
          </Box>

        )}

        {question.type === "radio" && (
          <RadioGroup
            name={question.id}
            value={formData[question.id] || ""}
            onChange={handleRadioChange}
            sx={{ mt: 1 }}
          >
            {question.options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>
        )}

        {question.type === "checkbox" && (
          <FormGroup sx={{ mt: 1 }}>
            {question.options.map((option) => (
              <FormControlLabel
                key={option.value}
                control={
                  <Checkbox
                    name={option.value}
                    checked={formData.learnedTopics[option.value]}
                    onChange={handleCheckboxChange}
                  />
                }
                label={option.label}
              />
            ))}
          </FormGroup>
        )}

        {question.type === "text" && (
          <TextField
            fullWidth
            variant="outlined"
            name={question.id}
            value={formData[question.id]}
            onChange={handleInputChange}
            margin="normal"
            multiline
            rows={3}
          />
        )}

        {errors[question.id] && (
          <Typography color="error" variant="caption" sx={{ display: 'block', mt: 1 }}>
            {errors[question.id]}
          </Typography>
        )}
      </>
    );
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 4,
          }}
        >
          <Typography variant="h5">MCDigital 2.0 Course Feedback</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <form onSubmit={handleSubmit}>
          <Box sx={{ px: 4, py: 2 }}></Box>
          {questions.map((question, index) => (
            <FormControl
              key={question.id}
              component="fieldset"
              sx={{ mb: 4, width: "100%" }}
              required={question.required}
              error={!!errors[question.id]}
            >
              {renderQuestionInput(question, index)}
            </FormControl>
          ))}

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              size="large"
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Submit Feedback"
              )}
            </Button>
          </Box>
          <Box />
        </form>
      </Box>
    </Modal>
  );
};

export default FeedbackForm;