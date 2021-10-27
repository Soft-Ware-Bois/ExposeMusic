import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { BrowserRouter, Route, Switch } from "react-router-dom";

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
import Dashboard from './dashboard.js';
import Explore from './explore.js';
import Login from './login.js';
import Share from './share.js';
import Habits from './habits.js';

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
   <Switch>
    <Route exact path="/" component={Dashboard} />
    <Route path="/login" component={Login} />
    <Route path="/explore" component={Explore} />
    <Route path="/share" component={Share} />
    <Route path="/habits" component={Habits} />
  </Switch>
  </BrowserRouter>,
  rootElement
);