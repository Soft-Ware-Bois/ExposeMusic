import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
// const rootElement = document.getElementById("root");
// ReactDOM.render(
//   <BrowserRouter>
//    <Switch>
//     <Route exact path="/" component={Login}/>
//     <Route path="/home" component={Dashboard} />
//     <Route path="/explore" component={Explore} />
//     <Route path="/share" component={Share} />
//     <Route path="/habits" component={Habits} />
//   </Switch>
//   </BrowserRouter>,
//   rootElement
// );