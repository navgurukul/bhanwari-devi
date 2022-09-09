import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  roomText: {
    marginLeft: "16px",
  },
  list: {
    border: "0px",
    backgroundColor: "#E9F5E9",
  },
  msgNo: {
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    backgroundColor: "#48A145",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default useStyles;
