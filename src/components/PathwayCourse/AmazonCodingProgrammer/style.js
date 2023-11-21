import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  videoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  video: {
    maxWidth: "100%",
  },
}));
export default useStyles;
