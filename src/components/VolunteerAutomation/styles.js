import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  volunteerFlow: {
    paddingTop: "5px",
  },
  volunteerImg: {
    width: "500px",
    paddingLeft: "50px",
  },
  volunteerCard: {
    border: "1px solid #48A145",
    height: "100%",
    padding: "8px",
  },
  volunteerCard1: {
    border: "1px solid #4548A1",
    height: "100%",
    padding: "8px",
    marginLeft: "10px",
  },
  displayIcon: {
    display: "flex",
  },
  TextContent: {
    paddingLeft: "10px",
  },

  VolunteerHrline: {
    width: "200px",
    height: "4px",
    background: "#2196F3",
  },

  TrackCard: {
    maxWidth: 256,
    height: 171,
    "&:hover": {
      border: "1px solid #48A145",
      boxShadow:
        "0px 16px 24px rgba(0, 0, 0, 0.06), 0px 6px 30px rgba(0, 0, 0, 0.04), 0px 8px 10px rgba(0, 0, 0, 0.08)",
    },
  },
  selectedTrack: {
    boxShadow: "1px 1px 0px #E9F5E9",
    maxWidth: 256,
    height: 171,
    border: "1px solid #48A145",
  },
  TrackButtonBox: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "20px",
  },
  TrackImages: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    flexDirection: "column",
  },
  link: {
    textDecoration: "none",
  },
  backToAllClasses: {
    lineHeight: 1.5,
    fontWeight: 700,
    fontFamily: "Lusitana",
    fontSize: "1.5rem",
  },
}));

export default useStyles;
