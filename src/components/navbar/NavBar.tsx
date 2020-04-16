import React from "react";
import Navbar from "react-bootstrap/Navbar";

import { NavItem,Nav} from "react-bootstrap";
import RhoneAlert from "../Alert";
import { AlertMessage, MessageType } from "../../types/AlertTypes";



interface State {}

interface OwnProps {}

interface StateProps {
 // alertMessage : AlertMessage
}

interface DispatchProps {
}

type Props = StateProps  & OwnProps & DispatchProps;

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
          <Navbar.Brand href="#home"></Navbar.Brand>
          <Nav>
          <NavItem className="mt-3">
            <RhoneAlert/>
          </NavItem>
          </Nav>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
    );
  }

}

const NavigationBar =  (NavigationBarContainer);


export default NavigationBar;
