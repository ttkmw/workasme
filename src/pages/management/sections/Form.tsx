import React, {useState} from 'react';
import {DateTime} from "src/model/DateTime";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import TimePickerWrapper from "src/pages/components/TimePickerWrapper";
import {start} from "repl";
import DatePicker from "src/pages/components/DatePicker";
import moment from "moment";
import TimePicker from 'react-time-picker';

interface FormProps {
  onSubmit: (e)=> void,
  startDateTime: DateTime,
  endDateTime: DateTime
}


const hrs = ["01", "02", "03", "04", "05","06","07","08","09","10","11", "12", "13", "14", "15","16","17","18","19","20","21", "22", "23"];
const mins = ["01", "02", "03", "04", "05","06","07","08","09","10","11", "12", "13", "14", "15","16","17","18","19","20","21", "22", "23", "24", "25","26","27","28","29","30","31", "32", "33", "34", "35","36","37","38","39","40","41", "42", "43", "44", "45","46","47","48","49","50","51", "52", "53", "54", "55","56","57","58","59"];
//https://stackoverflow.com/questions/45283030/html5-input-type-time-without-am-pm-and-with-min-max
export const Form = ({onSubmit, startDateTime, endDateTime}: FormProps) => {
  const [dispatchTime, setDispatchTime] = React.useState(moment());
  const showSecond = true;
  const str = showSecond ? 'HH:mm:ss' : 'HH:mm';
  const [value, onChange] = useState('10:00');
  const [duration, setDuration] = React.useState(startDateTime.getHour());
  const handleChangeDuration = event => {
    setDuration(event.target.value);
  };
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
        <DatePicker />
        <TimePickerWrapper dateTime={startDateTime}/>

        <select
          value={duration}
          onChange={handleChangeDuration}
        >
          <option value={0}>00</option>
          {hrs.map(info => (
            <option value={info}>{info}</option>
          ))}

        </select>
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
