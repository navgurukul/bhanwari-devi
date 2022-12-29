import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  courseNumber: {
    // marginRight: "10px",
    // verticalAlign: "top",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2px",
    background: "#E9F5E9",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
  },
  courseCard: {
    margin: "15px 0",
    "&:hover": {
      boxShadow:
        "0px 16px 24px rgba(0, 0, 0, 0.06), 0px 6px 30px rgba(0, 0, 0, 0.04), 0px 8px 10px rgba(0, 0, 0, 0.08)",
    },
  },
  hrunderLine: {
    width: "450px",
    border: "1px solid #E0E0E0 !important",
    marginTop: "32px",
    marginBottom: "32px",
  },
  progressBar: {
    width: "95%",
  },
}));

export default useStyles;
