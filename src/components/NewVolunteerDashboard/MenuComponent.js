import React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box } from "@mui/system";

const MenuComponent = (props) => {
  const { itemname, setStatusName, setStatusDialog } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const openDots = anchorEl;
  const handleClickDots = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseDots = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={openDots ? "long-menu" : undefined}
        aria-expanded={openDots ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClickDots}
      >
        <MoreVertIcon sx={{ color: "#BDBDBD" }} />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={openDots}
        onClose={handleCloseDots}
        PaperProps={{
          style: {
            width: "20ch",
            boxShadow: "none",
          },
        }}
      >
        <Box
          style={{
            width: "128px",
            height: "96px",

            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "0px",
            boxShadow:
              "0px 4px 4px rgba(0, 0, 0, 0.06), 0px 8px 12px rgba(0, 0, 0, 0.04), 0px 4px 24px rgba(0, 0, 0, 0.08)",
            borderRadius: "8px",
          }}
        >
          <Typography
            sx={{
              width: "128px",
              height: "48px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              color: "black",
              fontWeight: "400",
              fontSize: "14px",
              cursor: "pointer",
            }}
            onClick={() => {
              setStatusName(itemname);
              setStatusDialog(true);
            }}
          >
            Change Status
          </Typography>
          <Typography
            sx={{
              width: "128px",
              height: "48px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              color: "#F44336",
              fontWeight: "400",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Delete
          </Typography>
        </Box>
      </Menu>
    </div>
  );
};

export default MenuComponent;
