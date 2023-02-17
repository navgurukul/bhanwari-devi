import React, { useEffect } from "react";
import python from "./asset/python.svg";
import scratch from "./asset/scratch.svg";
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
import AccordionDropDownMenu from "./AccordionDropDownMenu";
import ExternalLink from "../common/ExternalLink";
import DropdownLink from "./DropdownLink";
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
  image: [python, scratch, typing, language, web, residential, random],
  [LEARN_KEY]: [
    { title: "Python", code: "PRGPYT", type: "internal" },
    { title: "Scratch (CEL)", code: "SHCEL", type: "internal" },
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
    // {
    //   title: <Message constantKey="DONATE" />,
    //   path: "https://www.navgurukul.org/donate",
    //   type: "external",
    // },
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

  // data?.pathways &&
  //   (students[LEARN_KEY] = data.pathways.slice(0, students.image.length));

  data &&
    data.pathways &&
    data.pathways.forEach((pathway) => {
      students[LEARN_KEY].forEach((item) => {
        if (pathway.code === item.code) {
          item["id"] = pathway.id;
        }
      });
    });

  return (
    <AccordionDropDownMenu textMsgKey={MENU_ITEMS[menuKey].msgKey}>
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
                  <LaunchIcon />
                </CardContent>
              </MenuItem>
            </ExternalLink>
          );
        }
      })}
    </AccordionDropDownMenu>
  );
};

export const DropDown = ({
  dropDown,
  //handleClose,
  toggleDrawer,
  //setInDropdown,
  //handleMouseLeave,
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
    <>
      {dropDown &&
        students[dropDown].map((menu, index) => {
          if (menu.type === "internal") {
            return (
              <>
                <DropdownLink
                  key={menu}
                  //onClick={handleClose}
                  to={
                    menu.id
                      ? interpolatePath(PATHS.PATHWAY_COURSE, {
                          pathwayId: menu.id,
                        })
                      : menu.path
                  }
                  linkOnClick={toggleDrawer && toggleDrawer(false)}
                  padding={
                    dropDown === LEARN_KEY ? "30px 6px 30px 6px" : "10px"
                  }
                  margin="6px 16px"
                >
                  {dropDown === LEARN_KEY && (
                    <img src={students.image[index]} alt="course logo" />
                  )}
                  <Typography
                    textAlign="center"
                    sx={{ paddingLeft: dropDown === LEARN_KEY && 2 }}
                    // component="span"
                  >
                    {menu.title}
                  </Typography>
                </DropdownLink>
                {dropDown === LEARN_KEY && index == 4 && <Divider />}
              </>
            );
          } else {
            return (
              <>
                <DropdownLink
                  key={menu}
                  //onClick={handleClose}
                  to={menu.path}
                  linkOnClick={toggleDrawer && toggleDrawer(false)}
                  padding={
                    dropDown === LEARN_KEY ? "30px 6px 30px 6px" : "10px"
                  }
                  margin="6px 16px"
                  external={true}
                >
                  <Typography
                    textAlign="center"
                    sx={{ paddingRight: 1 }}
                    component="span"
                  >
                    {menu.title}
                  </Typography>
                  <LaunchIcon />
                </DropdownLink>
                {dropDown === LEARN_KEY && index == 4 && <Divider />}
              </>
            );
          }
        })}
    </>
  );
};
