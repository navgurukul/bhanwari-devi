import React, { useEffect } from "react";
import python from "./asset/python.svg";
import scratch from "./asset/scratch.svg";
import typing from "./asset/typing.svg";
import web from "./asset/web.svg";
import language from "./asset/language.svg";
import residential from "./asset/residential.svg";
import random from "./asset/random.svg";
import amzbootcamp from "./asset/amzbootcamp.svg";
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
  image: [python, typing, language, web, residential, random, amzbootcamp],
  [LEARN_KEY]: [],
  [ABOUT_KEY]: [
    { title: "Our Story", path: PATHS.OUR_STORY, type: "internal" },
    { title: "Meraki Team", path: PATHS.TEAM, type: "internal" },
  ],
  [GET_INVOLVED_KEY]: [
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
  const user = useSelector(({ User }) => User);
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.Pathways);
  // const { language, MSG } = useLanguageConstants(); //useContext(LanguageProvider);

  useEffect(() => {
    dispatch(
      pathwayActions.getPathways({
        authToken: user,
        // ?.data?.token,
      })
    );
  }, [dispatch, user]);

  // data?.pathways &&
  //   (students[LEARN_KEY] = data.pathways.slice(0, students.image.length));

  const studentLearn = [];

  data &&
    data.pathways &&
    data.pathways.forEach((pathway) => {
      if (pathway.code !== "PRCRSE" || pathway.path) {
        const obj = {
          id: pathway.id || null,
          title: pathway.name || pathway.title,
          description: pathway.description,
          image: pathway.image || pathway.logo || python,
          path: pathway.path || null,
          type: "internal",
        };
        studentLearn.push(obj);
      }
    });
  // students[LEARN_KEY] = studentLearn;
  students[LEARN_KEY] = studentLearn.filter((x) => x.path || x.id);

  return (
    <AccordionDropDownMenu textMsgKey={MENU_ITEMS[menuKey]?.msgKey}>
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
                  <img
                    src={students.image[index] || menu.image}
                    alt="course logo"
                  />
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
  const user = useSelector(({ User }) => User);
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.Pathways);

  useEffect(() => {
    dispatch(
      pathwayActions.getPathways({
        authToken: user,
        // ?.data?.token,
      })
    );
  }, [dispatch, user]);

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
                    <img
                      src={students.image[index] || menu.image}
                      alt="course logo"
                    />
                  )}
                  <Typography
                    textAlign="center"
                    sx={{ paddingLeft: dropDown === LEARN_KEY && 2 }}
                    // component="span"
                  >
                    {menu.title}
                  </Typography>
                </DropdownLink>
                {dropDown === LEARN_KEY &&
                  index === students[dropDown].length - 3 && <Divider />}
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
                {dropDown === LEARN_KEY &&
                  index === students[dropDown].length - 3 && <Divider />}
              </>
            );
          }
        })}
    </>
  );
};
