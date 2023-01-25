import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles(() => ({
  profileBox: {
    // transform: "translateY(-50px)",
  },
  imageContainer: {
    width: "100%",
    justifyContent: "left",
    alignItems: "left",
  },

  bgImage: {
    width: "100%",
    objectFit: "cover",
    height: "290px",
    backgroundColor: "pink",
  },
  Right_tick: {
    marginLeft: "8px",
    verticalAlign: "baseline",
  },
  dialog: {
    padding: "40px",
  },
}));
export default useStyles;
