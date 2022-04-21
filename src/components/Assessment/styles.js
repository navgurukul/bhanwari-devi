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
}));

export default useStyles;
