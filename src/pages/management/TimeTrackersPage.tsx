import React from "react";
import Container from 'react-bootstrap/Container';
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import Colors from "src/constants/Colors";
import TestSection from "src/pages/management/sections/TestSection";
import Header from "src/pages/components/bars/navigation/Header";
import WeekViewSection from "src/pages/management/sections/WeekViewSection";

const TimeTrackersPage: React.FC = () => {

  return <Container css={css({
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
      {/*<Tabs className="navlink-custom" defaultActiveKey="monthly" id="management">*/}
      {/*  <Tab className="navtab-custom"  eventKey="monthly" title="Monthly">*/}
      {/*    <TestSection items={items}/>*/}
      {/*  </Tab>*/}
      {/*  <Tab eventKey="weekly" title="Weekly">*/}
      {/*    <WeeklySection/>*/}
      {/*  </Tab>*/}
      {/*</Tabs>*/}
      <Header />
      <WeekViewSection />
    </>

  </Container>

  /*<Tab eventKey="weekly" title="Weekly" css={css({
    color: 'black'
  })} disabled>
    <TaskManagementSection />
  </Tab>*/
};


export default TimeTrackersPage;
