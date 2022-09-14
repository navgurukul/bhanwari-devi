import React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box } from "@mui/system";
import useStyles from "./style";

const MenuComponent = (props) => {
  const classes = useStyles();
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
        <Box className={classes.menuContainer}>
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
