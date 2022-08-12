import { createTheme } from "@mui/material/styles";

const breakpoints = createTheme({
  breakpoints: {
    values: {
      l: 1000,
      xl: 1080,
    },
  },
});

export default breakpoints;
