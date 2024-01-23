import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  List: {
    display: "flex",
    marginTop: "20px",
  },

  paper: {
    width: "430px",
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
    margin: "20px 0",
  },
  heading: {
    margin: "30px 0 10px 0",
  },
  contentImage: {
    marginTop: "32px",
    maxWidth: "100%",
  },
  contentImageBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
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
  userSelectedCorrect: {
    border: "2px solid #48A145",
    background: "#E9F5E9 !important",
  },
  correctAnswer: {
    border: "2px solid #48A145 !important",
  },
  inCorrectAnswer: {
    border: "2px solid #F44336 !important",
    background: "#FFE5E3 !important",
  },
  greishOption: {
    border: "2px solid #F5F5F5 !important",
    background: "#F5F5F5 !important",
  },
  bottomRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "fixed !important",
    zIndex: 100,
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
  edit: {
    color: "#000000",
  },
  editField: {
    margin: "10px 0px",
  },
  textarea: {
    width: 529,
    margin: "10px 0px",
    padding: "20px 10px",
    border: "1px solid #BDBDBD",
    borderRadius: "4px",
    fontSize: "1.125rem",
    color: "#2E2E2E",
    fontFamily: "Noto Sans",
    resize: "none",
    outline: "none",
    "&:focus": {
      border: "2px solid #48A145 !important",
    },
  },
  mainHeader: {
    position: "sticky",
  },
  editingHeader: {
    position: "sticky",
    marginTop: 64,
  },
  editingHeaderMobile: {
    position: "sticky",
    marginTop: 104,
  },
  optionImg: {
    objectFit: "cover",
    width: "100%",
    height: "140px",
    borderRadius: "8px",
  },
  cursorA: {
    cursor: "default !important",
  },
  cursorP: {
    cursor: "pointer !important",
  },
}));

export default useStyles;
