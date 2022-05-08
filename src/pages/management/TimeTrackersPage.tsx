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
import WeeklySection from "src/pages/management/sections/WeeklySection";

const TimeTrackersPage: React.FC = () => {
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
      <Tabs className="navlink-custom" defaultActiveKey="monthly" id="management">
        <Tab className="navtab-custom"  eventKey="monthly" title="Monthly">

        </Tab>
        <Tab eventKey="weekly" title="Weekly">
          <WeeklySection/>
        </Tab>
      </Tabs>
    </>

  </Container>

  /*<Tab eventKey="weekly" title="Weekly" css={css({
    color: 'black'
  })} disabled>
    <TaskManagementSection />
  </Tab>*/
};


export default TimeTrackersPage;
