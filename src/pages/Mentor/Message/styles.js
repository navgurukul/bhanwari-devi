import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(
  () => ({
    /*Message Body */
    messageContent: {
      fontSize: (props) => (props.desktop ? "18px" : "14px"),
      color: "#2E2E2E",
      fontWeight: "400",
    },
  }),
  { index: 1 }
);

export default useStyles;