import React from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import Pixel from "src/graphic/size/pixel";

const hrs = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
const TimePicker: React.FC<{ initialValue: string }> = (props: { initialValue: string }) => {
  const {initialValue} = props;
  const [value, setValue] = React.useState(initialValue);
  const handleChangeValue = event => {
    setValue(event.target.value);
  };

  return <div css={css({
    display: "flex",
    flexDirection: "row",
    MozBoxShadow: "0 4px 6px -6px #222",
    WebkitBoxShadow: "0 4px 6px -6px #222",
    boxShadow: "0 4px 6px -6px #222",
    // borderLeftWidth: new Pixel(0).toString(),
    // borderTopWidth: new Pixel(0).toString(),
    // borderRightWidth: new Pixel(0).toString(),
    // borderBottomWidth: new Pixel(1).toString(),
    // borderBottomColor: "#ced4da",
    // borderStyle: "solid",
    width: new Pixel(70).toString(),
    justifyContent: "center"
  })}>
    <select
      value={value}
      onChange={handleChangeValue}
      css={css({
        WebkitAppearance: "none",
        MozAppearance: "none",
        textIndent: "1px",
        textOverflow: '',

        borderLeftWidth: new Pixel(0).toString(),
        borderTopWidth: new Pixel(0).toString(),
        borderRightWidth: new Pixel(0).toString(),
        borderBottomWidth: new Pixel(0).toString(),

        ":focus-visible": {
          outline: "0px"
        }
      })}
    >
      {hrs.map((info, index) => (
        <option key={index} value={info}>{info}</option>
      ))}

    </select>
    <div css={css({
      display: "flex",
      alignItems: "center",
    })}>:00</div>
  </div>;
}

export default TimePicker;
