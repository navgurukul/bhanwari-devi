import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  team_fontNunito: {
    fontFamily: "Nunito Sans",
    fontWeight: "700",
  },
  team_alignRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  image: {
    width: "352px",
    height: "284px",
  },
  team_hrline: {
    width: "160px",
    height: "5px",
    margin: "0",
  },
  team_conainerLeft: {
    display: "flex",
    alignItems: "center",
  },
  team_conainerRight: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  team_button_box: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  team_button_box_mob: {
    // commented code is for button scroll feature
    display: "flex",
    // overflow: "auto",
    // whiteSpace: "nowrap",
    alignItems: "center",
    justifyContent: "space-around",
  },
  team_MobileSelector: {
    padding: "10px 25px",
    borderBottom: "3px solid transparent",
    cursor: "pointer",
  },
  team_selector: {
    padding: "10px 35px",
    borderBottom: "3px solid transparent",
    cursor: "pointer",
  },
  team_containerTopSpace: {
    marginTop: "5rem",
    padding: 0,
  },
  team_infoCardContaier: {
    marginTop: "1rem",
    display: "flex",
    flexWrap: "wrap",
    justifContent: "space-between",
    transition: "all ease-in 0.2s",
    pointerEvents: "none",
    marginBottom: "32px",
  },
  team_responsiveContainer: {
    marginTop: "61px",
    // marginTop: "4rem",
    padding: "0",
  },
  team_infoResponsiveContainer: {
    padding: "0",
    marginTop: "1rem",
    display: "flex",
    flexWrap: "wrap",
    justifContent: "space-between",
    transition: "all ease-in 0.2s",
    pointerEvents: "none",
  },
  team_descriptionPopup: {
    paddingTop: "16px",
    pointerEvents: "all",
    boxShadow:
      "0px 4px 5px rgba(46, 46, 46, 0.06),0px 1px 10px rgba(46, 46, 46, 0.04), 0px 2px 4px rgba(46, 46, 46, 0.08)",
    borderRadius: "10px",
    backgroundColor: "#fff",
    padding: "0 16px",
    width: "300px",
    textAlign: "left",
    zIndex: "9",
    border: "2px solid #48a145",
    boxSizing: "border-box",
    opacity: "1",
  },
  team_cardDetails: {
    position: "relative",
    border: "none",
    marginTop: "32px",
    marginBottom: "16px",
    cursor: "pointer",
    transition: "all ease-in-out 0.2s",
    pointerEvents: "auto",
    "&:hover": {
      cursor: "pointer",
      boxShadow: "none",
      opacity: "1",
      "& $middle": {
        opacity: "92%",
        backgroundColor: "#3A8137",
      },
    },
  },
  middle: {
    opacity: 0,
    position: "absolute",
    width: "100%",
    height: "100%",
    top: "0%",
    left: "0%",
    "& hover": {
      "$ team_cardDetails": {
        opacity: 0.3,
      },
    },
  },

  text: {
    color: "#FFFFFF",
    padding: "16px",
  },

  team_cardImg: {
    width: "256px",
    height: "320px",
    transition: "all ease-in 0.2s",
    boxSizing: "content-box",
    objectFit: "cover",
  },
  team_mobileCardImg: {
    width: "100%",
    height: "312px",
    transition: "all ease-in 0.2s",
    padding: "0px",
    boxSizing: "content-box",
    objectFit: "cover",
  },
  team_cardTitle: {
    fontWeight: "bold",
  },
  team_cardDescription: {
    color: "#6D6D6D",
  },
  team_socialIcon: {
    marginInline: "0.5rem",
  },
  team_popupDetails: {
    display: "flex",
    alignItems: "center",
  },
  team_btn1: { height: "48px", width: "100%" },
  team_btn: { height: "48px", width: "250px" },
}));

export default useStyles;
