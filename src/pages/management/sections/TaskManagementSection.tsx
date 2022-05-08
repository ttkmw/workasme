import React from "react";
import YouShouldFocusOnPriorityPart from "src/pages/management/sections/parts/YouShouldFocusOnPriorityPart";
import {Col, Container, Row} from "react-bootstrap";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import Pixel from "src/graphic/size/pixel";
import {
  Element,
} from "react-scroll";
import TaskListPart from "./parts/TaskListPart";

const TaskManagementSection: React.FC = () => {
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

          <Element
            name="YouShouldFocusOn"
          >
            <YouShouldFocusOnPriorityPart marginVertical={marginVertical}/>
          </Element>

          <Element
            name="TaskList"
          >
            <TaskListPart marginVertical={marginVertical}/>
          </Element>
        </Col>
      </Row>
    </Col>
  </Container>;
};


export default TaskManagementSection;
