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
    marginTop: "85vh",
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
    
  },
  saveEdit: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop:'10px'
  },
  
}));
export default useStyles;
