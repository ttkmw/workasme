import React from 'react';
import ReactDOM from 'react-dom';

import App from "src/App";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import reportWebVitals from "src/reportWebVitals";

import 'bootstrap/dist/css/bootstrap.min.css';
import SelfManagementPage from "src/pages/management/self/SelfManagement";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path={"/"}  component={App}/>
        <Route exact path={"/management"}  component={SelfManagementPage}/>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
