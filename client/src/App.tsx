import * as React from 'react';

import NavigationBar from './NavBar'
import Player from './VideoPlayer/Player'

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <NavigationBar title="XVariables" />
        <Player/>
      </div>
    );
  }
}

export default App;
