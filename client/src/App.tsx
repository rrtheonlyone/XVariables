import * as React from 'react';
import NavigationBar from './NavBar'

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <NavigationBar title="XVariables" />
      </div>
    );
  }
}

export default App;
