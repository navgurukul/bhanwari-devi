import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  option: {
    boxShadow:
      "0px 1px 2px #48A145, 0px 2px 1px #48A145, 0px 1px 5px #48A145 !important",
  },
  // correctAnswer: {
  //   boxShadow:
  //     "0px 1px 2px #48A145, 0px 2px 1px #48A145, 0px 1px 5px #48A145 !important",
  //   background: "#E9F5E9",
  // },
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
