import React from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import check from 'src/assets/whiteCheck.svg'
import Pixel from "src/graphic/size/pixel";
import Percentage from "src/graphic/size/percentage";
import {TodoDto} from "src/dtos/TodoDto";
import {WeekTimes} from "src/model/WeekTimes";
import {Dayjs} from "dayjs";
import {TimeRecord} from "src/model/TimeRecord";
import {RelativeDay} from "src/model/RelativeDay";
import Colors from "src/constants/Colors";

const CheckBox: React.FC<{ size: Pixel, borderWidth: Pixel, beforeColor: string, afterColor: string | undefined, todoDto: TodoDto, index: number, day: Dayjs, timeBlocks: WeekTimes, updateTimeBlocks: (timeBlocks: WeekTimes) => void }> =
  (props: { size: Pixel, borderWidth: Pixel, beforeColor: string, afterColor: string | undefined, index: number, day: Dayjs, todoDto: TodoDto, timeBlocks: WeekTimes, updateTimeBlocks: (timeBlocks: WeekTimes) => void }) => {
    const {
      size,
      borderWidth,
      beforeColor,
      afterColor,
      todoDto,
      index,
      day,
      timeBlocks,
      updateTimeBlocks
    } = props;

    let borderColor;
    if (todoDto.isChecked) {
      borderColor = Colors.theme.main.orgasme
    } else if (todoDto.content != '') {
      borderColor = Colors.theme.main.work
    } else {
      borderColor = Colors.theme.table.innerLine
    }

    let backgroundColor;
    if (todoDto.isChecked) {
      backgroundColor = Colors.theme.main.orgasme
    } else {
      backgroundColor = "transparent";
    }

    const onChange = (day, index) => {
      let todoDtosAtDate: TodoDto[] | undefined = timeBlocks.todoWithinThisWeek.get(TimeRecord.getFormattedDate(day, RelativeDay.TODAY));
      if (todoDtosAtDate === undefined || todoDtosAtDate.length === 0) {
        return;
      }
      let newTodoDtos: TodoDto[] | undefined = todoDtosAtDate.map((todoDto, todoDtoIndex) => {
        if (todoDtoIndex === index) {
          //여기에서 api 콜한 결과를 리턴
          if (todoDto.content === undefined ||todoDto.content === '') {
            return todoDto;
          }

          alert("should api call modified")
          return {id: todoDto.id, isChecked: !todoDto.isChecked, content: todoDto.content}
        } else {
          return todoDto;
        }
      });

      timeBlocks.todoWithinThisWeek.set(TimeRecord.getFormattedDate(day, RelativeDay.TODAY), newTodoDtos === undefined ? [] : newTodoDtos)
      updateTimeBlocks(timeBlocks);

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
        WebkitUserSelect: "none",
        msUserSelect: "none",
        userSelect: "none"
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
        backgroundColor: backgroundColor,

        borderStyle: "solid",
        borderColor: borderColor,
        borderWidth: borderWidth.toString(),

      },

      // '.container input:checked ~ .checkmark': {
      //   backgroundColor: backgroundColor,
      //
      // },

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
        <input type="checkbox"  checked={todoDto.isChecked} readOnly={true}/>
        {/*todo: onClicke에 api 콜 해서 체크하는 것들 다 저장 */}
        <span className={"checkmark"} onClick={() => onChange(day, index)} defaultChecked={todoDto.isChecked}>
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
