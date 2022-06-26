import React from "react";
import Routing from "../../routing";
import Header from "../Header";
import Footer from "../Footer";
import { useRouteMatch } from "react-router-dom";
import { HideHeader, HideFooter } from "../../constant";
import { ThemeProvider } from "@mui/material/styles";
import { LanguageProvider } from "../../common/context";
import { useLanguage } from "../../common/language";
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
    <LanguageProvider.Provider
      value={{
        language: useLanguage()
      }}
    >
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
    </LanguageProvider.Provider>
  );
}

export default App;
