import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LaunchIcon from "@mui/icons-material/Launch";
import { Typography, Divider } from "@mui/material";
import DropdownLink from "./DropdownLink";
import { LEARN_KEY, ABOUT_KEY, GET_INVOLVED_KEY } from "./constant";
import { PATHS, interpolatePath } from "../../constant";
import { actions as pathwayActions } from "../PathwayCourse/redux/action";
import Message from "../common/Message";

export const students = {
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
    {
      name: "Careers",
      path: "https://recruiterflow.com/navgurukul/jobs",
      type: "external",
    },
  ],
};

export const DropDown = ({ dropDown, toggleDrawer }) => {
  const user = useSelector(({ User }) => User);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      pathwayActions.getPathwaysDropdown({
        authToken: user,
      })
    );
  }, [dispatch, user]);

  return (
    <>
      {dropDown &&
        students[dropDown].map((menu, index) => {
          if (menu.type === "external") {
            return (
              <>
                <DropdownLink
                  key={menu}
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
