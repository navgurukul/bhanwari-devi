import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: "black",
  },
  box: {
    padding: "20px 0px 0px 20px",
  },
  mobileBox: {
    width: 415,
    height: 750,
  },
  RightBox: {
    flexGrow: 1,
    display: { xs: "flex", md: "none" },
  },
  crossIcon: {
    flexGrow: 0,
    paddingRight: "50px",
  },
  meraki: {
    flexGrow: 1,
    // display: { xs: "flex", md: "none" },
  },
  merakiLearn: {
    flexGrow: 0,
    display: { xs: "none", md: "flex" },
  },
}));

export default useStyles;
