import React from 'react';
import ReactDOM from 'react-dom';
import ExampleApp from './App';
import data from './sample-data';

ReactDOM.render(<ExampleApp items={data} />, document.getElementById('app'));
