import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from './dashboard.js';
import Explore from './explore.js';
import Login from './login.js';
import Share from './share.js';
import Habits from './habits.js';

// Get the code from the url
const code = new URLSearchParams(window.location.search).get('code')
//const habits = new URLSearchParams(window.location.search).get('habits')

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route path="/home" component={Dashboard} />
          <Route path="/explore" component={Explore} />
          <Route path="/share" component={Share} />
          <Route path="/habits" component={Habits} />
        </Switch>
      </BrowserRouter>
      code ? <Dashboard code={code}/> : <Login />
    </div>
  );
}
