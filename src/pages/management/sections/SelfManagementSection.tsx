import React from "react";
import YouShouldFocusOnPriorityPart from "src/pages/management/sections/parts/YouShouldFocusOnPriorityPart";
import EvaluationPart from "src/pages/management/sections/parts/EvaluationPart";
import TimeTrackerPart from "src/pages/management/sections/parts/TimeTrackerPart";
import SideBar from "src/pages/components/bars/navigation/SideBar";
import {Col, Container, Row} from "react-bootstrap";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import Pixel from "src/graphic/size/pixel";
import {
  Element,
} from "react-scroll";
import TaskListPart from "./parts/TaskListPart";

const SelfManagementSection: React.FC = () => {
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
            name="ToDoList"
          >
            <TaskListPart marginVertical={marginVertical}/>
          </Element>

          <Element
            name="Memento"
          >
            <TimeTrackerPart height={new Pixel(300)}/>
          </Element>

          <Element
            name="Feedback"
          >
            <EvaluationPart height={new Pixel(300)}/>
          </Element>
        </Col>
        <SideBar width={new Pixel(270)}/>
      </Row>
    </Col>
  </Container>;
};


export default SelfManagementSection;
