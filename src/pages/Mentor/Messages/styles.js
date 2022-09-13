import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  messages: {
    flex: 1,
    backgroundColor: "white",
    borderTop: "1px solid #ddd",
    padding: "0 40px",
    display: "flex",
    flexDirection: "column-reverse",
    wordBreak: "break-word",
    maxHeight: "calc(100vh - 112px)",
    overflow: "auto",

    "@media screen and (max-width: 768px)": {
      maxHeight: "calc(100vh - 104px)",
      padding: "0 16px",
    },
  },

  messagesContainer: {
    "& ::-webkit-scrollbar": {
      display: "none",
    },
  },

  messagesContent: {
    display: "flex",
    flexDirection: "column",
  },

  messagesDayMarker: {
    fontWeight: 400,
    color: "#6d6d6d",
    fontSize: "14px",
    margin: "12px 0",
    alignSelf: "center",
    borderRadius: "4px",
    padding: "8px",
  },
}));

export default useStyles;
