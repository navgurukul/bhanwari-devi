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

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function PersistentDrawerLeft({ open, setOpen, list, setSelected, selected }) {
  const desktop = useMediaQuery("(min-width: 1050px)");
  const laptop = useMediaQuery("(min-width: 1000px)");

  let drawerWidth = desktop ? 260 : laptop ? 160 : 160;

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
          {list.map((obj, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => setSelected(index)}>
                <Typography
                  style={{
                    fontSize: "14px",
                    lineHeight: "21px",
                    color: index === selected ? "#48A145" : "#6D6D6D",
                  }}
                  variant="caption"
                >
                  {obj.name
                    ? obj.name
                    : obj.course_name
                    ? obj.course_name
                    : "N/A"}
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
