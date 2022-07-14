import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles(() => ({
  profileBox: {
    transform: "translateY(-50px)",
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
}));
export default useStyles;