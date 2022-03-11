import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    type: "light",
    default: {
      // main: "#ffffff",
      // contrastText: "#000000",
      light: "#0066ff",
      main: "#0044ff",
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
      default: "#f7f7f7",
      paper: "#ffffff",
    },
    divider: "#DEDEDE",
  },

  typography: {
    fontFamily: "Nunito Sans",
    fontSize: 18,
    h1: {
      fontWeight: 700,
      fontSize: "6rem",
    },
    h2: {
      fontSize: "4.5rem",
      fontWeight: 700,
    },
    h3: {
      fontSize: "3.5rem",
      fontWeight: 700,
      fontFamily: "Lusitana",
      lineHeight: 1.14285714286,
    },
    h4: {
      fontWeight: 700,
      fontSize: "2.625rem",
      fontFamily: "Lusitana",
      lineHeight: 1.33,
    },
    h5: {
      fontWeight: 700,
      fontSize: "2rem",
      lineHeight: 1.33,
      fontFamily: "Lusitana",
    },
    h6: {
      fontSize: "1.5rem",
      lineHeight: 1.33,
      fontWeight: 700,
      fontFamily: "Lusitana",
    },
    subtitle1: {
      fontSize: "1.125rem",
      lineHeight: 1.55,
      fontWeight: 700,
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 700,
      lineHeight: 1.42,
    },
    body1: {
      fontSize: "1.125rem",
      lineHeight: 1.55,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.42,
    },
    button: {
      fontSize: "1.125rem",
      lineHeight: 1.55,
      fontWeight: 500,
      textTransform: "none",
    },
    caption: {
      fontSize: "0.75rem",
      lineHeight: 1.33,
    },
    overline: {
      fontSize: "0.75rem",
    },
  },
});

theme.components = {
  MuiCardMedia: {
    defaultProps: {
      disableRipple: true,
    },
    styleOverrides: {
      root: { width: 64 },
      // containedPrimary: {
      //   "&:hover": {
      //     backgroundColor: purple[500],
      //     color: "#99dfff",
      //   },
      // },
      // containedSecondary: {
      //   fontWeight: 700,
      //   color: "#ba000d",
      // },
      // containedCaution: {
      //   // padding: "50px",
      //   fontWeight: 700,
      //   color: "#F44336",
      // },
    },
  },
};

export default theme;
