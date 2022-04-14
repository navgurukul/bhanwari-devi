import React from "react";
import Routing from "../../routing";
import Header from "../Header";
import Footer from "../Footer";
import { useRouteMatch } from "react-router-dom";
import { HideHeader, HideFooter } from "../../constant";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/theme";

import "./styles.scss";

function App() {
  const showHeader = !useRouteMatch({
    path: HideHeader,
  });
  const showFooter = !useRouteMatch({
    path: HideFooter,
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="layout">
        {showHeader ? <Header /> : ""}
        <div className="content">
          {" "}
          <Routing />{" "}
        </div>
        {showFooter ? <Footer /> : ""}
      </div>
    </ThemeProvider>
  );
}

export default App;
