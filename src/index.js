import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import initialStore from './store.js'

import './index.css';
import App from './components/App/index.js';
import * as serviceWorker from './serviceWorker';



// To learn redux and redux saga 
// https://www.codementor.io/@rajjeet/step-by-step-how-to-add-redux-saga-to-a-react-redux-app-11xqieyj67
// https://redux.js.org/recipes/configuring-your-store


ReactDOM.render(
  <React.StrictMode>
      <Provider store={initialStore()}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
