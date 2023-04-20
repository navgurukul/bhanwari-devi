import { makeStyles, createStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  MuiTableRow: {
    "& tbody": {
      "& tr": {
        "& td": {
          border: "none",
        },
      },
      borderTop: "1px solid #BDBDBD",
      borderBottom: "1px solid #BDBDBD",
    },
    "& thead": {
      "& tr": {
        "& th": {
          fontWeight: "600",
          fontSize: "14px",
        },
      },
    },
  },
  circleIcon: {
    width: "8px !important",
    height: "8px !important",
    margin: "24px 0px 0px 0px",
  },
  ChipInput: {
    fontSize: "14px",
    fontWeight: "400",
    fontFamily: "Noto Sans",
  },
  ChipInput: {
    fontSize: "14px !important",
    fontWeight: "400 !important",
    fontFamily: "Noto Sans !important",
    cursor: "pointer !important",
  },
}));
export default useStyles;
