import React from "react";
import {Col, Row, Tab, Tabs} from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import TaskManagementSection from "./sections/TaskManagementSection";
import TimeManagementSection from "src/pages/management/sections/TimeManagementSection";

const ManagementPage: React.FC = () => {
  return <Container>
    <Tabs defaultActiveKey="time" id="management">
      <Tab eventKey="time" title="Time">
        <TimeManagementSection />
      </Tab>
      <Tab eventKey="task" title="Task">
        <TaskManagementSection />
      </Tab>
      <Tab eventKey="Project" title="Project - Please Wait!" disabled>
      </Tab>
    </Tabs>

  </Container>
};


export default ManagementPage;
