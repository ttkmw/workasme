import React from "react";
import Pixel from "src/graphic/size/pixel";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import Colors from "src/constants/Colors";

// todo: props 따로 빼기
const TimeTrackerPart: React.FC<{ marginVertical: Pixel }> = (props: { marginVertical: Pixel }) => {
  const {marginVertical} = props;



  return <div css={css({
    marginTop: marginVertical.value,
    marginBottom: marginVertical.value
  })}>

    <TimeTrackerTable rows={rows} isUpdating={isUpdating}/>

  </div>
};

const TimeTrackerTable: React.FC = () => {

  return <div></div>
};

export default TimeTrackerPart;
