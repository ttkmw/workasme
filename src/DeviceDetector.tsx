import React, {ReactNode} from "react";
import { isMobile } from "react-device-detect";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import SignInPage from "src/pages/SignInPage";
import TimeTrackersPage from "src/pages/management/TimeTrackersPage";
import SignUpPage from "src/pages/SignUpPage";
import MobileNotSupportedPage from "src/pages/MobileNotSupportedPage";

const DeviceDetector: React.FC<{children: ReactNode}> = (props: {children: ReactNode}) => {
  const {children} = props;
  if (isMobile) {
    return <MobileNotSupportedPage />
  }

  return <div>
    {children}
  </div>
}

export default DeviceDetector;
