import React from "react";
import {Tab, Tabs} from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import TaskManagementSection from "./sections/TaskManagementSection";
import TimeManagementSection from "src/pages/management/sections/TimeManagementSection";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import Pixel from "src/graphic/size/pixel";
import Colors from "src/constants/Colors";

const ManagementPage: React.FC = () => {
  return <Container>
    <>
      <style > {`
            .navlink-custom > a:hover {
                color: ${Colors.theme.text.tab.disabled};
            }
            .navlink-custom > a {
                color: ${Colors.theme.text.tab.inactive};
            }
          `}
      </style>
      <Tabs className="navlink-custom" defaultActiveKey="time" id="management">
        <Tab className="navtab-custom"  eventKey="time" title="Time">
          <TimeManagementSection />
        </Tab>
        <Tab eventKey="task" title="Task" css={css({
          color: 'black'
        })}>
          <TaskManagementSection />
        </Tab>
        <Tab eventKey="Project" title="Project - Please Wait!" disabled>
        </Tab>
      </Tabs>
    </>

  </Container>
};


export default ManagementPage;
