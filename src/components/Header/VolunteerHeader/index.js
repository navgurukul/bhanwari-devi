import React from "react";
import { Box } from "@mui/material";
import HeaderNavLink from "../HeaderNavlink";
import SearchHeader from "../SearchHeader";
import Message from "../../common/Message";
import { PATHS } from "../../../constant";

function VolunteerHeader({ leftDrawer, toggleDrawer }) {
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: {
            xs: "block",
            md: "flex",
          },
        }}
      >
        <HeaderNavLink
          to={PATHS.CLASS}
          text={<Message constantKey="CLASSES" />}
          toggleDrawer={toggleDrawer}
        />
      </Box>
      {!leftDrawer && <SearchHeader />}
    </>
  );
}

export default VolunteerHeader;
