import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ListItem from "@mui/material/ListItem";
import { Typography } from "@mui/material";

const drawerWidth = 300;

const list = [
  "Class 1 - Intro to Python",
  "How to Begin the Course",
  "Why",
  "Indentation",
  "Basics Booleans",
  "What do Computers do?",
  "What is Programming?",
  "Basic Definitions Introduction",
  "Basic Definitions Part 1",
];

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function PersistentDrawerLeft({ open, setOpen }) {
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
          {list.map((text, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <Typography
                  style={{
                    fontSize: "14px",
                    lineHeight: "21px",
                    color: "#6D6D6D",
                  }}
                  variant="caption"
                >
                  {text}
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
