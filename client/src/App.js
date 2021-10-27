import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './login.js';
import Dashboard from './dashboard';
import Habits from './habits';
import Explore from './explore';
import Share from './share.js';


// Get the code from the url
const code = new URLSearchParams(window.location.search).get('code')
//const habits = new URLSearchParams(window.location.search).get('habits')

export default function App() {
  return (
    // If the user successfully logs in then display the 
    // dashboard/home pageXOffset
    code ? <Dashboard code={code}/> || <Share code={code}/> : <Login />
    //<Dashboard/>
    //<Explore/>
    // <div>
    //   <Share />
    //   <Habits />
    //   <Explore />
    //   <Dashboard/>
    // </div>

  );
}
