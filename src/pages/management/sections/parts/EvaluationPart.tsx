import React from "react";
import Pixel from "src/graphic/size/pixel";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import Chart from "react-google-charts";

const EvaluationPart: React.FC<{height: Pixel}> = (props: {height: Pixel}) => {
  const {height} = props;
  return <div css={css({
    backgroundColor: 'red',
    height: height.value
  })}>
    <EvaluationPieChartComponent />
    <FeedbackComponent />
  </div>
};

const FeedbackComponent: React.FC = () => {
  return <div>hahaha</div>
};

const EvaluationPieChartComponent: React.FC = () => {
  return <Chart
    width={'500px'}
    height={'300px'}
    chartType="PieChart"
    loader={<div>Loading Chart</div>}
    data={[
      ['Time Category', 'Hours per Day'],
      ['Mental', 11],
      ['Physical', 2],
      ['Intellectual', 2],
      ['etc', 9],
    ]}
    options={{
      title: 'Time Track Results',
    }}
    rootProps={{ 'data-testid': '1' }}
  />;
};


const EvaluationGraphPart: React.FC = () => {
  return <div/>;
};

const SuggestPart: React.FC = () => {
  return <div/>;
};

export default EvaluationPart;
