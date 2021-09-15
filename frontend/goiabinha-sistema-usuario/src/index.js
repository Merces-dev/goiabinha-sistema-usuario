import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';

import reportWebVitals from './reportWebVitals';
//Pages
import Home from './pages/Home'
import Gerenciador from './pages/Gerenciador';

const routing = (
  <Router>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route  path="/gerenciamento" component={Gerenciador}/>
    </Switch>
  </Router>
);

ReactDOM.render(
  <ToastProvider>
    {routing}
  </ToastProvider>, 
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
