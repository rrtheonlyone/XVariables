import * as React from 'react';
import ReactPlayer from 'react-player'
import NavigationBar from './NavBar'

 
class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <NavigationBar title="XVariables" />
        <ReactPlayer url='https://www.youtube.com/watch?v=QwievZ1Tx-8' />
      </div>
    );
  }
}

export default App;
