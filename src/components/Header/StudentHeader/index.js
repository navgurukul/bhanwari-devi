import React from "react";
import { Box } from "@mui/material";
import HeaderNavLink from "../HeaderNavlink";
import Message from "../../common/Message";
import { PATHS } from "../../../constant";
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
        text={<Message constantKey="SCRATCH" />}
        toggleDrawer={toggleDrawer}
        externalLink="true"
      />
    </>
  );
}

function StudentHeader({ leftDrawer, toggleDrawer, onlyRole }) {
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
      </Box>
    </>
  );
}

export default StudentHeader;
