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
import Percentage from "src/graphic/size/percentage";
import TestSection from "src/pages/management/sections/TestSection";

const TimeTrackersPage: React.FC = () => {
  const items = [
    {id: 1, value: "3"},
    {id: 2, value: "4"},
    {id: 3, value: "5"},
    {id: 4, value: "6"},
    {id: 5, value: "7"},
    {id: 6, value: "8"},
    {id: 7, value: "9"},
    {id: 8, value: "10"},
    {id: 9, value: "11"},
    {id: 10, value: "12"},
    {id: 11, value: "13"},
    {id: 12, value: "14"},
    {id: 13, value: "15"},
    {id: 14, value: "16"},
    {id: 15, value: "17"},
    {id: 16, value: "18"},
    {id: 17, value: "19"},
    {id: 18, value: "20"},
    {id: 19, value: "21"},
    {id: 20, value: "22"},
    {id: 21, value: "23"},
    {id: 22, value: "00"},
    {id: 23, value: "1"},
    {id: 24, value: "2"},
  ]

  return <Container css={css({
    // marginRight: "0px",
    // marginLeft: "0px"
  })}>
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
          <TestSection items={items}/>
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
