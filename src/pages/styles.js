import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    spacing: 0,
    display: "flex",
    direction: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  },
  card: {
    minWidth: "40vh",
    minHeight: "20vh",
    maxWidth: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#91C642",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
  },
  button: {
    backgroundColor: "#D63447",
    minWidth: "20vh",
  },
  loginText: {
    color: "#ffffff",
    fontWeight: 700,
    fontFamily: "Nunito",
  },
  swap: {
    fontSize: 12,
    fontWeight: 500,
    fontFamily: "Nunito",
    paddingTop: 5,
  },
});

export default useStyles;
