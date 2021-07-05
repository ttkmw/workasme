import React from "react";
import Pixel from "src/graphic/size/pixel";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import Colors from "src/constants/Colors";

const TimeTrackerPart: React.FC<{height: Pixel}> = (props: {height: Pixel}) => {
  const {height} = props;
  return <div css={css({
    backgroundColor: 'pink',
    height: height.value
  })}>

  </div>
};

export default TimeTrackerPart;
