import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(
  () => ({
    infoContainer: {
      boxSizing: "border-box",
      background: "#F5F5F5",
      padding: "32px",
      overflow: "auto",
      borderTop: "1px solid #ddd",
      width: (props) => (props.desktop ? "384px" : "100vw"),
      minWidth: "250px",
      maxWidth: "400px",
    },

    //Title, Subtitle and Avatar
    header: {
      height: "25%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },

    title: {
      fontSize: "18px !important",
      fontWeight: "700 !important",
      lineHeight: "27px !important",
      marginTop: "16px !important",
    },

    subtitleWrapper: {
      display: "flex",
      alignItems: "center",
      marginTop: "4px",
    },
    subtitle: {
      fontSize: "14px !important",
      fontWeight: "400 !important",
      color: "#6D6D6D",
      lineHeight: "21px !important",
      textAlign: "center",
    },
    dot: {
      width: "4px !important",
      height: "4px !important",
      margin: "0 8px",
      color: "#6D6D6D",
    },
    backIcon: {
      width: "14px !important",
      height: "18px !important",
    },
    //Notification

    notificationContainer: {
      display: "flex",
      alignItems: "center",
    },
    bellIcon: {
      color: "#2E2E2E",
      height: "20px",
      width: "16px",
    },
    muteWrapper: {
      paddingLeft: "13px"
    },
    muteText: {
      fontSize: "14px !important",
      lineHeight: "21px !important",
    },
    muted: {
      fontSize: "12px !important",
      fontWeight: "400 !important",
      color: "#6D6D6D",
      marginTop: "8px !important",
    },
    toggleWrapper: {
      marginLeft: "auto",
    },

    //Members List
    listContainer: {},
    participantText: {
      marginTop: "30px !important",
      fontSize: "14px !important",
      lineHeight: "21px !important",
      marginBottom: "20px !important",
    },
    nameContainer: {
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      marginTop: "16px",
    },
    nameText: {
      fontSize: "14px !important",
      lineHeight: "21px !important",
      fontWeight: "400 !important",
      marginLeft: "16px !important",
    },

    modalContainer: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      padding: "32px",
      bgcolor: "#FFF",
      borderRadius: "8px",
      boxShadow: 24,
      p: 4,
    },
    modalTitle: {
      fontSize: "18px",
      marginBottom: "18px",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "flex-end",
    },
    cancelButton: {
      color: "#2E2E2E !important",
      fontSize: "18px",
      marginLeft: "32px",
    },
    muteButton: {
      fontSize: "18px",
    },
  }),
  { index: 1 }
);

export default useStyles;