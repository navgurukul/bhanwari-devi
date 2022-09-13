import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  /*Message Body */
  messageContent: {
    fontSize: "18px",
    color: "#2E2E2E",
    fontWeight: "400",
  },

  chatMessage: {
    padding: "8px",
    borderRadius: "12px",
    lineHeight: 1.4,
    fontWeight: 500,
    paddingRight: "48px",
    position: "relative",

    "&-other": {
      alignSelf: "flex-start",
      backgroundColor: "#fafafa",
    },

    "&-self": {
      alignSelf: "flex-end",
      backgroundColor: "#e9f5e9",
    },

    "&-action": {
      backgroundColor: "transparent",
      color: "#626667",
      fontStyle: "italic",
      alignSelf: "center",
      boxShadow: "none",
    },

    replyToHeader: {
      marginBottom: "4px",
      display: "flex",
      alignItems: "center",
    },

    replyToContainer: {
      borderLeft: "3px solid #b8bcbd",
      backgroundColor: "#f2f5f2",
      paddingLeft: "10px",
      marginBottom: "10px",
      borderRadius: "12px",
      fontWeight: 400,
    },

    actionsDropdownTriggerContainer: {
      position: "absolute",
      top: "8px",
      right: "12px",
    },

    actionsDropdownTrigger: {
      position: "relative",
      padding: 0,
      margin: 0,
      background: "transparent",
      border: 0,
      fontSize: "18px",
      cursor: "pointer",
    },

    "@media screen and (max-width: 768px)": {
      paddingRight: "16px",
    },
  },

  chatMessageSender: {
    fontSize: "14px !important",
    color: "#48a145",
    lineHeight: "21px",
    marginBottom: "5px !important",

    "&-self": {
      textAlign: "right",
    },
  },

  messageHeader: {
    display: "flex",
    marginBottom: "8px",
    marginTop: "4px",
    justifyContent: "flex-end",
  },

  messageTime: {
    marginRight: "16px",
    color: "#6d6d6d",
    fontSize: "12px",

    "&-other": {
      marginLeft: "16px",
    },
  },

  DropdownDelete: {
    color: "#d63447",
  },
}));

export default useStyles;
