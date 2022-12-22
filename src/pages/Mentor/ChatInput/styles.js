import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(
  () => ({
    inputContainer: {
      padding: "16px 40px",
      position: "relative",
      display: "flex",
      alignItems: "center",

      "@media screen and (max-width: 768px)": {
        padding: "16px",
      },
    },
    textField: {
      boxSizing: "border-box",
      width: "100%",
      borderRadius: "100px !important",
      [`& fieldset`]: {
        borderRadius: "100px !important",
      },
    },

    arrowIcon: {
      height: "48px !important",
      width: "48px !important",
      cursor: "pointer",
      marginLeft: "15px",
      "@media screen and (max-width: 768px)": {
        right: "30px",
      },
    },

    attachmentIcon: {
      height: "22px",
      width: "11px",
      color: "#6D6D6D",
    },
    smileyIcon: {
      height: "20px",
      width: "20px",
      color: "#6D6D6D",
    },
    /*REPLY SECTION*/
    closeReplyMessage: {
      position: "absolute",
      right: "24px",
      top: "20%",
      transform: "translateY(-50%)",
      fontSize: "24px",
      cursor: "pointer",
    },
    replyTo: {
      display: "flex",
      alignItems: "center",
      color: "#6D6D6D",
      fontSize: "13px",
      marginBottom: "16px",
    },
    replyToIcon: {
      marginLeft: "8px",
      fontSize: "11px",
    },

    replyMessage: {
      padding: "16px",
      borderTop: "1px solid #ddd",
      position: "relative",
    },
    replyMessageContent: {
      display: "flex",
      alignItems: "center",
      marginBottom: "8px",
    },
    replyMessageSenderName: {
      fontWeight: "500",
      marginBottom: "4px",
    },
  }),
  { index: 1 }
);

export default useStyles;