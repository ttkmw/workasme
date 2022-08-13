import React from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import Pixel from "src/graphic/size/pixel";
import Colors from "src/constants/Colors";

const Title: React.FC = () => {
  return <div css={css({
    marginTop: new Pixel(36).toString(),
    marginBottom: new Pixel(36).toString()
  })}>
    <h1 css={css({
      textAlign: 'center',
      fontSize: new Pixel(40).value,
      paddingLeft: new Pixel(24).value,
      paddingRight: new Pixel(24).value,
    })}>
      <span css={
        css({
          fontFamily: "ObjectSans-Heavy",
          color: Colors.theme.main.work,
          fontWeight: 700
        })
      }>work with </span>
      <span css={
        css({
          fontFamily: "Pattaya-Regular",
          color: Colors.theme.main.orgasme,
          fontWeight: 900
        })
      }>
         orgasme
      </span>
    </h1>
  </div>;
};

export default Title;
