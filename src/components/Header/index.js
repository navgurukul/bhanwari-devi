// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import axios from "axios";
// import { METHODS } from "../../services/api";

// import { PATHS } from "../../constant";
// import { actions as userActions } from "../User/redux/action";
// import { hasOneFrom } from "../../common/utils";
// import "./styles.scss";

// const AuthenticatedHeaderOption = () => {
//   const [partnerId, setPartnerId] = useState("");
//   const dispatch = useDispatch();
//   const user = useSelector(({ User }) => User);
//   const rolesList = user.data.user.rolesList;

//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     axios({
//       method: METHODS.GET,
//       url: `${process.env.REACT_APP_MERAKI_URL}/users/me`,
//       headers: {
//         accept: "application/json",
//         Authorization: user.data.token,
//       },
//     }).then((res) => {
//       setPartnerId(res.data.user.partner_id);
//     });
//   }, []);

//   const partnerGroupId = user.data.user.partner_group_id;

//   const canSpecifyPartnerGroupId =
//     hasOneFrom(rolesList, ["admin", "partner", "partner_view"]) &&
//     user.data.user.partner_group_id;

//   const canSpecifyUserBaseRole = rolesList.indexOf("admin") > -1;

//   const canSpecifyPartner =
//     hasOneFrom(rolesList, ["partner", "partner_view", "partner_edit"]) &&
//     partnerId != null;

//   return (
//     <>
//       {canSpecifyUserBaseRole ? (
//         <>
//           <a className="item" href={PATHS.USER}>
//             User
//           </a>

//           <a className="item" href={PATHS.VOLUNTEER}>
//             Volunteers
//           </a>
//           <a className="item" href={PATHS.PARTNERS}>
//             Partners
//           </a>
//         </>
//       ) : null}

//       {canSpecifyPartnerGroupId || canSpecifyPartner ? (
//         <>
//           <a
//             className="item"
//             href={
//               canSpecifyPartnerGroupId
//                 ? `${PATHS.STATE}/${partnerGroupId}`
//                 : `${PATHS.PARTNERS}/${partnerId}`
//             }
//           >
//             Dashboard
//           </a>
//         </>
//       ) : null}

//       {["ADMISSION", "COURSE", "MENTOR", "CLASS", "OPPORTUNITIES", "AFE"].map(
//         (item) => (
//           <MenuOption
//             item={item}
//             className={
//               ["COURSE", "MENTOR", "CLASS"].includes(item)
//                 ? "left-item"
//                 : "item"
//             }
//           />
//         )
//       )}

//       <a>
//         <i
//           class="fa fa-user-circle-o profile-icon"
//           onClick={() => setOpen(!open)}
//         ></i>
//       </a>
//       {open && (
//         <div className="dropdown-wrapper">
//           <ul className="dropdown-menu">
//             <li className="dropdown-menu__item">
//               <a className="item" href={PATHS.PROFILE}>
//                 Profile
//               </a>
//             </li>
//             <li className="dropdown-menu__item">
//               <a
//                 className="logout-btn"
//                 onClick={() => dispatch(userActions.logout())}
//               >
//                 {" "}
//                 Logout
//               </a>
//             </li>
//           </ul>
//         </div>
//       )}
//     </>
//   );
// };

// const AuthenticatedLeftHeaderOption = () => {
//   return (
//     <>
//       {["COURSE", "MENTOR", "CLASS"].map((item) => (
//         <MenuOption item={item} className="item" />
//       ))}
//     </>
//   );
// };

// const PublicMenuOption = () => {
//   return (
//     <>
//       <a className="item" href={PATHS.AFE}>
//         Amazon Partnership
//       </a>
//       <a className="item" href={PATHS.LOGIN}>
//         Login/Signup
//       </a>
//     </>
//   );
// };

// const PublicLeftMenuOption = () => {
//   return (
//     <a className="item" href={PATHS.COURSE}>
//       Courses
//     </a>
//   );
// };

// const MenuOption = (props) => {
//   const NAMES = {
//     COURSE: "Courses",
//     MENTOR: "Mentors",
//     CLASS: "Classes",
//     ADMISSION: "Admission",
//     OPPORTUNITIES: "Opportunities",
//     AFE: "Amazon Partnership",
//   };
//   return (
//     <a className={props.className} href={PATHS[props.item]}>
//       {NAMES[props.item]}
//     </a>
//   );
// };

// function Header() {
//   const { data } = useSelector(({ User }) => User);
//   const isAuthenticated = data && data.isAuthenticated;

//   return (
//     <div className="ng-header ">
//       <input type="checkbox" id="nav-check" />
//       <div className="logo">
//         <a href="/">
//           <div className="meraki-logo" />
//         </a>

//         <div className="option">
//           {isAuthenticated ? (
//             <AuthenticatedLeftHeaderOption />
//           ) : (
//             <PublicLeftMenuOption />
//           )}
//         </div>
//       </div>

//       <div className="dropDown-btn">
//         <label htmlFor="nav-check">
//           <span></span>
//           <span></span>
//           <span></span>
//         </label>
//       </div>

//       <div className="option">
//         {isAuthenticated ? <AuthenticatedHeaderOption /> : <PublicMenuOption />}
//       </div>
//     </div>
//   );
// }

// export default Header;

// import React from "react";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/theme";
import logo from "../../asset/meraki.png";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];
const students = {
  Learn: ["Python", "Typing Guru", "JavaScript", "English", "Soft Skills"],
  About: ["Meraki Team", "Alumni"],
  "Get Involved": [
    "Become a Partner",
    "Become a Volunteer",
    "Donate",
    "Careers",
  ],
};

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [newMenu, setNewMenu] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenMainMenu = (event) => {
    setNewMenu(event.currentTarget);
  };

  const handleCloseMainMenu = () => {
    setNewMenu(null);
  };

  const handleCloseNavMenu = () => {
    //Close it
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" color="primary">
        {/* <Container maxWidth="xl"> */}
        <Container maxWidth="false">
          <Toolbar disableGutters>
            <a href="/">
              <Avatar alt="Remy Sharp" src={logo} />
              {/* <Avatar
                alt="Remy Sharp"
                src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
              /> */}
              {/* <div className="meraki-logo" /> */}
            </a>
            {/* <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            LOGO
          </Typography> */}

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            {/* <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            LOGO
          </Typography> */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {Object.keys(students).map((heading) => (
                <>
                  <Button
                    key={heading}
                    // onClick={handleCloseNavMenu}
                    onClick={handleOpenUserMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {heading}
                  </Button>
                  {Object.values(students).map((subheading) => (
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
                      onClose={handleCloseMainMenu}
                    >
                      {subheading.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseMainMenu}>
                          <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  ))}
                </>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
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
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
