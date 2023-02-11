import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  volunteerFlow: {
    paddingTop: "5px",
  },
  volunteerImg: {
    width: "500px",
    paddingLeft: "32px",
  },
  volunteerImg1: {
    width: "350px",
  },
  volunteerCard: {
    border: "1px solid #48A145",
    height: "95%",
    padding: "16px",
    borderRadius: "8px !importent",
    backgroundColor : "red"
  },
  volunteerCard1: {
    border: "1px solid #FFCC00",
    height: "95%",
    padding: "16px",
  },
  volunteerCard2: {
    border: "1px solid #FFCC00",
    height: "95%",
    padding: "16px 16px 0px 16px",
  },
  displayIcon: {
    display: "flex",
    marginTop: "8px",
  },
  IconColor: {
    color: "#6D6D6D",
  },
  TextContent: {
    paddingLeft: "10px",
    // color: "#000000",
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
  classCard: {
    padding: "18px ",
    height: "320px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
}));

export default useStyles;
