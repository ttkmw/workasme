import React, { useState } from "react";
import * as ReactDatePicker from "react-datepicker";

/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import "react-datepicker/dist/react-datepicker.css";
import Pixel from "src/graphic/size/pixel";
import Colors from "src/constants/Colors";

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
        // backgroundColor: "orange",
        textAlign: "center",
        width: new Pixel(90).toString(),
        borderLeftWidth: new Pixel(0).toString(),
        borderTopWidth: new Pixel(0).toString(),
        borderRightWidth: new Pixel(0).toString(),
        borderBottomColor: "#ced4da",
        borderBottomWidth: new Pixel(1).toString(),
        ":focus-visible": {
          outline: "0px"
        }
        // border: 0
      },
      ".react-datepicker__day--selected": {
        backgroundColor: Colors.theme.main.work
      },
      ".react-datepicker__day--keyboard-selected": {
        backgroundColor: Colors.theme.main.work
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
