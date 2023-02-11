import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import HeaderNavLink from "../HeaderNavlink";
import SearchHeader from "../SearchHeader";
import Message from "../../common/Message";
import { PATHS } from "../../../constant";
import SearchPopup from "../../SearchBar/SearchPopup";

function PartnerHeader({ leftDrawer, toggleDrawer }) {
  const user = useSelector(({ User }) => User);
  const partnerId = user.data.user.partner_id;
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
        <HeaderNavLink
          to={
            partnerGroupId
              ? `${PATHS.STATE}/${partnerGroupId}`
              : `${PATHS.PARTNERS}/${partnerId}`
          }
          text={
            <Message
              constantKey={partnerGroupId ? "STATEPARTNER" : "DASHBOARD"}
            />
          }
          toggleDrawer={toggleDrawer}
        />
      </Box>
      {!leftDrawer && <SearchPopup />}
    </>
  );
}

export default PartnerHeader;
