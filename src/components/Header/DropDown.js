import React, { useEffect, useState } from "react";
import python from "./asset/python.svg";
import typing from "./asset/typing.svg";
import web from "./asset/web.svg";
import language from "./asset/language.svg";
import softSkills from "./asset/softSkills.svg";
import random from "./asset/random.svg";
import { Link } from "react-router-dom";
import { PATHS, interpolatePath } from "../../constant";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useStyles from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { actions as pathwayActions } from "../PathwayCourse/redux/action";

import {
  Typography,
  Menu,
  MenuItem,
  CardContent,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

const students = {
  image: [python, typing, web, language, softSkills, random],
  Learn: [
    { title: "Python", code: "PRGPYT" },
    { title: "Typing Guru", code: "TYPGRU" },
    { title: "JavaScript", code: "JSRPIT" },
    { title: "English", code: "SPKENG" },
    { title: "Residential" },
    { title: "Open Courses" },
  ],
  About: ["Meraki Team", "Alumni", "Our Story"],
  GetInvolved: ["Become a Partner", "Become a Volunteer", "Donate", "Careers"],
};

export const MobileDropDown = ({ Menu, handleClose, toggleDrawer }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.Pathways);

  useEffect(() => {
    dispatch(pathwayActions.getPathways());
  }, [dispatch]);

  data &&
    data.pathways.forEach((pathway) => {
      students.Learn.forEach((item) => {
        if (pathway.code === item.code) {
          item["id"] = pathway.id;
        }
      });
    });

  return (
    <Accordion elevation={0} sx={{ bgcolor: "#e9f5e9" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{ width: 380 }}
      >
        <Typography variant="body1">{Menu}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {students[Menu.split(" ").join("")].map((menu, index) => (
          <Link
            to={
              Menu === "Learn" && menu.id
                ? interpolatePath(PATHS.PATHWAY_COURSE, {
                    pathwayId: menu.id,
                  })
                : menu.title === "Residential"
                ? PATHS.RESIDENTIAL_COURSE
                : PATHS.MISCELLENEOUS_COURSE
            }
            className={classes.link}
            onClick={toggleDrawer && toggleDrawer(false)}
          >
            <MenuItem key={index} onClick={handleClose}>
              {Menu === "Learn" && (
                <img src={students.image[index]} alt="course logo" />
              )}
              <CardContent>
                <Typography textAlign="center" variant="body1">
                  {Menu === "Learn" ? menu.title : menu}
                </Typography>
              </CardContent>
            </MenuItem>
          </Link>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export const DropDown = ({
  dropDown,
  indicator,
  handleClose,
  toggleDrawer,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.Pathways);

  useEffect(() => {
    dispatch(pathwayActions.getPathways());
  }, [dispatch]);

  data &&
    data.pathways.forEach((pathway) => {
      students.Learn.forEach((item) => {
        if (pathway.code === item.code) {
          item["id"] = pathway.id;
        }
      });
    });

  return (
    <Menu
      sx={{ mt: "45px" }}
      id="menu-appbar"
      anchorEl={indicator}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={Boolean(indicator)}
      onClose={handleClose}
    >
      {dropDown &&
        students[dropDown].map((menu, index) => (
          <>
            <Link
              to={
                dropDown === "Learn" && menu.id
                  ? interpolatePath(PATHS.PATHWAY_COURSE, {
                      pathwayId: menu.id,
                    })
                  : menu.title === "Residential"
                  ? PATHS.RESIDENTIAL_COURSE
                  : PATHS.MISCELLENEOUS_COURSE
              }
              className={classes.link}
              onClick={toggleDrawer && toggleDrawer(false)}
            >
              <MenuItem key={menu} onClick={handleClose} sx={{ padding: 1 }}>
                {dropDown === "Learn" && (
                  <img src={students.image[index]} alt="course logo" />
                )}
                <Typography
                  textAlign="center"
                  sx={{ paddingLeft: dropDown === "Learn" && 2 }}
                >
                  {dropDown === "Learn" ? menu.title : menu}
                </Typography>
              </MenuItem>
            </Link>
            {dropDown === "Learn" && index == 4 && <Divider />}
          </>
        ))}
    </Menu>
  );
};
