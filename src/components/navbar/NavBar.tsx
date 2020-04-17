import React from "react";
import Navbar from "react-bootstrap/Navbar";

import { NavItem, Nav } from "react-bootstrap";
import GlobalAlert from "../Alert";

interface State {}

interface OwnProps {}

interface DispatchProps {}

type Props = OwnProps & DispatchProps;

/**
 *
 * left side navigation
 */
class NavigationBarContainer extends React.Component<Props, State> {
  constructor(prop: Props) {
    super(prop);
    this.state = {};
  }

  render() {
    return (
      <Navbar className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Nav className="mr-auto">
          <Nav.Link href="/add-expenses">Add Expenses</Nav.Link>
        </Nav>
        <Nav>
          <NavItem>
            <GlobalAlert />
          </NavItem>
        </Nav>
        <Nav>
          <Navbar.Text></Navbar.Text>
        </Nav>
      </Navbar>
    );
  }
}

export default NavigationBarContainer;
