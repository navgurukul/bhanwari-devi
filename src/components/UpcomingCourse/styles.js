import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    padding: "10px 16px 10px 16px",
    marginTop: "20px",
  },
  icons: {
    marginRight: "15px",
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
  },
  MoreBatchWrap: {
    display: "flex",
    flexDirection: "column",
    padding: "25px",
  },
}));

export default useStyles;
