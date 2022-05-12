import React from "react";
import {Size} from "src/graphic/size/Size";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import check from 'src/assets/whiteCheck.svg'
import Pixel from "src/graphic/size/pixel";
import Percentage from "src/graphic/size/percentage";


const CheckBox: React.FC<{size: Pixel, borderWidth: Pixel, borderColor: string, beforeColor: string, afterColor: string}> = (props: {size: Pixel, borderWidth: Pixel, borderColor: string, beforeColor: string, afterColor: string}) => {
  const {size, borderWidth, borderColor, beforeColor, afterColor} = props;

  const imgSize = size.minus(borderWidth.multiply(new Percentage(200)));


  return <div css={css({
    width: size.toString(),
    height: size.toString(),
    '.container': {
      width: size.toString(),
      height: size.toString(),
      display: "block",
      position: "relative",
      paddingLeft: 0,
      paddingRight: 0,
      cursor: "pointer",
      "-webkit-user-select": "none",
      "-ms-user-select": "none",
      "user-select": "none"
    },

    '.container input': {
      position: "absolute",
      opacity: 0,
      cursor: "pointer",
      height: size.toString(),
      width: size.toString()
    },

    '.checkmark': {
      position: 'absolute',
      height: size.toString(),
      width: size.toString(),
      display: 'flex',
      backgroundColor: beforeColor,

      borderStyle: "solid",
      borderColor: borderColor,
      borderWidth: borderWidth.toString(),

    },

    '.container input:checked ~ .checkmark': {
      backgroundColor: afterColor,

    },

    '.container input ~ .checkmark img': {
      display: 'none',

    },

    '.container input:checked ~ .checkmark:after': {
      display: "block"
    },

    //
    '.container input:checked ~ .checkmark img': {
      display: 'block'
    },

    '.checkmark:after': {
      display: 'none'
    }


  })}
  >
    <label className="container">
      <input type="checkbox"/>
      <span className={"checkmark"}>
              <img src={check} alt="Check" width={imgSize.toString()}
                   height={imgSize.toString()}/>
      </span>
    </label>


  </div>;


}


// <label class="container">One
//   <input type="checkbox" checked="checked">
//     <span class="checkmark"></span>
// </label>

// input[id="list"] {
//   display: none;
// }
//
// // 체크박스 디폴트 이미지 적용
// .checkbox_img {
//   display: inline-block;
//   width: 20px;
//   height: 20px;
//   background: url('https://s.wemep.co.kr/ui/v2.8.307/dist/pc/css/spr/common.png') 0 -438px no-repeat;
//   vertical-align: top;
// }
//
// // 체크되었을 때 background-position 변경
// input[id="list"]:checked + label span {
//   background-position: -75px -438px;
// }

// input[id="list"] {
//   display: none;
// }
//
// // 체크박스 디폴트 이미지 적용
// .checkbox_img {
//   display: inline-block;
//   width: 20px;
//   height: 20px;
//   background: url('https://s.wemep.co.kr/ui/v2.8.307/dist/pc/css/spr/common.png') 0 -438px no-repeat;
//   vertical-align: top;
// }
//
// // 체크되었을 때 background-position 변경
// input[id="list"]:checked + label span {
//   background-position: -75px -438px;
// }
export default CheckBox;
