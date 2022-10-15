import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ListItem from "@mui/material/ListItem";
import { Typography, useMediaQuery } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { interpolatePath, PATHS } from "../../../../constant";
import useStyles from "./styles";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

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
      if (progressTrackId?.assessments.includes(id)) {
        setCompleted(true);
      }
    } else if (contentType === "class_topic") {
      if (progressTrackId?.classes.includes(id)) {
        setCompleted(true);
      }
    } else if (contentType === "exercise") {
      if (progressTrackId?.exercises.includes(id)) {
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
        <ListItemButton
          onClick={() => {
            setSelected(index);
            setExerciseId(index);
          }}
        >
          <Typography
            className={classes.ListItemsTypography}
            component={Link}
            variant="caption"
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
              {title}
            </Link>
          </Typography>
        </ListItemButton>
      </ListItem>
    </>
  );
}

function PersistentDrawerLeft({
  open,
  setOpen,
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

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const ref1 = React.useRef();
  React.useEffect(() => {
    if (ref1.current) {
      ref1.current.scrollIntoView({
        block: "center",
      });
    }
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        className={classes.DesktopDrawer}
        variant="persistent"
        anchor="left"
        open={open}
        PaperProps={{ style: { border: "none" } }}
      >
        <div style={{ paddingBottom: "60px", marginLeft: "30px" }}>
          <ListItem disablePadding style={{ marginTop: "100px" }}>
            <IconButton
              style={{ marginRight: "85%", marginTop: "40px" }}
              onClick={handleDrawerClose}
            >
              <ArrowBackIcon />
            </IconButton>
          </ListItem>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <Typography
                  className={classes.courseNameTypography}
                  variant="subtitle2"
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
