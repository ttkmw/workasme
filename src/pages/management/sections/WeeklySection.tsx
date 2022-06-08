import React from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import { Container} from "react-bootstrap";
import Pixel from "src/graphic/size/pixel";
import DayOfWeekWriteListPart from "src/pages/management/sections/parts/DayOfWeekWriteListPart";
import Percentage from "src/graphic/size/percentage";
import dayjs, {Dayjs} from "dayjs";


function calculateWeekdaysForView(day: dayjs.Dayjs): Dayjs[] {
  function getStartDate(day: dayjs.Dayjs) {
    if (day.day() == 0) {
      return day;
    }

    if (day.day() == 1) {
      return day.subtract(1, 'day')
    }

    if (day.day() == 2) {
      return day.subtract(2, 'day')
    }

    if (day.day() == 3) {
      return day.subtract(3, 'day')
    }

    if (day.day() == 4) {
      return day.subtract(4, 'day')
    }

    if (day.day() == 5) {
      return day.subtract(5, 'day')
    }

    return day.subtract(6, 'day')
  }

  const startDate = getStartDate(day);
  const result:Dayjs[] = [];
  for (let i = 0; i < 7; i++) {
    result.push(startDate.add(i, 'day'))
  }


  return result;
}

const WeeklySection: React.FC = () => {
  const marginVertical = new Pixel(30);
  const outlineBorder = new Pixel(1);
  const noBorder = new Pixel(0);
  const width = new Pixel(window.screen.width).multiply(new Percentage(2.5));
  const weekDays: Dayjs[] = calculateWeekdaysForView(dayjs());

  return <Container css={css({
    paddingLeft: 0,
    paddingRight: 0
  })}>
    <div css={css({
      paddingLeft: 0,
      paddingRight: 0,
      display: "flex",
      flexDirection: "row"
    })}>
      {weekDays.map((day) => {
        return <div css={css({
          minWidth: width.toString(),
          paddingLeft: 0,
          paddingRight: 0
        })}>
          <DayOfWeekWriteListPart day={day} borderRight={outlineBorder} borderLeft={noBorder} borderBottom={outlineBorder} borderTop={outlineBorder}/>
        </div>
      })}

    {/*  <div css={css({*/}
    {/*    minWidth: width.toString(),*/}
    {/*    paddingLeft: 0,*/}
    {/*    paddingRight: 0*/}
    {/*  })}>*/}
    {/*    <DayOfWeekWriteListPart date={"2022-05-08"} dayOfWeek={"SUNDAY"} borderRight={outlineBorder} borderLeft={noBorder} borderBottom={outlineBorder} borderTop={outlineBorder}/>*/}
    {/*  </div>*/}
    {/*  <div css={css({*/}
    {/*    minWidth: width.toString(),*/}
    {/*    paddingLeft: 0,*/}
    {/*    paddingRight: 0*/}
    {/*  })}>*/}
    {/*    <DayOfWeekWriteListPart date={"2022-05-08"} dayOfWeek={"SUNDAY"} borderRight={outlineBorder} borderLeft={noBorder} borderBottom={outlineBorder} borderTop={outlineBorder}/>*/}
    {/*  </div>*/}
    {/*  <div css={css({*/}
    {/*    minWidth: width.toString(),*/}
    {/*    paddingLeft: 0,*/}
    {/*    paddingRight: 0*/}
    {/*  })}>*/}
    {/*    <DayOfWeekWriteListPart date={"2022-05-08"} dayOfWeek={"SUNDAY"} borderRight={outlineBorder} borderLeft={noBorder} borderBottom={outlineBorder} borderTop={outlineBorder}/>*/}
    {/*  </div>*/}
    {/*  <div css={css({*/}
    {/*    minWidth: width.toString(),*/}
    {/*    paddingLeft: 0,*/}
    {/*    paddingRight: 0*/}
    {/*  })}>*/}
    {/*    <DayOfWeekWriteListPart date={"2022-05-08"} dayOfWeek={"SUNDAY"} borderRight={outlineBorder} borderLeft={noBorder} borderBottom={outlineBorder} borderTop={outlineBorder}/>*/}
    {/*  </div>*/}
    {/*  <div css={css({*/}
    {/*    minWidth: width.toString(),*/}
    {/*    paddingLeft: 0,*/}
    {/*    paddingRight: 0*/}
    {/*  })}>*/}
    {/*    <DayOfWeekWriteListPart date={"2022-05-08"} dayOfWeek={"SUNDAY"} borderRight={outlineBorder} borderLeft={noBorder} borderBottom={outlineBorder} borderTop={outlineBorder}/>*/}
    {/*  </div>*/}
    {/*  <div css={css({*/}
    {/*    minWidth: width.toString(),*/}
    {/*    paddingLeft: 0,*/}
    {/*    paddingRight: 0*/}
    {/*  })}>*/}
    {/*    <DayOfWeekWriteListPart date={"2022-05-08"} dayOfWeek={"SUNDAY"} borderRight={outlineBorder} borderLeft={noBorder} borderBottom={outlineBorder} borderTop={outlineBorder}/>*/}
    {/*  </div>*/}
    {/*  <div css={css({*/}
    {/*    minWidth: width.toString(),*/}
    {/*    paddingLeft: 0,*/}
    {/*    paddingRight: 0*/}
    {/*  })}>*/}
    {/*    <DayOfWeekWriteListPart date={"2022-05-08"} dayOfWeek={"SUNDAY"} borderRight={noBorder} borderLeft={noBorder} borderBottom={outlineBorder} borderTop={outlineBorder}/>*/}
    {/*  </div>*/}
    </div>
  </Container>;
}

export default WeeklySection;
