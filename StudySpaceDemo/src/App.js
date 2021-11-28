import './App.css';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import SpaceList from './components/SpaceList';
import Space from './components/Space';
import logo from './imgs/logo.jpeg'

function App() {
  return (
    
    <div className="App">
      <div>
        <h1 className="d-flex justify-content-center m-3">
          <img src = {logo} alt = "DibSpace"/>
        </h1>
        <p>Find your place to study.</p>
      </div>
      <BrowserRouter>
        <div>
          <Switch>
            <Route path ='/welcome' component ={SpaceList}/>
            <Route path="/space/:spaceId" component={Space}/>
          </Switch>
        </div>
      </BrowserRouter>

    </div>
  );
}

export default App;
