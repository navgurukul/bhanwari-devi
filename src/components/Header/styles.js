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
    height: "100%",
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
  },
  merakiLearn: {
    flexGrow: 0,
    display: { xs: "none", md: "flex" },
  },
  button: {
    textDecoration: "none",
    color: "white",
  },
  bgColor: {
    background: "#e9f5e9",
  },
  active: {
    color: "#48a145",
  },
}));

export default useStyles;
