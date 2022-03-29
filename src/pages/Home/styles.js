import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "50px",
  },
  cardGrid: {
    padding: "10px 0",
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
    padding: "15px 0px 0px 0px",
    "&:hover": {
      boxShadow:
        "0px 16px 24px rgba(0, 0, 0, 0.06), 0px 6px 30px rgba(0, 0, 0, 0.04), 0px 8px 10px rgba(0, 0, 0, 0.08)",
    },
  },

  engineerPopupCard: {
    width: "270px",
    marginRight: "60px",
    padding: "10px 20px 5px 0px",
  },

  typingPopupCard: {
    marginLeft: "60px",
    width: "210px",
    padding: "10px 0px 5px 20px",
  },

  LearningBtn: {
    width: "256px",
    height: "48px",
  },

  responsiveBtn: {
    width: "320px",
    height: "48px",
  },

  playstoreImg: {
    width: "18px",
  },
  downloadBtn: {
    marginLeft: "10px",
  },
}));

export default useStyles;
