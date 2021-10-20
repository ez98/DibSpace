import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SpaceList from './components/SpaceList';
import Space from './components/Space';

function App() {
  return (
    <div className="App">
        <p>
          Welcome to DibSpace: The Study Space App.
        </p>
        <Router>
          <div>
            {/* <Header/> */}
            <Switch>
              {/* <Route path="/" component={ Welcome }/> */}
              <Route exact path="/" component={ SpaceList }/>
              <Route path="/find-study-space" component={ SpaceList }/>
              <Route path="/space/:spaceId" component={ Space }/>
              {/* <Route path="/reserve" component={ ReserveSpace }/> */}
            </Switch>
          </div>
        </Router>

    </div>
  );
}

export default App;
