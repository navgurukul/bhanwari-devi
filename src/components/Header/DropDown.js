import React from "react";
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
import "./styles.scss";
import Divider from "@mui/material/Divider";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import {
  CardMedia,
  Typography,
  Menu,
  MenuItem,
  CardContent,
} from "@mui/material";

const students = {
  // image: [
  //   "./asset/python.svg",
  //   "./asset/typing.svg",
  //   "./asset/web.svg",
  //   "./asset/language.svg",
  //   "./asset/softSkills.svg",
  //   "./asset/random.svg",
  // ],
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

export const MobileDropDown = ({ Menu }) => {
  const classes = useStyles();
  return (
    <>
      {/* {["Learn", "About", "Get Involved"].map((Menu, index) => ( */}
      <Accordion elevation={0} sx={{ bgcolor: "#e9f5e9" }}>
        {/* sx={{ bgcolor: "#e9f5e9" }}> */}
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          //   key={index}
          //   sx={{ bgcolor: "#e9f5e9" }}
        >
          <Typography>{Menu}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {students[Menu.split(" ").join("")].map((menu, index) => (
            <Link to={PATHS.COURSE} className={classes.link}>
              <MenuItem key={index}>
                {Menu === "Learn" && (
                  <CardMedia
                    image={students.image[index]}
                    loading="lazy"
                    sx={{ padding: "15px" }}
                  />
                )}
                <CardContent>
                  <Typography textAlign="center">{menu}</Typography>
                </CardContent>
              </MenuItem>
            </Link>
          ))}
        </AccordionDetails>
      </Accordion>
      {/* ))} */}
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
              to={PATHS.COURSE}
              className={classes.link}
              onClick={toggleDrawer && toggleDrawer(false)}
            >
              <MenuItem key={menu} onClick={handleClose}>
                {dropDown === "Learn" && (
                  <CardMedia
                    image={students.image[index]}
                    loading="lazy"
                    sx={{ padding: "15px" }}
                  />
                )}
                <CardContent>
                  <Typography textAlign="center">{menu}</Typography>
                </CardContent>
              </MenuItem>
            </Link>
            {dropDown === "Learn" && index == 4 && <Divider />}
          </>
        ))}
    </Menu>
  );
};
