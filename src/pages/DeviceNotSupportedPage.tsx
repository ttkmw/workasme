import React from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import Pixel from "src/graphic/size/pixel";

const DeviceNotSupportedPage: React.FC<{deviceName: string, fontSize: Pixel}> = (props: {deviceName: string, fontSize: Pixel}) => {
  const {deviceName, fontSize} = props;
  return <div css={css({
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    verticalAlign: "center",
    alignContent: "center",
    fontFamily: "Gaegu-Regular",
    fontSize: fontSize.toString()
  })}>
    {deviceName} not supported
  </div>
}

export default DeviceNotSupportedPage;
