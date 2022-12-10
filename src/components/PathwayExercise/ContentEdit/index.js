import React, { useEffect, useState } from "react";
import { METHODS } from "../../../services/api";
import { useSelector } from "react-redux";
import { PATHS, interpolatePath, versionCode } from "../../../constant";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import useStyles from "../styles";
import { formatInUtc } from "../../../common/date";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  Container,
  TextField,
  TextareaAutosize,
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
  useMediaQuery,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { breakpoints } from "../../../theme/constant";
import ReactEditor from "./editor";

function BoxComponent(props) {
  return (
    <Box
      style={{ border: "1 px", background: props.isShown ? "white" : "" }}
      onMouseEnter={() => props.setIsShown(true)}
      onMouseLeave={() => props.setIsShown(false)}
    >
      {props.children}
    </Box>
  );
}

const DialogBox = ({
  openDialog,
  handleCloseDialog,
  title,
  contentText,
  button1,
  setSave,
  save,
}) => {
  const params = useParams();
  const classes = useStyles();
  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      aria-labelledby="alert-dialog-title"
      classes={{ paper: classes.paper }}
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" sx={{ pt: "32px" }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          sx={{ color: "#2E2E2E" }}
        >
          {contentText}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ pb: "32px", pr: "32px" }}>
        {button1 === "Leave" ? (
          <>
            <Link
              style={{ textDecoration: "none", marginRight: "25px" }}
              to={interpolatePath(PATHS.PATHWAY_COURSE_CONTENT, {
                courseId: params.courseId,
                exerciseId: params.exerciseId,
                pathwayId: params.pathwayId,
              })}
            >
              <Button color="error">Leave</Button>
            </Link>
            <Button sx={{ color: "#2E2E2E" }} onClick={handleCloseDialog}>
              Keep Editing
            </Button>
          </>
        ) : (
          <>
            <Button
              sx={{ color: "#2E2E2E", mr: "20px" }}
              onClick={handleCloseDialog}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setSave(!save);
              }}
            >
              Publish
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

function ContentEdit() {
  const user = useSelector(({ User }) => User);
  const history = useHistory();
  const params = useParams();
  const classes = useStyles();
  const [course, setCourse] = useState([]);
  const [id, setId] = useState();
  const [save, setSave] = useState(false);
  const [updatedOn, setUpdatedOn] = useState();
  const [courseType, setCourseType] = useState();
  const [isShown, setIsShown] = useState(false);
  const [open, setOpen] = useState(false);
  const [publishConfirmation, setPublishConfirmation] = useState(false);
  const courseId = params.courseId;
  const exerciseId = params.exerciseId;
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  console.log("course", course);

  const allComponents = {
    option: {
      AddOption: {
        id: 1,
        value: "",
      },
    },
    output: {
      AddHeader: {
        component: "header",
        variant: 3,
        value: "",
      },
      AddText: {
        component: "text",
        value: "",
      },
    },
  };
  const handleAdd = (index, ap, aap) => {
    if (course.length - 1 === index) {
      console.log("true");
      index = index + 1;
    } else {
      console.log("false");
    }

    console.log(index, "handleAdd index");
    console.log("ap", ap);
    var temp = [...course];
    if (ap === "options") {
      const addOption = { ...allComponents.option.AddOption };
      addOption.id = temp[index].value[temp[index].value.length - 1].id + 1;
      temp[index].value.push(addOption);
      setCourse(temp);
    }
    // if (ap === "output") {
    //   const AddHeader = { ...allComponents.header.AddHeader1 };
    //   console.log("temp before", temp);
    //   temp.splice(index, 0, AddHeader);
    //   console.log("temp after", temp);
    //   setCourse(temp);
    // }
  };

  const putApiAssessmentCall = () => {
    //delete the component which value is empty string or empty list
    const tempCourse = [];
    for (var i in course) {
      if (course[i].value.length !== 0) {
        tempCourse.push(course[i]);
      }
    }
    const stringifiedCourse = JSON.stringify(tempCourse, null, 0);
    console.log(id, stringifiedCourse, "cc");
    axios({
      method: METHODS.PUT,
      url: `${process.env.REACT_APP_MERAKI_URL}/assessment/${id}`,
      headers: {
        "version-code": versionCode,
        accept: "application/json",
        Authorization: user.data?.token || "",
      },
      data: {
        content: stringifiedCourse,
      },
    }).then((res) => {
      history.push(
        interpolatePath(PATHS.PATHWAY_COURSE_CONTENT, {
          courseId: params.courseId,
          exerciseId: params.exerciseId,
          pathwayId: params.pathwayId,
        })
      );
      console.log(res, "res");
    });
  };

  useEffect(() => {
    console.log("Punnu");
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/courses/${courseId}/exercises`,
      headers: {
        "version-code": versionCode,
        accept: "application/json",
        Authorization: user.data?.token || "",
      },
    })
      .then((res) => {
        console.log("res", res);
        const course_type = res.data.course.exercises[exerciseId].content_type;
        setCourseType(course_type);
        if (course_type === "assessment") {
          if (
            res.data.course.exercises[exerciseId].content[0].component !==
            "questionExpression"
          ) {
            res.data.course.exercises[exerciseId].content.splice(0, 0, {
              component: "questionExpression",
              type: "python",
              title: "",
              value: "",
            });
          }
          if (
            res.data.course.exercises[exerciseId].content[1].component !==
            "questionCode"
          ) {
            res.data.course.exercises[exerciseId].content.splice(1, 0, {
              component: "questionCode",
              type: "python",
              title: "",
              value: "",
            });
          }
        }
        setId(res.data.course.exercises[exerciseId].id);
        setCourse(res.data.course.exercises[exerciseId].content);
        const updated_at = res.data.course.exercises[exerciseId].updated_at;
        const longDateStr = formatInUtc(updated_at, "EEEE dd MMMM yyyy");
        // console.log("longDateStr", longDateStr);
        setUpdatedOn(longDateStr);
      })
      .catch((err) => {
        console.log("error");
      });
  }, [courseId, exerciseId]);

  useEffect(() => {
    putApiAssessmentCall();
  }, [save]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenPublishConfirmation = () => {
    setPublishConfirmation(true);
  };

  const handleClosePublishConfirmation = () => {
    setPublishConfirmation(false);
  };

  console.log("course in content edit", course);
  console.log("id", id);

  return (
    <>
      <AppBar fullWidth position="sticky" color="background" elevation={2}>
        <Box>
          <Container maxWidth>
            <Toolbar sx={{ alignItems: "center" }}>
              <Typography
                variant="h6"
                component="div"
                pt={1}
                style={{
                  position: "relative",
                  left: "-30px",
                }}
              >
                <CloseIcon
                  onClick={handleClickOpen}
                  sx={{ color: "#6D6D6D" }}
                />
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Typography className={classes.edit}>
                {updatedOn && `Last Edited on ${updatedOn}`}
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
            </Toolbar>
          </Container>
        </Box>
      </AppBar>
      <Container maxWidth="sm" sx={{ mt: 5, mb: 5 }}>
        {courseType === "assessment" ? (
          <>
            {course &&
              course.map((e, index) => {
                if (
                  e.component === "questionExpression" ||
                  e.component === "questionCode"
                ) {
                  return (
                    <BoxComponent
                      setIsShown={setIsShown}
                      isShown={isShown}
                      iconClick={(e) => handleAdd(index, "assessment")}
                    >
                      <Typography>
                        {e.component === "questionCode" ? "Code" : "Question"}
                      </Typography>
                      <TextareaAutosize
                        aria-label="empty textarea"
                        fullWidth
                        placeholder="Question"
                        color="primary"
                        className={classes.textarea}
                        value={course[index].value}
                        onChange={(e) => {
                          var temp = [...course];
                          temp[index].value = e.target.value;
                          setCourse(temp);
                        }}
                      />
                    </BoxComponent>
                  );
                } else if (e.component === "options") {
                  console.log(e.component, "e.value", e.value);
                  return (
                    <BoxComponent setIsShown={setIsShown} isShown={isShown}>
                      <Typography>
                        Options
                        {isShown && (
                          <IconButton variant="solid">
                            <AddCircleOutlineIcon
                              onClick={(e) => handleAdd(index, "options")}
                            />
                          </IconButton>
                        )}
                      </Typography>
                      {e.value.map((options, optionIndex) => {
                        return (
                          <TextField
                            id="outlined-basic"
                            label={`Option ${optionIndex + 1}`}
                            variant="outlined"
                            fullWidth
                            // className={classes.editField}
                            sx={{ marginTop: "10px", marginBottom: "10px" }}
                            value={options.value}
                            onChange={(e) => {
                              var temp = [...course];
                              temp[index].value[optionIndex].value =
                                e.target.value;
                              setCourse(temp);
                            }}
                          />
                        );
                      })}
                    </BoxComponent>
                  );
                } else if (e.component === "solution") {
                  console.log(e.component, "e.value", e.value);
                  return (
                    <>
                      <Typography>Solution</Typography>
                      <TextField
                        id="outlined-basic"
                        label="Solution"
                        variant="outlined"
                        fullWidth
                        sx={{ marginTop: "10px", marginBottom: "10px" }}
                        value={course[index].value}
                        onChange={(e) => {
                          var temp = [...course];
                          temp[index].value = e.target.value;
                          setCourse(temp);
                        }}
                      />
                    </>
                  );
                } else if (e.component === "output") {
                  console.log(e.component, "e.value", e.value);
                  return Object.keys(course[index].value).map((sol, index1) => {
                    return (
                      <>
                        <Typography>{sol} Explaination</Typography>

                        {course[index].value[sol].map((solution, index2) => {
                          return (
                            <TextField
                              id="outlined-basic"
                              label={"Output " + solution.component}
                              variant="outlined"
                              fullWidth
                              sx={{ marginTop: "10px", marginBottom: "10px" }}
                              value={solution.value}
                              onChange={(e) => {
                                var temp = [...course];
                                temp[index].value[sol][index2].value =
                                  e.target.value;
                                setCourse(temp);
                              }}
                            />
                          );
                        })}
                      </>
                    );
                  });
                }
              })}
          </>
        ) : (
          <ReactEditor course={course} id={id} save={save} />
        )}
      </Container>

      {open && (
        <DialogBox
          openDialog={open}
          handleCloseDialog={handleClose}
          title="Editing is in Progress"
          contentText="You have made several changes and would lose the changes without publishing"
          button1="Leave"
        />
      )}
      {publishConfirmation && (
        <DialogBox
          openDialog={publishConfirmation}
          handleCloseDialog={handleClosePublishConfirmation}
          title="Ready to Publish?"
          contentText="Make your latest edits available to students and educators"
          button1="Back"
          setSave={setSave}
          save={save}
        />
      )}

      <Box>
        <Toolbar
          className={classes.bottomRow}
          sx={{ width: !isActive ? "98%" : "92%" }}
        >
          <Button
            variant="text"
            color="dark"
            onClick={handleClickOpen}
            sx={{ flexGrow: 0 }}
          >
            Cancel
          </Button>
          <Button
            style={{ position: "relative" }}
            variant="text"
            color="primary"
            onClick={handleOpenPublishConfirmation}
          >
            Publish
          </Button>
        </Toolbar>
      </Box>
    </>
  );
}

export default ContentEdit;
