import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(
  () => ({
    infoContainer: {
      boxSizing: "border-box",
      width: "360px",
      background: "#F5F5F5",
      padding: "32px",
      overflow: "auto",
      borderTop: "1px solid #ddd",
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

    //Notification

    notificationContainer:{
      display: "flex",
      alignItems: "center",
    },
    bellIcon:{
      color: "#2E2E2E",
      height: "20px",
      width: "16px"
    },
    muteText: {
      fontSize: "14px !important",
      marginLeft: "13px !important",
      lineHeight: "21px !important"
    },
    toggleWrapper: {
      marginLeft: "auto"
    },

    //Members List
    listContainer:{
      
    },
    participantText:{
      marginTop: "30px !important",
      fontSize: "14px !important",
      lineHeight: "21px !important",
      marginBottom: "20px !important"
    },
    nameContainer:{
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      marginTop: "16px"
    },
    nameText:{
      fontSize: "14px !important",
      lineHeight: "21px !important",
      fontWeight: "400 !important",
      marginLeft: "16px !important"
    }
  }),
  { index: 1 }
);

export default useStyles;
