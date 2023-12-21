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
import { ReactComponent as CertificateIcon } from "./asset/certificate-grey.svg";
import { ReactComponent as CertificateIconColored } from "./asset/certificate-color.svg";
import Modal from "@mui/material/Modal";
import CustomModal from "./CustomModal";
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
import { max } from "date-fns";
import AmazonCodingProgrammer from "./AmazonCodingProgrammer";
import DOMPurify from "dompurify";
import get from "lodash/get";

function UnsafeHTML(props) {
  const { html, Container, ...otherProps } = props;
  const sanitizedHTML = DOMPurify.sanitize(html);
  return (
    <Container
      {...otherProps}
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
    />
  );
}

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
  let completedAll = completedPortion?.total === 100;
  let [isFormFilled, setisFormFilled] = useState(false);

  const [open, setOpen] = React.useState(false);
  const [loader, setLoader] = useState(false);
  const [displayCert, setDisplayCert] = useState(false);
  const [pathwayCode, setPathwayCode] = useState(false);
  const [certificateCode, setCertificateCode] = useState("");

  const handleCloseModal = () => {
    setOpenModal(false);
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
      url: `${process.env.REACT_APP_MERAKI_URL}/certificate?pathway_code=${certificateCode}`,
      headers: {
        accept: "application/json",
        Authorization:
          user?.data?.token || localStorage.getItem("studentAuthToken"),
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

  // const shareCertificate = () => {
  //   if (navigator.share !== undefined) {
  //     const title = `Check out my ${pathwayCourseData?.pathway} certificate`;
  //     const text = `I completed a ${pathwayCourseData?.pathway} from Meraki!`;
  //     const url = certificate;
  //     navigator
  //       .share({
  //         title,
  //         text,
  //         url,
  //       })
  //       .catch((err) => console.error(err));
  //   }
  // };

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

  ///////////////////////complete portion data////////////////////

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/teacher/checking`,
      headers: {
        accept: "application/json",
        Authorization:
          user?.data?.token || localStorage.getItem("studentAuthToken"),
      },
    })
      .then((response) => {
        setisFormFilled(response.data);
      })
      .catch((err) => {});
    //  }, [pathwayId, pathwayCourse]);
  }, []);

  useEffect(() => {
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
          Authorization:
            user?.data?.token || localStorage.getItem("studentAuthToken"),
        },
      })
        .then((response) => {
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
        })
        .catch((err) => {});
    }
  }, [dispatch, pathwayId]);

  //////////////////// upcoming classes data   ///////////////////
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
  }, [enrolledBatches, pathwayId]);

  /*For Content List Scroll Position*/
  useEffect(() => {
    try {
      if (localStorage.getItem("contentListScroll")) {
        localStorage.removeItem("contentListScroll");
      }
    } catch (error) {
      //console.error('Error accessing localStorage:', error);
      return {};
    }
    try {
      if (localStorage.getItem("contentListScrollMobile")) {
        localStorage.removeItem("contentListScrollMobile");
      }
    } catch (error) {
      //console.error('Error accessing localStorage:', error);
      return {};
    }
  }, []);

  const pathwayCourseData = data.Pathways.data?.pathways.find((item) => {
    return item.id == pathwayId;
  });

  useEffect(() => {
    if (pathwayCourse?.data && pathwayCourse?.data.code == "TCBPI") {
      setPathwayCode(true);
    } else {
      setPathwayCode(false);
    }
    if (pathwayCourse?.data) {
      setCertificateCode(pathwayCourse?.data?.code);
      pathwayCourse?.data.code === "PRGPYT" ||
      pathwayCourse?.data.code === "TCBPI" ||
      pathwayCourse?.data.code === "SCRTHB"
        ? setDisplayCert(true)
        : setDisplayCert(false);
    }
  }, [pathwayCourse?.data]);

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

  return (
    <>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        {user.data !== null ? (
          <Alert
            onClose={handleClose}
            severity="info"
            sx={{ width: "100%" }}
            className={classes.alertBox}
          >
            Please share your teacher details first to start the course
          </Alert>
        ) : (
          <Alert
            onClose={handleClose}
            severity="info"
            sx={{ width: "100%" }}
            className={classes.alertBox}
          >
            Please Login First and Share your Details to Unlock The course
          </Alert>
        )}
      </Snackbar>
      <CustomModal
        isFormModalOpen={isFormModalOpen}
        setisFormFilled={setisFormFilled}
        setisFormModalOpen={setisFormModalOpen}
        user={user}
      />
      {pathwayCourse?.data?.type === "withoutCourse" ? (
        <AmazonCodingProgrammer
          pathwayId={pathwayId}
          pathwayCourseData={pathwayCourse?.data}
        />
      ) : (
        <>
          {/* ............enroll class heading............... */}
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
          {/*............... certificate modal.............. */}

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
              onClose={handleCloseModal}
            >
              <Box sx={modalStyle}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "32px",
                      fontWeight: "600",
                    }}
                  >{`${pathwayCourse?.data?.name}  Certificate`}</Typography>
                  <CloseIcon
                    sx={{ cursor: "pointer" }}
                    onClick={handleCloseModal}
                  />
                </Box>
                <div className={classes.pdfWrapper}>
                  <iframe
                    allowtransparency="true"
                    border="0"
                    className={classes.pdfFrame}
                    src={`${certificate}#toolbar=0`}
                  ></iframe>
                  {/* <ReactPDF/> */}
                </div>
                <Typography>{`Meraki certifies that you have diligently attended all classes and taken the practice questions. You have a good grasp of ${pathwayCourse?.data?.name} fundamentals.`}</Typography>
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

            {/* ................UserEnroll classs................. */}

            {enrolledBatches ? (
              <>
                <PathwayCards
                  userEnrolledClasses={userEnrolledClasses}
                  data={pathwayCourse.data}
                />
              </>
            ) : (
              pathwayCourse?.data && (
                <>
                  <Grid
                    container
                    spacing={2}
                    align="center"
                    className={classes.box}
                  >
                    <Grid
                      item
                      xs={12}
                      md={pathwayCourse?.data?.code === "TCBPI" ? 11 : 6}
                      sx={{ pl: 2 }}
                    >
                      <Card
                        align="left"
                        elevation={0}
                        className={classes.titleCard}
                        mb={isActive ? 16 : 30}
                      >
                        <Typography
                          variant="h4"
                          className={classes.heading}
                          sx={{ textAlign: isActive && "center", pb: "16px" }}
                        >
                          {pathwayCourse?.data.name}
                        </Typography>
                        <Typography variant="body1">
                          {pathwayCourse?.data.description}
                        </Typography>

                        {pathwayCourse?.data.video_link && (
                          <ExternalLink
                            style={{
                              textDecoration: "none",
                            }}
                            href={pathwayCourse?.data.video_link}
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

                        {/* .....summary .......*/}
                        {pathwayCourse?.data?.code === "TCBPI" &&
                          pathwayCourse?.data?.summary.map((content, index) => {
                            if (content.component === "text") {
                              return (
                                <UnsafeHTML
                                  Container={Typography}
                                  variant="body1"
                                  html={DOMPurify.sanitize(
                                    get(content, "value")
                                  )}
                                  sx={{ margin: "16px 0px" }}
                                  component={
                                    content?.decoration?.type === "bullet" &&
                                    "li"
                                  }
                                />
                              );
                            }
                          })}

                        {/* ..........login button when user are not login............... */}

                        {!user?.data?.token &&
                          (pathwayCourse?.data.code == "PRGPYT" ||
                            pathwayCourse?.data.code == "SPKENG") && (
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
                    {/* ........upcoming classes............ */}
                    <Grid item xs={12} md={6} sx={{ pl: 2 }}>
                      {user?.data?.token &&
                        (pathwayCourse?.data.code == "PRGPYT" ||
                          pathwayCourse?.data.code == "SPKENG") &&
                        (loading ? (
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
                        ))}
                    </Grid>
                  </Grid>

                  {/* ...............Learning outcomes..................... */}
                  {pathwayCourse?.data?.outcomes.length > 0 && (
                    <Box className={classes.Box1}>
                      <Typography
                        variant="h6"
                        sx={{ mt: 8, ml: 2, textAlign: isActive && "center" }}
                      >
                        Learning Outcomes
                      </Typography>
                      <Grid container spacing={0} align="center">
                        {pathwayCourse?.data.outcomes.map((content, index) => {
                          if (content.component === "text") {
                            return (
                              <Grid item key={index} xs={12} md={4}>
                                <Card
                                  sx={{ margin: "10px" }}
                                  align="left"
                                  elevation={0}
                                >
                                  <Box className={classes.flex}>
                                    <CheckIcon color="primary" />
                                    <UnsafeHTML
                                      Container={Typography}
                                      variant="body1"
                                      html={DOMPurify.sanitize(
                                        get(content, "value")
                                      )}
                                      sx={{ ml: 1 }}
                                    />
                                  </Box>
                                </Card>
                              </Grid>
                            );
                          }
                        })}
                      </Grid>
                    </Box>
                  )}
                </>
              )
            )}
            {/* ................Courses........................ */}
            <Box className={classes.box}>
              <Typography
                className={classes.course}
                ml={2}
                variant="h6"
                sx={{ textAlign: isActive && "center" }}
              >
                Courses
              </Typography>
              {!isFormFilled && user.data !== null && pathwayCode == true ? (
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
                {!isFormFilled && pathwayCode
                  ? pathwayCourse?.data?.courses?.map((item, index) => (
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
                  : pathwayCourse?.data?.courses?.map((item, index) => (
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
                                {!isFormFilled && pathwayCode ? (
                                  <LockIcon />
                                ) : (
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
                                )}

                                <Typography
                                  align={isActive ? "center" : "left"}
                                  variant="body1"
                                >
                                  {item.name}
                                </Typography>
                              </div>
                            </CardContent>
                            <CardActions
                              sx={{
                                height: "8px",
                                padding: "8px 8px 8px 0px",
                              }}
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

              {/* ...............certificate three dot button................ */}

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
                      {pathwayCourse?.data?.name} Certificate
                    </Typography>
                  </Grid>
                  <CustomSnackbar
                    openSnackbar={openSnackbar}
                    pathwayName={pathwayCourse?.data?.name}
                    handleSnackbar={handleSnackbar}
                  />
                </Grid>
              ) : null}
            </Box>
          </Container>
        </>
      )}{" "}
      ;
    </>
  );
}
export default PathwayCourse;
