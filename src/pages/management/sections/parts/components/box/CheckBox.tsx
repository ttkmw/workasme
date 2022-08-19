import React, {Dispatch, SetStateAction, useState} from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import check from 'src/assets/whiteCheck.svg'
import Pixel from "src/graphic/size/pixel";
import Percentage from "src/graphic/size/percentage";
import {TodoDto} from "src/pages/management/sections/TestSection";


const CheckBox: React.FC<{ size: Pixel, borderWidth: Pixel, borderColor: string | undefined, beforeColor: string, afterColor: string | undefined, todoDto: TodoDto, index: number, todoDtos: TodoDto[], setTodoDtos: Dispatch<SetStateAction<TodoDto[]>> }> =
  (props: { size: Pixel, borderWidth: Pixel, borderColor: string | undefined, beforeColor: string, afterColor: string | undefined, todoDto: TodoDto, index: number, todoDtos: TodoDto[], setTodoDtos: Dispatch<SetStateAction<TodoDto[]>> }) => {
    const {size, borderWidth, borderColor, beforeColor, afterColor, todoDto, index, todoDtos, setTodoDtos} = props;

    const onChange = index => {
      setTodoDtos(((prevState: TodoDto[]) => {
        return prevState.map((todoDto, todoDtoIndex) => {
          if (todoDtoIndex == index) {
            return {isChecked: !todoDto.isChecked, content: todoDto.content};
          } else {
            return todoDto;
          }
        });
      }))


      setTodoDtos(((prevState: TodoDto[]) => {
        if (!prevState.some(todoDto => !todoDto.isChecked)) {
          prevState.push({isChecked: false, content: ''})
          return prevState;
        }
        return prevState
      }))
    };

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
        <input type="checkbox" checked={todoDto.isChecked}/>
        {/*todo: onClicke에 api 콜 해서 체크하는 것들 다 저장 */}
        <span className={"checkmark"} onClick={() => onChange(index)}>
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
