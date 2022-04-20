import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  cardSubtitle: {
    color: "#818181",
    paddingBottom: 2,
  },
  pathwayContainer: {
    marginTop: 40,
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
    paddingTop: 40,
  },
  Box1: {
    marginTop: 20,
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
    background: "#EEF1F5",
    m: "15px",
    ml: "35px",
    height: "200px",
  },
  pathwayLink: {
    textDecoration: "none",
  },
  pathwayCard: {
    margin: "15px 0",
    "&:hover": {
      boxShadow:
        "0px 16px 24px rgba(0, 0, 0, 0.06), 0px 6px 30px rgba(0, 0, 0, 0.04), 0px 8px 10px rgba(0, 0, 0, 0.08)",
    },
  },
  courseImage: {
    objectFit: "cover",
    width: "100%",
    height: "200px",
    borderRadius: "8px",
  },
  courseTitleNumber: {
    display: "flex",
    alignItems: "baseline",
    paddingTop: "16px",
  },
}));

export default useStyles;
