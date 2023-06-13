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
import NoBatchEnroll from "../BatchClassComponents/NoBatchEnroll";
import { CardContent, ListItem } from "@mui/material";
import { ReactComponent as CertificateIcon } from "./asset/certificate-grey.svg";
import { ReactComponent as CertificateIconColored } from "./asset/certificate-color.svg";
import Modal from "@mui/material/Modal";
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
import { StarRate } from "@material-ui/icons";
import AmazonBootcampBatch from "../BatchClassComponents/AmazonBootcampBatch";

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
  const [certificate, setCertificate] = useState("");
  let completedAll =
    pathwayId == 8
      ? completedPortion?.total >= 80
      : completedPortion?.total === 100;
  // let completedAll = true
  const [loader, setLoader] = useState(false);
  const displayCert = pathwayId == 1;
  // || pathwayId == 8;

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

  const pathwayCourseData = data.Pathways.data?.pathways.find((item) => {
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

  const Summery = pathwayCourseData?.summary?.split("\n");
  return enrolledBatches && !loading && pathwayCourseData?.code == "ACB" ? (
    <AmazonBootcampBatch enrolledBatches={enrolledBatches[0]["title"]} />
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
              <Button onClick={downloadCert} className={classes.greenButton}>
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
                    {pathwayCourseData.code !== "SHCEL" && (
                      <Typography
                        variant="body2"
                        className={classes.cardSubtitle}
                        sx={{ textAlign: isActive && "center", pb: "8px" }}
                      >
                        Learning Track
                      </Typography>
                    )}
                    <Typography
                      variant="h4"
                      className={classes.heading}
                      sx={{ textAlign: isActive && "center", pb: "16px" }}
                    >
                      {pathwayCourseData.name}
                    </Typography>
                    <Typography variant="body1">
                      {pathwayCourseData.description}
                    </Typography>

                    {pathwayCourseData.video_link && (
                      <ExternalLink
                        style={{
                          textDecoration: "none",
                        }}
                        href={pathwayCourseData.video_link}
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
                    pathwayCourseData.code == "SPKENG" ||
                    pathwayCourseData.code == "ACB") ? (
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

        {pathwayCourseData?.code == "ACB" ? (
          <Grid container>
            <Grid item md={6}>
              <Typography variant="h6">{Summery[0]}</Typography>
              <Typography variant="body1" component="ul" padding="0px">
                {Summery.slice(1).map((line, index) => (
                  <Typography key={index} marginTop="16px">
                    {line}
                  </Typography>
                ))}
              </Typography>
            </Grid>
          </Grid>
        ) : (
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
            <Grid container spacing={3} align="center">
              {filterPathwayCourse?.map((item, index) => (
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
                      sx={{ ml: 3, p: "16px", mb: isActive ? "0px" : "16px" }}
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
                        <div
                          className={classes.courseTitleNumber}
                          disableGutters
                        >
                          <Typography
                            align={isActive ? "center" : "left"}
                            variant="body2"
                            className={classes.courseName}
                            sx={{
                              mr: "10px",
                              padding: isActive ? "5px" : "5px 0 5px 13px",
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
            {/* 
          {!user?.data?.token ? (
            <Container align="center">
              <Box
                maxWidth={500}
                bgcolor="#E9F5E9"
                mb={isActive ? 1 : 10}
                pt={3}
                height={100}
                style={{ padding: isActive ? "24px" : "15px" }}
              >
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
                    padding: isActive ? "0px 110px" : "0px 60px",
                  }}
                  onClick={() => {
                    history.push(PATHS.LOGIN);
                  }}
                >
                  Login
                </Button>
              </Box>
            </Container>
          ) : (
            ""
          )}
          {!enrolledBatches && upcomingBatchesData?.length > 0 ? (
            <PathwayCourseBatchEnroll2
              upcomingBatchesData={upcomingBatchesData}
            />
          ) : (
            ""
          )} */}
          </Box>
        )}

        {SupplementalCourse && (
          <Box sx={{}}>
            <Typography variant="h6">Supplemental English Courses</Typography>
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
  );
}
export default PathwayCourse;
