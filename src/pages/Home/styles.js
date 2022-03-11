import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "50px",
    backgroundColor: "#fff",
  },
  cardGrid: {
    padding: "10px 0",
    marginTop: "20px",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "15px 0px 0px 0px",
  },

  cardContent: {
    flexGrow: 1,
  },

  engineerPopupCard: {
    padding: "10px 45px 5px 0px",
    width: "300px",
    marginRight: "60px",
  },

  typingPopupCard: {
    marginLeft: "60px",
  },

  LearningBtn: {
    width: "256px",
    borderRadius: "8px",
  },
  playstoreImg: {
    width: "18px",
  },
  downloadBtn: {
    marginLeft: "10px",
  },
}));

export default useStyles;
