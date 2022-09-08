import React, {ReactNode} from "react";
import {isMobile, isTablet} from "react-device-detect";
import DeviceNotSupportedPage from "src/pages/DeviceNotSupportedPage";
import Pixel from "src/graphic/size/pixel";

const DeviceDetector: React.FC<{children: ReactNode}> = (props: {children: ReactNode}) => {
  const {children} = props;
  if (isMobile) {
    return <DeviceNotSupportedPage deviceName={"mobile"} fontSize={new Pixel(20)}/>
  }

  if (isTablet) {
    return <DeviceNotSupportedPage deviceName={"tablet"} fontSize={new Pixel(40)}/>
  }

  return <div>
    {children}
  </div>
}

export default DeviceDetector;
