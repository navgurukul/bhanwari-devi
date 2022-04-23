import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "350px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    margin: "15px",
    padding: "15px",
    "&:hover": {
      boxShadow:
        "0px 16px 24px rgba(0, 0, 0, 0.06), 0px 6px 30px rgba(0, 0, 0, 0.04), 0px 8px 10px rgba(0, 0, 0, 0.08)",
    },
  },
  spacing: {
    padding: "5px 0px",
  },
  Buttons: {
    width: "90%",
    padding: "0 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonGroup2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: "10px",
  },
}));

export default useStyles;
