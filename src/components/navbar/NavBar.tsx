import React from "react";
import Navbar from "react-bootstrap/Navbar";

import { NavItem, Nav,Button,Form} from "react-bootstrap";
import GlobalAlert from "../Alert";

import {keycloak} from "../../keycloak";


interface State {}

interface OwnProps {
  
  isAuthenticated?:boolean;
}

interface DispatchProps {}

type Props = OwnProps & DispatchProps;

/**
 *
 * left side navigation
 */
class NavigationBarContainer extends React.Component<Props, State> {
  constructor(prop: Props) {
    super(prop);
    this.state = {
      isAuthenticated : keycloak.authenticated
    };
  }


  private login = () => {
      keycloak.login()
      this.props.isAuthenticated = keycloak.authenticated;
      this.setState({
        isAuthenticated : keycloak.authenticated
      });
  }

  render() {
    return (
      <Navbar bg="light">
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle />
       
        <Nav>
       {console.info("isAuthenticated: " + this.props.isAuthenticated)}

        {this.props.isAuthenticated  ? (
           <Nav.Link href="/add">Add Expenses</Nav.Link>
         
        ) : (
          <></>
        )}
         
        </Nav>
        <Nav  className="justify-content-center">
          <NavItem>
            <GlobalAlert />
          </NavItem>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
        <Form inline>
                   <Button variant="primary" onClick={this.login}>
                    Login
                  </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavigationBarContainer;
