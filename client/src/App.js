import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Login.js';
import Dashboard from './Dashboard.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Explore from './Explore.js';
import Habits from './Habits.js';
import Share from './Share.js';
import Temp from './temp.js';

const code = new URLSearchParams(window.location.search).get('code')

function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={Dashboard}/>
        <Route path='/explore' element={Explore}/>
        <Route path='/Habits' element={Habits}/>
        <Route path='/Share' element={Share}/>
      </Routes>
    </BrowserRouter>
    {code ? <Habits code={code} /> : <Login />}
    </div>
  )
}

export default App;
