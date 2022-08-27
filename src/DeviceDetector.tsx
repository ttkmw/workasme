import React from "react";
import { isMobile } from "react-device-detect";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import SignInPage from "src/pages/SignInPage";
import TimeTrackersPage from "src/pages/management/TimeTrackersPage";
import SignUpPage from "src/pages/SignUpPage";

const DeviceDetector: React.FC = () => {
  if (isMobile) {
    return <div>sorry</div>
  }

  return <Router>
    <Switch>
      <Route exact path={"/"}  component={SignInPage}/>
      {/*<Route exact path={"/sign"}  component={SignPage}/>*/}
      <Route exact path={"/time-track"}  component={TimeTrackersPage}/>
      <Route exact path={"/sign-up"} component={SignUpPage} />
    </Switch>
  </Router>
}

export default DeviceDetector;
