import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  cardSubtitle: {
    color: "#818181",
    paddingBottom: 2,
  },
  pathwayContainer: {
    marginTop: 55,
    marginBottom: 48,
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
    paddingBottom: 16,
  },
  courseCard: {
    // marginBottom: 10,
  },
  titleCard: {
    // marginBottom: 30,
    marginLeft: 16,
  },
  titleCardMob: {
    marginBottom: 30,
  },
  flex: {
    display: "flex",
    padding: "16px 0",
  },
  courseName: {
    background: "#E9F5E9",
    width: "24px",
    height: "24px",
    borderRadius: "50%",
  },
  classTitle: {
    padding: "16px",
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
    minWidth: "250px",
    // height: "310px",
    margin: "16px 0",
    "&:hover": {
      boxShadow:
        "0px 16px 24px rgba(0, 0, 0, 0.06), 0px 6px 30px rgba(0, 0, 0, 0.04), 0px 8px 10px rgba(0, 0, 0, 0.08)",
    },
  },

  SupplementalCard: {
    background: "linear-gradient(90deg, #FDFBFB 0%, #EBEDEE 100%)",
    height: "70px",
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

  link: {
    color: "green",
  },

  UpcomingCard: {
    height: "90%",
    cursor: "pointer",
    "&:hover": {
      boxShadow:
        "0px 12px 20px rgba(0, 0, 0, 0.06), 0px 12px 20px rgba(0, 0, 0, 0.04), 0px 12px 20px rgba(0, 0, 0, 0.08)",
    },
  },
  cardContent: {
    height: "60px",
    overflow: "hidden",
  },
  progressBar: {
    width: "95%",
  },
  certButtons: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "32px",
  },
  greenButton: {
    padding: "8px 16px !important",
    borderRadius: "8px !important",
    backgroundColor: "#48A145 !important",
    color: "#FFFFFF !important",
    width: "295px !important",
  },

  pdfFrame: {
    height: "100%",
    width: "100%",
    border: "none",
    outline: "none",
    brackgroundColor: "transparent !important",
  },

  pdfWrapper: {
    height: (props) => (props.isActive ? "200px" : "390px"),
  },
}));

export default useStyles;
