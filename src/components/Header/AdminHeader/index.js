import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import HeaderNavLink from "../HeaderNavlink";
import SearchHeader from "../SearchHeader";
import Message from "../../common/Message";
import { PATHS } from "../../../constant";
import SearchPopup from "../../SearchBar/SearchPopup";

function AdminHeader({ leftDrawer, toggleDrawer }) {
  const user = useSelector(({ User }) => User);
  const partnerGroupId = user.data.user.partner_group_id;

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
        {/* <HeaderNavLink
          to={PATHS.USER}
          text={<Message constantKey="STUDENTS" />}
          toggleDrawer={toggleDrawer}
        /> */}
        <HeaderNavLink
          to={PATHS.CLASS}
          text={<Message constantKey="CLASSES" />}
          toggleDrawer={toggleDrawer}
        />

        <HeaderNavLink
          to={PATHS.TUTOR}
          text={<Message constantKey="TUTOR" />}
          toggleDrawer={toggleDrawer}
        />

        {/* <HeaderNavLink
          to={PATHS.VOLUNTEER}
          text={<Message constantKey="VOLUNTEERS" />}
          toggleDrawer={toggleDrawer}
        /> */}
        <HeaderNavLink
          to={PATHS.PARTNERS}
          text={<Message constantKey="PARTNERS" />}
          toggleDrawer={toggleDrawer}
        />
        {partnerGroupId && (
          <HeaderNavLink
            to={`${PATHS.STATE}/${partnerGroupId}`}
            text={
              <Message
                constantKey={partnerGroupId ? "STATEPARTNER" : "DASHBOARD"}
              />
            }
            toggleDrawer={toggleDrawer}
          />
        )}
      </Box>
      {!leftDrawer && <SearchPopup />}
    </>
  );
}

export default AdminHeader;
