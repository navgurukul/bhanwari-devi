import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  cardSubtitle: {
    color: "#818181",
    paddingBottom: 2,
  },
  mobileVideo: {
    width: 700,
  },
  deskVideo: {
    width: 475,
  },
  heading: {
    paddingBottom: 7,
  },
  box: {
    paddingTop: 23,
  },
  course: {
    paddingBottom: 40,
  },
  courseCard: {
    marginBottom: 10,
  },
  titleCard: {
    marginBottom: 30,
    marginLeft: 16,
  },
  flex: {
    display: "flex",
    padding: "16px 0 16px 0",
  },
  courseName: {
    background: "#E9F5E9",
    width: "24px",
    height: "24px",
    borderRadius: "50%",
  },
  openCourse: {
    // background: linear-gradient(90deg, #E6E9F0 0%, #EEF1F5 100%);,
    background: "grey",
    m: "15px",
    ml: "35px",
    height: "200px",
  },
}));

export default useStyles;
