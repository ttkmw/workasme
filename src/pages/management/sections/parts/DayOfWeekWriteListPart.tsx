import React from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import NumberBox from "src/pages/management/sections/parts/components/box/NumberBox";
import Pixel from "src/graphic/size/pixel";
import fontConfig from "src/graphic/text/font";
import Colors from "src/constants/Colors";
import CheckBox from "src/pages/management/sections/parts/components/box/CheckBox";
import Percentage from "src/graphic/size/percentage";
import dayjs, {Dayjs} from 'dayjs'
import {parseDayOfWeekAlias} from "src/util/DayofweekParser"

const DayOfWeekWriteListPart: React.FC<{ day: Dayjs, borderRight: Pixel, borderLeft: Pixel, borderBottom: Pixel, borderTop: Pixel }> =
  (props: {day: Dayjs, borderRight: Pixel, borderLeft: Pixel, borderBottom: Pixel, borderTop: Pixel }) => {

    const {day, borderRight, borderLeft, borderBottom, borderTop} = props;
    const checkBoxSize = new Pixel(15);


    return <div css={css({

    })}>
      <DateGuide day={day}/>
      <TodoList checkBoxSize={checkBoxSize}/>
      <TimeBlocks numberSize={checkBoxSize} borderRight={borderRight} borderLeft={borderLeft} borderTop={borderTop}
                  borderBottom={borderBottom}/>
    </div>
  }
  const DateGuide: React.FC<{day: Dayjs}> = (props: {day: Dayjs}) => {
  const {day} = props;


  const fontSize = new Pixel(20);
    return <div css={css({
      marginTop: 0,
      marginBottom: 0,
      paddingLeft: "5px",
      display: 'flex',
      justifyContent: "space-between",
      fontSize: "12px"
    })}>
      <div css={css({
        width: "50%",
        color: Colors.theme.text.box.default,
        fontSize: fontSize.toString()
      })}>{parseDayOfWeekAlias(day.day())}</div>
      <div css={css({
        color: Colors.theme.text.box.default,
        fontSize: fontSize.toString()
      })}>{day.date()}</div>
    </div>
  }

const TodoList: React.FC<{checkBoxSize: Pixel}> = (props: {checkBoxSize: Pixel}) => {
  const {checkBoxSize} = props;
  let percent = new Percentage(100);
  return <div>
    <div css={css({
      display: "flex",
      alignItems: "center",
      marginLeft: "5px",
      marginRight: "10px",
      flexDirection: "column",
      paddingTop: checkBoxSize.multiply(new Percentage(50)).toString(),
      paddingBottom: checkBoxSize.multiply(new Percentage(50)).toString()
    })}>
      <Todo checkBoxSize={checkBoxSize}/>
      <Todo checkBoxSize={checkBoxSize}/>
      <Todo checkBoxSize={checkBoxSize}/>
    </div>
  </div>
}

const Todo: React.FC<{checkBoxSize: Pixel}> = (props: {checkBoxSize: Pixel}) => {
  const {checkBoxSize} = props;
  return <div css={css({
    display: "flex",
    alignItems: "center",

    marginTop: checkBoxSize.multiply(new Percentage(25)).toString(),
    marginBottom: checkBoxSize.multiply(new Percentage(25)).toString()
  })}>
    <CheckBox size={checkBoxSize} borderWidth={new Pixel(1.5)}
              borderColor={Colors.theme.table.innerLine} beforeColor={Colors.theme.screen.background}
              afterColor={Colors.theme.table.innerLine}
    />
    <input css={css({
      border: 0,
      borderBottom: 1,
      borderBottomStyle: "solid",
      borderBottomColor: Colors.theme.table.innerLine,
      marginLeft: "5%",
      width: "90%"
    })} type={"text"}/>
  </div>
}

const TimeBlocks: React.FC<{ numberSize: Pixel, borderRight: Pixel, borderLeft: Pixel, borderTop: Pixel, borderBottom: Pixel }> = (props: {
  numberSize: Pixel, borderRight: Pixel, borderLeft: Pixel, borderTop: Pixel, borderBottom: Pixel
}) => {
  const {numberSize, borderRight, borderLeft, borderTop, borderBottom} = props;
  const times = ["3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "00", "1", "2"]
  const timeBlocks = times.map((num) => <div css={css({
    borderBottom: 1,
    borderBottomStyle: "solid",
    borderBottomColor: Colors.theme.table.innerLine,
  })}>
    <NumberBox number={num} numberSize={numberSize} numberFont={fontConfig.web.medium.fontFamily}
               numberColor={Colors.theme.text.box.default} boxWidth={new Pixel(14)} boxHeight={new Pixel(35)}
               boxBackgroundColor={Colors.theme.screen.background} boxRadius={0}/>
  </div>)
  return <div css={css({
    borderRight: borderRight.toString(),
    borderLeft: borderLeft.toString(),
    borderTop: borderTop.toString(),
    borderBottom: borderBottom.toString(),
    borderStyle: "solid",
    borderColor: Colors.theme.table.outLine
  })}>
    {timeBlocks}
  </div>;
}

export default DayOfWeekWriteListPart;
