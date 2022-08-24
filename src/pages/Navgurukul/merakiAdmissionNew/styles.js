import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
    marginTop: "60px",
    marginBottom: "70px",
  },
  contentWrapper: {
    display: "flex",
    width: "100%",
    border: "1px red none",
    justifyContent: "spaced-center",
  },
  admissionVideo: {
    width: "544px",
    height: "360px",
    borderRadius: "8px",
    marginBottom: "50%",
  },
  videoWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minWidth: "50%",
  },
  admitionHr: {
    width: " 10%",
    border: " 9px dotted",
    borderStyle: "none none dotted",
    color: "grey",
  },
  admitionHr1: {
    width: " 10%",
    border: " 6px dotted",
    borderStyle: "none none dotted",
    color: "grey",
  },
  admitionSpacing: {
    marginTop: "47px",
  },
  admitionBottom: {
    paddingBottom: "2%",
  },
  admitionBottom1: {
    paddingBottom: "4%",
  },
  admitionBtn1: {
    width: "auto%",
    height: 50,
  },
  admitionBtn: {
    width: "auto",
    height: 50,
  },
  admitionBtn2: {
    height: 50,
    width: "100%",
  },
}));

export default useStyles;
