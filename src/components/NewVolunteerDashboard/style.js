import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  searchBar: {
    width: "930px",
    height: "48px",
  },
  generateReport: {
    position: "relative",
    bottom: "15px",
  },
  filters: {
    height: "32px",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    padding: "0px",
    gap: "16px",
  },
  tablecontainerow: {
    backgroundColor: "white !important",
    borderBottom: "1.2px solid rgba(163, 163, 163, 0.4) !important",
  },
  tablebodyrow: {
    backgroundColor: "white !important",
  },
  tablebodyrowSelected: {
    backgroundColor: "#E9F5E9 !important",
  },

  /// menu component
  menuContainer: {
    width: "128px",
    height: "96px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "0px",
    boxShadow:
      "0px 4px 4px rgba(0, 0, 0, 0.06), 0px 8px 12px rgba(0, 0, 0, 0.04), 0px 4px 24px rgba(0, 0, 0, 0.08)",
    borderRadius: "8px",
  },
}));

export default useStyles;
