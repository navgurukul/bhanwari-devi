import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles(() => ({
  profileBox: {
    // transform: "translateY(-50px)",
  },
  imageContainer: {
    width: "100%",
    justifyContent: "left",
    alignItems: "left",
  },

  bgImage: {
    width: "100%",
    objectFit: "cover",
    height: "290px",
    backgroundColor: "pink",
  },
  Right_tick: {
    marginLeft: "8px",
    verticalAlign: "baseline",
  },
  dialog: {
    padding: "40px",
  },
  certButtons: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "32px",
  },
  greenButton: {
    padding: "8px 16px !important",
    borderRadius: "8px !important",
    backgroundColor: "#48A145 !important",
    color: "#FFFFFF !important",
    width: "295px !important",
  },

  pdfFrame: {
    height: "100%",
    width: "100%",
    border: "none",
    outline: "none",
    brackgroundColor: "transparent !important",
  },

  pdfWrapper: {
    height: (props) => (props.isActive ? "200px" : "390px"),
  },
  closeIcon: {
    cursor: "pointer",
    marginTop: "15px",
  },
  crossButton: {
    display: "flex",
    justifyContent: "space-between",
  },
}));
export default useStyles;
