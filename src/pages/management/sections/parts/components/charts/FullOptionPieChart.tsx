import React, { useState, ComponentProps } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import Colors from "src/constants/Colors";

type Props = {
  data: ComponentProps<typeof PieChart>['data'];
};

function FullOptionPieChart(props: Props) {
  const [selected, setSelected] = useState<number | undefined>(0);
  const [hovered, setHovered] = useState<number | undefined>(undefined);

  const data = props.data.map((entry, i) => {
    if (hovered === i) {
      return {
        ...entry,
        color: Colors.theme.main.orgasme,
      };
    }
    return entry;
  });

  const lineWidth = 60;

  return (
    <PieChart
      style={{
        fontFamily:
          '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
        fontSize: '8px',
      }}
      data={data}
      radius={PieChart.defaultProps.radius - 6}
      lineWidth={lineWidth}
      segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
      segmentsShift={(index) => (index === selected ? 1 : 1)}
      animate
      label={({ dataEntry }) => {
        return Math.round(dataEntry.percentage) + "%"
      }}
      labelPosition={100 - lineWidth / 2}
      labelStyle={{
        fill: '#fff',
        opacity: 0.75,
        pointerEvents: 'none',
      }}
      onClick={(_, index) => {
        setSelected(index === selected ? undefined : index);
      }}
      onMouseOver={(_, index) => {
        setHovered(index);
      }}
      onMouseOut={() => {
        setHovered(undefined);
      }}
    />
  );
}

export default FullOptionPieChart;
