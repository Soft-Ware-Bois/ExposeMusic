import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './login.js';
import Dashboard from './dashboard';
import Habits from './habits';

// Get the code from the url
const code = new URLSearchParams(window.location.search).get('code')
//const habits = new URLSearchParams(window.location.search).get('habits')

function App() {
  return (
    // If the user successfully logs in then display the 
    // dashboard/home pageXOffset
    code ? <Dashboard code={code}/> : <Login />
  );
}

export default App;
