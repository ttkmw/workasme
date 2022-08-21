import React, {useState} from 'react';
import {DateTime} from "src/model/DateTime";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import DatePicker from "src/pages/components/DatePicker";
import TimePicker from "src/pages/components/TimePicker";
import Pixel from "src/graphic/size/pixel";
import Colors from "src/constants/Colors";
import '../../../index.css';
import {TimeRecord} from "src/model/TimeRecord";
import {options} from "src/pages/components/timeblock/CategoryOptions";
import {WeekTimes} from "src/model/WeekTimes";
import {TimeBlockDto} from "src/dtos/TimeBlockDto";

interface FormProps {
  earliestRecord: TimeRecord,
  latestRecord: TimeRecord,
  closeModal: (e) => void,
  timeBlocks: WeekTimes,
  updateTimeBlocks: (timeBlocks: WeekTimes) => void
}


const mins = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"];

const onRegister = (e, closeModal: (e) => void, timeBlocks: WeekTimes, updateTimeBlocks: (timeBlocks: WeekTimes) => void) => {
  if (e.target.innerText !== 'record') {
    return;
  }
  e.stopPropagation();
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
  //
  // assertIsFormFieldElement(title);
  // assertIsFormFieldElement(startDate);
  // assertIsFormFieldElement(startTime);
  // assertIsFormFieldElement(endDate);
  const formattedStartDate = startYear + '-' + startMonth + '-' + startDay;
  const startDateTime = startYear + '-' + startMonth + '-' + startDay + "T" + startTime + ":00";
  const endDateTime = endYear + '-' + endMonth + '-' + endDay + "T" + endTime + ":00";
  const newTimeBlock: TimeBlockDto = {id: 0, title: title,
    startDateTime: {dateTime: startDateTime},
    endDateTime: {dateTime: endDateTime},
    isGood: isGood,
    category: category,
    memo: memo
  }



  let timeBlockDtosAtDate: TimeBlockDto[] | undefined = timeBlocks.timesWithinThisWeek.get(formattedStartDate);
  console.log("formated", formattedStartDate);
  console.log("ex", timeBlockDtosAtDate);
  let newTimeBlockDtosAtDate;
  if (timeBlockDtosAtDate == undefined) {
    newTimeBlockDtosAtDate = [newTimeBlock]
  } else {
    newTimeBlockDtosAtDate = [...timeBlockDtosAtDate, newTimeBlock]
  }

  console.log("new", newTimeBlockDtosAtDate)

  timeBlocks.timesWithinThisWeek.set(formattedStartDate, newTimeBlockDtosAtDate);
  updateTimeBlocks(timeBlocks);
  closeModal(e);

};

function assertIsFormFieldElement(element: Element): asserts element is HTMLInputElement | HTMLSelectElement | HTMLButtonElement {
// Customize this list as necessary −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  if (!("value" in element)) {
    throw new Error(`Element is not a form field element`);
  }
}

//https://stackoverflow.com/questions/45283030/html5-input-type-time-without-am-pm-and-with-min-max
export const TimeBlockRegisterForm: React.FC<FormProps> = (props: FormProps) => {
  const {earliestRecord, latestRecord, closeModal, timeBlocks, updateTimeBlocks } = props;
  const [isGood, setIsGood] = useState(false)
  const toggleIsGood = () => setIsGood(!isGood)

  return (
    <form
      css={css({
        ".without_ampm::-webkit-datetime-edit-ampm-field": {
          display: "none"
        },
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
        "input": {
          paddingLeft: "10px"
        },
        "label": {
          marginBottom: "0px"
        },
        fontFamily: "ObjectSans-Slanted"
      })}
      onClick={(e) => onRegister(e, closeModal, timeBlocks, updateTimeBlocks)}>
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
        })} id="title"/>
        {/*<input css={css({*/}
        {/*  border: 0,*/}
        {/*  borderBottom: 1,*/}
        {/*  borderBottomStyle: "solid",*/}
        {/*  borderBottomColor: Colors.theme.table.innerLine,*/}
        {/*  marginLeft: "5%",*/}
        {/*  width: "90%"*/}
        {/*})} type={"text"}/>*/}
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
            <DatePicker dateTime={earliestRecord.getStartDateTime()}/>
            <div>-</div>
            <TimePicker initialValue={earliestRecord.getStartDateTime().split("T")[1].slice(0, 2)}/>
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
            <DatePicker dateTime={latestRecord.getEndDateTime()}/>
            <div>-</div>
            <TimePicker initialValue={latestRecord.getEndDateTime().split("T")[1].slice(0, 2)}/>
          </div>
        </div>
      </div>
      {/*todo: 여기에 시작 시간, 끝 시간 있어야 함*/}
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
            checked={isGood}
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
          })}

                  name="category" id="category-select">
            {options.map((option) => {
              return <option value={option.value}>{option.label}</option>;
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


        />
      </div>

      <div className="form-group">
        <div css={css({
          paddingTop: "15px",
          display: "flex",
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
              width: "100%",
              borderRadius: 7,
              height: new Pixel(40).toString()
            })}
            className={!isGood ? 'button-work' : 'button-orgasm'}
            type={"button"}
          >record
          </button>
        </div>
      </div>
    </form>
  );
};
export default TimeBlockRegisterForm;
