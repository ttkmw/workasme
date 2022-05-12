import React from "react";
import {Size} from "src/graphic/size/Size";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import check from 'src/assets/check.svg'


const CheckBox: React.FC<{length: Size}> = (props: {length: Size}) => {
  const {length} = props;

  return <div css={css({
    width: length.toString(),
    height: length.toString(),
    '.container': {
      width: length.toString(),
      height: length.toString(),
      display: "block",
      position: "relative",
      paddingLeft: 0,
      paddingRight: 0,
      cursor: "pointer",
      fontSize: "22px",
      "-webkit-user-select": "none",
      "-ms-user-select": "none",
      "user-select": "none"
    },

    '.container input': {
      position: "absolute",
      opacity: 0,
      cursor: "pointer",
      height: length.toString(),
      width: length.toString()
    },

    '.checkmark': {
      position: 'absolute',
      height: length.toString(),
      width: length.toString(),
      display: 'flex',
      backgroundColor: "purple",

      borderStyle: "solid",
      borderWidth: "0.9px",

    },

    '.container input:checked ~ .checkmark': {
      backgroundColor: 'yellow',

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
      display: 'none',
      left: -10,
      top: -10,
    }


  })}
  >
    <label className="container">
      <input type="checkbox"/>
      <span className={"checkmark"}>
              <img src={check} alt="Check" width={"9.1px"}
                   height={"9.1px"}/>
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
