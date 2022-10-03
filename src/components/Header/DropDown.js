import React, { useEffect } from "react";
import python from "./asset/python.svg";
import typing from "./asset/typing.svg";
import web from "./asset/web.svg";
import language from "./asset/language.svg";
import residential from "./asset/residential.svg";
import random from "./asset/random.svg";
import { Link } from "react-router-dom";
import { PATHS, interpolatePath } from "../../constant";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useStyles from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { actions as pathwayActions } from "../PathwayCourse/redux/action";
import ExternalLink from "../common/ExternalLink";
import LaunchIcon from "@mui/icons-material/Launch";
import Message from "../common/Message";
import { LEARN_KEY, ABOUT_KEY, GET_INVOLVED_KEY, MENU_ITEMS } from "./constant";
// import { useContext } from "react";
// import { useLanguageConstants, getTranslationKey } from "../../common/language";
// import { LanguageProvider } from "../../common/context";

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
  image: [python, typing, language, web, residential, random],
  [LEARN_KEY]: [
    { title: "Python", code: "PRGPYT", type: "internal" },
    { title: "Typing", code: "TYPGRU", type: "internal" },
    { title: "Spoken English", code: "SPKENG", type: "internal" },
    { title: "JavaScript", code: "JSRPIT", type: "internal" },

    {
      title: "Residential Programmes",
      path: PATHS.RESIDENTIAL_COURSE,
      type: "internal",
    },
    {
      title: "Miscellaneous Courses",
      path: PATHS.MISCELLANEOUS_COURSE,
      type: "internal",
    },
  ],
  [ABOUT_KEY]: [
    { title: "Our Story", path: PATHS.OUR_STORY, type: "internal" },
    { title: "Meraki Team", path: PATHS.TEAM, type: "internal" },
  ],
  [GET_INVOLVED_KEY]: [
    // {
    //   title: "Become a Partner",
    //   path: PATHS.OUR_PARTNER,
    //   type: "internal",
    // },

    {
      title: <Message constantKey="VOLUNTEER_WITH_US" />,
      path: PATHS.VOLUNTEER_AUTOMATION,
      type: "internal",
    },
    {
      title: "Our Partner",
      path: PATHS.OUR_PARTNER,
      type: "internal",
    },
    {
      title: <Message constantKey="DONATE" />,
      path: "https://www.navgurukul.org/donate",
      type: "external",
    },
    {
      title: "Careers",
      path: "https://recruiterflow.com/navgurukul/jobs",
      type: "external",
    },
  ],
};

export const MobileDropDown = ({ menuKey, handleClose, toggleDrawer }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.Pathways);
  // const { language, MSG } = useLanguageConstants(); //useContext(LanguageProvider);

  useEffect(() => {
    dispatch(pathwayActions.getPathways());
  }, [dispatch]);

  console.log("DP", data?.pathways);
  data?.pathways &&
    (students[LEARN_KEY] = data.pathways.slice(0, students.image.length));

  /*
  data &&
    data.pathways &&
    data.pathways.forEach((pathway) => {
      students.Learn.forEach((item) => {
        if (pathway.code === item.code) {
          item["id"] = pathway.id;
        }
      });
    });
*/
  return (
    <Accordion elevation={0} sx={{ bgcolor: "#e9f5e9" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{ width: 380 }}
      >
        <Typography variant="subtitle1">
          {/*MSG[getTranslationKey(Menu)]*/}
          <Message constantKey={MENU_ITEMS[menuKey].msgKey} />
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {students[menuKey].map((menu, index) => {
          if (menu.type === "internal") {
            return (
              <Link
                to={
                  menu.id
                    ? interpolatePath(PATHS.PATHWAY_COURSE, {
                        pathwayId: menu.id,
                      })
                    : menu.path
                }
                className={classes.link}
                onClick={toggleDrawer && toggleDrawer(false)}
              >
                <MenuItem key={index} onClick={handleClose}>
                  {menuKey === LEARN_KEY && (
                    <img src={students.image[index]} alt="course logo" />
                  )}
                  <CardContent>
                    <Typography textAlign="center" variant="body1">
                      {menu.title}
                    </Typography>
                  </CardContent>
                </MenuItem>
              </Link>
            );
          } else {
            return (
              <ExternalLink
                href={menu.path}
                className={classes.link}
                onClick={toggleDrawer && toggleDrawer(false)}
              >
                <MenuItem key={index} onClick={handleClose}>
                  {menuKey === LEARN_KEY && (
                    <img src={students.image[index]} alt="course logo" />
                  )}
                  <CardContent>
                    <Typography textAlign="center" variant="body1">
                      {menu.title}
                    </Typography>
                  </CardContent>
                  <LaunchIcon />
                </MenuItem>
              </ExternalLink>
            );
          }
        })}
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

  /*
  data &&
    data.pathways &&
    data.pathways.forEach((pathway) => {
      students.Learn.forEach((item) => {
        if (pathway.code === item.code) {
          item.id = pathway.id;
        }
      });
    });
*/

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
      MenuListProps={{ onMouseLeave: handleClose }}
      hideBackdrop
    >
      {dropDown &&
        students[dropDown].map((menu, index) => {
          if (menu.type === "internal") {
            return (
              <>
                <Link
                  to={
                    menu.id
                      ? interpolatePath(PATHS.PATHWAY_COURSE, {
                          pathwayId: menu.id,
                        })
                      : menu.path
                  }
                  className={classes.link}
                  onClick={toggleDrawer && toggleDrawer(false)}
                >
                  <MenuItem
                    key={menu}
                    onClick={handleClose}
                    sx={{
                      padding:
                        dropDown === LEARN_KEY ? "30px 6px 30px 6px" : "10px",
                      margin: "6px 16px 6px 16px",
                    }}
                  >
                    {dropDown === LEARN_KEY && (
                      <img src={students.image[index]} alt="course logo" />
                    )}
                    <Typography
                      textAlign="center"
                      sx={{ paddingLeft: dropDown === LEARN_KEY && 2 }}
                    >
                      {menu.title}
                    </Typography>
                  </MenuItem>
                </Link>
                {dropDown === LEARN_KEY && index == 4 && <Divider />}
              </>
            );
          } else {
            return (
              <>
                <ExternalLink
                  href={menu.path}
                  className={classes.link}
                  onClick={toggleDrawer && toggleDrawer(false)}
                >
                  <MenuItem
                    key={menu}
                    onClick={handleClose}
                    sx={{
                      padding:
                        dropDown === LEARN_KEY ? "30px 6px 30px 6px" : "10px",
                      margin: "6px 16px 6px 16px",
                    }}
                  >
                    {dropDown === LEARN_KEY && (
                      <img src={students.image[index]} alt="course logo" />
                    )}
                    <Typography textAlign="center" sx={{ paddingRight: 1 }}>
                      {menu.title}
                    </Typography>
                    <LaunchIcon />
                  </MenuItem>
                </ExternalLink>
                {dropDown === LEARN_KEY && index == 4 && <Divider />}
              </>
            );
          }
        })}
    </Menu>
  );
};
