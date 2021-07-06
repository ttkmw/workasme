import React from "react";
import Pixel from "src/graphic/size/pixel";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import Chart from "react-google-charts";
import { PieChart } from "react-minimal-pie-chart";
import { LabelRenderProps } from "react-minimal-pie-chart/types/Label";
import FullOptionPieChart from "src/pages/management/sections/parts/components/charts/FullOptionPieChart";

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


const EvaluationPieChartComponent: React.FC = () => {
  return <div css={css({
    backgroundColor: 'yellow',
    height: 300,
    width: 300
  })}>
    <FullOptionPieChart
      data={[
        { title: 'Mental', value: 11, color: '#E38627' },
        { title: 'Physical', value: 2, color: '#C13C37' },
        { title: 'Intellectual', value: 2, color: '#6A2135' },
        { title: 'ETC', value: 9, color: 'blue' },
      ]}
    />

  </div>;
};

const FeedbackComponent: React.FC = () => {
  return <div>hahaha</div>
};


const EvaluationGraphPart: React.FC = () => {
  return <div/>;
};

const SuggestPart: React.FC = () => {
  return <div/>;
};

export default EvaluationPart;
