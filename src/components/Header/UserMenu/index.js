import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions as userActions } from "../../User/redux/action";
import { PATHS } from "../../../constant";
import { Link, NavLink } from "react-router-dom";
import { Box, IconButton, Typography, Avatar, MenuItem } from "@mui/material";
import useStyles from "../styles";
import Message from "../../common/Message";
import DropDownMenu from "../DropDownMenu";

function UserMenu() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(({ User }) => User);
  const profilePict = useMemo(() => user?.data?.user?.profile_picture, [user]);
  const name = useMemo(() => user?.data?.user?.name, [user]);

  const handleLogout = () => {
    dispatch(userActions.logout());
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <DropDownMenu
        DropDownButton={
          <IconButton sx={{ p: 0 }}>
            <Avatar alt={name} src={profilePict} />
          </IconButton>
        }
        menuContainerProps={{
          id: "menu-appbar",
        }}
        attachRight
      >
        <NavLink to={PATHS.PROFILE} className={classes.link}>
          <MenuItem sx={{ width: 150, margin: "0px 13px" }}>
            <Typography textAlign="center">
              <Message constantKey="PROFILE" />
            </Typography>
          </MenuItem>
        </NavLink>
        <NavLink to={PATHS.OPPORTUNITIES} className={classes.link}>
          <MenuItem sx={{ width: 150, margin: "0px 13px" }}>
            <Typography textAlign="center">Opportunities</Typography>
          </MenuItem>
        </NavLink>
        <Link to={PATHS.LOGIN} onClick={handleLogout} className={classes.link}>
          <MenuItem sx={{ width: 150, margin: "0px 13px" }}>
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
