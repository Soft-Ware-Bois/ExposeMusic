import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Login.js';
import Dashboard from './Dashboard.js'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Explore from './Explore.js';
import Habits from './Habits.js';

const code = new URLSearchParams(window.location.search).get('code')

function App() {
  return (
      code ? <Habits code={code} /> : <Login />
  )
}

export default App;
