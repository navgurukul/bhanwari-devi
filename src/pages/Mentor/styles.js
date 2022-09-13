import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  batchGroupsContainer: {
    boxSizing: "border-box",
    height: "59px",
    padding: "16px 32px 16px 32px",
    position: "sticky",
    backgroundColor: "#FFF",
  },

  batchGroupsName: {
    fontSize: "18px",
  },

  chatContainer: {
    display: "flex",
    height: "calc(100vh - 112px)",
    position: "relative",

    "& ::-webkit-scrollbar": {
      display: "none",
    },

    "@media screen and (max-width: 768px)": {
      maxWidth: "100vw",
      width: "100vw",
      height: "calc(100vh - 104px)",
    },
  },

  roomNavsContainer: {
    position: "relative",
    zIndex: 1,
    width: "20vw",
    minWidth: "250px",
    maxWidth: "400px",
    padding: 0,
    margin: 0,
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    overflowY: "scroll",

    "@media screen and (max-width: 768px)": {
      maxWidth: "100vw",
      width: "100vw",
      height: "calc(100vh - 104px)",
    },
  },

  roomChat: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    maxHeight: "calc(100vh - 112px)",
    overflow: "auto",

    "& ::-webkit-scrollbar": {
      display: "none",
    },

    "& a:link": {
      color: "#48a145",
      backgroundColor: "transparent",
    },

    "a:visited": {
      color: "#48a145",
      backgroundColor: "transparent",
    },

    "@media screen and (max-width: 768px)": {
      maxHeight: "calc(100vh - 104px)",
    },

    "@media screen and (min-width: 768px)": {
      borderLeft: "1px solid #ddd",
    },
  },
}));

export default useStyles;
