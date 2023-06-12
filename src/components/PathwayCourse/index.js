import React, { useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import CheckIcon from "@mui/icons-material/Check";
import Snackbar from "@mui/material/Snackbar";
import useStyles from "./styles";
import { Link, useHistory } from "react-router-dom";
import { PATHS, interpolatePath } from "../../constant";
import { useParams } from "react-router-dom";
import { breakpoints } from "../../theme/constant";
import { useSelector, useDispatch } from "react-redux";
import { actions as pathwayActions } from "./redux/action";
import { actions as upcomingBatchesActions } from "./redux/action";
import { actions as upcomingClassActions } from "./redux/action";
import { actions as enrolledBatchesActions } from "./redux/action";
import ExternalLink from "../common/ExternalLink";
import LockIcon from "@mui/icons-material/Lock";
import NoBatchEnroll from "../BatchClassComponents/NoBatchEnroll";
import { CardContent } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

import { ReactComponent as CertificateIcon } from "./asset/certificate-grey.svg";
import { ReactComponent as CertificateIconColored } from "./asset/certificate-color.svg";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
// import ReactPDF from "./ReactPDF.js";
import {
  Container,
  Box,
  Grid,
  Card,
  Typography,
  CardMedia,
  Button,
  CardActions,
  Skeleton,
  LinearProgress,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import PathwayCourseBatchEnroll1 from "../BatchClassComponents/PathwayCourseBatchEnroll1";
import PathwayCourseBatchEnroll2 from "../BatchClassComponents/PathwayCourseBatchEnroll2";
import PathwayCards from "./PathwayCards/index.js";
import { useState } from "react";
import axios from "axios";
import { METHODS } from "../../services/api";
import CustomSnackbar from "./customSnackbar";
import MuiAlert from "@mui/material/Alert";
import { StarRate } from "@material-ui/icons";

import TextField from "@mui/material/TextField";
import AmazonCodingProgrammer from "./AmazonCodingProgrammer";
import { max } from "date-fns";

const pathways = [
  {
    pathway: "Python",
    code: "PRGPYT",
    yotubevideo: "https://youtu.be/DDFvJmC3J5M",
    description:
      "Learn the basics and become comfortable in one of the most popular programming languages Python.",
    outcomes: [
      "Get equipped to build small projects like calculator or to-do list",
      "Get the base knowledge to apply to advanced bootcamps such as Navgurukul or Zoho Schools",
    ],
  },
  // {
  //   pathway: "Scratch (CEL)",
  //   code: "SHCEL",
  //   description:
  //     "Learn programming concepts via easy to understand project based block programming in Scratch",
  // },
  {
    pathway: "Javascript",
    code: "JSRPIT",
    yotubevideo: "https://youtu.be/EC7UaTE9Z2Q",
    description:
      "Learn the nuances and basics of the technology that powers the web. Start with learning what is Javascript and eventually build your own website.",
    outcomes: [
      "Build your first web page and power it with the interactive language of Javascript",
      "Build your basics of HTML, CSS and Javascript to prepare for advanced web development courses",
    ],
  },
  {
    pathway: "Typing Guru",
    code: "TYPGRU",
    yotubevideo: "https://youtu.be/HQ9IYtBJO0U",

    description:
      "The typing track allows you to practice keyboard typing in a adaptive manner. You require a keyboard if on Android or use your laptop keyboard.",
    outcomes: [
      "Reach a typing speed of up to 30 to 40 words per minute",
      "Be able to type long text with minimal inaccuracies",
    ],
  },
  {
    pathway: "Spoken English & Grammar",
    code: "SPKENG",
    yotubevideo: "https://youtu.be/g05oD3i67_A",
    description:
      "English is a great tool needed to navigate the tech world and also in an International setting. Whether you are a total beginner or already know some English, prepare for the challenge with our Spoken English classes and online courses.",
    outcomes: [
      "Start speaking English without fear in about 6 months",
      "Be able to read, write, listen and speak English with fluency",
      "Be able to give oral presentations, talk to friends and prospective colleagues",
    ],
  },
  {
    pathway: "Teacher Capacity Building",
    code: "TCBPI",
    description: "Teacher Capacity Building (Digital Literacy)",
  },
];

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function saveFile(url) {
  // Get file name from url.
  var filename = url.substring(url.lastIndexOf("/") + 1).split("?")[0];
  var xhr = new XMLHttpRequest();
  xhr.responseType = "blob";
  xhr.onload = function () {
    let a = document.createElement("a");
    a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
    a.download = filename; // Set the file name.
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
  };
  xhr.open("GET", url);
  xhr.send();
}
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function PathwayCourse() {
  const user = useSelector(({ User }) => User);
  const dispatch = useDispatch();
  const { pathwayCourse } = useSelector((state) => state.Pathways);
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const classes = useStyles({ isActive });
  const params = useParams();
  const pathwayId = params.pathwayId;
  const [completedPortion, setCompletedPortion] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [isFormModalOpen, setisFormModalOpen] = useState(false);
  const [certificate, setCertificate] = useState("");
  let completedAll =
    pathwayId == 8
      ? completedPortion?.total >= 80
      : completedPortion?.total === 100;
  // let completedAll = true
  let [isFormFilled, setisFormFilled] = useState(false);

  const [open, setOpen] = React.useState(false);
  const [loader, setLoader] = useState(false);
  const displayCert = pathwayId == 1;
  // || pathwayId == 8;

  let [teacherDetails, setTeacherDetails] = useState({
    zone: "",
    school_id: "",
    school_name: "",
    teacher_name: "",
    teacher_id: "",
    class_of_teacher: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!teacherDetails.zone) {
      newErrors.zone = "Zone is required.";
    }
    if (!teacherDetails.school_id) {
      newErrors.school_id = "School ID is required.";
    } else if (teacherDetails.school_id.toString().length !== 7) {
      newErrors.school_id = "School ID must be of 7 digits only";
    }
    if (!teacherDetails.school_name) {
      newErrors.school_name = "School Name is required.";
    }
    if (!teacherDetails.teacher_name) {
      newErrors.teacher_name = "Teacher Name is required.";
    }
    if (!teacherDetails.teacher_id) {
      newErrors.teacher_id = "Teacher ID is required.";
    } else if (teacherDetails.teacher_id.toString().length !== 8) {
      newErrors.teacher_id = "Teacher ID must be of 8 digits only";
    }
    if (!teacherDetails.class_of_teacher) {
      newErrors.class_of_teacher = "Class of Teacher is required.";
    }
    if (!teacherDetails.email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(teacherDetails.email)) {
      newErrors.email = "Invalid email format.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitteacherDetails = () => {
    if (validateForm() === true) {
      setLoader(true);
      axios({
        method: METHODS.POST,
        url: `${process.env.REACT_APP_MERAKI_URL}/teacher/create`,
        headers: {
          accept: "application/json",
          Authorization: user?.data?.token,
        },
        data: teacherDetails,
      })
        .then((res) => {
          setLoader(false);
          handleFormModalClose();
          setisFormFilled(true);
          setTeacherDetails({
            zone: "",
            school_id: "",
            school_name: "",
            teacher_name: "",
            teacher_id: "",
            class_of_teacher: "",
            email: "",
          });
        })
        .catch((err) => console.log(err));
    }
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isActive ? "300px" : "544px",
    bgcolor: "background.paper",
    outline: "none",
    borderRadius: "8px",
    boxShadow: 24,
    p: 4,
  };

  const data = useSelector((state) => {
    return state;
  });

  const upcomingBatchesData = useSelector((state) => {
    return state.Pathways?.upcomingBatches?.data;
  });
  const userEnrolledClasses = useSelector((state) => {
    return state.Pathways?.upcomingEnrolledClasses?.data;
  });

  const enrolledBatches = useSelector((state) => {
    if (state?.Pathways?.enrolledBatches?.data?.length > 0) {
      return state?.Pathways?.enrolledBatches?.data;
    } else {
      return null;
    }
  });

  const handleSnackbar = () => {
    setOpenSnackbar((prev) => !prev);
  };

  const handleModal = () => {
    setLoader(true);

    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/certificate`,
      headers: {
        accept: "application/json",
        Authorization: user?.data?.token,
      },
    })
      .then((response) => {
        setLoader(false);
        setCertificate(response?.data?.url);
        if (response) {
          setOpenModal((prev) => !prev);
        }
      })
      .catch((err) => {});
  };

  const downloadCert = () => {
    saveFile(certificate);
  };

  const shareCertificate = () => {
    if (navigator.share !== undefined) {
      const title = `Check out my ${pathwayCourseData?.pathway} certificate`;
      const text = `I completed a ${pathwayCourseData?.pathway} from Meraki!`;
      const url = certificate;
      navigator
        .share({
          title,
          text,
          url,
        })
        .catch((err) => console.error(err));
    }
  };

  const loading = useSelector((state) => {
    const upcomingBatchesState = state?.Pathways?.upcomingBatches;
    const enrolledBatchesState = state?.Pathways?.enrolledBatches;
    return (
      (!upcomingBatchesState ||
        !enrolledBatchesState ||
        upcomingBatchesState.loading ||
        enrolledBatchesState.loading) &&
      !(upcomingBatchesData?.length > 0) &&
      !(enrolledBatches?.length > 0)
    );
  });

  const history = useHistory();
  useEffect(() => {
    dispatch(pathwayActions.getPathwaysCourse({ pathwayId: pathwayId }));
  }, [dispatch, pathwayId]);

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/teacher/checking`,
      headers: {
        accept: "application/json",
        Authorization: user?.data?.token,
      },
    })
      .then((response) => {
        setisFormFilled(response.data);
      })
      .catch((err) => {});
  }, [pathwayId]);

  useEffect(() => {
    // setLoading(true);
    if (user?.data?.token && pathwayId) {
      dispatch(
        enrolledBatchesActions.getEnrolledBatches({
          pathwayId: pathwayId,
          authToken: user?.data?.token,
        })
      );
      axios({
        method: METHODS.GET,
        url: `${process.env.REACT_APP_MERAKI_URL}/pathways/${pathwayId}/completePortion`,
        headers: {
          accept: "application/json",
          Authorization: user?.data?.token,
        },
      }).then((response) => {
        setCompletedPortion((prevState) => ({
          ...prevState,
          total: response?.data?.total_completed_portion,
        }));

        response.data.pathway.map((item) => {
          setCompletedPortion((prevState) => ({
            ...prevState,
            [item.course_id]: item.completed_portion,
          }));
        });
      });
    }
  }, [dispatch, pathwayId]);

  useEffect(() => {
    if (user?.data?.token && enrolledBatches?.length > 0) {
      dispatch(
        upcomingClassActions.getupcomingEnrolledClasses({
          pathwayId: pathwayId,
          authToken: user?.data?.token,
        })
      );
    } else {
      if (user?.data?.token) {
        dispatch(
          upcomingBatchesActions.getUpcomingBatches({
            pathwayId: pathwayId,
            authToken: user?.data?.token,
          })
        );
      }
    }
  }, [enrolledBatches]);

  /*For Content List Scroll Position*/
  useEffect(() => {
    if (localStorage.getItem("contentListScroll")) {
      localStorage.removeItem("contentListScroll");
    }
    if (localStorage.getItem("contentListScrollMobile")) {
      localStorage.removeItem("contentListScrollMobile");
    }
  }, []);

  data.Pathways.data &&
    data.Pathways.data.pathways.forEach((pathway) => {
      pathways.forEach((item) => {
        if (pathway.code === item.code) {
          item["id"] = pathway.id;
        }
      });
    });

  const pathwayCourseData = pathways.find((item) => {
    return item.id == pathwayId;
  });

  let SupplementalCourse;
  let filterPathwayCourse;

  if (pathwayId == 2) {
    filterPathwayCourse = pathwayCourse?.data?.courses.filter(
      (item) => item?.name === "Spoken-English"
    );

    SupplementalCourse = pathwayCourse?.data?.courses.filter(
      (item) => item?.name !== "Spoken-English"
    );
  } else {
    filterPathwayCourse = pathwayCourse?.data?.courses;
  }

  const onHandleSnackbarOpen = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleFormModal = () => {
    setisFormModalOpen(true);
  };

  const handleFormModalClose = () => {
    setisFormModalOpen(false);
  };
  const [teacherClass, setTeacherClass] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTeacherClass(
      typeof value === "string" ? value.split(",") : value
    );
  };
  useEffect(()=>{
    setTeacherDetails((prev)=>  ({
      ...prev,
      class_of_teacher: teacherClass.join(",")
    }));
  },[teacherClass])

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const classesOfTeacher = ["Class 1", "Class 2", "Class 3", "Class 4"];
  const zoneArray = ["Central", "Civil Lines", "CTSP", "Karol Bagh", "Keshavpuram", "Narela", "Rohini", "Nazafgarh", "South", "Sharda.North", "Sharda.South", "West"]


  return (
    <>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        {user.data !== null ? (
          <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
            Please share your teacher details first to start the course
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
            Please Login First and Share your Details to Unlock The course
          </Alert>
        )}
      </Snackbar>
      <Modal sx={{overflow:"scroll"}} open={isFormModalOpen} onClose={handleFormModalClose}>
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{
                marginBottom: "2rem",
              }}
            >
              Teacher Details
            </Typography>
            <CloseIcon
              sx={{ cursor: "pointer" }}
              onClick={handleFormModalClose}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              marginBottom: "1rem",
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select Zone</InputLabel>
              <Select
                label="Select Zone"
                id="demo-simple-select"
                value={teacherDetails.zone}
                onChange={(e) => {
                  setTeacherDetails((prev) => ({
                    ...prev,
                    zone: e.target.value,
                  }));
                }}
              >
                {zoneArray.map((name) => (
                  <MenuItem key={name} value={name}>
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {errors.zone && (
              <small style={{ color: "red" }}>{errors.zone}</small>
            )}
            <TextField
              id="outlined-basic"
              label="School Name"
              variant="outlined"
              value={teacherDetails.school_name}
              onChange={(e) => {
                e.persist();
                setTeacherDetails((prev) => ({
                  ...prev,
                  school_name: e.target.value,
                }));
              }}
            />
            {errors.school_name && (
              <small style={{ color: "red" }}>{errors.school_name}</small>
            )}
            <TextField
              id="outlined-basic"
              label="School Id"
              type="number"
              variant="outlined"
              value={teacherDetails.school_id}
              onChange={(e) => {
                e.persist();
                setTeacherDetails((prev) => ({
                  ...prev,
                  school_id: parseInt(e.target.value),
                }));
              }}
            />
            {errors.school_id && (
              <small style={{ color: "red" }}>{errors.school_id}</small>
            )}
            <TextField
              id="outlined-basic"
              label="Teacher Name"
              variant="outlined"
              value={teacherDetails.teacher_name}
              onChange={(e) => {
                e.persist();
                setTeacherDetails((prev) => ({
                  ...prev,
                  teacher_name: e.target.value,
                }));
              }}
            />
            {errors.teacher_name && (
              <small style={{ color: "red" }}>{errors.teacher_name}</small>
            )}
            <TextField
              id="outlined-basic"
              label="Email "
              variant="outlined"
              value={teacherDetails.email}
              onChange={(e) => {
                e.persist();
                setTeacherDetails((prev) => ({
                  ...prev,
                  email: e.target.value,
                }));
              }}
            />
            {errors.email && (
              <small style={{ color: "red" }}>{errors.email}</small>
            )}
            <TextField
              id="outlined-basic"
              label="Teacher ID"
              type="number"
              variant="outlined"
              value={teacherDetails.teacher_id}
              onChange={(e) => {
                e.persist();
                setTeacherDetails((prev) => ({
                  ...prev,
                  teacher_id: parseInt(e.target.value),
                }));
              }}
            />
            {errors.teacher_id && (
              <small style={{ color: "red" }}>{errors.teacher_id}</small>
            )}
            <FormControl sx={{ width:max }}>
              <InputLabel id="demo-multiple-checkbox-label">
                Select Class
              </InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={teacherClass}
                onChange={handleChange}
                input={<OutlinedInput label="Select Class" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {classesOfTeacher.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={teacherClass.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {errors.class_of_teacher && (
              <small style={{ color: "red" }}>{errors.class_of_teacher}</small>
            )}
          </Box>
          <Button
            variant="contained"
            sx={{
              marginLeft: "60%",
            }}
            onClick={handleSubmitteacherDetails}
          >
            Share Details
          </Button>
        </Box>
      </Modal>
      {pathwayId === "7" ? (
        <AmazonCodingProgrammer pathwayId={pathwayId} />
      ) : (
        <>
          {enrolledBatches && !loading ? (
            <>
              <Typography
                align="center"
                className={classes.classTitle}
                variant="subtitle1"
                bgcolor="#E9F5E9"
              >
                {enrolledBatches[0]?.title}
              </Typography>
            </>
          ) : (
            ""
          )}

          <Container
            // className={classes.pathwayContainer}
            mt={isActive ? 0 : 55}
            mb={isActive ? 32 : 48}
            maxWidth="lg"
          >
            <Modal
              open={openModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              onClose={handleModal}
            >
              <Box sx={modalStyle}>
                <Typography
                  sx={{ fontSize: "32px", fontWeight: "600" }}
                >{`${pathwayCourseData?.pathway}  Certificate`}</Typography>
                <div className={classes.pdfWrapper}>
                  <iframe
                    allowtransparency="true"
                    border="0"
                    className={classes.pdfFrame}
                    src={`${certificate}#toolbar=0`}
                  ></iframe>
                  {/* <ReactPDF/> */}
                </div>
                <Typography>{`Meraki certifies that you have diligently attended all classes and taken the practice questions. You have a good grasp of ${pathwayCourseData?.pathway} fundamentals.`}</Typography>
                <Box className={classes.certButtons}>
                  {/* <Button onClick={shareCertificate}>Share to Friends</Button> */}
                  <Button
                    onClick={downloadCert}
                    className={classes.greenButton}
                  >
                    Get Certificate
                  </Button>
                </Box>
              </Box>
            </Modal>
            {enrolledBatches ? (
              <>
                <PathwayCards
                  userEnrolledClasses={userEnrolledClasses}
                  data={data}
                />
              </>
            ) : (
              pathwayId &&
              pathwayCourseData && (
                <>
                  <Grid
                    container
                    spacing={2}
                    align="center"
                    className={classes.box}
                  >
                    <Grid item xs={12} md={6} sx={{ pl: 2 }}>
                      <Card
                        align="left"
                        elevation={0}
                        className={classes.titleCard}
                        mb={isActive ? 16 : 30}
                      >
                        {/* {pathwayCourseData.code !== "SHCEL" && (
                          <Typography
                            variant="body2"
                            className={classes.cardSubtitle}
                            sx={{ textAlign: isActive && "center", pb: "8px" }}
                          >
                            Learning Track
                          </Typography>
                        )} */}
                        <Typography
                          variant="h4"
                          className={classes.heading}
                          sx={{ textAlign: isActive && "center", pb: "16px" }}
                        >
                          {pathwayCourseData.pathway}
                        </Typography>
                        <Typography variant="body1">
                          {pathwayCourseData.description}
                        </Typography>

                        {pathwayCourseData.yotubevideo && (
                          <ExternalLink
                            style={{
                              textDecoration: "none",
                            }}
                            href={pathwayCourseData.yotubevideo}
                          >
                            <Typography
                              style={{ display: "flex" }}
                              mt={2}
                              variant="body2"
                            >
                              <img
                                src={require("./asset/ComputerScreen.svg")}
                                alt="MonitorScreen Img"
                              />
                              <section
                                className={classes.link}
                                // onClick={handleVideo}
                                style={{
                                  cursor: "pointer",
                                }}
                              >
                                {"  "} &nbsp; &nbsp;
                                <b>What's it all about?</b>
                              </section>
                            </Typography>
                          </ExternalLink>
                        )}

                        {!user?.data?.token &&
                          (pathwayCourseData.code == "PRGPYT" ||
                            pathwayCourseData.code == "SPKENG") && (
                            <>
                              <Typography
                                variant="body1"
                                mt={2}
                                style={{
                                  fontWeight: "bold",
                                }}
                              >
                                Want to learn through live classes by a teacher?
                              </Typography>
                              <Button
                                variant="contained"
                                mt={4}
                                sx={{
                                  margin: "10px 0",
                                  padding: isActive ? "0px 130px" : "0px 60px",
                                }}
                                onClick={() => {
                                  history.push(PATHS.LOGIN);
                                }}
                              >
                                Login
                              </Button>
                            </>
                          )}
                      </Card>
                    </Grid>

                    <Grid item xs={12} md={6} sx={{ pl: 2 }}>
                      {user?.data?.token &&
                      (pathwayCourseData.code == "PRGPYT" ||
                        pathwayCourseData.code == "SPKENG") ? (
                        loading ? (
                          <Card sx={{ p: 4 }}>
                            <Typography variant="subtitle1">
                              <Skeleton />
                            </Typography>
                            <Typography variant="subtitle2">
                              <Skeleton />
                            </Typography>
                            <Typography variant="body1">
                              <Skeleton />
                            </Typography>
                            <Typography variant="body1">
                              <Skeleton />
                            </Typography>
                            <Typography variant="body1">
                              <Skeleton />
                            </Typography>
                            <Typography variant="body1">
                              <Skeleton />
                            </Typography>
                          </Card>
                        ) : upcomingBatchesData?.length > 0 ? (
                          <PathwayCourseBatchEnroll1
                            upcomingBatchesData={upcomingBatchesData}
                          />
                        ) : (
                          <NoBatchEnroll />
                        )
                      ) : (
                        <></>
                      )}
                    </Grid>
                  </Grid>

                  {pathwayCourseData?.outcomes && (
                    <Box className={classes.Box1}>
                      <Typography
                        variant="h6"
                        sx={{ mt: 8, ml: 2, textAlign: isActive && "center" }}
                      >
                        Learning Outcomes
                      </Typography>
                      <Grid container spacing={0} align="center">
                        {pathwayCourseData.outcomes.map((item, index) => (
                          <Grid item key={index} xs={12} md={4}>
                            <Card
                              sx={{ margin: "10px" }}
                              align="left"
                              elevation={0}
                            >
                              <Box className={classes.flex}>
                                <CheckIcon color="primary" />
                                <Typography sx={{ ml: 1 }} variant="body1">
                                  {item}
                                </Typography>
                              </Box>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  )}
                </>
              )
            )}

            <Box className={classes.box}>
              <Typography
                className={classes.course}
                ml={2}
                mt={pathwayCourseData?.code == "SHCEL" && 8}
                variant="h6"
                sx={{ textAlign: isActive && "center" }}
              >
                Courses
              </Typography>
              {!isFormFilled && pathwayId == 8 && user.data !== null ? (
                <Box mt={2} p={"16px"} maxWidth={900} align="center" mb={5}>
                  <Card
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingRight: "10px",
                      "@media (max-width: 980px)": {
                        flexDirection: "column",
                        paddingBottom: "14px",
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        display: "flex",
                        gap: "15px",
                        flexDirection: "column",
                      }}
                    >
                      <Typography variant="h6">
                        Please take out few minutes and share your teacher
                        details
                      </Typography>
                      <Typography variant="body2">
                        The details will be used for partner report purposes
                        only
                      </Typography>
                    </CardContent>
                    <Button variant="contained" onClick={handleFormModal}>
                      Fill Your Details
                    </Button>
                  </Card>
                </Box>
              ) : null}

              <Grid container spacing={3} align="center">
                {!isFormFilled && pathwayId == 8
                  ? filterPathwayCourse?.map((item, index) => (
                      <Grid
                        item
                        key={index}
                        xs={12}
                        md={3}
                        className={classes.courseCard}
                      >
                        <Card
                          className={classes.pathwayCard}
                          elevation={0}
                          sx={{
                            ml: 3,
                            p: "16px",
                            mb: isActive ? "0px" : "16px",
                          }}
                          onClick={onHandleSnackbarOpen}
                        >
                          <img
                            className={classes.courseImage}
                            src={item.logo}
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
                            <LockIcon />
                            <Typography
                              align={isActive ? "center" : "left"}
                              variant="body1"
                            >
                              {item.name}
                            </Typography>
                          </CardContent>
                          <CardActions
                            sx={{ height: "8px", padding: "8px 8px 8px 0px" }}
                          >
                            <LinearProgress
                              className={classes.progressBar}
                              variant="determinate"
                              value={parseInt(completedPortion[item.id]) || 0}
                            />
                          </CardActions>
                        </Card>
                      </Grid>
                    ))
                  : filterPathwayCourse?.map((item, index) => (
                      <Grid
                        item
                        key={index}
                        xs={12}
                        md={3}
                        className={classes.courseCard}
                      >
                        <Link
                          className={classes.pathwayLink}
                          to={interpolatePath(PATHS.PATHWAY_COURSE_CONTENT, {
                            courseId: item.id,
                            exerciseId: 0,
                            pathwayId: pathwayId,
                          })}
                        >
                          <Card
                            className={classes.pathwayCard}
                            elevation={0}
                            sx={{
                              ml: 3,
                              p: "16px",
                              mb: isActive ? "0px" : "16px",
                            }}
                          >
                            <img
                              className={classes.courseImage}
                              src={item.logo}
                              alt="course"
                            />
                            <CardContent
                              sx={{
                                height: isActive ? "60px" : "70px",
                                p: isActive ? "0px" : "0px 8px 0px 0px",
                              }}
                            >
                              <div className={classes.courseTitleNumber}>
                                <Typography
                                  align={isActive ? "center" : "left"}
                                  variant="body2"
                                  className={classes.courseName}
                                  sx={{
                                    mr: "10px",
                                    padding: isActive
                                      ? "5px"
                                      : "5px 0 5px 13px",
                                    verticalAlign: "top",
                                  }}
                                >
                                  {index + 1}
                                </Typography>
                                <Typography
                                  align={isActive ? "center" : "left"}
                                  variant="body1"
                                >
                                  {item.name}
                                </Typography>
                              </div>
                            </CardContent>
                            <CardActions
                              sx={{ height: "8px", padding: "8px 8px 8px 0px" }}
                            >
                              <LinearProgress
                                className={classes.progressBar}
                                variant="determinate"
                                value={parseInt(completedPortion[item.id]) || 0}
                              />
                            </CardActions>
                          </Card>
                        </Link>
                      </Grid>
                    ))}
              </Grid>

              {displayCert ? (
                <Grid item sx={{ mb: 15 }} align="center">
                  <Grid item sx={{ mb: 3 }}>
                    <img src={require("./asset/separator.svg")} alt="icon" />
                  </Grid>
                  <Grid item sx={{ cursor: "pointer" }}>
                    {completedAll ? (
                      loader ? (
                        <CircularProgress color="primary" />
                      ) : (
                        <CertificateIconColored
                          onClick={handleModal}
                          className={classes.certificateIcon}
                        />
                      )
                    ) : (
                      <CertificateIcon
                        onClick={handleSnackbar}
                        className={classes.certificateIcon}
                      />
                    )}
                    <Typography sx={{ mt: 2 }} variant="body1" mb={2}>
                      {pathwayCourseData?.pathway} Certificate
                    </Typography>
                  </Grid>
                  <CustomSnackbar
                    openSnackbar={openSnackbar}
                    pathwayName={pathwayCourseData?.pathway}
                    handleSnackbar={handleSnackbar}
                  />
                </Grid>
              ) : null}
            </Box>

            {SupplementalCourse && (
              <Box sx={{}}>
                <Typography variant="h6">
                  Supplemental English Courses
                </Typography>
                <Grid sx={{ mt: 4 }} container spacing={3} align="center">
                  {SupplementalCourse?.map((item, index) => (
                    <Grid
                      item
                      key={index}
                      xs={12}
                      md={3}
                      className={classes.courseCard}
                    >
                      <Link
                        className={classes.pathwayLink}
                        to={interpolatePath(PATHS.PATHWAY_COURSE_CONTENT, {
                          courseId: item.id,
                          exerciseId: 0,
                          pathwayId: pathwayId,
                        })}
                      >
                        <Card
                          className={classes.SupplementalCard}
                          elevation={2}
                          sx={{
                            ml: 3,
                            p: "16px",
                            mb: isActive ? "12px" : "16px",
                          }}
                        >
                          <CardContent
                            sx={{
                              height: isActive ? "60px" : "70px",
                              p: isActive ? "0px" : "0px 8px 0px 0px",
                              mt: 3,
                            }}
                          >
                            <Typography align="center" variant="body1">
                              {item.name}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Link>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Container>
        </>
      )}
    </>
  );
}
export default PathwayCourse;
