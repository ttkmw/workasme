import React from "react";
import {Size} from "src/graphic/size/Size";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";

const NumberBox: React.FC<{number: string, numberSize: Size, numberFont: string, numberColor: string | undefined, boxWidth: Size, boxHeight: Size, boxBackgroundColor: string, boxRadius: number}>
  = (props: {number: string, numberSize: Size, numberFont: string, numberColor: string | undefined, boxWidth: Size, boxHeight: Size, boxBackgroundColor: string, boxRadius: number}) => {
  const {number, numberSize, numberFont, numberColor, boxWidth, boxHeight, boxBackgroundColor, boxRadius} = props;
  return <div css={css({
    fontSize: numberSize.toString(),
    fontFamily: numberFont,
    color: numberColor,
    width: boxWidth.toString(),
    height: boxHeight.toString(),
    backgroundColor: boxBackgroundColor,
    borderRadius: boxRadius,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
    marginRight: 5
  })}>
    {number}
  </div>;
};

export default NumberBox;
