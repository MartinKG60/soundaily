import React from 'react';
import { render } from 'react-dom';
import './css/index.css';
import App from './components/App.js';

const Root = () => {
  return (
    <App />
  )
}

render(<Root/>, document.querySelector('#root'));
