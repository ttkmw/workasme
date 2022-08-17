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



const onSubmitHandler = (e, timeBlockDto: TimeBlockDto) => {
  e.preventDefault();
  console.log("Inner Text", e.target.innerText, timeBlockDto.id);

  window.location.reload();
  // const form = document.getElementById("time-block-form");
  //
  // const event = new Event('submit', {
  //   'bubbles'    : true, // Whether the event will bubble up through the DOM or not
  //   'cancelable' : true  // Whether the event may be canceled or not
  // });
  //
  // form!.dispatchEvent( event );

  // call api, 분기처리
}

const TimeBlockEditForm: React.FC<{ onSubmit: (e) => void, timeBlockDto: TimeBlockDto }> =
  (props: { onSubmit: (e) => void, timeBlockDto: TimeBlockDto }) => {
    const {onSubmit, timeBlockDto} = props;
    const [isGood, setIsGood] = useState(timeBlockDto.isGood)
    const toggleIsGood = () => setIsGood(!isGood)

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
      // onSubmit={onSubmit}
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
            <DatePicker dateTime={timeBlockDto.startDateTime.getDateTime()}/>
            <div>-</div>

            <TimePicker initialValue={timeBlockDto.startDateTime.getDateTime().split("T")[1].slice(0, 2)}/>
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
            <DatePicker dateTime={timeBlockDto.endDateTime.getDateTime()}/>
            <div>-</div>
            <TimePicker initialValue={timeBlockDto.endDateTime.getDateTime().split("T")[1].slice(0, 2)}/>
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
            onClick={(e) => onSubmitHandler(e, timeBlockDto)}
            // type={"submit"}
          >remove</button>

          <button
            css={css({
              width: "48%",
              borderRadius: 7,
              height: new Pixel(40).toString()
            })}
            className={!isGood ? 'button-work': 'button-orgasm'}
            // type={"submit"}
          >edit</button>

        </div>
      </div>


    </form>
  };

export default TimeBlockEditForm;
