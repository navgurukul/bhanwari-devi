import zIndex from "@mui/material/styles/zIndex";
import { makeStyles } from "@mui/styles";
import { border } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  searchBar: {
    width: "930px",
    height: "48px",
  },
  generateReport: {
    position: "relative",
    bottom: "15px",
  },
  // ..........filter................
  filters: {
    height: "32px",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    padding: "0px",
    gap: "16px",
  },
  python: {
    borderRadius: "100px !important",
    backgroundColor: "#48A145",
    maxHeight: "32px",
    color: "white",
    fontWeight: "700 !important",
    fontSize: "14px !important",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "16px",
  },
  learningTrack2: {
    borderRadius: "100px !important",
    border: "1px solid #6D6D6D",
    maxHeight: "32px",
    color: "#6D6D6D",
    fontWeight: "400 !important",
    fontSize: "14px !important",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  tableBtn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    maxWidth: "77px",
  },

  filterIcon: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    maxHeight: "32px",
    position: "relative",
    // right: "10px",
    paddingTop: "6px",
  },
  inputLabelfil: {
    position: "relative",
    bottom: "8px",
    fontSize: "14px !important",
    fontWeight: "400",
  },

  // .....................table....................
  tablecellHead: {
    fontWeight: "600 !important",
    fontSize: "14px !important",
    width: 120,
  },
  tablecellHeadWidthLess: {
    fontWeight: "600 !important",
    fontSize: "14px !important",
  },
  dataContainer: {
    position: "sticky",
    top: 0,
    zIndex: 1,
  },
  tablecontainer: {
    // width: "1120px",
    maxWidth: "1120px",
    boxShadow: "none",
    borderBottom: "2px solid rgba(163, 163, 163, 0.4) !important",
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
  tablebodyCell: {
    fontWeight: "400 !important",
    fontSize: "14px !important",
    border: "none",
  },
  circleIcon: {
    fontSize: 12,
    maxHeight: "8px",
    maxWidth: "8px",
    marginLeft: 0,
  },
  collapse: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "20px",
    marginLeft: "14px",
    marginBottom: "25px",
  },
  tableFont: {
    fontWeight: 400,
    fontSize: "14px !important",
  },
  tableSticky: {
    position: "sticky",
    backgroundColor: "white",
    zIndex: 800,
  },
  /// menu component
  menuContainer: {
    width: "128px",
    height: "96px",
    display: "flex",
    flexDirection: "column",
    // alignItems: "flex-end",
    padding: "0px",
    boxShadow:
      "0px 4px 4px rgba(0, 0, 0, 0.06), 0px 8px 12px rgba(0, 0, 0, 0.04), 0px 4px 24px rgba(0, 0, 0, 0.08)",
    borderRadius: "8px",
    marginRight: "20px",
  },
  menuTypography: {
    maxHeight: "48px",
    maxWidth: "128px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "20px",

    color: "black",
    fontWeight: "400",
    fontSize: "14px !important",
    cursor: "pointer",
  },
  menuBtn: {
    maxWidth: "128px",
    maxHeight: "48px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    color: "#F44336",
    fontWeight: "400 !important",
    fontSize: "14px !important",
    cursor: "pointer",
    paddingTop: "20px",
  },
  // ....................Generate Report..............
  dialogTypo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "32px",
    gap: "32px",
    // height: `${widthOfMoal}`,
    width: "420px",
    borderRadius: "8px",
  },
  dialogresponsie: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "32px",
    gap: "32px",
    borderRadius: "20px",
    margin: "0px",
    borderRadius: "8px",
  },

  dialogBtn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "8px 16px",
    gap: "10px",
    width: "396px",
    height: "48px",
    left: 20,
  },

  dialogresBtn: {
    width: "264px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    left: 20,
  },
  dialog: {
    margin: "-20px ",
    borderRadius: "8px",
  },
  // ..................changestatusmodal....................
  dialogStatus: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "22px",
  },
}));

export default useStyles;
