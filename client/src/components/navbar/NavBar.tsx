import { ReactElement, useContext, useEffect, useState } from 'react';
import {
    Button,
    Collapse,
    Nav,
    Navbar,
    NavDropdown,
    NavItem,
} from 'react-bootstrap';
import { AppState } from '../../store/Store.ts';

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSecurity } from '../../context/SecurityContext.tsx';
import SecurityThunkActions from '../../actions/SecurityThunkActions.ts';
enum MenuNames {
    LOGIN = 'Login',
    ADD_REPORT = 'Create Report',
    ADD_EXPENSE = 'Add Expense',
    SHOW_PROFILE = 'Profile',
}

/**
 *
 * left side navigation
 *
 *
 */
export function NavigationBar() {
    // Hooks must be called inside the component body.
    const { isAuthenticated, user } = useSecurity();
    const history = useNavigate();
    const { routerLocation } = useSelector((state: AppState) => {
        return {
            // sso: state.ssoState.sso,
            routerLocation: state.router.location,
        };
    });
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    /**
     * render menu depends on the current location path
     * @param pathname current router location path
     */
    function renderMenu(pathname: string) {
        let result: ReactElement = <></>;
        if (pathname === '/') {
            if (!isAuthenticated) {
                return result;
            } // Correctly render the "Create Report" link when authenticated

            result = (
                <Nav.Link as={Link} to="/report-add">
                    {MenuNames.ADD_REPORT}
                </Nav.Link>
            );
        } else if (pathname.startsWith('/report')) {
            result = (
                <Nav.Link
                    as={Link}
                    to={
                        '/expenses-add/' +
                        routerLocation.pathname.replace('/report/', '')
                    }
                >
                    {MenuNames.ADD_EXPENSE}
                </Nav.Link>
            );
        }

        return result;
    }

    useEffect(() => {
        //    if (keycloak.authenticated) {
        //        dispatch(SSOThunkActions.loadUserProfile(keycloak));
        //    }
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(SecurityThunkActions.doLogout());
        history('/');
    };

    return (
        <div>
            <Navbar bg="light" expand="md">
                <Nav.Link as={Link} to="/">
                    Home
                </Nav.Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {renderMenu(routerLocation.pathname)}
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        {isAuthenticated ? (
                            <NavDropdown
                                title={'' + user?.firstname}
                                id="basic-nav-dropdown"
                            >
                                <Nav.Link as={Link} to="/profile">
                                    {MenuNames.SHOW_PROFILE}
                                </Nav.Link>
                               
                                <NavDropdown.Divider />
                                <a
                                    className="dropdown-item"
                                    onClick={handleLogout}
                                >
                                    SING OUT
                                </a>
                            </NavDropdown>
                        ) : (
                            <Nav.Link as={Link} to="/login">
                                {MenuNames.LOGIN}
                            </Nav.Link>
                        )}
                    </Navbar.Collapse>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}
