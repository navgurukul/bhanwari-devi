import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  underLine: {
    width: "60px",
    textAlign: "center",
    marginBottom: "30px",
  },
  partnerCard: {
    height: "100% !important",
    width: "100%",
  },

  link: {
    paddingLeft: "20px",
    paddingTop: "10px",
    color: "green",
    textDecorationLine: "none",
  },

  partnerLogo: {
    width: "100%",
  },

  link2: {
    textDecorationLine: "none",
    color: "black",
  },
}));
export default useStyles;
