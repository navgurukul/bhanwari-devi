import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  roomText: {
    marginLeft: "16px",
    marginRight: "10px",
    minWidth: "50%",
    textAlign: "left",
  },

  listItem: {
    minHeight: "84px",
    padding: "16px 32px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between !important",
  },

  listItemSelected: {
    minHeight: "84px",
    padding: "16px 32px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between !important",
    backgroundColor: "#E9F5E9",
  },
  title: {
    fontSize: "16px !important",
    color: "#2E2E2E",
    lineHeight: "24px !important",
  },
  subtitle: {
    fontSize: "14px !important",
    color: "#6D6D6D",
    lineHeight: "21px !important",
  },
  /*GREEN CIRCLE*/
  messageNumberCircle: {
    borderRadius: "50%",
    minWidth: "24px",
    minHeight: "24px",
    backgroundColor: "#48A145",
    color: "white",
    left: "32px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  messageNumber: {
    fontSize: "12px !important",
    margin: "auto",
  },
}));

export default useStyles;
