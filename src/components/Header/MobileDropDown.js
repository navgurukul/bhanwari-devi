import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LaunchIcon from "@mui/icons-material/Launch";
import { Typography, MenuItem, CardContent } from "@mui/material";
import AccordionDropDownMenu from "./AccordionDropDownMenu";
import { LEARN_KEY, MENU_ITEMS } from "./constant";
import { PATHS, interpolatePath } from "../../constant";
import { actions as pathwayActions } from "../PathwayCourse/redux/action";
import ExternalLink from "../common/ExternalLink";
import { PATHWAYS_INFO } from "../../constant";
import useStyles from "./styles";
import { students } from "./DropDown";

export const MobileDropDown = ({ menuKey, handleClose, toggleDrawer }) => {
  const classes = useStyles();
  const user = useSelector(({ User }) => User);
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.PathwaysDropdow);

  useEffect(() => {
    dispatch(
      pathwayActions.getPathwaysDropdown({
        authToken: user,
      })
    );
  }, [dispatch, user]);

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
                  <LaunchIcon />
                </CardContent>
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
                  <img src={menu.logo} alt="course logo" />
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
