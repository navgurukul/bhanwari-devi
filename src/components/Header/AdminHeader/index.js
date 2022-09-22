import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import HeaderNavLink from "../HeaderNavlink";
import SearchHeader from "../SearchHeader";
import Message from "../../common/Message";
import { PATHS } from "../../../constant";

function AdminHeader({ leftDrawer, toggleDrawer }) {
  const user = useSelector(({ User }) => User);
  const partnerGroupId = user.data.user.partner_group_id;
  const admin = user.data.user.rolesList.indexOf("admin") > -1;

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
          to={PATHS.VOLUNTEER}
          text={<Message constantKey="VOLUNTEERS" />}
          toggleDrawer={toggleDrawer}
        />
        <HeaderNavLink
          to={PATHS.PARTNERS}
          text={<Message constantKey="PARTNERS" />}
          toggleDrawer={toggleDrawer}
        />
        {/* {partnerGroupId ? (
          <HeaderNavLink
            to={`${PATHS.STATE}/${partnerGroupId}`}
            text={
              <Message
                constantKey={partnerGroupId ? "STATEPARTNER" : "DASHBOARD"}
              />
            }
            toggleDrawer={toggleDrawer}
          />
        ) : (
          admin && (
            <HeaderNavLink
              to={`${PATHS.STATE}/24`}
              text={<Message constantKey="STATEPARTNER" />}
              toggleDrawer={toggleDrawer}
            />
          )
        )} */}
        <HeaderNavLink
          to={`${PATHS.STATE}/23`}
          text={<Message constantKey="STATEPARTNER" />}
          toggleDrawer={toggleDrawer}
        />
      </Box>
      {!leftDrawer && <SearchHeader />}
    </>
  );
}

export default AdminHeader;
