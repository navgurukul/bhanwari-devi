import { createTheme } from "@mui/material/styles";
import { breakpoints } from "./constant";
let theme = createTheme();
const shadows = theme.shadows;
shadows[2] =
  "0px 1px 2px rgba(0, 0, 0, 0.06), 0px 2px 1px rgba(0, 0, 0, 0.04), 0px 1px 5px rgba(0, 0, 0, 0.08)";
shadows[8] =
  "0px 16px 24px rgba(0, 0, 0, 0.06), 0px 6px 30px rgba(0, 0, 0, 0.04), 0px 8px 10px rgba(0, 0, 0, 0.08)";
shadows[8] =
  "0px 24px 38px rgba(0, 0, 0, 0.06), 0px 9px 46px rgba(0, 0, 0, 0.04), 0px 11px 15px rgba(0, 0, 0, 0.08)";
// shadow[9] is added for the new value of hadder scrollup
shadows[9] =
  "0px 4px 4px rgba(0, 0, 0, 0.06), 0px 8px 12px rgba(0, 0, 0, 0.04), 0px 4px 24px rgba(0, 0, 0, 0.08)";

theme = createTheme(theme, {
  breakpoints,
  palette: {
    mode: "light",
    default: {
      // main: "#FFFFFF",
      // contrastText: "#000000",
      light: "#0066FF",
      main: "#fff",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#FFCC00",
    },
    primary: {
      //Green
      main: "#48A145",
      light: "#E9F5E9",
      dark: "#3A8137",
    },
    secondary: {
      //Violet
      main: "#FFCC00",
      light: "#FFF5CC",
      dark: "#CCA300",
      contrastText: "#2E2E2E",
    },
    error: {
      //Red
      main: "#F44336",
      light: "#FFE5E3",
      dark: "#C3362B",
    },
    warning: {
      //Yellow
      main: "#FFC107",
      contrastText: "#2E2E2E",
      light: "#FFF3CD",
      dark: "#CC9A06",
    },
    info: {
      //Blue
      main: "#2196F3",
      dark: "#1A78C2",
      light: "#D3EAFD",
    },
    success: {
      //Green as primary
      main: "#48A145",
      light: "#E9F5E9",
      dark: "#3A8137",
    },
    grey: {
      main: "#BDBDBD",
      // main: "rgba(0, 0, 0, 0.12)",
    },
    text: {
      primary: "#2E2E2E",
      secondary: "#6D6D6D",
      disabled: "#949494",
      hint: "#949494",
    },
    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
    },
    dark: {
      main: "#2E2E2E",
      contrastText: "#FFFFFF",
    },
    divider: "#DEDEDE",
  },
  typography: {
    fontFamily: "Noto Sans",
    fontSize: 18,
    h1: {
      fontWeight: 700,
      fontSize: "6rem",
      lineHeight: 1.3,
      fontFamily: "Noto Sans",
      [theme.breakpoints.down("sm")]: {
        fontSize: "4.875rem",
      },
    },
    h2: {
      fontSize: "4.5rem",
      lineHeight: 1.3,
      fontFamily: "Noto Sans",
      [theme.breakpoints.down("sm")]: {
        fontSize: "3.625rem",
      },
      fontWeight: 700,
    },
    h3: {
      fontSize: "3.5rem",
      [theme.breakpoints.down("sm")]: {
        fontSize: "2.75rem",
      },
      fontWeight: 700,
      fontFamily: "Noto Sans",
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 700,
      fontSize: "2.625rem",
      [theme.breakpoints.down("sm")]: {
        fontSize: " 2rem",
      },
      fontFamily: "Noto Sans",
      lineHeight: 1.3,
    },
    h5: {
      fontWeight: 700,
      fontSize: "2rem",
      [theme.breakpoints.down("sm")]: {
        fontSize: " 1.5rem",
      },
      lineHeight: 1.5,
      fontFamily: "Noto Sans",
    },
    h6: {
      fontSize: "1.5rem",
      [theme.breakpoints.down("sm")]: {
        fontSize: " 1.125rem",
      },
      lineHeight: 1.5,
      fontWeight: 700,
      fontFamily: "Noto Sans",
    },
    subtitle1: {
      fontSize: "1.125rem",
      fontFamily: "Noto Sans",
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.875rem",
      },
      lineHeight: 1.5,
      fontWeight: 700,
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontFamily: "Noto Sans",
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.75rem",
      },
      fontWeight: 700,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: "1.125rem",
      fontFamily: "Noto Sans",
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.875rem",
      },
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "1rem", //0.875rem
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.75rem",
      },
      fontFamily: "Noto Sans ",
      lineHeight: 1.5,
    },
    body3: {
      fontSize: "0.875rem", //0.875rem
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.75rem",
      },
      fontFamily: "Noto Sans ",
      lineHeight: 1.5,
    },
    button: {
      fontSize: "1.125rem",
      fontFamily: "Noto Sans",
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.875rem",
      },
      lineHeight: 1.5,
      fontWeight: 700,
      textTransform: "none",
    },
    caption: {
      fontSize: "0.75rem",
      fontFamily: "Noto Sans",
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.75rem",
      },
      lineHeight: 1.5,
    },
    overline: {
      fontFamily: "Noto Sans",
      fontSize: "0.75rem",
      lineHeight: 1.5,
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.75rem",
      },
    },
  },
  shadows,
});
theme.components = {
  MuiCardMedia: {
    defaultProps: {
      disableRipple: true,
    },
    styleOverrides: {
      root: { width: 64 },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: "8px",
        height: "48px",
      },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        height: "48px",
        // margin: "10px 16px 10px 16px",
        "&:hover": {
          backgroundColor: "#E9F5E9",
          borderRadius: "8px",
        },
      },
    },
  },
  MuiTableRow: {
    styleOverrides: {
      root: {
        // backgroundColor: theme.palette.divider,
        backgroundColor: "#F5F5F5",
        "&:hover": {
          backgroundColor: "#F5F5F5",
          boxShadow: "0px 0px 0px",
        },
      },
    },
  },
  // MuiTextareaAutosize: {
  //   styleOverrides: {
  //     root: {
  //       width: 529,
  //       margin: "10px 0px",
  //       padding: "20px 10px",
  //       border: "1px solid #BDBDBD",
  //       borderRadius: "4px",
  //       fontSize: "1.125rem",
  //       color: "#2E2E2E",
  //       fontFamily: "Noto Sans",
  //       resize: "none",
  //       outline: "none",
  //       "&:focus": {
  //         border: "2px solid #48A145 !important",
  //       },
  //     },
  //   },
  // },
};
export default theme;
