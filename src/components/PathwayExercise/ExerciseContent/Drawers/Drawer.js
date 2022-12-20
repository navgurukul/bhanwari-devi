import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import { Typography, useMediaQuery } from "@mui/material";
import { useDebouncedCallback } from 'use-debounce';
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
}) {
  const [completed, setCompleted] = React.useState(false);

  const ItemStyle = {
    color: selected === index || completed ? "#48A145" : "#6D6D6D",
    fontWeight: selected === index ? "bold" : "",
  };

  React.useEffect(() => {
    if (contentType === "assessment") {
      if (progressTrackId?.assessments?.includes(id)) {
        setCompleted(true);
      }
    } else if (contentType === "class_topic") {
      if (progressTrackId?.classes?.includes(id)) {
        setCompleted(true);
      }
    } else if (contentType === "exercise") {
      if (progressTrackId?.exercises?.includes(id)) {
        setCompleted(true);
      }
    }
  }, [progressTrackId]);

  return (
    <>
      <ListItem
        key={index}
        disablePadding
        ref={index === selected ? ref1 : null}
      >
        <Link
          style={ItemStyle}
          className={classes.ListItemLink}
          to={interpolatePath(PATHS.PATHWAY_COURSE_CONTENT, {
            courseId: params.courseId,
            exerciseId: index,
            pathwayId: params.pathwayId,
          })}
        >
          <ListItemButton
            onClick={() => {
              setSelected(index);
              setExerciseId(index);
            }}
          >
            <Typography
              className={classes.ListItemsTypography}
              sx={{ fontWeight: selected === index && "bold" }}
              variant="body2"
            >
              {selected === index ? (
                <ArrowRightAltIcon
                  sx={{ marginRight: "8px", verticalAlign: "middle" }}
                />
              ) : (
                ""
              )}
              {index + 1 + ". "}
              {title === "assessment" ? "Practice Question" : title}
            </Typography>
          </ListItemButton>
        </Link>
      </ListItem>
    </>
  );
}

function PersistentDrawerLeft({
  list,
  setSelected,
  setExerciseId,
  progressTrackId,
}) {
  const desktop = useMediaQuery("(min-width: 1050px)");
  const laptop = useMediaQuery("(min-width: 1000px)");
  const params = useParams();
  const courseName = list[0]?.course_name.toUpperCase();
  let drawerWidth = desktop ? 260 : laptop ? 160 : 160;
  const selected = parseInt(params.exerciseId);
  const classes = useStyles({ desktop, laptop, drawerWidth });
  const [scrollPosition, setScrollPosition] = React.useState({ coordinateY: 0, changed: false});

  const ref1 = React.useRef();
  const scrollRef = React.useRef();

  const debouncedUpdateScroll = useDebouncedCallback(() => {
      if(scrollRef.current){
        setScrollPosition({ coordinateY: scrollRef.current.scrollTop, changed: true});
      }
    },
    200
  );
  
  React.useEffect(()=>{
    if(scrollPosition.changed){
      localStorage.setItem("contentListScroll", scrollPosition.coordinateY);
    }

  }, [scrollPosition]);

  React.useEffect(()=>{
    if(scrollRef.current){
      scrollRef.current.scrollTo(0, parseInt(localStorage.getItem("contentListScroll")));
    }
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        className={classes.DesktopDrawer}
        variant="persistent"
        anchor="left"
        open={true}
        onScroll={debouncedUpdateScroll}
        PaperProps={{ style: { border: "none", overflow: "scroll" }, ref: scrollRef }}
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
                id={obj.id}
                title={obj.name || obj.sub_title || obj.content_type || "N/A"}
              />
            ))}
          </List>
        </div>
      </Drawer>
    </Box>
  );
}

export default PersistentDrawerLeft;
