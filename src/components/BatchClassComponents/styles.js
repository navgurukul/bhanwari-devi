import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    padding: "10px 16px 10px 16px",
    marginTop: "20px",
  },
  icons: {
    marginRight: "15px",
    position: "flex-start",
  },
  centere: {
    align: "center",
  },

  Button: {
    paddingRight: "20px",
    paddingBottom: "10px",
  },
  link: {
    textDecoration: "none",
    color: "green",
    cursor: "pointer",
  },
  MoreBatchWrap: {
    display: "flex",
    flexDirection: "column",
    padding: "25px",
  },
  MoreBatchCard: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "20px 0",
    minHeight: "170px",
  },
  ButtonInfo: {
    borderRedius: "90px",
  },
  FlexedContant: {
    display: "flex",
  },
  BatchEnroll2Box: {
    maxWidth: 500,
    mb: 10,
    pt: 3,
    height: 280,
    padding: "15px",
  },
  BatchEnroll2DateNDegree: {
    display: "flex",
    justifyContent: "center",
    padding: "10px 0",
    mb: 1,
  },
  ExerciseBatchClassCard: {
    maxWidth: 350,
  },
}));

export default useStyles;
