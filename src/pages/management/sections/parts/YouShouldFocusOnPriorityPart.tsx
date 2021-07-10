import React from "react";
import Colors from "src/constants/Colors";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";

import Pixel from "src/graphic/size/pixel";
import {Accordion, Button, Card, ProgressBar} from "react-bootstrap";
import TitleComponent from "src/pages/management/sections/parts/components/TitleComponent";

const YouShouldFocusOnPriorityPart: React.FC<{ marginVertical: Pixel }> = (props: { marginVertical: Pixel }) => {
  const {marginVertical} = props;
  return <div css={css({
    marginTop: marginVertical.value,
    marginBottom: marginVertical.value
  })}>
    <TitleComponent cssObj={{
      marginBottom: new Pixel(20).value
    }}>
      <h2>
        You should focus on PRIORITY
      </h2>
    </TitleComponent>
    <PriorityInformationCard/>
  </div>;
};

const PriorityInformationCard: React.FC = () => {
  return <Card style={{width: '90%'}}>
    <Card.Header>
      <ProgressBarPart/>
    </Card.Header>
    <Card.Body>
      <Card.Title>Research GUI Components</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">ttkmw</Card.Subtitle>

      <TaskContent/>
    </Card.Body>
  </Card>;
};

const TaskContent: React.FC = () => {

  return <Accordion>
    <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="0">
          Pieces Of Task
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="0">
        <Card.Body>Hello! I'm the body</Card.Body>
      </Accordion.Collapse>
    </Card>
    <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="1">
          BottleNeck logs
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="1">
        <Card.Body>Hello! I'm another body</Card.Body>
      </Accordion.Collapse>
    </Card>

    <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="2">
          Contact List
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="2">
        <Card.Body>Hello! I'm haha body</Card.Body>
      </Accordion.Collapse>
    </Card>
  </Accordion>
};

const ProgressBarPart: React.FC = () => {
  const now = 80;
  return <div>
    <Card.Subtitle className="mb-2 text-muted">Actual / Expected Period</Card.Subtitle>
    <ProgressBar now={now} label={`${now}%`}/>
  </div>;
}

export default YouShouldFocusOnPriorityPart;
