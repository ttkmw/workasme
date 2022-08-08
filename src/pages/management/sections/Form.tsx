import React, {useState} from 'react';
import {DateTime} from "src/model/DateTime";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import DatePicker from "src/pages/components/DatePicker";
import TimePicker from "src/pages/components/TimePicker";
import Pixel from "src/graphic/size/pixel";
import Colors from "src/constants/Colors";

interface FormProps {
  onSubmit: (e) => void,
  startDateTime: DateTime,
  endDateTime: DateTime
}


const mins = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"];
//https://stackoverflow.com/questions/45283030/html5-input-type-time-without-am-pm-and-with-min-max
export const Form: React.FC<FormProps> = (props: FormProps) => {
  const showSecond = true;
  const {onSubmit, startDateTime, endDateTime} = props;



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
        }
      })}
      onClick={onSubmit}>
      <div className="form-group" css={css({
        display: "flex",
        flexDirection: "row",
      })}>
        <label className="input-key" css={css({
          lineHeight: new Pixel(27).toString(),
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
        })} htmlFor="title">title: </label>
        <input css={css({
          width: "300px",
          borderLeftWidth: new Pixel(0).toString(),
          borderTopWidth: new Pixel(0).toString(),
          borderRightWidth: new Pixel(0).toString(),
          borderBottomWidth: new Pixel(1).toString(),
          borderBottomColor: Colors.theme.form.border.default,
          ":focus-visible": {
            outline: "0px"
          }
        })} id="title"/>
      </div>
      <div className="form-group" css={css({
        display: "flex",
        flexDirection: "row",
      })}>
        <label className="input-key" htmlFor="startDateTime">start at:</label>
        {/*<input className="form-control" id="startDateTime"/>*/}
        <div >
          <div css={css({
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: new Pixel(155).toString()
          })}
               id={"startDateTime"}
          >
            <DatePicker/>
            <div>-</div>
            <TimePicker initialValue={startDateTime.getHour()}/>
          </div>
        </div>
      </div>
      <div className="form-group" css={css({
        display: "flex",
        flexDirection: "row",
      })}>
        <label className="input-key" htmlFor="endDateTime">end at:</label>
        <div>
          <div css={css({
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: new Pixel(155).toString()
          })}
               id={"endDateTime"}>
            <DatePicker/>
            <div>-</div>
            <TimePicker initialValue={endDateTime.getHour()}/>
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

      })}>
        <label className="input-key" htmlFor="isGood">good?</label>
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
          "input:focus + .slider": {
            boxShadow: "0 0 1px #2196F3",
          },
          "input:checked + .slider:before": {
            "-webkit-transform": "translateX(26px)",
            "-ms-transform": "translateX(26px)",
            transform: "translateX(26px)",
          }
        })}>
          <input
            type="checkbox"/>
          <span className="slider round"/>
        </label>
      </div>
      {/**/}
      <div className="form-group" css={css({
        ".select_box": {
        width: "110px",
        overflow: "hidden",
        border: `1px solid ${Colors.theme.form.border.default}`,
        position: "relative",
        padding: "5px 0",
      },
        ".select_box:after": {
        width: 0,
        height: 0,
        "border-left": "6px solid transparent",
        "border-right": "6px solid transparent",
        "border-top": `6px solid ${Colors.theme.main.work}`,
        position: "absolute",
        top: "40%",
        right: "5px",
        content: '""',
        "z-index": 98,
      },
        ".select_box select": {
        width: "120px",
        border: 0,
        position: "relative",
        "z-index": 99,
        background: "none",
      },
        display: "flex",
        flexDirection: "row"
      })}
      >
        <label className="input-key" htmlFor="category">category:</label>

        <div className="select_box">
          <select css={css({
            ":focus-visible": {
              outline: "0px"
            }
          })}

            name="category" id="category-select">
            <option value="none">None</option>
            <option value="spiritual">Spiritual</option>
            <option value="intellectual">Intellectual</option>
            <option value="social">Social</option>
            <option value="physical">Physical</option>
          </select>
        </div>
      </div>
      <div className="form-group" css={css({
        display: "flex",
        flexDirection: "row"
      })}>
        <label className="input-key" htmlFor="memo">memo:</label>
        <input
          className="form-control"
          id="memo"
          css={css({
            width: "300px",
            height: "200px"
          })}
        />
      </div>

      <div className="form-group">
        <button className="form-control btn btn-primary" type="button">
          Submit
        </button>
      </div>
    </form>
  );
};
export default Form;
