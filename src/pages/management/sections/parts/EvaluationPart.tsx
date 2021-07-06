import React from "react";
import Pixel from "src/graphic/size/pixel";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import Chart from "react-google-charts";
import {PieChart} from "react-minimal-pie-chart";
import {LabelRenderProps} from "react-minimal-pie-chart/types/Label";
import FullOptionPieChart from "src/pages/management/sections/parts/components/charts/FullOptionPieChart";
import {TimeTrackerRowDto} from "src/pages/management/sections/parts/dtos/TimeTrackerRowDto";
import {Col, Container, Row} from "react-bootstrap";

const EvaluationPart: React.FC<{ height: Pixel }> = (props: { height: Pixel }) => {
  const {height} = props;
  return <Container css={css({
    backgroundColor: 'grey',
    height: height.value,
  })}>
    <Row>
      <Col>
        <EvaluationPieChartComponent/>
      </Col>
      <Col>
        <FeedbackComponent/>
      </Col>
    </Row>
  </Container>
};


// todo: timeTrackDto넣어주기 - section에서.
const EvaluationPieChartComponent: React.FC<{ timeTrackRowDto?: TimeTrackerRowDto }> =
  (props: { timeTrackRowDto?: TimeTrackerRowDto }) => {

  // todo: timeTrackRowDto -> timeTrackCategory. makeOutByTimetrackCategory
  return <div css={css({
    backgroundColor: 'yellow',
    height: 300,
    width: 300
  })}>
    <FullOptionPieChart
      data={[
        {title: 'Mental', value: 11, color: 'blue'},
        {title: 'Physical', value: 2, color: 'red'},
        {title: 'Intellectual', value: 2, color: 'orange'},
        {title: 'ETC', value: 9, color: 'green'},
      ]}
    />

  </div>;
};

const FeedbackComponent: React.FC = () => {
  return <span>hahaha</span>
};


const EvaluationGraphPart: React.FC = () => {
  return <div/>;
};

const SuggestPart: React.FC = () => {
  return <div/>;
};

export default EvaluationPart;
