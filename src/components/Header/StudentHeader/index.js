import React from "react";
import { Link } from "react-router-dom";
import { DropDown, MobileDropDown } from "../DropDown";
import { Box, Typography, Menu, MenuItem, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import HeaderNavLink from "../HeaderNavlink";
import SearchHeader from "../SearchHeader";
import Message from "../../common/Message";
import { PATHS } from "../../../constant";
import TextButtonDropDownMenu from "../TextButtonDropDownMenu";
import {
  LEARN_KEY,
  MENU_ITEMS,
  // ROLES,
  // ADMIN_ROLE_KEY as ADMIN,
  // PARTNER_ROLE_KEY as PARTNER,
  // PARTNER_VIEW_ROLE_KEY as PARTNER_VIEW,
  // PARTNER_EDIT_ROLE_KEY as PARTNER_EDIT,
  // STUDENT_ROLE_KEY as STUDENT,
  // VOLUNTEER_ROLE_KEY as VOLUNTEER,
} from "../constant";
import SearchPopup from "../../SearchBar/SearchPopup";

function CommonLeftStudentHeader({ toggleDrawer }) {
  return (
    <>
      <HeaderNavLink
        to={PATHS.NEW_USER_DASHBOARD}
        text={<Message constantKey="DASHBOARD" />}
        toggleDrawer={toggleDrawer}
      />
      <HeaderNavLink
        to={PATHS.SCRATCH}
        new_nav_tab={true}
        text={<Message constantKey="SCRATCH" />}
        toggleDrawer={toggleDrawer}
      />
    </>
  );
}

function StudentHeader({ leftDrawer, toggleDrawer, onlyRole }) {
  const [learn, setLearn] = React.useState(null);

  const handleCloseLearn = () => {
    setLearn(null);
  };

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: {
            xs: "none",
            md: "flex",
          },
        }}
      >
        <TextButtonDropDownMenu
          btnTextMsgKey={MENU_ITEMS[LEARN_KEY].msgKey}
          // attachRight={!leftDrawer}
          menuContainerProps={{
            id: "menu-appbar",
          }}
          sx={{ color: "black" }}
        >
          <DropDown dropDown={LEARN_KEY} toggleDrawer={toggleDrawer} />
        </TextButtonDropDownMenu>

        <CommonLeftStudentHeader toggleDrawer={toggleDrawer} />
      </Box>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        <MobileDropDown
          menuKey={LEARN_KEY}
          handleClose={handleCloseLearn}
          toggleDrawer={toggleDrawer}
        />
        <CommonLeftStudentHeader toggleDrawer={toggleDrawer} />
      </Box>

      <Box
        sx={{
          display: { xs: "block", md: "flex" },
          justifyContent: { xs: "normal", md: "flex-end" },
          width: { xs: 0, sm: "100%" },
          pr: onlyRole && 2,
        }}
      >
        {!leftDrawer && <SearchPopup />}

        {/* <HeaderNavLink
          to={PATHS.ADMISSION}
          text={<Message constantKey="NAVGURUKUL_ADMISSION" />}
          toggleDrawer={toggleDrawer}
        />
        <HeaderNavLink
          to={PATHS.OPPORTUNITIES}
          text={<Message constantKey="OPPORTUNITIES" />}
          toggleDrawer={toggleDrawer}
        /> */}
      </Box>
    </>
  );
}

export default StudentHeader;
