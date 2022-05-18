import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  volunteerFlow: {
    // padding: "80px",
    paddingTop: "5px",
  },
  volunteerImg: {
    width: "500px",
    paddingLeft: "50px",
  },
  volunteerCard: {
    boxShadow: "4px 4px 0px #E9F5E9",
    border: "1px solid #48A145",
    height: "100%",
  },
  volunteerCard1: {
    boxShadow: "4px 4px 0px #DADAEC",
    border: "1px solid #4548A1",
    height: "100%",
  },
  displayIcon: {
    display: "flex",
  },
  TextContent: {
    paddingLeft: "10px",
  },

  AttendClassCard: {
    height: "100%",
  },

  TrackCard: {
    boxShadow: "1px 1px 0px #E9F5E9",
    maxWidth: 256,
    height: 171,
    "&:hover": {
      border: "1px solid #48A145",
    },
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
}));

export default useStyles;
