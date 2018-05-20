import React, { Component } from 'react';

import { Navbar, Glyphicon } from 'react-bootstrap';

class NavBar extends React.Component{

  constructor(props) {
    super(props);
  }

  render(){
	return <Navbar inverse fluid collapseOnSelect>
		    <Navbar.Header>
		      <Navbar.Brand>
		        <a href="/">XVariables&nbsp;<Glyphicon glyph="education" /></a>
		      </Navbar.Brand>
		      <Navbar.Toggle />
		    </Navbar.Header>
		  </Navbar>;	
  }
};


export default NavBar