import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Routing from "../../routing";
import Header from "../Header";
import Footer from "../Footer";
import { useRouteMatch } from "react-router-dom";
import { HideHeader, HideFooter } from "../../constant";
import { actions } from "../User/redux/action";
import {
  getWaitingForServerUserUpdate,
  getUserRolesList
} from "../User/redux/selectors";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/theme";

import "./styles.scss";

function App() {
  const dispatch = useDispatch();
  const waitingForUpdate = useSelector(getWaitingForServerUserUpdate);
  const userRolesList = useSelector(getUserRolesList);
  const [resolvedIfDoneWaiting, setResolvedIfDoneWaiting] = useState(
    waitingForUpdate
  );

  useEffect(() => {
    if (waitingForUpdate) {
      console.log("Checking for server user update...");
      dispatch(actions.pollForServerUserUpdate());
      setResolvedIfDoneWaiting(true);
    } else if (resolvedIfDoneWaiting) {
      // request resolved - notify user
      const msgPrefix = "Your profile has been updated.  Your new roles are: ";
      toast.success(msgPrefix + userRolesList, { autoClose: false });
      new Notification(msgPrefix + userRolesList);
      console.log(msgPrefix, userRolesList);
      setResolvedIfDoneWaiting(false);
    }
  }, [dispatch, waitingForUpdate, resolvedIfDoneWaiting, userRolesList]);
  const showHeader = !useRouteMatch({
    path: HideHeader
  });
  const showFooter = !useRouteMatch({
    path: HideFooter
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
