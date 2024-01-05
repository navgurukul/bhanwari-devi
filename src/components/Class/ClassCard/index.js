import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import useStyles from "../styles";
import { breakpoints } from "../../../theme/constant";
import { format, dateTimeFormat, timeLeftFormat } from "../../../common/date";
import { METHODS } from "../../../services/api";
import { actions as classActions } from "../redux/action";
import "./styles.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../common/Loader";
import {
  Typography,
  Card,
  Grid,
  Button,
  CardActions,
  Container,
  Modal,
  Box,
  Stack,
  Dialog,
  DialogActions,
  DialogTitle,
  Skeleton,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { actions as pathwayActions } from "../../PathwayCourse/redux/action";
import ClassJoinTimerButton from "../ClassJoinTimerButton";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useParams } from "react-router-dom";
import EditClass from "../EditClass";
import ClassForm from "../ClassForm";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
toast.configure();

function ClassCard() {
  const params = useParams();
  const classId = params.batchId;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [enrollShowModal, setEnrollShowModal] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [indicator, setIndicator] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const user = useSelector(({ User }) => User);
  const [canJoin, setCanJoin] = useState(false);
  const [classesData, setClassesData] = useState([]);
  const [Newpathways, setNewPathways] = useState([]);
  const [classToEdit, setClassToEdit] = useState({});
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [refreshKey, setRefreshKey] = useState(true);
  const [skeletonloading, setSkeletonloading] = useState(true);

  const toggleModalOpen = () => {
    setClassToEdit({});
  };

  const handleCloseEnroll = () => {
    setEnrollShowModal(false);
    setIndicator(false);
  };

  const handleSubmit = (Id) => {
    setLoading(true);
    const notify = () => {
      toast.success("You have been enrolled to class successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2500,
      });
    };
    let getNotify = false;
    setEnrollShowModal(!enrollShowModal);
    const timer = setTimeout(() => {
      getNotify = true;
      setLoading(false);
    }, 10000);
    axios
      .post(
        // `${process.env.REACT_APP_MERAKI_URL}/classes/${Id}/register?register-all=${indicator}`,
        `${process.env.REACT_APP_MERAKI_URL}/classes/${Id}/register`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: user.data.token,
            "register-to-all": false,
          },
        }
      )
      .then((res) => {
        if (!getNotify) {
          notify();
          clearTimeout(timer);
          setLoading(false);
        }
        dispatch(classActions.enrolledClass(Id));
      })
      .catch((res) => {
        toast.error("Already enrolled in another batch", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2500,
          color: "red",
        });
        setLoading(false);
      });
  };

  useEffect(() => {
    refreshKey &&
      axios({
        method: METHODS.GET,
        url: `${process.env.REACT_APP_MERAKI_URL}/batches/classes/${classId}`,
        headers: {
          accept: "application/json",
          Authorization: user.data.token,
        },
      })
        .then((res) => {
          setClassesData(res.data);
          setRefreshKey(false);
          setSkeletonloading(false);
        })
        .catch((err) => {
          setSkeletonloading(true);
        });
  }, [classId, refreshKey]);

  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  const languageMap = {
    hi: "Hindi",
    te: "Telugu",
    en: "English",
    ta: "Tamil",
    doubt_class: "Doubt Class",
  };

  const handleClickOpenEnroll = () => {
    setEnrollShowModal(!enrollShowModal);
    setIndicator(false);
  };

  const rolesList = user.data.user.rolesList;
  let flag = false;
  rolesList.includes("admin") || rolesList.includes("classAdmin")
    ? (flag = true)
    : (flag = false);

  // API CALL FOR DROP OUT

  useEffect(() => {
    dispatch(
      pathwayActions.getPathways({
        authToken: user,
      })
    );
  }, [dispatch]);

  const editClass = (classId, indicator) => {
    setClassToEdit(classesData.find((classData) => classData.id === classId));
    setIsEditMode(true);
    setShowModal(true);
    setIndicator(indicator);
  };

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/pathways/names`,
      headers: {
        accept: "application/json",
        Authorization: user.data.token,
      },
    }).then((res) => {
      setNewPathways(res.data);
    });
  }, []);
  const currentTime = new Date();

  // Loading effect

  if (skeletonloading) {
    return (
      <Grid container spacing={2} ml={"200px"}>
        {Array.from(Array(8)).map((_, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={index}
            sx={{ ml: "10px", mr: "10px" }}
          >
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
              <Typography variant="body1">
                <Skeleton />
              </Typography>
              <Typography variant="body1">
                <Skeleton />
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }
  return (
    <>
      <Container maxWidth="lg">
        <Grid spacing={isActive ? "0px" : "16px"} container>
          {classesData.map((item) => (
            // && item.start_time.replace("Z", "");
            <Grid item xs={12} ms={6} md={4}>
              <>
                <Card
                  elevation={2}
                  sx={{
                    p: 4,
                    mt: isActive ? 4 : 5,
                    bgcolor:
                      currentTime > new Date(item.start_time)
                        ? "primary.lighter"
                        : "background.paper",

                    height: "362px",
                  }}
                  className={classes.card}
                >
                  <Typography
                    variant="subtitle1"
                    color="#6D6D6D"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      sx={{ fontSize: "18px", fontWeight: "400" }}
                      variant="subtitle2"
                    >
                      {item?.title}
                    </Typography>

                    {((rolesList.length === 0 && item.enrolled) ||
                      (rolesList.length >= 1 &&
                        (item?.facilitator?.email === user.data.user.email ||
                          flag))) && (
                      <Typography>
                        {!(currentTime > new Date(item.start_time)) && (
                          <EditClass
                            item={item}
                            pathwayId={item?.PartnerSpecificBatches?.pathway_id}
                            Newpathways={Newpathways}
                            indicator={false}
                            editClass={editClass}
                            setRefreshKey={setRefreshKey}
                          />
                        )}
                      </Typography>
                    )}
                  </Typography>
                  {/* dialog box for edit delete and merge class  */}

                  {/* it will show when two class merged */}
                  {item?.merge_class && (
                    <Typography
                      variant="body2"
                      sx={{ display: "flex", mt: "16px" }}
                    >
                      <img
                        className={classes.icons}
                        src={require("../assets/mergeClass.png")}
                        height="26px"
                        width="26px"
                      />

                      {item?.merge_class}
                    </Typography>
                  )}
                  {!item?.title.toLowerCase().includes("scratch") && (
                    <Typography
                      // sx={{ fontSize: "18px", fontWeight: "400" }}
                      variant="subtitle1"
                    >
                      {item?.sub_title}
                    </Typography>
                  )}
                  <Typography variant="body1" sx={{ display: "flex" }}>
                    <img
                      className={classes.icons}
                      src={require("../assets/calendar.svg")}
                    />
                    {format(item.start_time, "dd MMM yy")}
                  </Typography>

                  <Typography variant="body1" sx={{ display: "flex" }}>
                    <img
                      className={classes.icons}
                      src={require("../assets/time.svg")}
                    />
                    {format(item.start_time, "hh:mm aaa")} -{" "}
                    {format(item.end_time, "hh:mm aaa")}
                  </Typography>

                  <Typography variant="body1" sx={{ display: "flex" }}>
                    <img
                      className={classes.icons}
                      src={require("../assets/facilitator.svg")}
                    />
                    {item?.volunteer?.name || item?.facilitator?.name}
                  </Typography>
                  <Typography variant="body1" sx={{ display: "flex" }}>
                    <img
                      className={classes.icons}
                      src={require("../assets/language.svg")}
                    />
                    {languageMap[item?.lang]}
                  </Typography>

                  {/* it's for enroll class, join class and  class Timer button */}
                  <CardActions className={classes.cardActions}>
                    {currentTime > new Date(item.start_time) ? (
                      <Stack
                        direction="row"
                        sx={{
                          justifyContent: "start-flex",
                          width: "100%",
                          cursor: "none",
                          padding: "0px !important",
                        }}
                      >
                        <Button
                          type="submit"
                          variant="text"
                          startIcon={<CheckCircleIcon />}
                          padding="0px !important"
                        >
                          completed
                        </Button>
                      </Stack>
                    ) : item?.enrolled ? (
                      loading ? (
                        <div className="loader-button">
                          <Loader />
                        </div>
                      ) : (
                        <ClassJoinTimerButton
                          startTime={item?.start_time}
                          link={item?.meet_link}
                          onCanJoin={setCanJoin}
                        />
                      )
                    ) : loading ? (
                      <div className="loader-button">
                        <Loader />
                      </div>
                    ) : (
                      <Button
                        type="submit"
                        variant="text"
                        onClick={() => {
                          handleClickOpenEnroll();
                        }}
                        endIcon={<ArrowRightAltIcon />}
                      >
                        Enroll
                      </Button>
                    )}
                  </CardActions>
                </Card>

                <Box>
                  {enrollShowModal ? (
                    <Dialog
                      open={enrollShowModal}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                      PaperProps={{
                        style: {
                          minWidth: "35%",
                          borderRadius: 8,
                        },
                      }}
                    >
                      <DialogTitle>
                        <Typography variant="h6" align="center">
                          Are you sure you want to enroll?
                        </Typography>
                      </DialogTitle>

                      <Stack alignItems="center">
                        <DialogActions>
                          <Box sx={{ display: "flex", mb: 2 }}>
                            <Button
                              onClick={() => {
                                return handleSubmit(item.id);
                              }}
                              color="primary"
                              variant="contained"
                              sx={{ mr: "15px", width: "100px" }}
                            >
                              Yes
                            </Button>
                            <Button
                              onClick={handleCloseEnroll}
                              color="grey"
                              variant="contained"
                              sx={{ width: "100px" }}
                            >
                              Cancel
                            </Button>
                          </Box>
                        </DialogActions>
                      </Stack>
                    </Dialog>
                  ) : null}
                </Box>
              </>
            </Grid>
          ))}
        </Grid>

        {showModal && (
          <Modal
            open={showModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ overflow: "scroll" }}
          >
            {/* { class form modal for doubt class, batches and edit class} */}
            <ClassForm
              isEditMode={isEditMode}
              indicator={indicator}
              classToEdit={classToEdit}
              setShowModal={setShowModal}
              setIsEditMode={setIsEditMode}
              setNewPathways={setNewPathways}
              Newpathways={Newpathways}
              singleTime={true}
              setRefreshKey={setRefreshKey}
            />
          </Modal>
        )}
      </Container>
    </>
  );
}

export default ClassCard;
