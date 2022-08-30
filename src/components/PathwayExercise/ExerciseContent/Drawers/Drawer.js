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

function PersistentDrawerLeft({
  open,
  setOpen,
  list,
  setSelected,
  setExerciseId,
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
              style={{ marginRight: "85%" }}
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
                      style={{
                        color: selected == index ? "#48A145" : "#6D6D6D",
                      }}
                      className={classes.ListItemLink}
                      to={interpolatePath(PATHS.PATHWAY_COURSE_CONTENT, {
                        courseId: params.courseId,
                        exerciseId: index,
                        pathwayId: params.pathwayId,
                      })}
                    >
                      {obj?.name ||
                        obj?.sub_title ||
                        obj?.content_type ||
                        "N/A"}
                    </Link>
                  </Typography>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </Box>
  );
}

export default PersistentDrawerLeft;
