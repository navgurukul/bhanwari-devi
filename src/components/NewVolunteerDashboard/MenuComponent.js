import React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box } from "@mui/system";
import useStyles from "./style";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "../../theme/constant";
const MenuComponent = (props) => {
  const classes = useStyles();
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

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
          sx: {
            width: "15ch",
            boxShadow: "none",
            ml: isActive ? "-9.5px" : "-99.5px",
          },
        }}
      >
        <Box className={classes.menuContainer}>
          <Typography
            // sx={{
            //   width: "128px",
            //   height: "48px",
            //   display: "flex",
            //   flexDirection: "row",
            //   alignItems: "center",
            //   justifyContent: "center",
            //   color: "black",
            //   fontWeight: "400",
            //   fontSize: "14px",
            //   cursor: "pointer",
            // }}
            className={classes.menuTypography}
            onClick={() => {
              setStatusName(itemname);
              setStatusDialog(true);
            }}
          >
            Change Status
          </Typography>
          <Typography className={classes.menuBtn}>Delete</Typography>
        </Box>
      </Menu>
    </div>
  );
};

export default MenuComponent;
