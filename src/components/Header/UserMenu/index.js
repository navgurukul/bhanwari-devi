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

// function UserMenu({ profile }) {
function UserMenu() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(({ User }) => User);
  const profilePict = user?.data?.user?.profile_picture;

/*
  React.useEffect(() => {
    sendToken({ token: user.data.token }).then((res) => {
      setProfile(res.data.user.profile_picture);
    });
  }, []);
*/

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <Avatar alt="Remy Sharp" src={profilePict} />
      </IconButton>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <NavLink to={PATHS.PROFILE} className={classes.link}>
          <MenuItem
            onClick={handleCloseUserMenu}
            sx={{ width: 120, margin: "0px 10px" }}
          >
            <Typography textAlign="center">
              <Message constantKey="PROFILE" />
            </Typography>
          </MenuItem>
        </NavLink>
        <Link
          onClick={() => dispatch(userActions.logout())}
          className={classes.link}
        >
          <MenuItem
            onClick={handleCloseUserMenu}
            sx={{ width: 120, margin: "0px 10px" }}
          >
            <Typography textAlign="center" color="error">
              <Message constantKey="LOGOUT" />
            </Typography>
          </MenuItem>
        </Link>
      </Menu>
    </Box>
  );
}

export default UserMenu;