import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reportWebVitals from "src/reportWebVitals";

import 'bootstrap/dist/css/bootstrap.min.css';
import TimeTrackersPage from "src/pages/management/TimeTrackersPage";
import {Provider} from "react-redux";
import {store} from "src/context/store";
import SignInPage from "src/pages/SignInPage";
import SignUpPage from "src/pages/SignUpPage";
import DeviceDetector from "src/DeviceDetector";

//브라우저 캐시 지우는거
//https://thewebdev.info/2021/12/03/how-to-clear-browser-cache-in-react-2/
ReactDOM.render(
  <Provider store={store}>
    <DeviceDetector>
      <Router>
        <Routes>
          <Route path={"/"}  element={<SignInPage/>}/>
          <Route path={"/time-track"}  element={<TimeTrackersPage />}/>
          <Route path={"/sign-up"} element={<SignUpPage />} />
        </Routes>
      </Router>
    </DeviceDetector>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
