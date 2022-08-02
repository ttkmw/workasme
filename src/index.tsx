import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import reportWebVitals from "src/reportWebVitals";

import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "src/pages/components/bars/navigation/Header";
import HomePage from "src/pages/home/Home";
import SignPage from "src/pages/sign/SignPage";
import TimeTrackersPage from "src/pages/management/TimeTrackersPage";
import {Provider} from "react-redux";
import {store} from "src/context/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>

      <Router>
        <Header />
        <Switch>
          <Route exact path={"/"}  component={HomePage}/>
          <Route exact path={"/sign"}  component={SignPage}/>
          <Route exact path={"/time-trackers"}  component={TimeTrackersPage}/>
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
