import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  IconButton,
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
  FormGroup,
  Checkbox,
  Slider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const FeedbackForm = ({ open, onClose, user, onSuccess }) => {
  const [errors, setErrors] = useState({});

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

  // for validation

  const validateForm = () => {
    const newErrors = {};

    if (!formData.easeNavigation) newErrors.easeNavigation = true;
    if (!formData.videoUnderstanding) newErrors.videoUnderstanding = true;
    if (!formData.videoDuration) newErrors.videoDuration = true;
    if (!formData.timeToComplete) newErrors.timeToComplete = true;
    if (
      !formData.learnedTopics.scratch &&
      !formData.learnedTopics.word &&
      !formData.learnedTopics.excel &&
      !formData.learnedTopics.ai &&
      !formData.learnedTopics.none
    )
      newErrors.learnedTopics = true;

    if (!formData.mostTimeSpent) newErrors.mostTimeSpent = true;
    if (!formData.recommendCourse) newErrors.recommendCourse = true;

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

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

    formPayload.append("entry.1625588101", formData.id);
    formPayload.append("entry.780533742", formData.name);
    formPayload.append("entry.1605918256", formData.email);

    formPayload.append(
      "entry.1624746621",
      likertScale[formData.easeNavigation]
    );
    formPayload.append(
      "entry.1694874747",
      understandingScale[formData.videoUnderstanding]
    );
    formPayload.append(
      "entry.369360666",
      understandingScale[formData.videoDuration]
    );
    formPayload.append("entry.1953866777", formData.timeToComplete);

    if (formData.learnedTopics?.scratch)
      formPayload.append("entry.801016796", "Yes, Scratch Jr.");
    if (formData.learnedTopics?.word)
      formPayload.append("entry.801016796", "Yes, MS WORD");
    if (formData.learnedTopics?.excel)
      formPayload.append("entry.801016796", "Yes, MS EXCEL");
    if (formData.learnedTopics?.ai)
      formPayload.append("entry.801016796", "Yes, AI");
    if (formData.learnedTopics?.none)
      formPayload.append("entry.801016796", "No, nothing was new for me");

    formPayload.append("entry.398186557", formData.mostTimeSpent);
    formPayload.append(
      "entry.1311574657",
      understandingScale[formData.recommendCourse]
    );
    formPayload.append("entry.1481877636", formData.facedChallenges);
    formPayload.append("entry.1941183160", formData.suggestions);

    for (let pair of formPayload.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    const scriptURL =
      "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfexy-v_4WdhMDYmfVrrFFN2QTVH3OsqeZTMnW8eFrfA-MhtQ/formResponse";

    await fetch(scriptURL, {
      method: "POST",
      mode: "no-cors",
      body: formPayload,
    });

    // Reset the form
    setFormData({
      id: user.id || "",
      name: user.name || "",
      email: user.email || "",
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
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Typography variant="h6">Course Feedback</Typography>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <form onSubmit={handleSubmit}>
          {/* Q1 */}
          <FormLabel>
            On a scale of 1-4 how easy was it to navigate across MCDigital 2.0
            course platform? <br />
            1-4 के पैमाने पर MCDigital 2.0 कोर्स प्लेटफॉर्म पर navigate करना
            कितना आसान था?
            <span style={{ color: "red", mb: 4 }}>*</span>
          </FormLabel>
          <Slider
            name="easeNavigation"
            value={Number(formData.easeNavigation) || 0}
            onChange={(e, newValue) =>
              setFormData({ ...formData, easeNavigation: newValue })
            }
            step={1}
            marks={[
              { value: 1, label: "Very difficult / बहुत कठिन" },
              { value: 2, label: "Difficult / कठिन" },
              { value: 3, label: "Easy / सरल" },
              { value: 4, label: "Very easy / बहुत सरल" },
            ]}
            min={1}
            max={4}
            sx={{
              // width:'100%',
              // maxWidth:700,
              "& .MuiSlider-markLabel": {
                fontSize: "0.75rem",
                whiteSpace: "nowrap",
                marginLeft: "-13px",
                marginRight: "-13px",
              },
              "& .MuiSlider-mark": {
                width: "10px",
                height: "10px",
              },
              padding: "8px 0",
              marginBottom: "10px",
            }}
          />
          {errors.easeNavigation && (
            <Typography
              variant="caption"
              sx={{ color: "red", mb: 2, display: "block" }}
            >
              This field is required.
            </Typography>
          )}

          {/* Q2 */}
          <FormLabel>
            Were the course videos easy to understand? <br />
            क्या course के videos समझने में सरल थे?
            <span style={{ color: "red", mb: 4 }}>*</span>
          </FormLabel>
          <Slider
            name="videoUnderstanding"
            value={Number(formData.videoUnderstanding) || 0}
            onChange={(e, newValue) =>
              setFormData({ ...formData, videoUnderstanding: newValue })
            }
            step={1}
            marks={[
              { value: 1, label: "Absolutely No / बिलकुल नहीं" },
              { value: 2, label: "No / नहीं" },
              { value: 3, label: "Yes / हाँ" },
              { value: 4, label: "Absolutely Yes / हाँ, बिलकुल" },
            ]}
            min={1}
            max={4}
            sx={{
              "& .MuiSlider-markLabel": {
                fontSize: "0.75rem",
                whiteSpace: "nowrap",
                marginLeft: "-13px",
                marginRight: "-13px",
              },
              "& .MuiSlider-mark": {
                width: "10px",
                height: "10px",
              },
              padding: "8px 0",
              marginBottom: "10px",
            }}
          />
          {errors.videoUnderstanding && (
            <Typography
              variant="caption"
              sx={{ color: "red", mb: 2, display: "block" }}
            >
              This field is required.
            </Typography>
          )}

          {/* Q3 */}
          <FormLabel>
            Were the course videos of appropriate duration? <br />
            क्या course के videos उचित अवधि के थे?
            <span style={{ color: "red", mb: 4 }}>*</span>
          </FormLabel>
          <Slider
            name="videoDuration"
            value={Number(formData.videoDuration) || 0}
            onChange={(e, newValue) =>
              setFormData({ ...formData, videoDuration: newValue })
            }
            step={1}
            marks={[
              { value: 1, label: "Absolutely No / बिलकुल नहीं" },
              { value: 2, label: "No / नहीं" },
              { value: 3, label: "Yes / हाँ" },
              { value: 4, label: "Absolutely Yes / हाँ, बिलकुल" },
            ]}
            min={1}
            max={4}
            sx={{
              "& .MuiSlider-markLabel": {
                fontSize: "0.75rem",
                whiteSpace: "nowrap",
                marginLeft: "-13px",
                marginRight: "-13px",
              },
              "& .MuiSlider-mark": {
                width: "10px",
                height: "10px",
              },
              padding: "8px 0",
              marginBottom: "10px",
            }}
          />
          {errors.videoDuration && (
            <Typography
              variant="caption"
              sx={{ color: "red", mb: 2, display: "block" }}
            >
              This field is required.
            </Typography>
          )}

          {/* Q4 */}
          <FormLabel>
            On average, how much time did it take to complete the course? <br />
            आपको लगभग कितना समय लगा ये course पूरा करने में?
            <span style={{ color: "red", mb: 2 }}>*</span>
          </FormLabel>
          <RadioGroup
            name="timeToComplete"
            value={formData.timeToComplete}
            onChange={handleRadioChange}
            sx={{ gap: 0 }}
          >
            <FormControlLabel
              value="1 hour"
              control={<Radio />}
              label="1 hour / 1 घंटा"
            />
            <FormControlLabel
              value="Less than 1 hour"
              control={<Radio />}
              label="Less than 1 hour / 1 घंटे से कम"
            />
            <FormControlLabel
              value="2-6 hours"
              control={<Radio />}
              label="2-6 hours / 2-6 घंटे"
            />
            <FormControlLabel
              value="More than 6 hours"
              control={<Radio />}
              label="More than 6 hours / 6 घंटे से अधिक"
            />
          </RadioGroup>
          {errors.timeToComplete && (
            <Typography
              variant="caption"
              sx={{ color: "red", mb: 1, display: "block" }}
            >
              This field is required.
            </Typography>
          )}

          {/* Q5 */}
          <FormLabel>
            What new things did you learn? <br />
            इस course के साथ आपका अनुभव कैसा रहा? क्या आपने कुछ नया सीखा?
            <span style={{ color: "red", mb: 2 }}>*</span>
          </FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  name="scratch"
                  checked={formData.learnedTopics.scratch}
                  onChange={handleCheckboxChange}
                />
              }
              label="Yes, Scratch Jr."
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="word"
                  checked={formData.learnedTopics.word}
                  onChange={handleCheckboxChange}
                />
              }
              label="Yes, MS WORD"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="excel"
                  checked={formData.learnedTopics.excel}
                  onChange={handleCheckboxChange}
                />
              }
              label="Yes, MS EXCEL"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="ai"
                  checked={formData.learnedTopics.ai}
                  onChange={handleCheckboxChange}
                />
              }
              label="Yes, AI"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="none"
                  checked={formData.learnedTopics.none}
                  onChange={handleCheckboxChange}
                />
              }
              label="No, nothing was new for me / नहीं, मेरे लिए कुछ भी नया नहीं था"
            />
          </FormGroup>
          {errors.learnedTopics && (
            <Typography
              variant="caption"
              sx={{ color: "red", mb: 1, display: "block" }}
            >
              Please select at least one option.
            </Typography>
          )}

          {/* Q6 */}
          <FormLabel>
            In which course did you spend the most time? <br />
            कौनसे course में आपको सबसे अधिक समय लगा?
            <span style={{ color: "red", mb: 2 }}>*</span>
          </FormLabel>
          <RadioGroup
            name="mostTimeSpent"
            value={formData.mostTimeSpent}
            onChange={handleRadioChange}
            sx={{ gap: 0 }}
          >
            <FormControlLabel
              value="Scratch Jr."
              control={<Radio />}
              label="Scratch Jr."
            />
            <FormControlLabel
              value="MS WORD"
              control={<Radio />}
              label="MS WORD"
            />
            <FormControlLabel
              value="MS EXCEL"
              control={<Radio />}
              label="MS EXCEL"
            />
            <FormControlLabel value="AI" control={<Radio />} label="AI" />
          </RadioGroup>
          {errors.mostTimeSpent && (
            <Typography
              variant="caption"
              sx={{ color: "red", mb: 1, display: "block" }}
            >
              This field is required.
            </Typography>
          )}

          {/* Q7 */}
          <FormLabel>
            Would you recommend this course to a friend? <br />
            क्या आप अपने साथियों को यह course recommend करेंगे?
            <span style={{ color: "red", mb: 2 }}>*</span>
          </FormLabel>
          <Slider
            name="recommendCourse"
            value={Number(formData.recommendCourse) || 0}
            onChange={(e, newValue) =>
              setFormData({ ...formData, recommendCourse: newValue })
            }
            step={1}
            marks={[
              { value: 1, label: "Absolutely No / बिलकुल नहीं" },
              { value: 2, label: "No / नहीं" },
              { value: 3, label: "Yes / हाँ" },
              { value: 4, label: "Absolutely Yes / हाँ, बिलकुल" },
            ]}
            min={1}
            max={4}
            sx={{
              "& .MuiSlider-markLabel": {
                fontSize: "0.75rem",
                whiteSpace: "nowrap",
                marginLeft: "-13px",
                marginRight: "-13px",
              },
              "& .MuiSlider-mark": {
                width: "10px",
                height: "10px",
              },
              padding: "8px 0",
              marginBottom: "10px",
            }}
          />
          {errors.recommendCourse && (
            <Typography
              variant="caption"
              sx={{ color: "red", mb: 2, display: "block" }}
            >
              This field is required.
            </Typography>
          )}

          {/* Input Query */}
          <FormLabel component="legend" sx={{ mt: 2 }}>
            If you faced any challenges, please share them here:
          </FormLabel>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Your challenges..."
            name="facedChallenges"
            value={formData.facedChallenges}
            onChange={handleInputChange}
            margin="normal"
            multiline
            rows={2}
          />
          <FormLabel component="legend" sx={{ mt: 2 }}>
            Please share any suggestions for this course:
          </FormLabel>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Your suggestions..."
            name="suggestions"
            value={formData.suggestions}
            onChange={handleInputChange}
            margin="normal"
            multiline
            rows={2}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 2, backgroundColor: "#4CAF50" }}
          >
            Submit Feedback
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackForm;
