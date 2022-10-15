import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(
  () => ({
    /*Message Body */
    messageContent: {
      fontSize: (props) => (props.desktop ? "18px" : "14px"),
      color: "#2E2E2E",
      fontWeight: "400",
    },
    labelButton: {
      borderRadius: "4px",
      display: "block",
      alignSelf: "flex-start",
      color: "#fff",
      padding: "0 16px",
      height: "60px",
      fontWeight: "bold",
      fontSize: "16px",
      border: 0,
      marginTop: "12px",
      cursor: "pointer",
      minWidth: "200px",
      transition: "background-color 0.2s linear",
      "& hover": {
        backgroundColor: "#48A145",
      },

      "& self": {
        alignSelf: "flex-start",
      },
    },
  }),
  { index: 1 }
);

export default useStyles;
