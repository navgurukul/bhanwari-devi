import React from "react";
import { DropDown, MobileDropDown } from "../DropDown";
import { Box, Typography, MenuItem } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import HeaderNavLink from "../HeaderNavlink";
import SearchHeader from "../SearchHeader";
import Message from "../../common/Message";
import { PATHS } from "../../../constant";
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

function CommonLeftStudentHeader({ toggleDrawer }) {
  return (
    <>
      <HeaderNavLink
        to={PATHS.NEW_USER_DASHBOARD}
        text={<Message constantKey="DASHBOARD" />}
        toggleDrawer={toggleDrawer}
      />
      <HeaderNavLink
        to={PATHS.MENTOR}
        text={<Message constantKey="MENTOR" />}
        toggleDrawer={toggleDrawer}
      />
    </>
  );
}

function StudentHeader({ leftDrawer, toggleDrawer, onlyRole }) {
  const [learn, setLearn] = React.useState(null);
  const handleOpenLearn = (event) => {
    setLearn(event.currentTarget);
  };

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
        <MenuItem onClick={handleOpenLearn} onMouseEnter={handleOpenLearn}>
          <Typography variant="subtitle1">
            <Message constantKey={MENU_ITEMS[LEARN_KEY].msgKey} />
          </Typography>
          {learn ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </MenuItem>
        <DropDown
          dropDown={LEARN_KEY}
          indicator={learn}
          handleClose={handleCloseLearn}
          toggleDrawer={toggleDrawer}
        />

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
        {!leftDrawer && <SearchHeader />}

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
