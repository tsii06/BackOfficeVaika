import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { Statistique } from './stat/Statistique';
import { Navy } from './nav/Navy';
import App from './App';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
reportWebVitals();
