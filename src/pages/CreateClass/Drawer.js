import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect, useRef } from "react";
import { METHODS } from "../../services/api";
import {
  AppBar,
  Button,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Modal,
  Box,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../theme/constant";

function DrawerLeft({
  pathwayID,
  setPathwayId,
  setPathwayName,
  Newpathways,
  pathwayName,
}) {
  const [mobileOpen, setMobileOpen] = React.useState("");
  const { data } = useSelector((state) => state.PathwaysDropdow);
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  const handleChange = (id) => {
    setPathwayId(id);
  };
  const user = useSelector(({ User }) => User);
  const [selectedValue, setSelectedValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (value) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const listData = (
    <List>
      {Newpathways &&
        Newpathways.map((item) => {
          if (
            item.code == "PRGPYT" ||
            item.code == "SPKENG" ||
            item.code === "ACB"
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
                    padding: isActive ? "4px 0px" : "8px 0px 8px 16px",
                    borderRadius: "8px",
                  }}
                  value={item.name}
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
  );

  return (
    <>
      {!isActive ? (
        <Drawer
          variant="permanent"
          anchor="left"
          open={true}
          PaperProps={{
            style: {
              border: "none",
              // width: "300px",
              position: "static",
              paddingTop: "40px",
            },
          }}
        >
          <Typography variant="body1" color="gray">
            Learning Track
          </Typography>

          {listData}
        </Drawer>
      ) : (
        <div style={{ position: "relative", maxWidth: "100%" }}>
          <div onClick={toggleDropdown} style={{ maxWidth: "100%" }}>
            <Typography variant="body1" color="gray">
              Learning Track
            </Typography>
            <List component="nav" style={{ maxWidth: "100%" }}>
              <ListItem
                button
                sx={{
                  margin: "0px",
                  padding: "0px",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="subtitle2">{pathwayName}</Typography>
                <ListItemIcon>
                  <ExpandMoreIcon />
                </ListItemIcon>
              </ListItem>
            </List>
          </div>
          {isOpen && (
            <div
              sx={{
                transform: "translate(0%, 0%)",
                width: "100%",
                bgcolor: "background.paper",
                boxShadow: 24,
                padding: "0px 0px",
              }}
            >
              {/* <Divider /> */}
              {listData}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default DrawerLeft;
