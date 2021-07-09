import React from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from '@emotion/react'
import HomePage from "src/pages/home/Home";

import 'devextreme/dist/css/dx.light.css';

const App: React.FC = () => {


  return (
    <HomePage />
  );
};


// const titleStyle = css({
//   boxSizing: 'border-box',
//   width: 200,
//   height: 200,
//   backgroundColor: "#0000FF",
//   color: "#0000FF"
// });


export default App;
