import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(
  () => ({
    batchGroupsContainer: {
      boxSizing: "border-box",
      height: "59px",
      padding: "16px 16px 16px 16px",
      position: "sticky",
      backgroundColor: "#FFF !important",
      borderTop: "1px solid #ddd",
      borderBottom: "1px solid #ddd",
    },
    batchGroupsName: {
      fontSize: "18px",
    },
  }),
  { index: 1 }
);

export default useStyles;
