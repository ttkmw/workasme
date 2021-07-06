import React, {useState} from "react";
import Pixel from "src/graphic/size/pixel";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import Colors from "src/constants/Colors";
import {TimeTrackerRowDto} from "src/pages/management/sections/parts/dtos/TimeTrackerRowDto";
import {Table, Toast} from "react-bootstrap";

// todo: props 따로 빼기
const TimeTrackerPart: React.FC<{ marginVertical: Pixel }> = (props: { marginVertical: Pixel }) => {
  const {marginVertical} = props;


  const [rows, setRows] = useState<TimeTrackerRowDto[]>([
    {
      expectedTime: "TimTrakerPart",
      expectedPeriiod: "2 hour",
      acutualTime: "TimeTrackerPart",
      actualPeriod: "3 hour"
    }
  ]);


  return <div css={css({
    marginTop: marginVertical.value,
    marginBottom: marginVertical.value
  })}>

    <TimeTrackerTable/>

  </div>
};

const TimeTrackerTable: React.FC = () => {

  return <Table bordered hover>
    <thead>
    <tr>
      <th>Expected Time</th>
      <th>Expected Period</th>
      <th>Acutal Time</th>
      <th>Actual Period</th>
      <th>Time Category</th>
    </tr>
    </thead>
  </Table>
};

export default TimeTrackerPart;
