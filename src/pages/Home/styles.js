import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    background: "linear-gradient(90deg, #C1DFC4 0%, #DEECDD 100%)",
    padding: "64px 0px",
  },
  mobileContainer: {
    padding: "32px 0px",
    background: "linear-gradient(90deg, #C1DFC4 0%, #DEECDD 100%)",
  },
  cardGrid: {
    padding: "10px 16px 10px 16px",
    marginTop: "20px",
  },

  heading: {
    padding: "5px 80px 2px 80px",
  },

  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "32px 0px 0px 0px",
    "&:hover": {
      boxShadow:
        "0px 16px 24px rgba(0, 0, 0, 0.06), 0px 6px 30px rgba(0, 0, 0, 0.04), 0px 8px 10px rgba(0, 0, 0, 0.08)",
    },
  },

  imageCard: {
    height: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "32px 0px 0px 0px",
  },

  engineerPopupCard: {
    width: "280px",
    marginRight: "60px",
    // padding: "10px 20px 5px 0px",
    padding: "16px",
  },

  typingPopupCard: {
    marginLeft: "60px",
    width: "250px",
    padding: "16px",
  },

  MerakiEntry: {
    marginTop: "65px",
  },

  ResMerakiEntry: {
    marginTop: "20px",
    padding: "24px 16px",
  },

  LearningBtn: {
    width: "280px",
  },

  responsiveBtn: {
    width: "100%",
  },

  playstoreImg: {
    width: "18px",
  },
  downloadBtn: {
    marginLeft: "10px",
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
}));

export default useStyles;
