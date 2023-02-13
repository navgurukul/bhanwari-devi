import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles(() => ({
  profileBox: {
    paddingTop: "72px",
  },
  imageContainer: {
    width: "100%",
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
