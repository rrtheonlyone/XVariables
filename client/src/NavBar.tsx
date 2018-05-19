import * as React from 'react'

import { Navbar, NavbarGroup, NavbarHeading } from '@blueprintjs/core'

export interface INavigationBarProps {
  title: string
}

const NavigationBar: React.SFC<INavigationBarProps> = ({ title }) => (
  <Navbar className="NavigationBar pt-dark">
    <NavbarGroup className="pt-align-left">
      <NavbarHeading>{title}</NavbarHeading>
    </NavbarGroup>
  </Navbar>
)

export default NavigationBar
