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
  },
  team_infoCardContaier: {
    marginTop: "1rem",
    display: "flex",
    flexWrap: "wrap",
    justifContent: "space-between",
    transition: "all ease-in 0.2s",
    pointerEvents: "none",
    marginBottom: "6rem",
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
    marginBottom: "16px",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    alignItems: "center",
    transition: "all ease-in-out 0.2s",
    pointerEvents: "auto",
    "&:hover": {
      transform: "scale(1.1)",
      boxShadow: "none",
      opacity: "1",
      zIndex: "2",
      // boxShadow: "none",
    },
  },
  team_cardImg: {
    borderRadius: "50%",
    width: "120px",
    height: "120px",
    border: "3px solid transparent",
    transition: "all ease-in 0.2s",
    padding: "0px",
    boxSizing: "content-box",
    objectFit: "cover",
    marginBottom: "16px",
  },
  team_mobileCardImg: {
    borderRadius: "50%",
    width: "68px",
    height: "68px",
    border: "3px solid transparent",
    transition: "all ease-in 0.2s",
    padding: "0px",
    boxSizing: "content-box",
    objectFit: "cover",
    marginBottom: "16px",
  },
  team_cardTitle: {
    fontWeight: "bold",
    marginTop: "12px",
    marginBottom: "10px",
  },
  team_cardDescription: {
    color: "#6D6D6D",
    textAlign: "center",
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
