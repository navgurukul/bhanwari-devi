import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  List: {
    display: "flex",
    marginTop: "20px",
  },
  contentImg: {
    padding: 5,
    marginRight: 5,
  },

  contentNumber: {
    padding: "8px",
  },

  youtubeVideo: {
    width: "100%",
    marginTop: "20px",
  },
  contentImage: {
    width: "100%",
    marginTop: "32px",
  },
  contentImg: {
    padding: 5,
    marginRight: 5,
  },
  codeBackground: {
    background: "#E5E5E5",
    padding: 16,
    margin: "15px 0",
    borderRadius: "8px",
  },
  codeWrap: {
    whiteSpace: "pre-wrap",
    lineHeight: 27,
  },
  codeExampleImg: {
    marginRight: 10,
  },
  tableHead: {
    borderRight: "none",
    borderLeft: "none",
    borderTop: "none",
    borderBottom: "2px solid #DEDEDE !important",
  },
  option: {
    boxShadow:
      "0px 1px 2px #48A145, 0px 2px 1px #48A145, 0px 1px 5px #48A145 !important",
  },
  correctAnswer: {
    boxShadow:
      "0px 1px 2px #48A145, 0px 2px 1px #48A145, 0px 1px 5px #48A145 !important",
    background: "#E9F5E9 !important",
  },
  inCorrectAnswer: {
    boxShadow:
      "0px 1px 2px #F44336, 0px 2px 1px #F44336, 0px 1px 5px #F44336 !important",
    background: "#FFE5E3 !important",
  },
  bottomRow: {
    width: "97%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "fixed !important",
    bottom: "0px",
    background: "#fff",
    boxShadow:
      "0px -1px 2px rgba(0, 0, 0, 0.06), 0px -2px 2px rgba(0, 0, 0, 0.04), 0px -1px 5px rgba(0, 0, 0, 0.08)",
  },
  scrollContainer: {
    "&::-webkit-scrollbar": { display: "none" },
    overflowX: "scroll",
    width: "325px",
    whiteSpace: "nowrap",
  },
}));

export default useStyles;
