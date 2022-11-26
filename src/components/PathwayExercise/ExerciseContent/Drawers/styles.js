import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  //For desktop only
  DesktopDrawer: {
    width: (props) => props.drawerWidth,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: (props) => props.drawerWidth,
      boxSizing: "border-box",
    },
    overflow: "hidden",
    "& ::-webkit-scrollbar": { display: "none" },
    zIndex: 0,
  },

  //For both desktop and mobile
  ListItemsTypography: {
    fontSize: "14px",
    lineHeight: "21px",
    textDecoration: "none",
  },
  ListItemLink: {
    textDecoration: "none",
    fontSize: "14px",
    width: "100%",
  },
  courseNameTypography: {
    fontWeight: "400",
  },

  //Content List text
  ContentListDiv: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    left: "24px",
    marginLeft: "10px",
    marginTop: "200px",
  },
  ContentListIcon: {
    color: "#6D6D6D",
    width: "20px",
    height: "28px",
  },
}));

export default useStyles;
