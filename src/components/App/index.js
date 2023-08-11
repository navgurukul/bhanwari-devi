import React, { useEffect } from "react";
import Routing from "../../routing";
import Header from "../Header";
import Footer from "../Footer";
import { useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actions as pathwayActions } from "../PathwayCourse/redux/action";
import { HideHeader, HideFooter } from "../../constant";
import { ThemeProvider } from "@mui/material/styles";
import { LanguageProvider } from "../../common/context";
import { useLanguage } from "../../common/language";
import theme from "../../theme/theme";
import MSG from "../../msg";

import "./styles.scss";

function App() {
  const language = useLanguage();
  const showHeader = !useRouteMatch({
    path: HideHeader,
  });
  const showFooter = !useRouteMatch({
    path: HideFooter,
  });

  const user = useSelector(({ User }) => User);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      pathwayActions.getPathwaysDropdown({
        authToken: user,
      })
    );
  }, [dispatch, user]);

  return (
    <LanguageProvider.Provider
      value={{
        language,
        MSG: MSG[language],
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
