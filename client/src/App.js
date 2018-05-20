import React, { Component } from 'react';

import VideoPlayer from './Video';
import NavBar from './NavBar'
import Dashboard from './Dashboard';

import { Switch, Route, BrowserRouter } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar/>

          <Switch>
            <Route exact path='/' component={VideoPlayer}/>
            <Route path='/dashboard' component={Dashboard}/>
          </Switch>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
