import React, {ReactElement, useContext, useEffect } from "react";
import { Button, Nav, Navbar, NavDropdown, NavItem } from "react-bootstrap";
import { AppState } from "../../store/Store";
import { SSO } from "../../types/SSO";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

import { RouterState } from "connected-react-router";
import { SecurityContext } from "../../context/SecurityContext";
import SSOThunkActions from "../../actions/SSOThunkActions";

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
export function NavigationBar() {
    const keycloak = useContext(SecurityContext);
    const { sso, routerLocation } = useSelector<AppState, SSO, RouterState>((state: AppState) => {
        return {
            sso: state.ssoState.sso,
            routerLocation: state.router.location
        }
    });
    const dispatch = useDispatch();


    /**
     * render menu depends on the current location path
     * @param pathname current router location path
     */
    function renderMenu(pathname: string) {
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

    useEffect(()=>{
        if (keycloak.authenticated){
            dispatch(SSOThunkActions.loadUserProfile(keycloak)) 
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <Navbar bg="light">
            <Nav.Link as={Link} to="/">Home</Nav.Link>

            <Navbar.Toggle />

            <Nav>

                {sso.authenticated ? (
                    renderMenu(routerLocation.pathname)
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

                {sso.authenticated ? (
                    <NavDropdown title={"" + sso.userProfile.username} id="basic-nav-dropdown">
                        <NavDropdown.Item href="/profile">profile</NavDropdown.Item>

                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/logout">SING OUT</NavDropdown.Item>
                    </NavDropdown>


                ) : (
                        <Button variant="primary" onClick={() => {
                            keycloak.login()
                        }}>
                            Login
                        </Button>
                    )
                }

            </Navbar.Collapse>
        </Navbar>
    );

}


