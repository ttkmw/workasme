import React from "react";
import Pixel from "src/graphic/size/pixel";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import FullOptionPieChart from "src/pages/management/sections/parts/components/charts/FullOptionPieChart";
import {TimeTrackerRowDto} from "src/pages/management/sections/parts/dtos/TimeTrackerRowDto";
import {Col, Container, Form, ListGroup, Row} from "react-bootstrap";

const EvaluationPart: React.FC<{ height: Pixel }> = (props: { height: Pixel }) => {
  const {height} = props;
  return <Container css={css({
    height: height.value,
  })}>
    <Row css={css({
      alignItems: 'center'
    })}>
      <Col lg={5}>
        <EvaluationPieChartComponent/>
      </Col>
      <Col lg={7} >
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
    height: new Pixel(300).value,
    width: new Pixel(300).value
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
  return <Container >
    <Col>
      <ListGroup as={"ol"} variant="flush">
        <ListGroup.Item as={"li"}>Cras justo odio</ListGroup.Item>
        <ListGroup.Item as={"li"}>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item as={"li"}>Morbi leo risus</ListGroup.Item>
        <ListGroup.Item as={"li"}>Porta ac consectetur ac</ListGroup.Item>
      </ListGroup>

      <Form.Control css={css({
        marginTop: 10
      })} type="text" size="lg" placeholder="Comment" />

    </Col>
  </Container>
};


const EvaluationGraphPart: React.FC = () => {
  return <div/>;
};

const SuggestPart: React.FC = () => {
  return <div/>;
};

export default EvaluationPart;
