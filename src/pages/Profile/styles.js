import { makeStyles } from "@material-ui/styles";
import Image from "./assest/profilebackground.jpg";
const useStyles = makeStyles(() => ({
  backGround: {
    backgroundImage: `url(${Image})`,
    minwidth: "100%",
    justifyContent: "center",
    textAlign: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    minHeight: "35vh",
    position: "relative",
  },
  profileBox: {
    marginTop: "83vh",
    position: "absolute",
  },
  profileDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  editText: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginLeft: 20,
  },
  saveEdit: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));
export default useStyles;
