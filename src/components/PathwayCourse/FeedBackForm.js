// import React, { useState } from "react";
// import {
//   Modal,
//   Box,
//   Typography,
//   Button,
//   FormControl,
//   FormLabel,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   TextField,
//   Checkbox,
//   CircularProgress,
//   Select,
//   MenuItem,
//   Slider,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";

// const FeedbackModal = ({
//   open,
//   handleClose,
//   handleCertificateModal,
//   pathwayName,
//   userData,
// }) => {
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     // Main question fields
//     "entry.1611148662": "", // Navigation ease (1-4)
//     "entry.899855541": "",  // Videos understandable (1-4)
//     "entry.1725866896": "", // Video duration (1-4)
//     "entry.111870027": "",  // Completion time (text)
//     "entry.827114064": "",  // Learned something (text)
//     "entry.939299122": "",  // Most time spent (text)
//     "entry.1646808488": "", // Recommend (1-4)
//     "entry.2088661701": "", // Challenges (text)
//     "entry.2144395951": "", // Suggestions (text)

//     // Additional required fields from payload
//     "dlut": Date.now().toString(),
//     "hud": "true",
//     "fvv": "1",
//     "pageHistory": "0",
//     "fbzx": "2447772869220050218" // This appears to be a form session ID
//   });

//   const questions = [
//     {
//       id: "entry.1611148662",
//       question: "On a scale of 1-4 how easy was it to navigate across MCDigital 2.0 course platform?",
//       hindi: "1-4 के पैमाने पर MCDigital 2.0 कोर्स प्लेटफॉर्म पर navigate करना कितना आसान था?",
//       type: "likert",
//       options: [
//         { value: "1", label: "1- Very difficult / बहुत कठिन" },
//         { value: "2", label: "2- Difficult / कठिन" },
//         { value: "3", label: "3- Easy / सरल" },
//         { value: "4", label: "4- Very easy / बहुत सरल" },
//       ],
//       required: true,
//     },
//     {
//       id: "entry.899855541",
//       question: "Were the course videos easy to understand?",
//       hindi: "क्या course के videos समझने में सरल थे?",
//       type: "likert",
//       options: [
//         { value: "1", label: "1- Absolutely No / बिलकुल नहीं" },
//         { value: "2", label: "2- No / नहीं" },
//         { value: "3", label: "3- Yes / हाँ" },
//         { value: "4", label: "4- Absolutely Yes / हाँ, बिलकुल" },
//       ],
//       required: true,
//     },
//     {
//       id: "entry.1725866896",
//       question: "Were the course videos of appropriate duration?",
//       hindi: "क्या course के videos उचित अवधि के थे?",
//       type: "likert",
//       options: [
//         { value: "1", label: "1- Absolutely No / बिलकुल नहीं" },
//         { value: "2", label: "2- No / नहीं" },
//         { value: "3", label: "3- Yes / हाँ" },
//         { value: "4", label: "4- Absolutely Yes / हाँ, बिलकुल" },
//       ],
//       required: true,
//     },
//     {
//       id: "entry.111870027",
//       question: "On an average, how much time did it take you to complete the course?",
//       hindi: "आपको लगभग कितना समय लगा ये course पूरा करने में?",
//       type: "checkbox",
//       options: [
//         { value: "A", label: "A) 1 hour / 1 घंटा" },
//         { value: "B", label: "B) Less than 1 hour / 1 घंटे से कम" },
//         { value: "C", label: "C) 2-6 hours / 2-6 घंटे" },
//         { value: "D", label: "D) More than 6 hours / 6 घंटे से अधिक" },
//       ],
//       required: true,
//     },
//     {
//       id: "entry.827114064",
//       question: "How has your experience been with the course? Did you learn something new? If yes, what was it?",
//       hindi: "इस course के साथ आपका अनुभव कैसा रहा? क्या आपने कुछ नया सीखा? अगर हां तोह क्या सीखा?",
//       type: "checkbox",
//       options: [
//         { value: "A", label: "A) Yes, Scratch Jr." },
//         { value: "B", label: "B) Yes, MS WORD" },
//         { value: "C", label: "C) Yes, MS EXCEL" },
//         { value: "D", label: "D) Yes, AI" },
//         { value: "E", label: "E) No, nothing was new for me / नहिं, मेरे लिए कुछभीनया नहिं था" },
//       ],
//       required: true,
//     },
//     {
//       id: "entry.939299122",
//       question: "In which course did you spend most of the time?",
//       hindi: "कौनसे course में आपको सबसे अधिक समय लगा?",
//       type: "checkbox",
//       options: [
//         { value: "A", label: "A) Scratch Jr." },
//         { value: "B", label: "B) MS WORD" },
//         { value: "C", label: "C) MS EXCEL" },
//         { value: "D", label: "D) AI" },
//       ],
//       required: true,
//     },
//     {
//       id: "entry.1646808488",
//       question: "Would you recommend this course to a friend?",
//       hindi: "क्या आप आपने साथियो को यह course recommend करेंगे?",
//       type: "likert",
//       options: [
//         { value: "1", label: "1- Absolutely No / बिलकुल नहीं" },
//         { value: "2", label: "2- No / नहीं" },
//         { value: "3", label: "3- Yes / हाँ" },
//         { value: "4", label: "4- Absolutely Yes / हाँ, बिलकुल" },
//       ],
//       required: true,
//     },
//     {
//       id: "entry.2088661701",
//       question: "If you faced any challenges, please share them here?",
//       hindi: "यदि module में आपको कुछ कठिनायिया आई, तोह उन्हें यहाँ साँझा करे",
//       type: "text",
//       required: false,
//     },
//     {
//       id: "entry.2144395951",
//       question: "Please share any suggestions for this course.",
//       hindi: "इस course के लिए अपना सुझाव साँझा करें",
//       type: "text",
//       required: false,
//     },
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleCheckboxChange = (questionId, optionValue) => {
//     setFormData((prev) => {
//       const currentValues = prev[questionId] || [];
//       const newValues = currentValues.includes(optionValue)
//         ? currentValues.filter((v) => v !== optionValue)
//         : [...currentValues, optionValue];
//       return {
//         ...prev,
//         [questionId]: newValues,
//       };
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const submissionData = {
//       ...formData,
//       "dlut": Date.now().toString(),
//       "submissionTimestamp": Math.floor(Date.now() / 1000).toString(),
//       "hud": "true",
//       "fvv": "1",
//       "pageHistory": "0",
//       "fbzx": "2447772869220050218", // Keep this constant or generate dynamically
//       // Add sentinel fields (empty)
//       "entry.1611148662_sentinel": "",
//       "entry.899855541_sentinel": "",
//       "entry.1725866896_sentinel": "",
//       "entry.111870027_sentinel": "",
//       "entry.827114064_sentinel": "",
//       "entry.939299122_sentinel": "",
//       "entry.1646808488_sentinel": ""
//     };

//     const formDataEncoded = new URLSearchParams();
//     Object.entries(submissionData).forEach(([key, value]) => {
//       formDataEncoded.append(key, value);
//     });

//     try {
//       await fetch("https://docs.google.com/forms/d/e/1FAIpQLSfuiJoi6FH4nHVEgMjHEPnhWmUSRh-uVl-GVzW6AheA1Nl46g/formResponse", {
//         method: "POST",
//         mode: "no-cors",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded"
//         },
//         body: formDataEncoded
//       });

//       handleClose();
//       handleCertificateModal();
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Submission failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const modalStyle = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: "80%",
//     maxWidth: "800px",
//     maxHeight: "90vh",
//     bgcolor: "background.paper",
//     outline: "none",
//     borderRadius: "8px",
//     boxShadow: 24,
//     p: 4,
//     overflowY: "auto",
//   };

//   const renderQuestionInput = (question) => {
//     switch (question.type) {
//       case "likert":
//         return (
//           <Box sx={{ width: "100%", px: 2 }}>
//             <Slider
//               name={question.id}
//               value={Number(formData[question.id]) || 0}
//               onChange={(e, newValue) => {
//                 setFormData((prev) => ({
//                   ...prev,
//                   [question.id]: String(newValue),
//                 }));
//               }}
//               step={1}
//               marks={question.options.map((option) => ({
//                 value: Number(option.value),
//                 label: option.label,
//               }))}
//               min={1}
//               max={4}
//               valueLabelDisplay="auto"
//             />
//           </Box>
//         );
//       case "radio":
//         return (
//           <RadioGroup
//             name={question.id}
//             value={formData[question.id] || ""}
//             onChange={handleChange}
//             row
//           >
//             {question.options.map((option) => (
//               <FormControlLabel
//                 key={option.value}
//                 value={option.value}
//                 control={<Radio />}
//                 label={option.label}
//               />
//             ))}
//           </RadioGroup>
//         );
//       case "checkbox":
//         return (
//           <Box>
//             {question.options.map((option) => (
//               <FormControlLabel
//                 key={option.value}
//                 control={
//                   <Checkbox
//                     checked={(formData[question.id] || []).includes(option.value)}
//                     onChange={() => handleCheckboxChange(question.id, option.value)}
//                   />
//                 }
//                 label={option.label}
//               />
//             ))}
//           </Box>
//         );
//       case "select":
//         return (
//           <FormControl fullWidth variant="outlined">
//             <Select
//               name={question.id}
//               value={formData[question.id] || ""}
//               onChange={handleChange}
//               required={question.required}
//             >
//               <MenuItem value="">
//                 <em>Select an option</em>
//               </MenuItem>
//               {question.options.map((option) => (
//                 <MenuItem key={option.value} value={option.value}>
//                   {option.label}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         );
//       case "text":
//         return (
//           <TextField
//             name="entry.939299122"
//             value={formData["entry.939299122"]}
//             onChange={handleChange}
//             fullWidth
//           />
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <Modal open={open} onClose={handleClose}>
//       <Box sx={modalStyle}>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: 4,
//           }}
//         >
//           <Typography variant="h5">MCDigital 2.0 Course Feedback</Typography>
//           <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
//         </Box>

//         <form onSubmit={handleSubmit}>
//           {questions.map((question, index) => (
//             <FormControl
//               key={question.id}
//               component="fieldset"
//               sx={{ mb: 4, width: "100%" }}
//               required={question.required}
//             >
//               <FormLabel component="legend">
//                 <Typography variant="h6">
//                   {index + 1}. {question.question}
//                 </Typography>
//                 <Typography variant="body2" color="textSecondary">
//                   {question.hindi}
//                 </Typography>
//               </FormLabel>
//               {renderQuestionInput(question)}
//             </FormControl>
//           ))}

//           <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               disabled={loading}
//               size="large"
//             >
//               {loading ? (
//                 <CircularProgress size={24} color="inherit" />
//               ) : (
//                 "Submit Feedback & Get Certificate"
//               )}
//             </Button>
//           </Box>
//         </form>
//       </Box>
//     </Modal>
//   );
// };

// export default FeedbackModal;


// import React, { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   TextField,
//   Button,
//   IconButton,
//   Typography,
//   RadioGroup,
//   Radio,
//   FormControlLabel,
//   FormLabel,
//   FormGroup,
//   Checkbox,
//   Slider,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";

// const FeedbackModal = ({ open, onClose, user, onSuccess }) => {
//   const [errors, setErrors] = useState({});

//   const [formData, setFormData] = useState({
//     id: "",
//     name: "",
//     email: "",
//     easeNavigation: "",
//     videoUnderstanding: "",
//     videoDuration: "",
//     timeToComplete: "",
//     learnedTopics: {
//       scratch: false,
//       word: false,
//       excel: false,
//       ai: false,
//       none: false,
//     },
//     mostTimeSpent: "",
//     recommendCourse: "",
//     facedChallenges: "",
//     suggestions: "",
//   });

//   useEffect(() => {
//     if (user) {
//       setFormData((prev) => ({
//         ...prev,
//         id: user.id || "",
//         name: user.name || "",
//         email: user.email || "",
//       }));
//     }
//   }, [user]);

//   // for validation

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.easeNavigation) newErrors.easeNavigation = true;
//     if (!formData.videoUnderstanding) newErrors.videoUnderstanding = true;
//     if (!formData.videoDuration) newErrors.videoDuration = true;
//     if (!formData.timeToComplete) newErrors.timeToComplete = true;
//     if (
//       !formData.learnedTopics.scratch &&
//       !formData.learnedTopics.word &&
//       !formData.learnedTopics.excel &&
//       !formData.learnedTopics.ai &&
//       !formData.learnedTopics.none
//     )
//       newErrors.learnedTopics = true;

//     if (!formData.mostTimeSpent) newErrors.mostTimeSpent = true;
//     if (!formData.recommendCourse) newErrors.recommendCourse = true;

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleRadioChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleCheckboxChange = (e) => {
//     setFormData({
//       ...formData,
//       learnedTopics: {
//         ...formData.learnedTopics,
//         [e.target.name]: e.target.checked,
//       },
//     });
//   };

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     const formPayload = new FormData();

//     const likertScale = {
//       1: "Very difficult",
//       2: "Difficult",
//       3: "Easy",
//       4: "Very easy",
//     };

//     const understandingScale = {
//       1: "Absolutely No",
//       2: "No",
//       3: "Yes",
//       4: "Absolutely Yes",
//     };

//     formPayload.append("entry.1625588101", formData.id);
//     formPayload.append("entry.780533742", formData.name);
//     formPayload.append("entry.1605918256", formData.email);

//     formPayload.append(
//       "entry.1624746621",
//       likertScale[formData.easeNavigation]
//     );
//     formPayload.append(
//       "entry.1694874747",
//       understandingScale[formData.videoUnderstanding]
//     );
//     formPayload.append(
//       "entry.369360666",
//       understandingScale[formData.videoDuration]
//     );
//     formPayload.append("entry.1953866777", formData.timeToComplete);

//     if (formData.learnedTopics?.scratch)
//       formPayload.append("entry.801016796", "Yes, Scratch Jr.");
//     if (formData.learnedTopics?.word)
//       formPayload.append("entry.801016796", "Yes, MS WORD");
//     if (formData.learnedTopics?.excel)
//       formPayload.append("entry.801016796", "Yes, MS EXCEL");
//     if (formData.learnedTopics?.ai)
//       formPayload.append("entry.801016796", "Yes, AI");
//     if (formData.learnedTopics?.none)
//       formPayload.append("entry.801016796", "No, nothing was new for me");

//     formPayload.append("entry.398186557", formData.mostTimeSpent);
//     formPayload.append(
//       "entry.1311574657",
//       understandingScale[formData.recommendCourse]
//     );
//     formPayload.append("entry.1481877636", formData.facedChallenges);
//     formPayload.append("entry.1941183160", formData.suggestions);

//     for (let pair of formPayload.entries()) {
//       console.log(pair[0] + ": " + pair[1]);
//     }

//     const scriptURL =
//       "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfexy-v_4WdhMDYmfVrrFFN2QTVH3OsqeZTMnW8eFrfA-MhtQ/formResponse";

//     await fetch(scriptURL, {
//       method: "POST",
//       mode: "no-cors",
//       body: formPayload,
//     });

//     // Reset the form
//     setFormData({
//       id: user.id || "",
//       name: user.name || "",
//       email: user.email || "",
//       easeNavigation: "",
//       videoUnderstanding: "",
//       videoDuration: "",
//       timeToComplete: "",
//       learnedTopics: {
//         scratch: false,
//         word: false,
//         excel: false,
//         ai: false,
//         none: false,
//       },
//       mostTimeSpent: "",
//       recommendCourse: "",
//       facedChallenges: "",
//       suggestions: "",
//     });

//     onClose();
//     if (onSuccess) onSuccess();
//   };

//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
//       <DialogTitle>
//         <Typography variant="h6">Course Feedback</Typography>
//         <IconButton
//           onClick={onClose}
//           sx={{ position: "absolute", right: 8, top: 8 }}
//         >
//           <CloseIcon />
//         </IconButton>
//       </DialogTitle>
//       <DialogContent dividers>
//         <form onSubmit={handleSubmit}>
//           {/* Q1 */}
//           <FormLabel>
//             On a scale of 1-4 how easy was it to navigate across MCDigital 2.0
//             course platform? <br />
//             1-4 के पैमाने पर MCDigital 2.0 कोर्स प्लेटफॉर्म पर navigate करना
//             कितना आसान था?
//             <span style={{ color: "red", mb: 4 }}>*</span>
//           </FormLabel>
//           <Slider
//             name="easeNavigation"
//             value={Number(formData.easeNavigation) || 0}
//             onChange={(e, newValue) =>
//               setFormData({ ...formData, easeNavigation: newValue })
//             }
//             step={1}
//             marks={[
//               { value: 1, label: "Very difficult / बहुत कठिन" },
//               { value: 2, label: "Difficult / कठिन" },
//               { value: 3, label: "Easy / सरल" },
//               { value: 4, label: "Very easy / बहुत सरल" },
//             ]}
//             min={1}
//             max={4}
//             sx={{
//               // width:'100%',
//               // maxWidth:700,
//               "& .MuiSlider-markLabel": {
//                 fontSize: "0.75rem",
//                 whiteSpace: "nowrap",
//                 marginLeft: "-13px",
//                 marginRight: "-13px",
//               },
//               "& .MuiSlider-mark": {
//                 width: "10px",
//                 height: "10px",
//               },
//               padding: "8px 0",
//               marginBottom: "10px",
//             }}
//           />
//           {errors.easeNavigation && (
//             <Typography
//               variant="caption"
//               sx={{ color: "red", mb: 2, display: "block" }}
//             >
//               This field is required.
//             </Typography>
//           )}

//           {/* Q2 */}
//           <FormLabel>
//             Were the course videos easy to understand? <br />
//             क्या course के videos समझने में सरल थे?
//             <span style={{ color: "red", mb: 4 }}>*</span>
//           </FormLabel>
//           <Slider
//             name="videoUnderstanding"
//             value={Number(formData.videoUnderstanding) || 0}
//             onChange={(e, newValue) =>
//               setFormData({ ...formData, videoUnderstanding: newValue })
//             }
//             step={1}
//             marks={[
//               { value: 1, label: "Absolutely No / बिलकुल नहीं" },
//               { value: 2, label: "No / नहीं" },
//               { value: 3, label: "Yes / हाँ" },
//               { value: 4, label: "Absolutely Yes / हाँ, बिलकुल" },
//             ]}
//             min={1}
//             max={4}
//             sx={{
//               "& .MuiSlider-markLabel": {
//                 fontSize: "0.75rem",
//                 whiteSpace: "nowrap",
//                 marginLeft: "-13px",
//                 marginRight: "-13px",
//               },
//               "& .MuiSlider-mark": {
//                 width: "10px",
//                 height: "10px",
//               },
//               padding: "8px 0",
//               marginBottom: "10px",
//             }}
//           />
//           {errors.videoUnderstanding && (
//             <Typography
//               variant="caption"
//               sx={{ color: "red", mb: 2, display: "block" }}
//             >
//               This field is required.
//             </Typography>
//           )}

//           {/* Q3 */}
//           <FormLabel>
//             Were the course videos of appropriate duration? <br />
//             क्या course के videos उचित अवधि के थे?
//             <span style={{ color: "red", mb: 4 }}>*</span>
//           </FormLabel>
//           <Slider
//             name="videoDuration"
//             value={Number(formData.videoDuration) || 0}
//             onChange={(e, newValue) =>
//               setFormData({ ...formData, videoDuration: newValue })
//             }
//             step={1}
//             marks={[
//               { value: 1, label: "Absolutely No / बिलकुल नहीं" },
//               { value: 2, label: "No / नहीं" },
//               { value: 3, label: "Yes / हाँ" },
//               { value: 4, label: "Absolutely Yes / हाँ, बिलकुल" },
//             ]}
//             min={1}
//             max={4}
//             sx={{
//               "& .MuiSlider-markLabel": {
//                 fontSize: "0.75rem",
//                 whiteSpace: "nowrap",
//                 marginLeft: "-13px",
//                 marginRight: "-13px",
//               },
//               "& .MuiSlider-mark": {
//                 width: "10px",
//                 height: "10px",
//               },
//               padding: "8px 0",
//               marginBottom: "10px",
//             }}
//           />
//           {errors.videoDuration && (
//             <Typography
//               variant="caption"
//               sx={{ color: "red", mb: 2, display: "block" }}
//             >
//               This field is required.
//             </Typography>
//           )}

//           {/* Q4 */}
//           <FormLabel>
//             On average, how much time did it take to complete the course? <br />
//             आपको लगभग कितना समय लगा ये course पूरा करने में?
//             <span style={{ color: "red", mb: 2 }}>*</span>
//           </FormLabel>
//           <RadioGroup
//             name="timeToComplete"
//             value={formData.timeToComplete}
//             onChange={handleRadioChange}
//             sx={{ gap: 0 }}
//           >
//             <FormControlLabel
//               value="1 hour"
//               control={<Radio />}
//               label="1 hour / 1 घंटा"
//             />
//             <FormControlLabel
//               value="Less than 1 hour"
//               control={<Radio />}
//               label="Less than 1 hour / 1 घंटे से कम"
//             />
//             <FormControlLabel
//               value="2-6 hours"
//               control={<Radio />}
//               label="2-6 hours / 2-6 घंटे"
//             />
//             <FormControlLabel
//               value="More than 6 hours"
//               control={<Radio />}
//               label="More than 6 hours / 6 घंटे से अधिक"
//             />
//           </RadioGroup>
//           {errors.timeToComplete && (
//             <Typography
//               variant="caption"
//               sx={{ color: "red", mb: 1, display: "block" }}
//             >
//               This field is required.
//             </Typography>
//           )}

//           {/* Q5 */}
//           <FormLabel>
//             What new things did you learn? <br />
//             इस course के साथ आपका अनुभव कैसा रहा? क्या आपने कुछ नया सीखा?
//             <span style={{ color: "red", mb: 2 }}>*</span>
//           </FormLabel>
//           <FormGroup>
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   name="scratch"
//                   checked={formData.learnedTopics.scratch}
//                   onChange={handleCheckboxChange}
//                 />
//               }
//               label="Yes, Scratch Jr."
//             />
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   name="word"
//                   checked={formData.learnedTopics.word}
//                   onChange={handleCheckboxChange}
//                 />
//               }
//               label="Yes, MS WORD"
//             />
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   name="excel"
//                   checked={formData.learnedTopics.excel}
//                   onChange={handleCheckboxChange}
//                 />
//               }
//               label="Yes, MS EXCEL"
//             />
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   name="ai"
//                   checked={formData.learnedTopics.ai}
//                   onChange={handleCheckboxChange}
//                 />
//               }
//               label="Yes, AI"
//             />
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   name="none"
//                   checked={formData.learnedTopics.none}
//                   onChange={handleCheckboxChange}
//                 />
//               }
//               label="No, nothing was new for me / नहीं, मेरे लिए कुछ भी नया नहीं था"
//             />
//           </FormGroup>
//           {errors.learnedTopics && (
//             <Typography
//               variant="caption"
//               sx={{ color: "red", mb: 1, display: "block" }}
//             >
//               Please select at least one option.
//             </Typography>
//           )}

//           {/* Q6 */}
//           <FormLabel>
//             In which course did you spend the most time? <br />
//             कौनसे course में आपको सबसे अधिक समय लगा?
//             <span style={{ color: "red", mb: 2 }}>*</span>
//           </FormLabel>
//           <RadioGroup
//             name="mostTimeSpent"
//             value={formData.mostTimeSpent}
//             onChange={handleRadioChange}
//             sx={{ gap: 0 }}
//           >
//             <FormControlLabel
//               value="Scratch Jr."
//               control={<Radio />}
//               label="Scratch Jr."
//             />
//            <FormControlLabel
//               value="MS WORD"
//               control={<Radio />}
//               label="MS WORD"
//             />
//             <FormControlLabel
//               value="MS EXCEL"
//               control={<Radio />}
//               label="MS EXCEL"
//             />
//             <FormControlLabel value="AI" control={<Radio />} label="AI" />
//           </RadioGroup>
//           {errors.mostTimeSpent && (
//             <Typography
//               variant="caption"
//               sx={{ color: "red", mb: 1, display: "block" }}
//             >
//               This field is required.
//             </Typography>
//           )}
//           {/* Q7 */}
//           <FormLabel>
//             Would you recommend this course to a friend? <br />
//             क्या आप अपने साथियों को यह course recommend करेंगे?
//             <span style={{ color: "red", mb: 2 }}>*</span>
//           </FormLabel>
//           <Slider
//             name="recommendCourse"
//             value={Number(formData.recommendCourse) || 0}
//             onChange={(e, newValue) =>
//               setFormData({ ...formData, recommendCourse: newValue })
//             }
//             step={1}
//             marks={[
//               { value: 1, label: "Absolutely No / बिलकुल नहीं" },
//               { value: 2, label: "No / नहीं" },
//               { value: 3, label: "Yes / हाँ" },
//               { value: 4, label: "Absolutely Yes / हाँ, बिलकुल" },
//             ]}
//             min={1}
//             max={4}
//             sx={{
//               "& .MuiSlider-markLabel": {
//                 fontSize: "0.75rem",
//                 whiteSpace: "nowrap",
//                 marginLeft: "-13px",
//                 marginRight: "-13px",
//               },
//               "& .MuiSlider-mark": {
//                 width: "10px",
//                 height: "10px",
//               },
//               padding: "8px 0",
//               marginBottom: "10px",
//             }}
//           />
//           {errors.recommendCourse && (
//             <Typography
//               variant="caption"
//               sx={{ color: "red", mb: 2, display: "block" }}
//             >
//               This field is required.
//             </Typography>
//           )}
//           {/* Input Query */}
//           <FormLabel component="legend" sx={{ mt: 2 }}>
//             If you faced any challenges, please share them here:
//           </FormLabel>
//           <TextField
//             fullWidth
//             variant="outlined"
//             placeholder="Your challenges..."
//             name="facedChallenges"
//             value={formData.facedChallenges}
//             onChange={handleInputChange}
//             margin="normal"
//             multiline
//             rows={2}
//           />
//           <FormLabel component="legend" sx={{ mt: 2 }}>
//             Please share any suggestions for this course:
//           </FormLabel>
//           <TextField
//             fullWidth
//             variant="outlined"
//             placeholder="Your suggestions..."
//             name="suggestions"
//             value={formData.suggestions}
//             onChange={handleInputChange}
//             margin="normal"
//             multiline
//             rows={2}
//           />
//           <Button
//             type="submit"
//             variant="contained"
//             sx={{ mt: 2, backgroundColor: "#4CAF50" }}
//           >
//             Submit Feedback
//           </Button>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };
// export default FeedbackModal;



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

const FeedbackModal = ({ open, onClose, user, onSuccess }) => {
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
    width: "80%",
    maxWidth: "800px",
    maxHeight: "90vh",
    bgcolor: "background.paper",
    outline: "none",
    borderRadius: "8px",
    boxShadow: 24,
    p: 4,
    overflowY: "auto",
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
          <Box sx={{ width: "100%", px: 2, mt: 2 }}>
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
        </form>
      </Box>
    </Modal>
  );
};

export default FeedbackModal;