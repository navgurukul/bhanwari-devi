import React from "react";
import python from "./asset/python.svg";
import typing from "./asset/typing.svg";
import web from "./asset/web.svg";
import language from "./asset/language.svg";
import softSkills from "./asset/softSkills.svg";
import random from "./asset/random.svg";
import { Link } from "react-router-dom";
import { PATHS } from "../../constant";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useStyles from "./styles";
import "./styles.scss";
import {
  CardMedia,
  Typography,
  Menu,
  MenuItem,
  CardContent,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

const students = {
  image: [python, typing, web, language, softSkills, random],
  Learn: [
    "Python",
    "Typing Guru",
    "JavaScript",
    "English",
    "Soft Skills",
    "Open Courses",
  ],
  About: ["Meraki Team", "Alumni"],
  GetInvolved: ["Become a Partner", "Become a Volunteer", "Donate", "Careers"],
};

export const MobileDropDown = ({ Menu }) => {
  const classes = useStyles();
  return (
    <>
      <Accordion elevation={0} sx={{ bgcolor: "#e9f5e9" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ width: 380 }}
        >
          <Typography variant="body1">{Menu}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {students[Menu.split(" ").join("")].map((menu, index) => (
            <Link to={PATHS.COURSE} className={classes.link}>
              <MenuItem key={index}>
                {Menu === "Learn" && (
                  <img src={students.image[index]} alt="course logo" />
                  // <CardMedia
                  //   image={students.image[index]}
                  //   loading="lazy"
                  //   sx={{ padding: "15px" }}
                  // />
                )}
                <CardContent>
                  <Typography textAlign="center" variant="body1">
                    {menu}
                  </Typography>
                </CardContent>
              </MenuItem>
            </Link>
          ))}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

// const students = {
//   image: [python, typing, web, language, softSkills, random],
//   Learn: [
//     "Python",
//     "Typing Guru",
//     "JavaScript",
//     "English",
//     "Soft Skills",
//     "Open Courses",
//   ],
//   LearnLink: ["COURSE", "COURSE", "COURSE", "COURSE", "COURSE", "COURSE"],
//   About: ["Meraki Team", "Alumni"],
//   AboutLink: ["COURSE", "COURSE"],
//   GetInvolved: ["Become a Partner", "Become a Volunteer", "Donate", "Careers"],
//   GetInvolvedLink: ["COURSE", "COURSE", "COURSE"],
// };

// export const MobileDropDown = ({ Menu, path }) => {
//   const classes = useStyles();
//   const role = {
//     admin: "PARTNER",
//     volunteer: "CLASS",
//     partner: "PARTNER",
//   };
//   const dropDown =
//     typeof Menu === "string" ? students[Menu.split(" ").join("")] : Menu;

//   const link = typeof Menu === "string" && students[path.split(" ").join("")];
//   return (
//     <>
//       <Accordion elevation={0} sx={{ bgcolor: "#e9f5e9" }}>
//         <AccordionSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel1a-content"
//           id="panel1a-header"
//           sx={{ width: 380 }}
//         >
//           <Typography>
//             {typeof Menu === "string" ? Menu : "Switch Views"}
//           </Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           {dropDown.map((menu, index) => (
//             <Link
//               to={PATHS.COURSE}
//               // to={typeof Menu === "string" ? PATHS.link : PATHS.role[menu]}
//               className={classes.link}
//             >
//               {console.log("link", role[menu])}
//               <MenuItem key={index}>
//                 {Menu === "Learn" && (
//                   <CardMedia
//                     image={students.image[index]}
//                     loading="lazy"
//                     sx={{ padding: "15px" }}
//                   />
//                 )}
//                 <CardContent>
//                   <Typography textAlign="center">{menu}</Typography>
//                 </CardContent>
//               </MenuItem>
//             </Link>
//           ))}
//         </AccordionDetails>
//       </Accordion>
//     </>
//   );
// };

export const DropDown = ({
  dropDown,
  indicator,
  handleClose,
  toggleDrawer,
}) => {
  const classes = useStyles();
  return (
    <Menu
      sx={{ mt: "45px" }}
      id="menu-appbar"
      anchorEl={indicator}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={Boolean(indicator)}
      onClose={handleClose}
    >
      {dropDown &&
        students[dropDown].map((menu, index) => (
          <>
            <Link
              to={PATHS.COURSE}
              className={classes.link}
              onClick={toggleDrawer && toggleDrawer(false)}
            >
              <MenuItem key={menu} onClick={handleClose} sx={{ padding: 1 }}>
                {dropDown === "Learn" && (
                  <img src={students.image[index]} alt="course logo" />
                )}
                {/* <CardContent> */}
                <Typography
                  textAlign="center"
                  sx={{ paddingLeft: dropDown === "Learn" && 2 }}
                >
                  {menu}
                </Typography>
                {/* </CardContent> */}
              </MenuItem>
            </Link>
            {dropDown === "Learn" && index == 4 && <Divider />}
          </>
        ))}
    </Menu>
  );
};
