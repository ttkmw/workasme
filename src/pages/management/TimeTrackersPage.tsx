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
    {id: 1, alias: "3", startTime: "03:00"},
    {id: 2, alias: "4", startTime: "04:00"},
    {id: 3, alias: "5", startTime: "05:00"},
    {id: 4, alias: "6", startTime: "06:00"},
    {id: 5, alias: "7", startTime: "07:00"},
    {id: 6, alias: "8", startTime: "08:00"},
    {id: 7, alias: "9", startTime: "09:00"},
    {id: 8, alias: "10", startTime: "10:00"},
    {id: 9, alias: "11", startTime: "11:00"},
    {id: 10, alias: "12", startTime: "12:00"},
    {id: 11, alias: "13", startTime: "13:00"},
    {id: 12, alias: "14", startTime: "14:00"},
    {id: 13, alias: "15", startTime: "15:00"},
    {id: 14, alias: "16", startTime: "16:00"},
    {id: 15, alias: "17", startTime: "17:00"},
    {id: 16, alias: "18", startTime: "18:00"},
    {id: 17, alias: "19", startTime: "19:00"},
    {id: 18, alias: "20", startTime: "20:00"},
    {id: 19, alias: "21", startTime: "21:00"},
    {id: 20, alias: "22", startTime: "22:00"},
    {id: 21, alias: "23", startTime: "23:00"},
    {id: 22, alias: "00", startTime: "00:00"},
    {id: 23, alias: "1", startTime: "01:00"},
    {id: 24, alias: "2", startTime: "02:00"},
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
