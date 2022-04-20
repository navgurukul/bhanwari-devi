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

theme = createTheme(theme, {
  breakpoints,
  palette: {
    mode: "light",
    default: {
      // main: "#ffffff",
      // contrastText: "#000000",
      light: "#0066ff",
      main: "#fff",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#ffcc00",
    },
    primary: {
      //Green
      main: "#48a145",
      light: "#e9f5e9",
      dark: "#3a8137",
    },
    secondary: {
      //Violet
      main: "#4548a1",
      light: "#dadaec",
      dark: "#373a81",
    },
    error: {
      //Red
      main: "#f44336",
      light: "#ffe5e3",
      dark: "#c3362b",
    },
    warning: {
      //Yellow
      main: "#ffc107",
      contrastText: "#2e2e2e",
      light: "#fff3cd",
      dark: "#cc9a06",
    },
    info: {
      //Blue
      main: "#2196f3",
      dark: "#1a78c2",
      light: "#d3eafd",
    },
    success: {
      //Green as primary
      main: "#48a145",
      light: "#e9f5e9",
      dark: "#3a8137",
    },
    text: {
      primary: "#2e2e2e",
      secondary: "#585858",
      disabled: "#949494",
      hint: "#949494",
    },
    background: {
      default: "#FFFFFF",
      paper: "#ffffff",
    },
    dark: {
      main: "#000000",
      contrastText: "#FFFFFF",
    },
    divider: "#DEDEDE",
  },

  typography: {
    fontFamily: "Nunito Sans , Lusitana",

    fontSize: 18,
    h1: {
      fontWeight: 700,
      fontSize: "6rem",
      lineHeight: 1.3,
      fontFamily: "Lusitana",
      [theme.breakpoints.down("sm")]: {
        fontSize: "4.875rem",
      },
    },
    h2: {
      fontSize: "4.5rem",
      lineHeight: 1.3,
      fontFamily: "Lusitana",
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
      fontFamily: "Lusitana",
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 700,
      fontSize: "2.625rem",
      [theme.breakpoints.down("sm")]: {
        fontSize: "	2rem",
      },
      fontFamily: "Lusitana",
      lineHeight: 1.3,
    },

    h5: {
      fontWeight: 700,
      fontSize: "2rem",
      [theme.breakpoints.down("sm")]: {
        fontSize: "	1.5rem",
      },
      lineHeight: 1.5,
      fontFamily: "Lusitana",
    },
    h6: {
      fontSize: "1.5rem",
      [theme.breakpoints.down("sm")]: {
        fontSize: "	1.125rem",
      },
      lineHeight: 1.5,
      fontWeight: 700,
      fontFamily: "Lusitana",
    },
    subtitle1: {
      fontSize: "1.125rem",
      fontFamily: "Nunito Sans",
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.875rem",
      },
      lineHeight: 1.5,
      fontWeight: 700,
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontFamily: "Nunito Sans",
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.75rem",
      },
      fontWeight: 700,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: "1.125rem",
      fontFamily: "Nunito Sans",
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
      fontFamily: "Nunito Sans ",
      lineHeight: 1.5,
    },
    button: {
      fontSize: "1.125rem",
      fontFamily: "Nunito Sans",
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.875rem",
      },
      lineHeight: 1.5,
      fontWeight: 700,
      textTransform: "none",
    },
    caption: {
      fontSize: "0.75rem",
      fontFamily: "Nunito Sans",
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.75rem",
      },
      lineHeight: 1.5,
    },
    overline: {
      fontFamily: "Nunito Sans",
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

  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 8,

        // "&:hover": {
        //   boxShadow:
        //     "0px 16px 24px rgba(0, 0, 0, 0.06), 0px 6px 30px rgba(0, 0, 0, 0.04), 0px 8px 10px rgba(0, 0, 0, 0.08)",
        // },
      },
    },
  },
};

export default theme;
