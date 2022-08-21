import React, {useState} from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import {TimeBlockDto} from "src/dtos/TimeBlockDto";
import DatePicker from "src/pages/components/DatePicker";
import TimePicker from "src/pages/components/TimePicker";
import Colors from "src/constants/Colors";
import {options} from "src/pages/components/timeblock/CategoryOptions";
import Pixel from "src/graphic/size/pixel";
import dayjs, {Dayjs} from "dayjs";
import {WeekTimes} from "src/model/WeekTimes";
import {DateTime} from "src/model/DateTime";
import {TodoDto} from "src/dtos/TodoDto";

const serverData2: WeekTimes = new WeekTimes(
  new Map<string, TimeBlockDto[]>([
    ["2022-08-14", [
      {
        id: 1,
        title: "엣지타임",
        startDateTime: {dateTime: "2022-08-14T23:00"},
        endDateTime: {dateTime: "2022-08-15T01:00"},
        isGood: true,
        category: "NONE",
        memo: "엣지타임"
      }
    ]],
    ["2022-08-15", [
      {
        id: 2,
        title: "영화 보고 친구랑 잠깐 수다떨음",
        startDateTime: {dateTime: "2022-08-15T01:00"},
        endDateTime: {dateTime: "2022-08-15T04:00"},
        isGood: false,
        category: "SOCIAL",
        memo: undefined
      },
      {
        id: 3,
        title: "일했지",
        startDateTime: {dateTime: "2022-08-15T15:00"},
        endDateTime: {dateTime: "2022-08-15T19:00"},
        isGood: false,
        category: "INTELLECTUAL",
        memo: undefined
      },
    ]],
    ["2022-08-16", [
      {
        id: 4,
        title: "샤워하고 밥먹고 전화하다가 엄마한테 등짝맞고 공부하다가 플스함",
        startDateTime: {dateTime: "2022-08-16T01:00"},
        endDateTime: {dateTime: "2022-08-16T04:00"},
        isGood: false,
        category: "NONE",
        memo: "why should id live like this"
      },
    ]],
    ["2022-08-17", [
      {
        id: 5,
        title: "코딩함",
        startDateTime: {dateTime: "2022-08-17T01:00"},
        endDateTime: {dateTime: "2022-08-17T05:00"},
        isGood: true,
        category: "INTELLECTUAL",
        memo: undefined
      },
      {
        id: 6,
        title: "카페에 왔다",
        startDateTime: {dateTime: "2022-08-17T10:00"},
        endDateTime: {dateTime: "2022-08-17T13:00"},
        isGood: true,
        category: "INTELLECTUAL",
        memo: undefined
      },
    ]],
    ["2022-08-18", [
      {
        id: 7,
        title: "베라 피티를 함",
        startDateTime: {dateTime: "2022-08-18T01:00"},
        endDateTime: {dateTime: "2022-08-18T04:00"},
        isGood: true,
        category: "PHYSICAL",
        memo: "개힘들다"
      },
    ]],
    ["2022-08-19", [
      {
        id: 8,
        title: "산책을 함",
        startDateTime: {dateTime: "2022-08-19T01:00"},
        endDateTime: {dateTime: "2022-08-19T04:00"},
        isGood: false,
        category: "SPIRITUAL",
        memo: "개운하다"
      },
    ]],

    ["2022-08-20", [
      {
        id: 9,
        title: "잠을 뒤척임",
        startDateTime: {dateTime: "2022-08-20T02:00"},
        endDateTime: {dateTime: "2022-08-20T05:00"},
        isGood: false,
        category: "NONE",
        memo: "힘들다"
      },
    ]],

    ["2022-08-21", [
      {
        id: 10,
        title: "sleep bad",
        startDateTime: {dateTime: "2022-08-21T00:00"},
        endDateTime: {dateTime: "2022-08-21T05:00"},
        isGood: false,
        category: "NONE",
        memo: "힘들다"
      },
    ]]
  ]),
  undefined,
  new Map<string, TodoDto[]>([
    ["2022-08-14", [
      {
        id: 1,
        isChecked: false,
        content: "해야하는데 아직 못함"
      },
      {
        id: 3,
        isChecked: true,
        content: "쉽게 함"
      }
    ]],
    ["2022-08-15", [
      {
        id: 2,
        isChecked: true,
        content: "다했음!"
      }
    ]],
  ])
);


const onSubmitHandler = (e, exTimeBlock: TimeBlockDto, closeModal: (e) => void, timeBlocks: WeekTimes, updateTimeBlocks: (timeBlocks: WeekTimes) => void) => {
  // e.preventDefault();

  if (e.target.innerText !== 'edit' && e.target.innerText !== 'remove') {
    return;
  }
  //



  if (e.target.innerText === 'edit') {
    alert("should api call modified")
    let title = e.currentTarget[0].value;
    let startDate = e.currentTarget[1].value;
    let startTime = e.currentTarget[2].value;
    let endDate = e.currentTarget[3].value;
    let endTime = e.currentTarget[4].value;
    let isGood = e.currentTarget[5].checked;
    let category = e.currentTarget[6].value;
    let memo = e.currentTarget[7].value;
    const [startMonth, startDay, startYear] = startDate.split('.')
    const [endMonth, endDay, endYear] = endDate.split('.')

    const newTimeBlock: TimeBlockDto = {id: exTimeBlock.id, title: title,
      startDateTime: {dateTime: startYear + '-' + startMonth + '-' + startDay + "T" + startTime + ":00"},
      endDateTime: {dateTime: endYear + '-' + endMonth + '-' + endDay + "T" + endTime + ":00"},
      isGood: isGood,
      category: category,
      memo: memo
    }

    const formattedDate = exTimeBlock.startDateTime.dateTime.split("T")[0];
    let timeBlockDtosAtDate: TimeBlockDto[] | undefined = timeBlocks.timesWithinThisWeek.get(formattedDate);
    let newTimeBlockDtos = timeBlockDtosAtDate!.map((timeBlockDto) => {
      if (newTimeBlock.id === timeBlockDto.id) {
        return newTimeBlock;
      } else {
        return timeBlockDto;
      }
    })

    timeBlocks.timesWithinThisWeek.set(formattedDate, newTimeBlockDtos);
    updateTimeBlocks(timeBlocks);

  }

  closeModal(e)
}

const TimeBlockEditForm: React.FC<{ onSubmit: (e) => void, timeBlockDto: TimeBlockDto, closeModal: (e) => void, timeBlocks: WeekTimes, updateTimeBlocks: (timeBlocks: WeekTimes) => void }> =
  (props: { onSubmit: (e) => void, timeBlockDto: TimeBlockDto, closeModal: (e) => void, timeBlocks: WeekTimes, updateTimeBlocks: (timeBlocks: WeekTimes) => void}) => {
    const {onSubmit, timeBlockDto, closeModal, timeBlocks, updateTimeBlocks} = props;
    const [isGood, setIsGood] = useState(timeBlockDto.isGood)
    const toggleIsGood = (e) => {
      console.log("toggleIsGood")
      e.stopPropagation();
      setIsGood(!isGood);
    }

    return <form
      css={css({
        "input[type=time]::-webkit-clear-button": {
          "-webkit-appearance": "none",
          "-moz-appearance": "none",
          "-o-appearance": "none",
          "-ms-appearance": "none",
          "appearance": "none",
          "margin": "-10px",
        },
        '.input-key': {
          width: "100px"
        },
        "label": {
          marginBottom: "0px"
        },
        "input": {
          paddingLeft: "10px"
        },
        fontFamily: "ObjectSans-Slanted"
      })}
      id={"time-block-form"}
      onClick={(event => onSubmitHandler(event, timeBlockDto, closeModal, timeBlocks, updateTimeBlocks))}
    >
      <div className="form-group" css={css({
        display: "flex",
        flexDirection: "row",
      })}>
        <label className="input-key" css={css({
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "flex-end",
          paddingRight: "30px",
        })} htmlFor="title">title </label>
        <input css={css({
          width: "280px",
          borderWidth: "0px",

          "-moz-box-shadow": "0 4px 6px -6px #222",
          "-webkit-box-shadow": "0 4px 6px -6px #222",
          "box-shadow": "0 4px 6px -6px #222",
          ":focus-visible": {
            outline: "0px"
          }
        })} id="title" defaultValue={timeBlockDto.title}/>
      </div>

      <div className="form-group" css={css({
        display: "flex",
        flexDirection: "row",
      })}>
        <label css={css({
          display: "flex",
          justifyContent: "flex-end",
          paddingRight: "30px"
        })} className="input-key" htmlFor="startDateTime">start</label>
        {/*<input className="form-control" id="startDateTime"/>*/}
        <div>
          <div css={css({
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            // width: new Pixel(155).toString()
          })}
               id={"startDateTime"}
          >
            <DatePicker dateTime={timeBlockDto.startDateTime.dateTime}/>
            <div>-</div>

            <TimePicker initialValue={timeBlockDto.startDateTime.dateTime.split("T")[1].slice(0, 2)}/>
          </div>
        </div>
      </div>

      <div className="form-group" css={css({
        display: "flex",
        flexDirection: "row",
      })}>
        <label css={css({
          display: "flex",
          justifyContent: "flex-end",
          paddingRight: "30px"
        })} className="input-key" htmlFor="endDateTime">end</label>
        <div>
          <div css={css({
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          })}
               id={"endDateTime"}>
            <DatePicker dateTime={timeBlockDto.endDateTime.dateTime}/>
            <div>-</div>
            <TimePicker initialValue={timeBlockDto.endDateTime.dateTime.split("T")[1].slice(0, 2)}/>
          </div>
        </div>
      </div>
      <div className="form-group" css={css({
        ".switch": {
          position: "relative",
          display: "inline-block",
          width: "60px",
          height: "34px",
        },
        ".switch input": {
          opacity: 0,
          width: 0,
          height: 0,
        },
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
      })}>
        <label css={css({
          display: "flex",
          justifyContent: "flex-end",
          paddingRight: "30px"

        })} className="input-key" htmlFor="isGood">good?</label>
        <label className="switch" css={css({
          ".slider": {
            position: "absolute",
            cursor: "pointer",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            "background-color": `${Colors.theme.main.work}`,
            "-webkit-transition": ".4s",
            transition: ".4s",
            "-moz-box-shadow": "0 4px 6px -6px #222",
            "-webkit-box-shadow": "0 4px 6px -6px #222",
            "box-shadow": "0 4px 6px -4px #222",
            ":focus-visible": {
              outline: "0px"
            }

          },
          ".slider:before": {
            position: "absolute",
            content: '""',
            height: "26px",
            width: "26px",
            left: "4px",
            bottom: "4px",
            "background-color": "white",
            "-webkit-transition": ".4s",
            transition: ".4s",
          },

          ".slider.round": {
            "border-radius": "34px",
          },
          ".slider.round:before": {
            "border-radius": "50%",
          },
          "input:checked + .slider": {
            "background-color": `${Colors.theme.main.orgasme}`,
          },

          "input:checked + .slider:before": {
            "-webkit-transform": "translateX(26px)",
            "-ms-transform": "translateX(26px)",
            transform: "translateX(26px)",
          }
        })}>
          <input
            onClick={toggleIsGood}
            defaultChecked={isGood}
            type="checkbox"/>
          <span className="slider round"/>
        </label>
      </div>
      <div className="form-group" css={css({
        ".select_box": {
          width: "120px",
          overflow: "hidden",
          "-moz-box-shadow": "0 4px 6px -6px #222",
          "-webkit-box-shadow": "0 4px 6px -6px #222",
          "box-shadow": "0px 4px 6px -6px #222",
          position: "relative",
          padding: "5px 0",
        },


        ".select_box select": {
          width: "120px",
          border: 0,
          position: "relative",
          // "z-index": 99,
          background: "none",
        },
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
      })}
      >
        <label css={css({
          display: "flex",
          justifyContent: "flex-end",
          paddingRight: "30px",
        })} className="input-key" htmlFor="category">category</label>

        <div className="select_box">
          <select css={css({
            ":focus-visible": {
              outline: "0px"
            }
          })} name="category" id="category-select">
            {options.map((option) => {
              return <option value={option.value} selected={option.value === timeBlockDto.category}>{option.label}</option>;
            })}
          </select>
        </div>
      </div>

      <div className="form-group" css={css({
        display: "flex",
        flexDirection: "row"
      })}>
        <label css={css({
          display: "flex",
          justifyContent: "flex-end",
          paddingRight: "30px"
        })} className="input-key" htmlFor="memo">memo</label>

        <textarea
          // className="form-control"
          id="memo"
          css={css({
            width: "280px",
            borderRadius: "0.25rem",
            border: "0px solid",
            borderColor: "#222",
            height: "200px",
            // "-moz-box-shadow": "-10px 10px 20px -20px #222",
            // "-webkit-box-shadow": "-10px 10px 20px -20px #222",
            "box-shadow": "0px 0px 6px -2px #222",
            ":focus-visible": {
              outline: "0px"
            }
            //{/*"box-shadow": "0 4px 6px -6px #222",*/}
          })}
          defaultValue={timeBlockDto.memo}
        />
      </div>
      <div className="form-group">
        <div css={css({
          paddingTop: "15px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          '.button-work': {
            backgroundColor: Colors.theme.main.work,
            border: "none",
            color: Colors.theme.button.default,
          },
          '.button-orgasm': {
            backgroundColor: Colors.theme.main.orgasme,
            border: "none",
            color: Colors.theme.button.default,
          },
        })}>
          <button
            css={css({
              width: "48%",
              borderRadius: 7,
              height: new Pixel(40).toString()
            })}
            className={!isGood ? 'button-work': 'button-orgasm'}
            // onClick={(e) => onSubmitHandler(e, timeBlockDto, closeModal, timeBlocks, updateTimeBlocks)}
            // type={"submit"}
          >remove</button>

          <button
            css={css({
              width: "48%",
              borderRadius: 7,
              height: new Pixel(40).toString()
            })}
            className={!isGood ? 'button-work': 'button-orgasm'}
            // onClick={(e) => onSubmitHandler(e, timeBlockDto, closeModal, timeBlocks, updateTimeBlocks)}
            // type={"submit"}
            type={"button"}
          >edit</button>

        </div>
      </div>


    </form>
  };

export default TimeBlockEditForm;
