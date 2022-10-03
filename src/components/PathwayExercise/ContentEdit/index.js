import React, { useEffect, useState } from "react";
import { METHODS } from "../../../services/api";
import { useSelector } from "react-redux";
import { PATHS, interpolatePath, versionCode } from "../../../constant";
import axios from "axios";
import { useParams } from "react-router-dom";
import useStyles from "../styles";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  Container,
  TextField,
  TextareaAutosize,
  Box,
  Button,
  Grid,
  Dialog,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
} from "@mui/material";

function BoxComponent(props) {
  // const [isShown, setIsShown] = useState(false);
  return (
    <Box
      style={{ border: "1 px", background: props.isShown ? "white" : "" }}
      onMouseEnter={() => props.setIsShown(true)}
      onMouseLeave={() => props.setIsShown(false)}
    >
      {/* {props.isShown && (
        <IconButton variant="solid">
          <AddCircleOutlineIcon onClick={() => props.iconClick()} />
        </IconButton>
      )} */}
      {props.children}
    </Box>
  );
}

// const showFunctionalities = (showModal) => {
//   const dropDownList = [
//     "Heading 1",
//     "Heading 2",
//     "Bulleted List",
//     "Numbered List",
//     "Image",
//     "Video",
//     "Code",
//     "Table",
//     "Quote",
//     "Divider",
//   ];
//   return (
//     <Dialog
//       onClose={() => {
//         setShowModal(!showModal);
//       }}
//       open={showModal}
//     >
//       {/* <DialogTitle>Set backup account</DialogTitle> */}
//       <List sx={{ pt: 0 }}>
//         {/* {emails.map((email) => ( */}
//         <ListItem
//           button
//           // onClick={() => handleListItemClick(email)}
//           // key={email}
//         >
//           <ListItemText primary="text 1" />
//         </ListItem>
//         <ListItem button>
//           <ListItemText primary="text 2" />
//         </ListItem>
//         <ListItem button>
//           <ListItemText primary="text 3" />
//         </ListItem>
//         <ListItem button>
//           <ListItemText primary="text 4" />
//         </ListItem>
//       </List>
//       <List>
//         {/* {allComponents[showOption]
//           ? Object.keys(allComponents[showOption]).map((e) => {
//               return (
//                 <ListItem button>
//                   <ListItemText
//                     primary={e}
//                     onClick={() => {
//                       // allComponents[showOption]
//                       // handleAdd()
//                       console.log(e);
//                     }}
//                   />
//                 </ListItem>
//               );
//             })
//           : ""} */}
//         {/* {console.log(allComponents[showOption])} */}
//       </List>
//     </Dialog>
//   );
// };

function ContentEdit() {
  const user = useSelector(({ User }) => User);
  const params = useParams();
  const [course, setCourse] = useState([]);
  const [id, setId] = useState();
  const [courseType, setCourseType] = useState();
  const courseId = params.courseId;
  const exerciseId = params.exerciseId;
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  const [showOption, setShowOption] = useState();
  const [isShown, setIsShown] = useState(false);
  const [index, setIndex] = useState();

  const dropDownList = {
    "Heading 1": "AddHeader1",
    "Heading 2": "AddHeader2",
    "Bulleted List": "",
    "Numbered List": "",
    Image: "image",
    Video: "youtube",
    Code: "code",
    // "Table",
    // "Quote",
    // "Divider",
  };

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
    header: {
      AddHeader1: {
        component: "header",
        variant: 1,
        value: "",
      },
      AddHeader2: {
        component: "header",
        variant: 2,
        value: "",
      },
    },
    image: {
      AddImage: {
        component: "image",
        value: "",
      },
    },
    youtube: {
      AddYoutube: {
        component: "youtube",
        value: "",
      },
    },
    code: {
      AddCode: {
        component: "code",
        value: "",
      },
    },
  };
  const handleAdd = (index, ap, aap) => {
    console.log(index, "handleAdd index");
    console.log("ap", ap);
    var temp = [...course];
    if (ap === "options") {
      const addOption = { ...allComponents.option.AddOption };
      addOption.id = temp[index].value[temp[index].value.length - 1].id + 1;
      temp[index].value.push(addOption);
      setCourse(temp);
    }
    if (ap === "AddHeader1") {
      const AddHeader = { ...allComponents.header.AddHeader1 };
      console.log("temp before", temp);
      temp.splice(index, 0, AddHeader);
      console.log("temp after", temp);
      setCourse(temp);
    }
    if (ap === "AddHeader2") {
      const AddHeader = { ...allComponents.header.AddHeader2 };
      console.log("temp before", temp);
      temp.splice(index, 0, AddHeader);
      console.log("temp after", temp);
      setCourse(temp);
    }
    if (ap === "image") {
      const AddHeader = { ...allComponents.image.AddImage };
      console.log("temp before", temp);
      temp.splice(index, 0, AddHeader);
      console.log("temp after", temp);
      setCourse(temp);
    }
    if (ap === "youtube") {
      const AddHeader = { ...allComponents.youtube.AddYoutube };
      console.log("temp before", temp);
      temp.splice(index, 0, AddHeader);
      console.log("temp after", temp);
      setCourse(temp);
    }
    if (ap === "code") {
      const AddHeader = { ...allComponents.code.AddCode };
      console.log("temp before", temp);
      temp.splice(index, 0, AddHeader);
      console.log("temp after", temp);
      setCourse(temp);
    }
  };

  console.log("params", params);

  let name = "name";
  const putApiExercisesCall = () => {
    const stringifiedCourse = JSON.stringify(course, null, 0);
    console.log(id, stringifiedCourse, "cc");
    axios({
      method: METHODS.PUT,
      url: `${process.env.REACT_APP_MERAKI_URL}/exercises/${id}`,
      headers: {
        "version-code": versionCode,
        accept: "application/json",
        Authorization: user.data?.token || "",
      },
      data: {
        content: stringifiedCourse,
      },
    }).then((res) => {
      console.log(res, "res");
    });
  };
  const putApiAssessmentCall = () => {
    //delete the component which value is empty string or empty list
    const needToBeRemovedIndex = [];
    for (var i in course) {
      if (course[i].value.length === 0) {
        needToBeRemovedIndex.push(i);
      }
    }
    for (var index of needToBeRemovedIndex) {
      course.splice(index, 1);
    }
    const stringifiedCourse = JSON.stringify(course, null, 0);
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
      console.log(res, "res");
    });
  };
  useEffect(() => {
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
      })
      .catch((err) => {
        console.log("error");
      });
  }, [courseId, exerciseId]);

  console.log("course", course);

  function myFunction() {
    // Create an "li" node:
    const node = document.createElement("input");
    // const node = React.createElement("div", null, `Hello ${this.props.toWhat}`);
    // return node;

    // Create a text node:
    // const textnode = document.createTextNode("Water");

    // Append the text node to the "li" node:
    // node.appendChild(textnode);

    // Append the "li" node to the list:
    document.getElementById("myList").appendChild(node);
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      {courseType === "assessment" ? (
        <>
          {course &&
            course.map((e, index) => {
              if (e.component === "questionExpression") {
                console.log(e.component, "e.value", e.value);
                return (
                  <BoxComponent
                    setIsShown={setIsShown}
                    isShown={isShown}
                    iconClick={(e) => handleAdd(index, "assessment")}
                  >
                    <Typography>
                      Question Options
                      {isShown && (
                        <IconButton variant="solid">
                          <AddCircleOutlineIcon
                            onClick={(e) => handleAdd(index, "assessment")}
                          />
                        </IconButton>
                      )}
                    </Typography>
                    {/* <TextField
                      id="outlined-basic"
                      // label="Question"
                      variant="outlined"
                      fullWidth
                      sx={{ marginTop: "10px", marginBottom: "10px" }}
                      value={course[index].value}
                      onChange={(e) => {
                        var temp = [...course];
                        temp[index].value = e.target.value;
                        setCourse(temp);
                      }}
                    /> */}
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
                      // value={course[index].value}
                      // onChange={(e) => {
                      //   var temp = [...course];
                      //   temp[index].value[optionIndex].value = e.target.value;
                      //   setCourse(temp);
                      // }}
                    />
                  </BoxComponent>
                );
              } else if (e.component === "questionCode") {
                console.log(e.component, "e.value", e.value);
                return (
                  <Box>
                    <Typography>Code</Typography>
                    <TextField
                      id="outlined-basic"
                      label="Code"
                      variant="outlined"
                      fullWidth
                      // className={classes.editField}
                      sx={{ marginTop: "10px", marginBottom: "10px" }}
                      value={course[index].value}
                      onChange={(e) => {
                        var temp = [...course];
                        temp[index].value = e.target.value;
                        setCourse(temp);
                      }}
                    />
                  </Box>
                );
              } else if (e.component === "options") {
                console.log(e.component, "e.value", e.value);
                return (
                  <BoxComponent
                    setIsShown={setIsShown}
                    isShown={isShown}
                    iconClick={(e) => handleAdd(index, "options")}
                  >
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
                      // className={classes.editField}
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
                            // className={classes.editField}
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

          <Button variant="contained" onClick={(e) => putApiAssessmentCall()}>
            Submit
          </Button>
        </>
      ) : (
        <>
          {course &&
            course.map((e, index) => {
              if (e.component === "header") {
                return (
                  <BoxComponent setIsShown={setIsShown} isShown={isShown}>
                    <Typography>
                      Header
                      {isShown && (
                        <IconButton variant="solid">
                          <AddCircleOutlineIcon
                            onClick={(e) => {
                              setShowModal(!showModal);
                              setIndex(index);
                            }}
                          />
                        </IconButton>
                      )}
                    </Typography>
                    <TextField
                      id="outlined-basic"
                      label="Header"
                      variant="outlined"
                      fullWidth
                      sx={{ marginTop: "10px", marginBottom: "10px" }}
                      value={course[index].value}
                      onChange={(e) => {
                        var temp = [...course];
                        temp[index].value[index].value = e.target.value;
                        setCourse(temp);
                      }}
                    />
                    <div id="myList"></div>
                  </BoxComponent>
                );
              } else if (e.component === "code") {
                return (
                  <BoxComponent setIsShown={setIsShown} isShown={isShown}>
                    <Typography>
                      Code
                      {isShown && (
                        <IconButton variant="solid">
                          <AddCircleOutlineIcon
                            onClick={(e) => {
                              setShowModal(!showModal);
                              setIndex(index);
                            }}
                          />
                        </IconButton>
                      )}
                    </Typography>
                    <TextField
                      id="outlined-basic"
                      label="Code"
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
                  </BoxComponent>
                );
              } else if (e.component === "text") {
                return (
                  <BoxComponent setIsShown={setIsShown} isShown={isShown}>
                    <Typography>
                      Text
                      {isShown && (
                        <IconButton variant="solid">
                          <AddCircleOutlineIcon
                            onClick={(e) => {
                              setShowModal(!showModal);
                              setIndex(index);
                            }}
                          />
                        </IconButton>
                      )}
                    </Typography>

                    <TextField
                      id="outlined-basic"
                      label="Text"
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
                  </BoxComponent>
                );
              } else if (e.component === "youtube") {
                return (
                  <BoxComponent setIsShown={setIsShown} isShown={isShown}>
                    <Typography>
                      Youtube
                      {/* <IconButton variant="solid">
                        <AddCircleOutlineIcon />
                      </IconButton> */}
                      {isShown && (
                        <IconButton variant="solid">
                          <AddCircleOutlineIcon
                            onClick={(e) => {
                              setShowModal(!showModal);
                              setIndex(index);
                            }}
                          />
                        </IconButton>
                      )}
                    </Typography>
                    <TextField
                      id="outlined-basic"
                      label="Youtube"
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
                  </BoxComponent>
                );
              } else if (e.component === "image") {
                return (
                  <BoxComponent setIsShown={setIsShown} isShown={isShown}>
                    <Typography>
                      Image
                      {isShown && (
                        <IconButton variant="solid">
                          <AddCircleOutlineIcon
                            onClick={(e) => {
                              setShowModal(!showModal);
                              setIndex(index);
                            }}
                          />
                        </IconButton>
                      )}
                    </Typography>
                    <TextField
                      id="outlined-basic"
                      label="Image"
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
                  </BoxComponent>
                );
              }
            })}

          <Button variant="contained" onClick={(e) => putApiExercisesCall()}>
            Submit
          </Button>
        </>
      )}

      {console.log("showModal", showModal)}

      {showModal && (
        <Dialog
          onClose={() => {
            setShowModal(!showModal);
          }}
          open={showModal}
        >
          <List sx={{ pt: 0 }}>
            {Object.keys(dropDownList).map((item) => (
              <ListItem
                button
                onClick={() => {
                  setShowModal(!showModal);
                  handleAdd(index, dropDownList[item]);
                  // dropDownList[item]
                }}
              >
                <ListItemText primary={item} />
              </ListItem>
            ))}
            {/* <ListItem
              button
              // onClick={() => handleListItemClick(email)}
              // key={email}
            >
              <ListItemText primary="text 1" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="text 2" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="text 3" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="text 4" />
            </ListItem> */}
          </List>
        </Dialog>
      )}

      {/* {showModal && (
        <Dialog
          onClose={() => {
            setShowModal(!showModal);
          }}
          open={showModal}
        >
          <DialogTitle>Set backup account</DialogTitle>
          <List sx={{ pt: 0 }}>
            {emails.map((email) => (
            <ListItem
              button
              // onClick={() => handleListItemClick(email)}
              // key={email}
            >
              <ListItemText primary="text 1" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="text 2" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="text 3" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="text 4" />
            </ListItem>
          </List>
          <List>
            {allComponents[showOption]
              ? Object.keys(allComponents[showOption]).map((e) => {
                  return (
                    <ListItem button>
                      <ListItemText
                        primary={e}
                        onClick={() => {
                          // allComponents[showOption]
                          // handleAdd()
                          console.log(e);
                        }}
                      />
                    </ListItem>
                  );
                })
              : ""}
            {console.log(allComponents[showOption])}
          </List>
        </Dialog>
      )} */}
    </Container>
  );
}

export default ContentEdit;
