import { makeStyles } from "@mui/styles";
import { display } from "@mui/system";

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
  EnrollInCourseBox1: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    flexWrap: "wrap",
    marginTop: "50px",
  },
  EnrollInCourseBox2: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  EnrollInCourseCard: {
    align: "right",
    mt: 1,
    maxWidth: 370,
    mb: 10,
  },
  EnrollInCourseFormBox: {
    display: "flex",
    justifyContent: "start",
  },

  DoubtClassLangChip: {
    marginLeft: 10,
    borderRadius: 90,
    height: 30,
  },
  DropOut: {
    display: "flex",
    cursor: "pointer",
    justifyContent: "center",
  },
  DoubtClassInfoSections: {
    padding: "16px",
    marginTop: "16px",
    borderRadius: "20px",
  },
  NeedHelpBoxContant: {
    display: "flex",
    mb: 1,
  },
  ViewClassDetailButtonBox: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  RevisionClassEnrollBox: {
    marginTop: "32px",
    maxWidth: 350,
    align: "right",
    display: "flex",
    justifyContent: "center",
  },
  ReviseCardDates: {
    display: "flex",
    justifyContent: "start",
  },
  UnAvailableRevisionClass: {
    padding: "8px",
    marginBottom: "35px",
  },
}));

export default useStyles;
