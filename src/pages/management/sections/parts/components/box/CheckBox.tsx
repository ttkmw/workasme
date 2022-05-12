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
    backgroundColor: "green",
    width: "10px",
    height: "10px",
    '.container': {
      width: "10px",
      height: "10px",
      backgroundColor: "red",
      display: "block",
      position: "relative",
      // paddingLeft: "35px",
      // marginBottom: "12px",
      paddingLeft: 0,
      paddingRight: 0,
      cursor: "pointer",
      fontSize: "22px",
      "-webkit-user-select": "none",
      "-ms-user-select": "none",
      "user-select": "none",
      // marginLeft: '12px'
    },

    '.container input': {
      position: "absolute",

      opacity: 0,
      cursor: "pointer",
      height: "10px",
      width: "10px"
    },

    '.checkmark': {
      position: 'absolute',
      height: '10px',
      width: '10px',
      // backgroundColor: 'blue',
      display: 'flex'
    },
    '.container:hover input ~ .checkmark': {
      backgroundColor: '#ccc'
    },

    '.container input:checked ~ .checkmark': {
      backgroundColor: 'yellow'
    },

    '.container input ~ .checkmark svg': {
      display: 'none'
    },

    '.container input:checked ~ .checkmark:after': {
      display: "block"
    },

    //
    '.container input:checked ~ .checkmark svg': {
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
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="10" fill="currentColor" className="bi bi-check"
                   viewBox="0 0 16 16">
        <path
          d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
      </svg>
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
