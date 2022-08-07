import React from "react";
import * as RcTimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import moment from "moment";
import {DateTime} from "src/model/DateTime";
import {Dayjs} from "dayjs";
import Pixel from "src/graphic/size/pixel";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";

// props: {day: Dayjs, borderRight: Pixel, borderLeft: Pixel, borderBottom: Pixel, borderTop: Pixel }
const TimePicker: React.FC<{dateTime: DateTime}> = (props:{dateTime: DateTime}) => {
  const {dateTime} = props;
  const [dispatchTime, setDispatchTime] = React.useState(moment(dateTime.getDateTime()));
  const handleValueChange = value => {
    setDispatchTime(value);
    console.log("value" + value);
  };
  return (
    <div css={css({
      ".rc-time-picker-input": {
        backgroundColor: 'yellow',
        borderColor: "red",
        color: "orange"
      }
    })}>
      {/* <h1>Hello</h1> */}
      <RcTimePicker.default
        value={dispatchTime}
        onChange={handleValueChange}
        showSecond={false}
        allowEmpty={false}
      />
    </div>
  );
}

export default TimePicker;
