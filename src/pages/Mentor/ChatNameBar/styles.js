import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  chatNameBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: (props) => (props.desktop ? "59px" : "82px"),
    padding: (props) =>
      props.desktop ? "16px 32px 16px 24px" : "16px 16px 16px 24px",
    boxSizing: "border-box",
    position: "sticky",
  },

  chatLeftWrapper: {
    display: "flex",
    flexDirection: (props) => (props.desktop ? "row" : "column"),
    width: (props) =>
      props.desktop ? "40%" : props.laptop ? "60%" : props.mobile ? "80%" : "",
    alignItems: (props) => (props.desktop ? "center" : "space-between"),
    marginLeft: (props) => props.mobile && "24px",
    justifyContent: (props) => !props.desktop && "center",
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

  backIcon: {
    width: "12px !important",
    height: "16px !important",
  },
}));

export default useStyles;
