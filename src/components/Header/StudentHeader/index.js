import React from "react";

import { DropDown, MobileDropDown } from "../DropDown";
import { Box } from "@mui/material";
import HeaderNavLink from "../HeaderNavlink";
import Message from "../../common/Message";
import { PATHS } from "../../../constant";
import TextButtonDropDownMenu from "../TextButtonDropDownMenu";
import { LEARN_KEY, MENU_ITEMS } from "../constant";
import SearchPopup from "../../SearchBar/SearchPopup";
import useStyles from "../../Header";

function CommonLeftStudentHeader({ toggleDrawer }) {
  const classes = useStyles();
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
          btnTextMsgKey={MENU_ITEMS[LEARN_KEY]?.msgKey}
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
      </Box>
    </>
  );
}

export default StudentHeader;
