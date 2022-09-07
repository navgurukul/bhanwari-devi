import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  inputContainer: {
    padding: "16px 40px",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  textField: {
    width: "90%",
    height: "48px !important",
    borderRadius: "100px !important",
  },
  "&.MuiOutlinedInput-root": {
    borderRadius: "100px !important",
  },
  arrowIcon: {
    height: "48px !important",
    width: "48px !important",
    cursor: "pointer",
  },
  closeReplyMessage: {
    position: "absolute",
    right: "24px",
    top: "20%",
    transform: "translateY(-50%)",
    fontSize: "24px",
    cursor: "pointer",
  },
}));

export default useStyles;
