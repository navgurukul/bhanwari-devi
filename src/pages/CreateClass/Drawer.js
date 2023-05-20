import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect, useRef } from "react";
import { METHODS } from "../../services/api";
import {
  AppBar,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function DrawerLeft() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { data } = useSelector((state) => state.Pathways);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  // const container = window !== undefined ? () => window().document.body : undefined;

  console.log(data);
  return (
    <>
      <Drawer
        variant="permanent"
        anchor="left"
        open={true}
        PaperProps={{
          style: {
            border: "none",
            width: "240px",
            position: "static",
            paddingTop: "40px",
          },
        }}
      >
        <Typography variant="body1" color="gray">
          Learning Track
        </Typography>

        <List sx={{ alignItems: "left" }}>
          {data &&
            data.pathways &&
            data.pathways.map((item) => {
              if (
                item.name == "Python" ||
                item.name == "Spoken English" ||
                item.name == ""
              ) {
                return (
                  <ListItem key={item.id} disablePadding>
                    <ListItemButton>
                      <ListItemText primary={item.name} />
                      <ListItemIcon>
                        <ChevronRightIcon />
                      </ListItemIcon>
                    </ListItemButton>
                  </ListItem>
                );
              }
            })}
        </List>
      </Drawer>
    </>
  );
}

export default DrawerLeft;
