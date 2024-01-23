import React, { useEffect } from "react";
import Routing from "../../routing";
import Header from "../Header";
import Footer from "../Footer";
import axios from "axios";
import { useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actions as pathwayActions } from "../PathwayCourse/redux/action";
import { HideHeader, HideFooter, PATHS } from "../../constant";
import { ThemeProvider } from "@mui/material/styles";
import { LanguageProvider } from "../../common/context";
import { useLanguage } from "../../common/language";
import theme from "../../theme/theme";
import MSG from "../../msg";
import { useHistory } from "react-router-dom";

import { actions as userActions } from "../User/redux/action";
import "./styles.scss";

function App() {
  const language = useLanguage();

  let interval = null;
  const showHeader = !useRouteMatch({
    path: HideHeader,
  });
  const showFooter = !useRouteMatch({
    path: HideFooter,
  });

  const user = useSelector(({ User }) => User);
  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    if (!interval) {
      interval = setInterval(() => {
        const token =
          JSON.parse(localStorage?.getItem("loggedOutToken")) ?? null;

        if (token) {
          axios
            .get(
              `${process.env.REACT_APP_MERAKI_URL}/users/checkSessionToken?token=${token}`
            )
            .then((res) => {
              if (res.data === false) {
                console.log(
                  "session expired  the user is logged out forcefully"
                );

                localStorage.setItem("loggedOut", false);
                localStorage.clear();
                window.location.reload();
                // dispatch(userActions.logout());
                clearInterval(interval);
              }
            })
            .catch((err) => {
              console.error(err);
            });
        }
      }, 3000); // Call the API every 60 seconds
    }
  }, []);

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
