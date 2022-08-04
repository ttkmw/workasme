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
  const items = {
    "SUNDAY": [
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
    ],
    "MONDAY": [
      {id: 25, alias: "3", startTime: "03:00"},
      {id: 26, alias: "4", startTime: "04:00"},
      {id: 27, alias: "5", startTime: "05:00"},
      {id: 28, alias: "6", startTime: "06:00"},
      {id: 29, alias: "7", startTime: "07:00"},
      {id: 30, alias: "8", startTime: "08:00"},
      {id: 31, alias: "9", startTime: "09:00"},
      {id: 32, alias: "10", startTime: "10:00"},
      {id: 33, alias: "11", startTime: "11:00"},
      {id: 34, alias: "12", startTime: "12:00"},
      {id: 35, alias: "13", startTime: "13:00"},
      {id: 36, alias: "14", startTime: "14:00"},
      {id: 37, alias: "15", startTime: "15:00"},
      {id: 38, alias: "16", startTime: "16:00"},
      {id: 39, alias: "17", startTime: "17:00"},
      {id: 40, alias: "18", startTime: "18:00"},
      {id: 41, alias: "19", startTime: "19:00"},
      {id: 42, alias: "20", startTime: "20:00"},
      {id: 43, alias: "21", startTime: "21:00"},
      {id: 44, alias: "22", startTime: "22:00"},
      {id: 45, alias: "23", startTime: "23:00"},
      {id: 46, alias: "00", startTime: "00:00"},
      {id: 47, alias: "1", startTime: "01:00"},
      {id: 48, alias: "2", startTime: "02:00"},
    ],
    "TUESDAY": [
      {id: 49, alias: "3", startTime: "03:00"},
      {id: 50, alias: "4", startTime: "04:00"},
      {id: 51, alias: "5", startTime: "05:00"},
      {id: 52, alias: "6", startTime: "06:00"},
      {id: 53, alias: "7", startTime: "07:00"},
      {id: 54, alias: "8", startTime: "08:00"},
      {id: 55, alias: "9", startTime: "09:00"},
      {id: 56, alias: "10", startTime: "10:00"},
      {id: 57, alias: "11", startTime: "11:00"},
      {id: 58, alias: "12", startTime: "12:00"},
      {id: 59, alias: "13", startTime: "13:00"},
      {id: 60, alias: "14", startTime: "14:00"},
      {id: 61, alias: "15", startTime: "15:00"},
      {id: 62, alias: "16", startTime: "16:00"},
      {id: 63, alias: "17", startTime: "17:00"},
      {id: 64, alias: "18", startTime: "18:00"},
      {id: 65, alias: "19", startTime: "19:00"},
      {id: 66, alias: "20", startTime: "20:00"},
      {id: 67, alias: "21", startTime: "21:00"},
      {id: 68, alias: "22", startTime: "22:00"},
      {id: 69, alias: "23", startTime: "23:00"},
      {id: 70, alias: "00", startTime: "00:00"},
      {id: 71, alias: "1", startTime: "01:00"},
      {id: 72, alias: "2", startTime: "02:00"},
    ],
    "WEDNESDAY": [
      {id: 73, alias: "3", startTime: "03:00"},
      {id: 74, alias: "4", startTime: "04:00"},
      {id: 75, alias: "5", startTime: "05:00"},
      {id: 76, alias: "6", startTime: "06:00"},
      {id: 77, alias: "7", startTime: "07:00"},
      {id: 78, alias: "8", startTime: "08:00"},
      {id: 79, alias: "9", startTime: "09:00"},
      {id: 80, alias: "10", startTime: "10:00"},
      {id: 81, alias: "11", startTime: "11:00"},
      {id: 82, alias: "12", startTime: "12:00"},
      {id: 83, alias: "13", startTime: "13:00"},
      {id: 84, alias: "14", startTime: "14:00"},
      {id: 85, alias: "15", startTime: "15:00"},
      {id: 86, alias: "16", startTime: "16:00"},
      {id: 87, alias: "17", startTime: "17:00"},
      {id: 88, alias: "18", startTime: "18:00"},
      {id: 89, alias: "19", startTime: "19:00"},
      {id: 90, alias: "20", startTime: "20:00"},
      {id: 91, alias: "21", startTime: "21:00"},
      {id: 92, alias: "22", startTime: "22:00"},
      {id: 93, alias: "23", startTime: "23:00"},
      {id: 94, alias: "00", startTime: "00:00"},
      {id: 95, alias: "1", startTime: "01:00"},
      {id: 96, alias: "2", startTime: "02:00"},
    ],
    "THURSDAY": [
      {id: 97, alias: "3", startTime: "03:00"},
      {id: 98, alias: "4", startTime: "04:00"},
      {id: 99, alias: "5", startTime: "05:00"},
      {id: 100, alias: "6", startTime: "06:00"},
      {id: 101, alias: "7", startTime: "07:00"},
      {id: 102, alias: "8", startTime: "08:00"},
      {id: 103, alias: "9", startTime: "09:00"},
      {id: 104, alias: "10", startTime: "10:00"},
      {id: 105, alias: "11", startTime: "11:00"},
      {id: 106, alias: "12", startTime: "12:00"},
      {id: 107, alias: "13", startTime: "13:00"},
      {id: 108, alias: "14", startTime: "14:00"},
      {id: 109, alias: "15", startTime: "15:00"},
      {id: 110, alias: "16", startTime: "16:00"},
      {id: 111, alias: "17", startTime: "17:00"},
      {id: 112, alias: "18", startTime: "18:00"},
      {id: 113, alias: "19", startTime: "19:00"},
      {id: 114, alias: "20", startTime: "20:00"},
      {id: 115, alias: "21", startTime: "21:00"},
      {id: 116, alias: "22", startTime: "22:00"},
      {id: 117, alias: "23", startTime: "23:00"},
      {id: 118, alias: "00", startTime: "00:00"},
      {id: 119, alias: "1", startTime: "01:00"},
      {id: 120, alias: "2", startTime: "02:00"},
    ],
    "FRIDAY": [
      {id: 121, alias: "3", startTime: "03:00"},
      {id: 122, alias: "4", startTime: "04:00"},
      {id: 123, alias: "5", startTime: "05:00"},
      {id: 124, alias: "6", startTime: "06:00"},
      {id: 125, alias: "7", startTime: "07:00"},
      {id: 126, alias: "8", startTime: "08:00"},
      {id: 127, alias: "9", startTime: "09:00"},
      {id: 128, alias: "10", startTime: "10:00"},
      {id: 129, alias: "11", startTime: "11:00"},
      {id: 130, alias: "12", startTime: "12:00"},
      {id: 131, alias: "13", startTime: "13:00"},
      {id: 132, alias: "14", startTime: "14:00"},
      {id: 133, alias: "15", startTime: "15:00"},
      {id: 134, alias: "16", startTime: "16:00"},
      {id: 135, alias: "17", startTime: "17:00"},
      {id: 136, alias: "18", startTime: "18:00"},
      {id: 137, alias: "19", startTime: "19:00"},
      {id: 138, alias: "20", startTime: "20:00"},
      {id: 139, alias: "21", startTime: "21:00"},
      {id: 140, alias: "22", startTime: "22:00"},
      {id: 141, alias: "23", startTime: "23:00"},
      {id: 142, alias: "00", startTime: "00:00"},
      {id: 143, alias: "1", startTime: "01:00"},
      {id: 144, alias: "2", startTime: "02:00"},
    ],
    "SATURDAY": [
      {id: 145, alias: "3", startTime: "03:00"},
      {id: 146, alias: "4", startTime: "04:00"},
      {id: 147, alias: "5", startTime: "05:00"},
      {id: 148, alias: "6", startTime: "06:00"},
      {id: 149, alias: "7", startTime: "07:00"},
      {id: 150, alias: "8", startTime: "08:00"},
      {id: 151, alias: "9", startTime: "09:00"},
      {id: 152, alias: "10", startTime: "10:00"},
      {id: 153, alias: "11", startTime: "11:00"},
      {id: 154, alias: "12", startTime: "12:00"},
      {id: 155, alias: "13", startTime: "13:00"},
      {id: 156, alias: "14", startTime: "14:00"},
      {id: 157, alias: "15", startTime: "15:00"},
      {id: 158, alias: "16", startTime: "16:00"},
      {id: 159, alias: "17", startTime: "17:00"},
      {id: 160, alias: "18", startTime: "18:00"},
      {id: 161, alias: "19", startTime: "19:00"},
      {id: 162, alias: "20", startTime: "20:00"},
      {id: 163, alias: "21", startTime: "21:00"},
      {id: 164, alias: "22", startTime: "22:00"},
      {id: 165, alias: "23", startTime: "23:00"},
      {id: 166, alias: "00", startTime: "00:00"},
      {id: 167, alias: "1", startTime: "01:00"},
      {id: 168, alias: "2", startTime: "02:00"},
    ],
  }

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
