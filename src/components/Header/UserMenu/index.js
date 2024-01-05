import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions as userActions } from "../../User/redux/action";
import { PATHS } from "../../../constant";
import { Link, NavLink } from "react-router-dom";
import {
  Box,
  IconButton,
  Typography,
  Menu,
  Avatar,
  MenuItem,
} from "@mui/material";
import useStyles from "../styles";
import Message from "../../common/Message";
import DropDownMenu from "../DropDownMenu";

function UserMenu() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(({ User }) => User);
  const profilePict = user?.data?.user?.profile_picture;
  const name = user?.data?.user?.name;

  return (
    <Box sx={{ flexGrow: 0 }}>
      <DropDownMenu
        DropDownButton={
          <IconButton sx={{ p: 0 }}>
            <Avatar alt={name} src={profilePict} />
          </IconButton>
        }
        menuContainerProps={{
          // sx: { mt: '45px' },
          id: "menu-appbar",
        }}
        attachRight
      >
        <NavLink to={PATHS.PROFILE} className={classes.link}>
          <MenuItem
            /*onClick={handleCloseUserMenu}*/
            sx={{ width: 150, margin: "0px 13px" }}
          >
            <Typography textAlign="center">
              <Message constantKey="PROFILE" />
            </Typography>
          </MenuItem>
        </NavLink>

        <NavLink to={PATHS.OPPORTUNITIES} className={classes.link}>
          <MenuItem
            /*onClick={handleCloseUserMenu}*/
            sx={{ width: 150, margin: "0px 13px" }}
          >
            <Typography textAlign="center">Opportunities</Typography>
          </MenuItem>
        </NavLink>
        <Link
          to={PATHS.LOGIN}
          onClick={() => dispatch(userActions.logout())}
          className={classes.link}
        >
          <MenuItem
            /*onClick={handleCloseUserMenu}*/
            sx={{ width: 150, margin: "0px 13px" }}
          >
            <Typography textAlign="center" color="error">
              <Message constantKey="LOGOUT" />
            </Typography>
          </MenuItem>
        </Link>
      </DropDownMenu>
    </Box>
  );
}

export default UserMenu;
