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
      "user-select": "none",
      marginLeft: '12px'
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
      backgroundColor: '#eee',
      display: 'flex'
    },

    '.container:hover input ~ .checkmark': {
      backgroundColor: '#ccc'
    },

    '.container input:checked ~ .checkmark': {
      backgroundColor: 'red'
    },



    '.container input ~ .checkmark svg': {
      display: 'none'
    },

    '.container input:checked ~ .checkmark svg': {
      display: 'block'
    },

    '.checkmark:after': {
      display: 'none'

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
      display: 'none'
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
      <input type="checkbox"/>
      <span className={"checkmark"}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check"
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
