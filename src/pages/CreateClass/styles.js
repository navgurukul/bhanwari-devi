import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  successModel: {
    alignItems: "center",
    align: "center",
  },
  confirmationModal: {
    marginTop: "300px",
    padding: "20px",
    borderRadius: "8px",
  },
  dividerColor: {
    color: "grey",
    backgroundColor: "grey",
    height: "2px",
    border: "none",
  },
  underLine: {
    padding: "12px 35px",
    borderBottom: "3px solid transparent",
    cursor: "pointer",
  },
  drawerList: {
    transform: "translate(0%, 0%)",
    width: "100%",
    bgcolor: "background.paper",
    boxShadow: 24,
    padding: "0px 0px",
  },
  listButton: {
    margin: "0px",
    padding: "0px",
    justifyContent: "space-between",
  },
}));

export default useStyles;
