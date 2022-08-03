import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  cardDrop: {
    margin: "20px",
    minWidth: "300px",
    cursor: "pointer",
  },
  cardContent: {
    height: "145px",
  },
  cardChip: {
    height: "10px",
    margin: "12px 0px",
    borderRadius: "10px",
  },
  cardImg: {
    display: "flex",
  },
  dropbatchDiv: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
}));
export default useStyles;
