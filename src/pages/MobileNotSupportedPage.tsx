import React from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import Pixel from "src/graphic/size/pixel";

const MobileNotSupportedPage:React.FC = () => {
  return <div css={css({
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Gaegu-Regular",
    fontSize: new Pixel(20).toString()
  })}>
    mobile not supported
  </div>
}

export default MobileNotSupportedPage;
