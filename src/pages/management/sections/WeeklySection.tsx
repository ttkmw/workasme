import React from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import {Col, Container, Row} from "react-bootstrap";
import TimeTrackerPart from "src/pages/management/sections/parts/TimeTrackerPart";
import EvaluationPart from "src/pages/management/sections/parts/EvaluationPart";
import Pixel from "src/graphic/size/pixel";
import {Element} from "react-scroll";
import TaskListPart from "src/pages/management/sections/parts/TaskListPart";
import DayOfWeekWriteListPart from "src/pages/management/sections/parts/DayOfWeekWriteListPart";


const WeeklySection: React.FC = () => {
  const marginVertical = new Pixel(30);
  const outlineBorder = new Pixel(1);
  const noBorder = new Pixel(0);
  return <Container css={css({
    paddingLeft: 0,
    paddingRight: 0,
  })}>
    <Row css={css({
      paddingLeft: 0,
      paddingRight: 0
    })}>
      <Col css={css({
        // paddingLeft: 0,
        paddingRight: 0
      })}>
        <DayOfWeekWriteListPart date={"2022-05-08"} dayOfWeek={"SUNDAY"} borderRight={outlineBorder} borderLeft={noBorder} borderBottom={outlineBorder} borderTop={outlineBorder}/>
      </Col>
      <Col css={css({
        paddingLeft: 0,
        paddingRight: 0
      })}>
        <DayOfWeekWriteListPart date={"2022-05-08"} dayOfWeek={"SUNDAY"} borderRight={outlineBorder} borderLeft={noBorder} borderBottom={outlineBorder} borderTop={outlineBorder}/>
      </Col>
      <Col css={css({
        paddingLeft: 0,
        paddingRight: 0
      })}>
        <DayOfWeekWriteListPart date={"2022-05-08"} dayOfWeek={"SUNDAY"} borderRight={outlineBorder} borderLeft={noBorder} borderBottom={outlineBorder} borderTop={outlineBorder}/>
      </Col>
      <Col css={css({
        paddingLeft: 0,
        paddingRight: 0
      })}>
        <DayOfWeekWriteListPart date={"2022-05-08"} dayOfWeek={"SUNDAY"} borderRight={outlineBorder} borderLeft={noBorder} borderBottom={outlineBorder} borderTop={outlineBorder}/>
      </Col>
      <Col css={css({
        paddingLeft: 0,
        paddingRight: 0
      })}>
        <DayOfWeekWriteListPart date={"2022-05-08"} dayOfWeek={"SUNDAY"} borderRight={outlineBorder} borderLeft={noBorder} borderBottom={outlineBorder} borderTop={outlineBorder}/>
      </Col>
      <Col css={css({
        paddingLeft: 0,
        paddingRight: 0
      })}>
        <DayOfWeekWriteListPart date={"2022-05-08"} dayOfWeek={"SUNDAY"} borderRight={outlineBorder} borderLeft={noBorder} borderBottom={outlineBorder} borderTop={outlineBorder}/>
      </Col>
      <Col css={css({
        paddingLeft: 0,
        paddingRight: 0
      })}>
        <DayOfWeekWriteListPart date={"2022-05-08"} dayOfWeek={"SUNDAY"} borderRight={noBorder} borderLeft={noBorder} borderBottom={outlineBorder} borderTop={outlineBorder}/>
      </Col>
    </Row>
  </Container>;
}

export default WeeklySection;
