import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import { Typography, useMediaQuery } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { interpolatePath, PATHS } from "../../../../constant";
import useStyles from "./styles";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
function Item({
  progressTrackId,
  setSelected,
  selected,
  index,
  ref1,
  setExerciseId,
  classes,
  params,
  contentType,
  id,
  title,
  visitedExercises,
  setVisitedExercises,
}) {
  const [completed, setCompleted] = React.useState(false);

  const isVisited = visitedExercises.includes(id);
  const itemStyle = {
    color: isVisited
      ? "#48A145"
      : selected === index || completed
      ? "#48A145"
      : "#6D6D6D",
    fontWeight: selected === index ? "bold" : "",
    textDecoration: "none",
  };

  React.useEffect(() => {
    if (
      contentType === "assessment" &&
      progressTrackId?.assessments?.includes(id)
    ) {
      setCompleted(true);
    } else if (
      contentType === "class_topic" &&
      progressTrackId?.classes?.includes(id)
    ) {
      setCompleted(true);
    } else if (
      contentType === "exercise" &&
      progressTrackId?.exercises?.includes(id)
    ) {
      setCompleted(true);
    }
  }, [progressTrackId, id, contentType]);

  const handleClick = () => {
    setSelected(index);
    setExerciseId(index);
    if (contentType === "exercise") {
      setVisitedExercises((prev) => {
        if (!prev.includes(id)) {
          const updated = [...prev, id];
          localStorage.setItem("visitedExercises", JSON.stringify(updated));
          return updated;
        }
        return prev;
      });
    }
  };

  return (
    <ListItem key={index} disablePadding ref={index === selected ? ref1 : null}>
      <Link
        style={itemStyle}
        className={classes.ListItemLink}
        to={interpolatePath(PATHS.PATHWAY_COURSE_CONTENT, {
          courseId: params.courseId,
          exerciseId: index,
          pathwayId: params.pathwayId,
        })}
      >
        <ListItemButton onClick={handleClick}>
          <Typography
            className={classes.ListItemsTypography}
            sx={{ fontWeight: selected === index ? "bold" : "normal" }}
            variant={selected === index ? "subtitle2" : "body2"}
          >
            {selected === index && (
              <ArrowRightAltIcon
                sx={{ marginRight: "8px", verticalAlign: "middle" }}
              />
            )}
            {index + 1 + ". "}
            {title === "assessment" ? "Practice Question" : title}
          </Typography>
        </ListItemButton>
      </Link>
    </ListItem>
  );
}

function PersistentDrawerLeft({
  list,
  setSelected,
  setExerciseId,
  progressTrackId,
  courseTitle,
}) {
  const [visitedExercises, setVisitedExercises] = React.useState(() => {
    const stored = localStorage.getItem("visitedExercises");
    return stored ? JSON.parse(stored) : [];
  });

  // const [selected, setSelectedState] = React.useState(
  //   parseInt(localStorage.getItem(lastSelectedExercise_${params.courseId})) || parseInt(params.exerciseId)
  // );

  const desktop = useMediaQuery("(min-width: 1050px)");
  const laptop = useMediaQuery("(min-width: 1000px)");
  const params = useParams();
  const courseName = courseTitle.toUpperCase();
  const drawerWidth = desktop ? 260 : laptop ? 160 : 160;
  const selected = parseInt(params.exerciseId);
  const classes = useStyles({ desktop, laptop, drawerWidth });

  const ref1 = React.useRef();
  React.useEffect(() => {
    if (ref1.current) {
      ref1.current.scrollIntoView({
        block: "center",
      });
    }
  }, [selected]);

  // React.useEffect(() => {
  //   if (ref1.current) {
  //     ref1.current.scrollIntoView({
  //       block: "center",
  //     });
  //   }
  // }, [selected]);

  // const handleExerciseSelect = (index) => {
  //   setSelectedState(index);
  //   setExerciseId(index);
  //   localStorage.setItem(lastSelectedExercise-${params.courseId}, index);
  // };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        className={classes.DesktopDrawer}
        variant="persistent"
        anchor="left"
        open={true}
        PaperProps={{ style: { border: "none" } }}
      >
        <div style={{ paddingBottom: "60px", marginLeft: "30px" }}>
          <ListItem disablePadding style={{ marginTop: "100px" }}>
            {/* <IconButton
              style={{ marginRight: "85%", marginTop: "40px" }}
              onClick={handleDrawerClose}
            >
              <ArrowBackIcon />
            </IconButton> */}
          </ListItem>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <AssignmentOutlinedIcon
                  style={{ marginTop: "24px", marginRight: "10px" }}
                  className={classes.ContentListIcon}
                />
                <Typography
                  className={classes.courseNameTypography}
                  variant="subtitle2"
                  mt={4}
                >
                  {courseName}
                </Typography>
              </ListItemButton>
            </ListItem>
            {list?.map((obj, index) => (
              <Item
                key={index}
                progressTrackId={progressTrackId}
                setSelected={setSelected}
                selected={selected}
                index={index}
                ref1={ref1}
                setExerciseId={setExerciseId}
                classes={classes}
                params={params}
                contentType={obj.content_type}
                id={obj.slug_id}
                title={obj.name || obj.sub_title || obj.content_type || "N/A"}
                visitedExercises={visitedExercises}
                setVisitedExercises={setVisitedExercises}
              />
            ))}
          </List>
        </div>
      </Drawer>
    </Box>
  );
}
export default PersistentDrawerLeft;
