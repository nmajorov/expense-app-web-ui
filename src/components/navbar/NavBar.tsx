import React from "react";
import Navbar from "react-bootstrap/Navbar";

import { NavItem, Nav,Button,Form} from "react-bootstrap";
import GlobalAlert from "../Alert";
import { connect } from "react-redux";
import { AppState } from "../../store/Store";
import { ThunkDispatch } from "redux-thunk";
import { AppAction } from "../../actions/AppAction";
import { SSO } from "../../types/SSO";
import SSOThunkActions from "../../actions/SSOThunkActions";

interface State {}

interface OwnProps {
  
  sso:SSO;
}

interface DispatchProps {

  loginSSO:() => any;
  checkLoginDetails:() =>any;
  initKeycloak:() => any;
}

type Props = OwnProps & DispatchProps;

/**
 *
 * left side navigation
 */
class NavigationBarContainer extends React.Component<Props, State> {
  constructor(props:Props) {
    super(props);
    this.state = {};
  }


 


  /**
   * handle login
   */
  private login = () => {
    //redirect to the keycloak
    this.props.sso.keycloak.login();
  }

  render() {
    return (
      <Navbar bg="light">
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle />
       
        <Nav>
     
            { this.props.sso.keycloak.authenticated  ? (
              <Nav.Link href="/add">Add Expenses</Nav.Link>
            
            ) : (
              <></>
            )
        }
         
        </Nav>
        <Nav  className="justify-content-center">
          <NavItem>
            <GlobalAlert />
          </NavItem>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
        <Form inline>
          {this.props.sso.keycloak.authenticated  ? ( <></>):(
                   <Button variant="primary" onClick={this.login}>
                    Login
                  </Button>
                  )
          }
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}


const mapStateToProps = (state: AppState,ownProps:Props ) => {
  
  
  return {
      sso: state.ssoState.sso
  };
};


const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, AppAction>
) => ({
  

   checkLoginDetails: () =>{
        console.info("check login Details  called");
         
        },
    
    initKeycloak: () =>{
        dispatch(SSOThunkActions.initKeycloak());
    }
    
})


const decorator = connect(mapStateToProps, mapDispatchToProps);

const NavigationBar = decorator(NavigationBarContainer);


export default NavigationBar;
