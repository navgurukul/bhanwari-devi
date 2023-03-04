import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import initialStore from "./store.js";
import "./index.css";
import App from "./components/App/index.js";
import { DeviceProvider } from "./common/context";
import * as serviceWorker from "./serviceWorker";
import { getIsMobile } from "./common/utils";
import ScrollToTop from "./common/ScrollTotOP.js";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// To learn redux and redux saga
// https://www.codementor.io/@rajjeet/step-by-step-how-to-add-redux-saga-to-a-react-redux-app-11xqieyj67
// https://redux.js.org/recipes/configuring-your-store
ReactDOM.render(
  <React.StrictMode>
    <Provider store={initialStore()}>
      <BrowserRouter>
        <DeviceProvider.Provider
          value={{
            isMobile: getIsMobile(),
          }}
        >
          <ScrollToTop>
            <App />
          </ScrollToTop>
        </DeviceProvider.Provider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
