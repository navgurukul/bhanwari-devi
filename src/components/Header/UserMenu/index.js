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
// import { isTouchScreen } from "../../../common/utils";

// function UserMenu({ profile }) {
function UserMenu() {
  // const [anchorElUser, setAnchorElUser] = React.useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(({ User }) => User);
  const profilePict = user?.data?.user?.profile_picture;
  const name = user?.data?.user?.name;

  /*
  React.useEffect(() => {
    sendToken({ token: user.data.token }).then((res) => {
      setProfile(res.data.user.profile_picture);
    });
  }, []);
*/

  /*
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  */

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
          /*
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
          keepMounted: true,
          transformOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
          */
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
        {/* <NavLink to={PATHS.ADMISSION} className={classes.link}>
          <MenuItem
            onClick={handleCloseUserMenu}
            sx={{ width: 150, margin: "0px 13px" }}
          >
            <Typography textAlign="center">NG Admissions</Typography>
          </MenuItem>
        </NavLink> */}
        <NavLink to={PATHS.OPPORTUNITIES} className={classes.link}>
          <MenuItem
            /*onClick={handleCloseUserMenu}*/
            sx={{ width: 150, margin: "0px 13px" }}
          >
            <Typography textAlign="center">Opportunities</Typography>
          </MenuItem>
        </NavLink>
        <Link
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
