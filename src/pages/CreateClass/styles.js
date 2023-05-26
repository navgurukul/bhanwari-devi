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
    height: "2px" ,
    border: "none"
    
  },
}));

export default useStyles;
