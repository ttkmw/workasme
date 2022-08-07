import React, { useState } from "react";
import * as ReactDatePicker from "react-datepicker";

/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import "react-datepicker/dist/react-datepicker.css";
import Pixel from "src/graphic/size/pixel";

//https://reactdatepicker.com/
const DatePicker: React.FC = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = (e) => {
    setIsOpen(!isOpen);
    setStartDate(e);
  };
  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  return (
    <div css={css({
      ".picker-input": {
        backgroundColor: "orange",
        width: new Pixel(100).toString()
      },
      ".react-datepicker__day--selected": {
        backgroundColor: "orange"
      },
      ".react-datepicker__day--keyboard-selected": {
        backgroundColor: "orange"
      }
      // ".react-datepicker__day--selecting": {
      //   backgroundColor: "orange"
      // }
    })}>
      <ReactDatePicker.default dateFormat="MM.dd.yyyy" calendarClassName="asa" className="picker-input" showPopperArrow={false} selected={startDate} onChange={(date:Date) => setStartDate(date)}/>
    </div>
  );
}

export default DatePicker;
