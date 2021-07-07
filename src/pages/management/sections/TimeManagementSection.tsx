import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import {Element} from "react-scroll";
import YouShouldFocusOnPriorityPart from "src/pages/management/sections/parts/YouShouldFocusOnPriorityPart";
import TaskListPart from "src/pages/management/sections/parts/TaskListPart";
import TimeTrackerPart from "src/pages/management/sections/parts/TimeTrackerPart";
import Pixel from "src/graphic/size/pixel";
import EvaluationPart from "src/pages/management/sections/parts/EvaluationPart";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";

const TimeManagementSection: React.FC = () => {
  const marginVertical = new Pixel(30);
  return <Container css={css({
    paddingLeft: 0,
    paddingRight: 0
  })}>
    <Col>
      <Row>
        <Col css={css({
          paddingLeft: 0,
          paddingRight: 0
        })}>
          <TimeTrackerPart marginVertical={marginVertical}/>
          <EvaluationPart height={new Pixel(300)}/>
        </Col>
      </Row>
    </Col>
  </Container>;
};

export default TimeManagementSection
