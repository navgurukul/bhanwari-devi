import { makeStyles } from "@material-ui/styles";
import { backdropClasses } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  loaderNgpageloader: {
    position: "fixed",
    width: " 100%",
    height: "100%",
    top: "0",
    left: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backdropClasses: "blur(5px)",
    //   backdrop-filter: blur(5px);
  },
  loderLoader: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loderIdsEllipsis: {
    display: "inline-block",
    position: "relative",
    width: "70px",
  },
}));
export default useStyles;
