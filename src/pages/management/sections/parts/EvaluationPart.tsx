import React from "react";
import Pixel from "src/graphic/size/pixel";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";

const EvaluationPart: React.FC<{height: Pixel}> = (props: {height: Pixel}) => {
  const {height} = props;
  return <div css={css({
    backgroundColor: 'red',
    height: height.value
  })}>

  </div>
};;


const EvaluationGraphPart: React.FC = () => {
  return <div/>;
};

const SuggestPart: React.FC = () => {
  return <div/>;
};

export default EvaluationPart;
