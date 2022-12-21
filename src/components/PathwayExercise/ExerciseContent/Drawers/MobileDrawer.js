import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { interpolatePath, PATHS } from "../../../../constant";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useMediaQuery } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useDebouncedCallback } from "use-debounce/lib";
import useStyles from "./styles";

const drawerWidth = 240;

function Item({
  progressTrackId,
  selected,
  index,
  setOpen,
  setSelected,
  setExerciseId,
  classes,
  params,
  contentType,
  id,
  ref1,
  title,
}) {
  const [completed, setCompleted] = React.useState(false);

  const ItemStyle = {
    color: selected === index || completed ? "#48A145" : "#6D6D6D",
    fontWeight: selected === index ? "bold" : "",
  };
  const clickOnTitle = (index) => () => {
    setSelected(index);
    setOpen(false);
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
        onClick={clickOnTitle(index)}
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
              // component={Link}
              sx={{ fontWeight: selected === index && "bold" }}
              variant="caption"
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

function MobileDrawer(props) {
  const desktop = useMediaQuery("(min-width: 1050px)");
  const laptop = useMediaQuery("(min-width: 1000px)");
  const params = useParams();
  const {
    window,
    setSelected,
    list,
    open,
    setOpen,
    setExerciseId,
    progressTrackId,
  } = props;
  //const [mobileOpen, setMobileOpen] = React.useState(false);
  const selected = parseInt(params.exerciseId);
  const classes = useStyles({ desktop, laptop, drawerWidth });
  const ref1 = React.useRef();
  const [scrollPosition, setScrollPosition] = React.useState({
    coordinateY: 0,
    changed: false,
  });
  const scrollRef = React.useRef();

  const debouncedUpdateScroll = useDebouncedCallback(() => {
    setScrollPosition({
      coordinateY: scrollRef.current.scrollTop,
      changed: true,
    });
  }, 200);

  React.useEffect(() => {
    if (scrollPosition.changed) {
      localStorage.setItem(
        "contentListScrollMobile",
        scrollPosition.coordinateY
      );
    }
  }, [scrollPosition]);

  React.useEffect(() => {
    //🚨 Temporary Fix
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo(
          0,
          parseInt(localStorage.getItem("contentListScrollMobile"))
        );
      }
    }, 10);
  }, []);

  const handleDrawerToggle = () => {
    setOpen((prev) => !prev);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {list?.map((obj, index) => (
          <Item
            key={index}
            progressTrackId={progressTrackId}
            setSelected={setSelected}
            setOpen={handleDrawerToggle}
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
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={open}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          PaperProps={{ ref: scrollRef }}
          onScroll={debouncedUpdateScroll}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default MobileDrawer;
