import React, { Component } from 'react';

import {Grid, Row, Col} from 'react-bootstrap';

import VideoPlayer from './Video';
import NavBar from './NavBar'

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar/>

        <Grid>
          <Col md={8}>
            <VideoPlayer/>
          </Col>
        </Grid>
      
      </div>
    );
  }
}

export default App;
