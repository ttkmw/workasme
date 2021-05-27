import React, {useState} from 'react';
import {Button, Toast} from "react-bootstrap";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from '@emotion/react'
import TopNavigation from "src/pages/components/bars/navigation/Top";
import Colors from "src/pages/constants/Colors";


const App: React.FC = () => {

  const topNavigatoinContainerStyle = css({
    backgroundColor: Colors.theme.bar.top,
    height: 80
  });


  return (
    <TopNavigation  containerStyle={topNavigatoinContainerStyle}/>
  );
};


// const titleStyle = css({
//   boxSizing: 'border-box',
//   width: 200,
//   height: 200,
//   backgroundColor: "#0000FF",
//   color: "#0000FF"
// });

const ButtonsShowcase: React.FC = () => (
  <div className="p-1">
    <Button variant="primary" className="mr-1">
      Primary
    </Button>
    <Button variant="secondary" className="mr-1">
      Secondary
    </Button>
    <Button variant="success" className="mr-1">
      Success
    </Button>
    <Button variant="warning" className="mr-1">
      Warning
    </Button>
    <Button variant="danger" className="mr-1">
      Danger
    </Button>
    <Button variant="info" className="mr-1">
      Info
    </Button>
    <Button variant="light" className="mr-1">
      Light
    </Button>
    <Button variant="dark" className="mr-1">
      Dark
    </Button>
    <Button variant="link" className="mr-1">
      Link
    </Button>
  </div>
);

const ToastsShowcase: React.FC = () => {
  const [show, toggleShow] = useState(true);

  return (
    <>
      {!show && <Button onClick={() => toggleShow(true)}>Show Toast</Button>}
      {/*
    // @ts-ignore */}
      <Toast show={show} onClose={() => toggleShow(false)}>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt=""/>
          <strong className="mr-auto">Bootstrap</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
      </Toast>
    </>
  );
};


export default App;
