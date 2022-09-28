import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(
  () => ({
    roomText: {
      marginLeft: "16px",
      marginRight: "10px",
      minWidth: "50%",
      textAlign: "left",
      paddingTop: "0",
      width: (props) => props.isActive && 400,
    },

    listItem: {
      minHeight: "84px",
      padding: "16px 32px",
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
    },

    listItemSelected: {
      minHeight: "84px",
      padding: "16px 32px",
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: "#E9F5E9",
    },
    title: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#2E2E2E",
      lineHeight: "24px",
    },
    subtitle: {
      fontSize: "14px",
      color: "#6D6D6D",
      lineHeight: "21px",
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
      fontSize: "12px",
      margin: "auto",
    },
  }),
  { index: 1 }
);

export default useStyles;
