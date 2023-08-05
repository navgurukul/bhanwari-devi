import React, { useEffect } from "react";
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
import { PATHWAYS_INFO } from "../../constant";
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
  [LEARN_KEY]: [],
  [ABOUT_KEY]: [
    { name: "Our Story", path: PATHS.OUR_STORY, type: "internal" },
    { name: "Meraki Team", path: PATHS.TEAM, type: "internal" },
  ],
  [GET_INVOLVED_KEY]: [
    {
      name: <Message constantKey="VOLUNTEER_WITH_US" />,
      path: PATHS.VOLUNTEER_AUTOMATION,
      type: "internal",
    },
    {
      name: "Our Partner",
      path: PATHS.OUR_PARTNER,
      type: "internal",
    },
    // {
    //   name: <Message constantKey="DONATE" />,
    //   path: "https://www.navgurukul.org/donate",
    //   type: "external",
    // },
    {
      name: "Careers",
      path: "https://recruiterflow.com/navgurukul/jobs",
      type: "external",
    },
  ],
};

export const MobileDropDown = ({ menuKey, handleClose, toggleDrawer }) => {
  const classes = useStyles();
  const user = useSelector(({ User }) => User);
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.PathwaysDropdow);
  // const { language, MSG } = useLanguageConstants(); //useContext(LanguageProvider);

  // useEffect(() => {
  //   dispatch(
  //     pathwayActions.getPathwaysDropdown({
  //       authToken: user,
  //     })
  //   );
  // }, [dispatch, user]);

  const miscellaneousPathway = data?.pathways.filter((pathway) =>
    PATHWAYS_INFO.some((miscPathway) => pathway.name === miscPathway.name)
  );
  const pathwayData = data?.pathways
    .filter((pathway) => !miscellaneousPathway.includes(pathway))
    .concat(miscellaneousPathway);

  data?.pathways && (students[LEARN_KEY] = pathwayData);

  return (
    <AccordionDropDownMenu textMsgKey={MENU_ITEMS[menuKey]?.msgKey}>
      {students[menuKey].map((menu, index) => {
        if (menu.type === "external") {
          return (
            <ExternalLink
              href={menu.path}
              className={classes.link}
              onClick={toggleDrawer && toggleDrawer(false)}
            >
              <MenuItem key={index} onClick={handleClose}>
                {menuKey === LEARN_KEY && (
                  <img
                    src={
                      menu.logo.includes("https")
                        ? menu.logo
                        : require("./asset/" + menu.logo + ".svg")
                    }
                    alt="course logo"
                  />
                )}
                <CardContent>
                  <Typography textAlign="center" variant="body1">
                    {menu.name}
                  </Typography>
                </CardContent>
                <LaunchIcon />
              </MenuItem>
            </ExternalLink>
          );
        } else {
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
                    src={
                      menu.logo.includes("https")
                        ? menu.logo
                        : require("./asset/" + menu.logo + ".svg")
                    }
                    alt="course logo"
                  />
                )}
                <CardContent>
                  <Typography textAlign="center" variant="body1">
                    {menu.name}
                  </Typography>
                </CardContent>
              </MenuItem>
            </Link>
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
  const { data } = useSelector((state) => state.PathwaysDropdow);

  // useEffect(() => {
  //   dispatch(
  //     pathwayActions.getPathwaysDropdown({
  //       authToken: user,
  //     })
  //   );
  // }, [dispatch, user]);

  return (
    <>
      {dropDown &&
        students[dropDown].map((menu, index) => {
          if (menu.type === "external") {
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
                    {menu.name}
                  </Typography>
                  <LaunchIcon />
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
                      // src={ menu.logo}

                      src={
                        menu.logo.includes("https")
                          ? menu.logo
                          : require("./asset/" + menu.logo + ".svg")
                      }
                      alt="course logo"
                    />
                  )}
                  <Typography
                    textAlign="center"
                    sx={{ paddingLeft: dropDown === LEARN_KEY && 2 }}
                    // component="span"
                  >
                    {menu.name}
                  </Typography>
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
