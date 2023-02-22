import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  logo: {
    padding: "0px 8px 0px 16px",
    marginBottom: "20px",
  },
  meraki: {
    padding: "20px 8px",
  },
  socialMedia: {
    paddingLeft: "9px",
  },
  image: {
    padding: "0px 8px",
  },
  content: {
    padding: "10px 10px 0px 16px",
    width: "300px",
  },
  hover: {
    "&:hover": {
      color: "#48a145",
    },
  },
  link: {
    textDecoration: "none",
  },
  CareerNDoner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    "&:hover": {
      color: "#48a145",
    },
  },
}));

export default useStyles;
