import React, { useEffect, useState } from "react";
import python from "./asset/python.svg";
import typing from "./asset/typing.svg";
import web from "./asset/web.svg";
import language from "./asset/language.svg";
import softSkills from "./asset/softSkills.svg";
import random from "./asset/random.svg";
import { Link } from "react-router-dom";
import { PATHS } from "../../constant";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useStyles from "./styles";
import { METHODS } from "../../services/api";
import { useSelector, useDispatch } from "react-redux";
import { actions as pathwayActions } from "../PathwayCourse/redux/action";

import "./styles.scss";
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
    "Python",
    "Typing Guru",
    "JavaScript",
    "English",
    "Soft Skills",
    "Open Courses",
  ],
  About: ["Meraki Team", "Alumni"],
  GetInvolved: ["Become a Partner", "Become a Volunteer", "Donate", "Careers"],
};

export const MobileDropDown = ({ Menu, handleClose, toggleDrawer }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, data } = useSelector((state) => state.Pathways);

  useEffect(() => {
    dispatch(pathwayActions.getPathways());
  }, [dispatch]);

  let pathways = [];
  data &&
    data.pathways.forEach((pathway) => {
      if (pathway.code !== "PRCRSE") {
        const name =
          pathway["name"][0].toUpperCase() + pathway["name"].slice(1);
        pathways.push({
          id: pathway["id"],
          name: name,
        });
      }
    });

  students.Learn = pathways;
  // console.log("pathways data okayyy!!!", data);

  return (
    <>
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
                Menu === "Learn"
                  ? // ? `${PATHS.COURSE_PATHWAY}/${menu.id}`
                    `pathway/${menu.id}`
                  : PATHS.COURSE
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
                    {Menu === "Learn" ? menu.name : menu}
                  </Typography>
                </CardContent>
              </MenuItem>
            </Link>
          ))}
          {Menu === "Learn" && (
            <>
              <Link
                to={PATHS.COURSE}
                className={classes.link}
                onClick={toggleDrawer && toggleDrawer(false)}
              >
                <MenuItem onClick={handleClose} sx={{ padding: 1 }}>
                  <img src={softSkills} alt="course logo" />
                  <Typography textAlign="center" sx={{ paddingLeft: 2 }}>
                    Soft Skills
                  </Typography>
                </MenuItem>
              </Link>
              <Link
                to={PATHS.COURSE}
                className={classes.link}
                onClick={toggleDrawer && toggleDrawer(false)}
              >
                <MenuItem onClick={handleClose} sx={{ padding: 1 }}>
                  <img src={random} alt="course logo" />
                  <Typography textAlign="center" sx={{ paddingLeft: 2 }}>
                    Open Courses
                  </Typography>
                </MenuItem>
              </Link>
            </>
          )}
        </AccordionDetails>
      </Accordion>
    </>
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
  const { loading, data } = useSelector((state) => state.Pathways);

  useEffect(() => {
    dispatch(pathwayActions.getPathways());
  }, [dispatch]);

  let pathways = [];
  data &&
    data.pathways.forEach((pathway) => {
      if (pathway.code !== "PRCRSE") {
        const name =
          pathway["name"][0].toUpperCase() + pathway["name"].slice(1);
        pathways.push({
          id: pathway["id"],
          name: name,
        });
      }
    });
  students.Learn = pathways;

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
              // to={
              //   dropDown === "Learn"
              //     ? `${PATHS.PATHWAY_COURSE}/${menu.id}`
              //     : PATHS.COURSE
              // }
              to={dropDown === "Learn" ? `pathway/${menu.id}` : PATHS.COURSE}
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
                  {dropDown === "Learn" ? menu.name : menu}
                </Typography>
              </MenuItem>
            </Link>
            {dropDown === "Learn" && index == 4 && <Divider />}
          </>
        ))}
      {dropDown === "Learn" && (
        <>
          <Link
            to={PATHS.COURSE}
            className={classes.link}
            onClick={toggleDrawer && toggleDrawer(false)}
          >
            <MenuItem onClick={handleClose} sx={{ padding: 1 }}>
              <img src={softSkills} alt="course logo" />
              <Typography textAlign="center" sx={{ paddingLeft: 2 }}>
                Soft Skills
              </Typography>
            </MenuItem>
          </Link>
          <Link
            to={PATHS.COURSE}
            className={classes.link}
            onClick={toggleDrawer && toggleDrawer(false)}
          >
            <MenuItem onClick={handleClose} sx={{ padding: 1 }}>
              <img src={random} alt="course logo" />
              <Typography textAlign="center" sx={{ paddingLeft: 2 }}>
                Open Courses
              </Typography>
            </MenuItem>
          </Link>
        </>
      )}
    </Menu>
  );
};

// 383
