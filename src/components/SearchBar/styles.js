import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  course: {
    paddingBottom: 40,
  },
  courseCard: {
    marginBottom: 10,
  },
  box: {
    marginLeft: "16px",
    marginTop: 32,
  },
  courseName: {
    background: "#E9F5E9",
    width: "24px",
    height: "24px",
    borderRadius: "50%",
  },
  pathwayCard: {
    margin: "15px 0",
    "&:hover": {
      boxShadow:
        "0px 16px 24px rgba(0, 0, 0, 0.06), 0px 6px 30px rgba(0, 0, 0, 0.04), 0px 8px 10px rgba(0, 0, 0, 0.08)",
    },
  },
  pathwayLink: {
    textDecoration: "none",
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
