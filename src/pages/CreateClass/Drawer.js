import React, { useState } from "react";
import { useSelector } from "react-redux";

import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../theme/constant";
import useStyles from "./styles";

function DrawerLeft({
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
  const classes = useStyles();

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
      {/* left drawer for Learning track  */}
      {!isActive ? (
        <Drawer
          variant="permanent"
          anchor="left"
          open={true}
          PaperProps={{
            style: {
              border: "none",
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
          {/* Learning Track dropdown for mobile  viwes*/}

          <div onClick={toggleDropdown} style={{ maxWidth: "100%" }}>
            <Typography variant="body1" color="gray">
              Learning Track
            </Typography>

            <List component="nav" style={{ maxWidth: "100%" }}>
              <ListItemButton className={classes.listButton}>
                <Typography variant="subtitle2">{pathwayName}</Typography>

                <ListItemIcon>
                  <ExpandMoreIcon />
                </ListItemIcon>
              </ListItemButton>
            </List>
          </div>

          {isOpen && (
            <div className={classes.drawerList}>
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
