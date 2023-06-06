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

function DrawerLeft({ pathwayID, setPathwayId, setPathwayName }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { data } = useSelector((state) => state.Pathways);
  const handleChange = (id) => {
    setPathwayId(id);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  // const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Drawer
        variant="permanent"
        anchor="left"
        open={true}
        PaperProps={{
          style: {
            border: "none",
            width: "300px",
            position: "static",
            paddingTop: "40px",
          },
        }}
      >
        <Typography variant="body1" color="gray">
          Learning Track
        </Typography>

        <List>
          {data &&
            data.pathways &&
            data.pathways.map((item) => {
              if (
                item.name == "Python" ||
                item.name == "Spoken English" ||
                item.name?.toLocaleLowerCase() ===
                  "Amazon Coding Bootcamp"?.toLocaleLowerCase()
              ) {
                return (
                  <ListItem key={item.id} disablePadding>
                    <ListItemButton
                      onClick={(e) => {
                        handleChange(item.id);
                        setPathwayName(item.name);
                      }}
                      sx={{
                        justifyContent: "space-between",
                        padding: "8px 0px 8px 16px",
                        borderRadius: "8px",
                      }}
                    >
                      <Typography variant="subtitle2">{item.name}</Typography>
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
