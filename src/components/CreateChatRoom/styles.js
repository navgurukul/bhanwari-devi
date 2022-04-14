import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  createChatRoomCard: {
    boxShadow: 3,
    marginLeft: "15%",
  },
  createChatRoomtextField: {
    marginBottom: "15%",
    // borderRadius:"12px",
    // margingBottom:"10px",
    // it's not getting any effect on textField.
  },
}));
export default useStyles;
