import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  List: {
    display: "flex",
    marginTop: "20px",
  },
  contentImg: {
    padding: 5,
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
  },
  codeBackground: {
    background: "#E5E5E5",
    padding: 16,
    margin: "15px 0",
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
}));

export default useStyles;
