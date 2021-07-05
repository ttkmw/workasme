import React from "react";
import {Col, Row, Tab, Tabs} from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import SelfManagementSection from "./sections/SelfManagementSection";

const ManagementPage: React.FC = () => {
  return <Container>
    <Tabs defaultActiveKey="self" id="management">
      <Tab eventKey="self" title="Self">
        <SelfManagementSection />
      </Tab>
      <Tab eventKey="team" title="Team - Please Wait!" disabled>
      </Tab>
    </Tabs>

  </Container>
};



const SelectSelfOrTeamTab: React.FC = () => {
  return <Container>
    <Col lg={9}>
      <Row lg={9}>
        <Tabs defaultActiveKey="self" id="management">
          <Tab eventKey="self" title="Self">
            <div>asdf</div>
          </Tab>
          <Tab eventKey="team" title="Team - Please Wait!"/>
        </Tabs>
      </Row>
    </Col>
  </Container>
};

export default ManagementPage;
