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

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function PersistentDrawerLeft({ open, setOpen, list, setSelected }) {
  const desktop = useMediaQuery("(min-width: 1050px)");
  const laptop = useMediaQuery("(min-width: 1000px)");
  const params = useParams();
  let drawerWidth = desktop ? 260 : laptop ? 160 : 160;
  const selected = parseInt(params.exerciseId);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
          overflow: "hidden",
          "& ::-webkit-scrollbar": { display: "none" },
          zIndex: 0,
        }}
        variant="persistent"
        anchor="left"
        open={open}
        PaperProps={{ style: { border: "none" } }}
      >
        <DrawerHeader style={{ marginTop: "70px" }}>
          <IconButton
            style={{ marginRight: "85%" }}
            onClick={handleDrawerClose}
          >
            <ArrowBackIcon />
          </IconButton>
        </DrawerHeader>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <Typography style={{ fontWeight: "400" }} variant="subtitle2">
                INTRODUCTION TO PYTHON
              </Typography>
            </ListItemButton>
          </ListItem>
          {list?.map((obj, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => setSelected(index)}>
                <Typography
                  style={{
                    fontSize: "14px",
                    lineHeight: "21px",
                    color: selected == index ? "#48A145" : "#6D6D6D",
                    textDecoration: "none",
                    boxShadow: "none",
                  }}
                  component={Link}
                  variant="caption"
                >
                  <Link
                    style={{
                      color: selected == index ? "#48A145" : "#6D6D6D",
                      textDecoration: "none",
                    }}
                    to={interpolatePath(PATHS.PATHWAY_COURSE_CONTENT, {
                      courseId: params.courseId,
                      exerciseId: index,
                      pathwayId: params.pathwayId,
                    })}
                  >
                    {obj?.name || obj?.sub_title || obj?.content_type || "N/A"}
                  </Link>
                </Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}

export default PersistentDrawerLeft;
