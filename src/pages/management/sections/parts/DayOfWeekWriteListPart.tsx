import React from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import {Col, Container, Form, ListGroup, Row} from "react-bootstrap";
import NumberBox from "src/pages/management/sections/parts/components/box/NumberBox";
import Pixel from "src/graphic/size/pixel";
import font from "src/graphic/text/font";
import fontConfig from "src/graphic/text/font";
import Grey from "src/graphic/color/grey";
import Colors from "src/constants/Colors";
import CheckBox from "src/pages/management/sections/parts/components/box/CheckBox";
import Percentage from "src/graphic/size/percentage";

const DayOfWeekWriteListPart: React.FC<{ date: string, dayOfWeek: string, borderRight: Pixel, borderLeft: Pixel, borderBottom: Pixel, borderTop: Pixel }> =
  (props: { date: string, dayOfWeek: string, borderRight: Pixel, borderLeft: Pixel, borderBottom: Pixel, borderTop: Pixel }) => {

    const {date, dayOfWeek, borderRight, borderLeft, borderBottom, borderTop} = props;
    const checkBoxSize = new Pixel(15);


    return <div css={css({

    })}>
      <div css={css({
        marginTop: 0,
        marginBottom: 0,
        backgroundColor: 'black',
        display: 'flex',
        justifyContent: "space-around",
        color: "white",
        fontSize: "12px"
      })}>
        <div>date</div>
        <div>day of week</div>
      </div>
      <TodoList checkBoxSize={checkBoxSize}/>
      <TimeBlocks numberSize={checkBoxSize} borderRight={borderRight} borderLeft={borderLeft} borderTop={borderTop}
                  borderBottom={borderBottom}/>
    </div>
  }

const TodoList: React.FC<{checkBoxSize: Pixel}> = (props: {checkBoxSize: Pixel}) => {
  const {checkBoxSize} = props;
  let percent = new Percentage(100);
  return <div>
    <div css={css({
      display: "flex",
      alignItems: "center",
      marginLeft: "10px",
      marginRight: "10px"
      // width: "100%"
    })}>
      <CheckBox size={checkBoxSize} borderWidth={new Pixel(1.5)}
                borderColor={Colors.theme.main.work} beforeColor={Colors.theme.screen.background}
                afterColor={Colors.theme.main.work}
      />
      <input css={css({
        border: 0,
        borderBottom: 1,
        borderBottomStyle: "solid",
        borderBottomColor: Colors.theme.main.work,
        width: "125px"
      })} type={"text"}/>
    </div>
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
               numberColor={Colors.theme.text.box.number} boxWidth={new Pixel(14)} boxHeight={new Pixel(35)}
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
