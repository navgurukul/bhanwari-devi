import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  underLine: {
    width: "60px",
    textAlign: "center",
    marginBottom: "30px",
  },
  partnerCard: {
    height: "100% !important",
    width: "100% !important",
  },
  link1: {
    textDecorationLine: "none",
    color: "white",
  },
  link2: {
    textDecorationLine: "none",
    color: "black",
  },
  partnerCardContainer: {
    height: "60px",
  },

  cardsContent: {
    margin: "10px 10px 10px 10px",
  },

  partnerLogo: {
    width: "100%",
  },
}));
export default useStyles;
