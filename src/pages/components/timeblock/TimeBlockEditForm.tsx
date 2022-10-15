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
import {WeekViewDto} from "src/dtos/WeekViewDto";


const onSubmitHandler = (e, exTimeBlockDto: TimeBlockDto, closeModal: (e) => void, timeBlocks: WeekViewDto, updateTimeBlocks: (timeBlocks: WeekViewDto) => void) => {
  console.log("exTimeBlockDto", exTimeBlockDto.startDateTime);

  if (e.target.innerText !== 'edit' && e.target.innerText !== 'remove') {
    return;
  }

  if (e.target.innerText === 'remove') {
    let id = Number(e.currentTarget[0].value);
    const startDate = exTimeBlockDto.startDateTime.dateTime.split('T')[0];
    const dailyRecord = timeBlocks.dailyRecords.get(startDate);
    if (dailyRecord === undefined) {
      throw Error("이상한데요~~")
    }
    alert("should api call deleted with id " + id)
    dailyRecord.times = dailyRecord.times.filter((timeBlockDto) => {
      return timeBlockDto.id !== exTimeBlockDto.id;
    });

    timeBlocks.dailyRecords.set(startDate, dailyRecord);
    updateTimeBlocks(timeBlocks);
  }


  if (e.target.innerText === 'edit') {
    let id = Number(e.currentTarget[0].value);
    let title = e.currentTarget[1].value;
    let startDate = e.currentTarget[2].value;
    let startTime = e.currentTarget[3].value;
    let endDate = e.currentTarget[4].value;
    let endTime = e.currentTarget[5].value;
    let isGood = e.currentTarget[6].checked;
    let category = e.currentTarget[7].value;
    let memo = e.currentTarget[8].value;

    const [startMonth, startDay, startYear] = startDate.split('.')
    const [endMonth, endDay, endYear] = endDate.split('.')

    alert("should api call modified")
    const newTimeBlock: TimeBlockDto = {id: id, title: title,
      startDateTime: {dateTime: startYear + '-' + startMonth + '-' + startDay + "T" + startTime + ":00"},
      endDateTime: {dateTime: endYear + '-' + endMonth + '-' + endDay + "T" + endTime + ":00"},
      isGood: isGood,
      category: category,
      memo: memo
    }

    const formattedDate = exTimeBlockDto.startDateTime.dateTime.split("T")[0];
    const dailyRecord = timeBlocks.dailyRecords.get(formattedDate);
    console.log("startDate", startDate);
    if (dailyRecord === undefined) {
      throw Error("이상한데요~");
    }

    dailyRecord.times = dailyRecord.times.map((timeBlockDto) => {
      if (newTimeBlock.id === timeBlockDto.id) {
        return newTimeBlock;
      } else {
        return timeBlockDto;
      }
    });

    timeBlocks.dailyRecords.set(formattedDate, dailyRecord);
    updateTimeBlocks(timeBlocks);

  }

  closeModal(e)
}

const TimeBlockEditForm: React.FC<{timeBlockDto: TimeBlockDto, closeModal: (e) => void, timeBlocks: WeekViewDto, updateTimeBlocks: (timeBlocks: WeekViewDto) => void }> =
  (props: { timeBlockDto: TimeBlockDto, closeModal: (e) => void, timeBlocks: WeekViewDto, updateTimeBlocks: (timeBlocks: WeekViewDto) => void}) => {
    const {timeBlockDto, closeModal, timeBlocks, updateTimeBlocks} = props;
    const [isGood, setIsGood] = useState(timeBlockDto.isGood)
    const toggleIsGood = (e) => {
      e.stopPropagation();
      setIsGood(!isGood);
    }

    return <form
      css={css({
        "input[type=time]::-webkit-clear-button": {
          WebkitAppearance: "none",
          MozAppearance: "none",
          OAppearance: "none",
          MsAppearance: "none",
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
        fontFamily: "Gaegu-Regular",
      })}
      id={"time-block-form"}
      onClick={(event => onSubmitHandler(event, timeBlockDto, closeModal, timeBlocks, updateTimeBlocks))}
    >
      <div className={"form-group"} css={css({
        display: "none"
      })}>
        <input defaultValue={timeBlockDto.id}/>
      </div>
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

          MozBoxShadow: "0 4px 6px -6px #222",
          WebkitBoxShadow: "0 4px 6px -6px #222",
          boxShadow: "0 4px 6px -6px #222",
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
            backgroundColor: `${Colors.theme.main.work}`,
            WebkitTransition: ".4s",
            transition: ".4s",
            MozBoxShadow: "0 4px 6px -6px #222",
            WebkitBoxShadow: "0 4px 6px -6px #222",
            boxShadow: "0 4px 6px -4px #222",
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
            backgroundColor: "white",
            WebkitTransition: ".4s",
            transition: ".4s",
          },

          ".slider.round": {
            borderRadius: "34px",
          },
          ".slider.round:before": {
            borderRadius: "50%",
          },
          "input:checked + .slider": {
            backgroundColor: `${Colors.theme.main.orgasme}`,
          },

          "input:checked + .slider:before": {
            WebkitTransform: "translateX(26px)",
            MsTransform: "translateX(26px)",
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
          MozBoxShadow: "0 4px 6px -6px #222",
          WebkitBoxShadow: "0 4px 6px -6px #222",
          boxShadow: "0px 4px 6px -6px #222",
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
          })} name="category" id="category-select"
                  defaultValue={timeBlockDto.category}
          >
            {options.map((option, index) => {
              return <option key={index} value={option.value}>{option.label}</option>;
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
            boxShadow: "0px 0px 6px -2px #222",
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
