import React, {ReactElement} from "react";
import {Button, Nav, Navbar, NavDropdown, NavItem} from "react-bootstrap";
import {connect} from "react-redux";
import {AppState} from "../../store/Store";
import {ThunkDispatch} from "redux-thunk";
import {AppAction} from "../../actions/AppAction";
import {SSO} from "../../types/SSO";
import {Link} from 'react-router-dom'

import {keycloak} from "../../keycloak";
import {RouterState} from "connected-react-router";

enum MenuNames {
    ADD_REPORT = "Create Report",
    ADD_EXPENSE = "Add Expense"
}

interface State {
}

interface OwnProps {
    routerLocation: RouterState;
    sso: SSO;
}

interface DispatchProps {

    loginSSO: () => any;
    checkLoginDetails: () => any;
    initKeycloak: () => any;
}

type Props = OwnProps & DispatchProps;

/**
 *
 * left side navigation
 */
class NavigationBarContainer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }


    /**
     * render menu depends on the current location path
     * @param pathname current router location path
     */
    private renderMenu = (pathname: string) => {
        let result: ReactElement = <></>
        switch (pathname) {
            case "/": {
                result = (<Nav>
                    <Nav.Link as={Link} to="/report-add">{MenuNames.ADD_REPORT}</Nav.Link>
                </Nav>)
                break;
            }
            case "/report": {
                result = (<Nav>
                        <Nav.Link as={Link} to="/expenses-add">{MenuNames.ADD_EXPENSE}</Nav.Link>
                    </Nav>
                )
                break;
            }
        }

        return result
    }


    /**
     * handle login
     */
    private login = () => {
        //redirect to the keycloak
        keycloak.init({})
        keycloak.login()
    }

    render() {
        return (
            <Navbar bg="light">
                <Nav.Link as={Link} to="/">Home</Nav.Link>

                <Navbar.Toggle/>

                <Nav>

                    {this.props.sso.authenticated ? (
                        this.renderMenu(this.props.routerLocation.location.pathname)
                    ) : (
                        <></>
                    )
                    }

                </Nav>
                <Navbar.Collapse className="justify-content-center">
                    <NavItem>

                    </NavItem>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">

                    {this.props.sso.authenticated ? (
                        <NavDropdown title={"" + this.props.sso.userProfile.username} id="basic-nav-dropdown">
                            <NavDropdown.Item href="/profile">profile</NavDropdown.Item>

                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="/logout">SING OUT</NavDropdown.Item>
                        </NavDropdown>


                    ) : (
                        <Button variant="primary" onClick={this.login}>
                            Login
                        </Button>
                    )
                    }

                </Navbar.Collapse>
            </Navbar>
        );
    }
}


const mapStateToProps = (state: AppState, ownProps: Props) => {


    return {
        sso: state.ssoState.sso,
        routerLocation: state.router
    };
};


const mapDispatchToProps = (
    dispatch: ThunkDispatch<AppState, void, AppAction>
) => ({


    checkLoginDetails: () => {
        console.info("check login Details  called");

    },


})


const decorator = connect(mapStateToProps, mapDispatchToProps);

const NavigationBar = decorator(NavigationBarContainer);


export default NavigationBar;
