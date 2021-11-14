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
      <nav className="navbar navbar-expand-sm bg-light navbar-dark">
        <ul className = "navbar-nav">
          <li className = "nav-item m-1">
            <NavLink className = "btn btn-light btn-outline-primary btn-lg" to = "/find-study-space">
              Reserve A Room
            </NavLink>
          </li> 
          {/* <li className = "nav-item m-1">
            <NavLink className = "btn btn-light btn-outline-primary" to = "/space">
              Space
            </NavLink>
          </li> */}
        </ul>
      </nav>

      
        <div>
          <Switch>
            <Route path ='/find-study-space' component ={SpaceList}/>
            <Route path="/space/:spaceId" component={ Space }/>
          </Switch>
        </div>
      </BrowserRouter>

    </div>
  );
}

export default App;
