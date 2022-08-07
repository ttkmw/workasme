import React from 'react';
import {DateTime} from "src/model/DateTime";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import TimePicker from "src/pages/components/TimePicker";
import {start} from "repl";

interface FormProps {
  onSubmit: (e)=> void,
  startDateTime: DateTime,
  endDateTime: DateTime
}

//https://stackoverflow.com/questions/45283030/html5-input-type-time-without-am-pm-and-with-min-max
export const Form = ({onSubmit, startDateTime, endDateTime}: FormProps) => {
  console.log("form")
  console.log(startDateTime);
  console.log(endDateTime);
  return (
    <form
      css={css({
        ".without_ampm::-webkit-datetime-edit-ampm-field" :{
        display: "none"
      },
        "input[type=time]::-webkit-clear-button": {
        "-webkit-appearance": "none",
        "-moz-appearance": "none",
        "-o-appearance": "none",
        "-ms-appearance":"none",
        "appearance": "none",
        "margin": "-10px",
      }
      })}
      onClick= {onSubmit}>
      <div className="form-group">
        <label htmlFor="title">title</label>
        <input className="form-control" id="title"/>
      </div>
      <div className="form-group">
        <label htmlFor="startDateTime">start at</label>
        <input className="form-control" id="startDateTime"/>
        <input type="date" name="startDate" id={"startDate"} lang="en-US"/>
        <TimePicker dateTime={startDateTime}/>
        <input className="form-control inputs time" placeholder="hrs:mins" pattern="^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$" type="time" id="startDateTime" value={startDateTime.getTime()} name="time" required/>
        {/*<input type="time" name="time" placeholder="hrs:mins" pattern="^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$" class="inputs time" required/>*/}
      </div>
      <div className="form-group">
        <label htmlFor="endDateTime" >end at</label>
        <input className="form-control" id="endDateTime"/>
      </div>
      {/*todo: 여기에 시작 시간, 끝 시간 있어야 함*/}
      <div className="form-group">
        <label htmlFor="isGood">good?</label>
        <input
          className="form-control"
          id="isGood"
        />
      </div>
      <div className="form-group">
        <label htmlFor="category">category</label>
        <input
          className="form-control"
          id="category"
        />
      </div>
      <div className="form-group">
        <label htmlFor="memo">memo</label>
        <input
          className="form-control"
          id="memo"
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
