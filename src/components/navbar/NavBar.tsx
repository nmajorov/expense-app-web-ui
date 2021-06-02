import React, {ReactElement, useContext, useEffect } from "react";
import { Button, Nav, Navbar, NavDropdown, NavItem } from "react-bootstrap";
import { AppState } from "../../store/Store";

import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

import { SecurityContext } from "../../context/SecurityContext";
import SSOThunkActions from "../../actions/SSOThunkActions";

enum MenuNames {
    ADD_REPORT = "Create Report",
    ADD_EXPENSE = "Add Expense"
}




/**
 *
 * left side navigation
 */
export function NavigationBar() {
    const keycloak = useContext(SecurityContext);
    const { sso, routerLocation } = useSelector((state: AppState) => {
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
        if (pathname=== "/") {

                result = (<Nav>
                    <Nav.Link as={Link} to="/report-add">{MenuNames.ADD_REPORT}</Nav.Link>
                </Nav>)
            }

            else if  (pathname.startsWith("/report")) {
                result = (<Nav>
                    <Nav.Link as={Link} to={"/expenses-add/ " + routerLocation.pathname.replace('/report/', '')}>{MenuNames.ADD_EXPENSE}</Nav.Link>
                </Nav>
                )
            }


        return result
    }

    useEffect(()=>{
        if (keycloak.authenticated){
            dispatch(SSOThunkActions.loadUserProfile(keycloak))
        }
 
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
