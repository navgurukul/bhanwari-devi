import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  chatNameBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "59px",
    padding: "16px 32px 16px 32px",
    boxSizing: "border-box",
    position: "sticky",
  },
  chatLeftWrapper: {
    display: "flex",
    width: "40%",
    alignItems: "center",
  },
  chatName: {
    fontSize: "18px",
  },
  chatDot: {
    color: "#6d6d6d",
    width: "4px",
    height: "4px",
    margin: "0 8px 0 8px",
  },
  chatInfo: {
    width: "20px",
    height: "20px",
    color: "#2196f3",
    cursor: "pointer",
  },
  chatExit: {
    color: "#f44336",
    cursor: "pointer",
    width: "18px",
    height: "18px",
  },
}));

export default useStyles;
