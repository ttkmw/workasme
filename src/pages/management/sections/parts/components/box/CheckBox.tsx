import React from "react";
import {Size} from "src/graphic/size/Size";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import {Button, Form} from "react-bootstrap";

// <input type="checkbox" name="genres" value="adventure" id="adventure_id">
//   <label htmlFor="adventure_id" style="font-family: 'SExtralight'; font-size:14px;">Adventure</label>


const CheckBox: React.FC = () => {
  return <div css={css({
    '.container': {
      width: "20px",
      height: "20px",
      display: "block",
      position: "relative",
      paddingLeft: "35px",
      marginBottom: "12px",
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
      height: 0,
      width: 0
    },

    '.checkmark': {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '15px',
      width: '15px',
      backgroundColor: '#eee'
    },

    '.container:hover input ~ .checkmark': {
      backgroundColor: '#ccc'
    },

    '.container input:checked ~ .checkmark': {
      backgroundColor: 'red'
    },

    '.checkmark:after': {
      content: '""',
      backgroundImage: "url(data:image/svg+xml; utf8, <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-arrow-down-right-circle-fill\" viewBox=\"0 0 16 16\">\n" +
        "  <path d=\"M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm5.904-2.803a.5.5 0 1 0-.707.707L9.293 10H6.525a.5.5 0 0 0 0 1H10.5a.5.5 0 0 0 .5-.5V6.525a.5.5 0 0 0-1 0v2.768L5.904 5.197z\"/>\n" +
        "</svg>)",
      position: "absolute",
      display: "none",
      backgroundColor: "black"

    },

  //   .checkmark:after {
  //   content: "";
  //   position: absolute;
  //   display: none;
  // }

    '.container input:checked ~ .checkmark:after': {
      display: "block"
    },

    '.conainer .checkmark:after': {
      left: '9px',
      top: '5px',
      width: '5px',
      height: '5px',
      border: "solid white",
      borderWidth: "0 3px 3px 0",
      '-webkit-transform': "rotate(45deg)",
      '-ms-transform': 'rotate(45deg)',
      'transform': 'rotate(45deg)'
    },

    '.container .checkmark:after': {
      left: "9px",
      top: "5px",
      width: "5px",
      hegiht: "10px",
      border: "solid white",
      borderWidth: "0 3px 3px 0",
      "-webkit-transform": "rotate(45deg)",
      "-ms-transform": "rotate(45deg)",
      transform: "rotate(45deg)"
    }


  })}
  >
    <label className="container">
      <input type="checkbox" />
      <span className={"checkmark"}/>
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
