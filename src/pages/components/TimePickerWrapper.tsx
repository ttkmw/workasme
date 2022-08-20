import React, {useState} from "react";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import moment from "moment";
import {DateTime} from "src/model/DateTime";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";

//https://codesandbox.io/s/xepzr?file=/src/App.js:69-180
//http://localhost:3000/time-trackers
const TimePickerWrapper: React.FC<{dateTime: DateTime}> = (props:{dateTime: DateTime}) => {
  const {dateTime} = props;
  const [dispatchTime, setDispatchTime] = useState(moment(dateTime.dateTime));
  const handleValueChange = (value) => {
    setDispatchTime(value);
  };

  return (
    <div css={css({
      textAlign: "center",
      ".rc-time-picker-input": {
        backgroundColor: 'yellow',
        borderColor: "red",
        color: "orange"
      },
// 셀렉트 컴포넌트 찾아서 주기
    })}>
      <label>DispatchTime</label>
      <TimePicker
        value={dispatchTime}
        onChange={() => handleValueChange(dispatchTime)}
        showSecond={false}
        allowEmpty={false}
      />
    </div>
  );
}

export default TimePickerWrapper;
