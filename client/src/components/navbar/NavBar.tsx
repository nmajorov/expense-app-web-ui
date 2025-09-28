import { ReactElement, useContext, useEffect, useState } from 'react';
import {
    Button,
    Collapse,
    Container,
    Nav,
    Navbar,
    NavDropdown,
    NavItem,
} from 'react-bootstrap';
import { AppState } from '../../store/Store.ts';

import { href, Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSecurity } from '../../context/SecurityContext.tsx';
import SecurityThunkActions from '../../actions/SecurityThunkActions.ts';
import { routerSelector } from '../../selectors/RouterSelector.ts';
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
    const dispatch = useDispatch();
    const history = useNavigate();
    const { routerLocation } = useSelector(routerSelector);

    //const [isOpen, setIsOpen] = useState(false);

    // const toggle = () => setIsOpen(!isOpen);

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
        <Navbar bg="light" data-bs-theme="light">
            <Container>
                <Nav.Link as={Link} to="/">
                    Home
                </Nav.Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    
                            {renderMenu(routerLocation.pathname)}
                    </Nav>
                    <Nav className="justify-content-end">
                        {isAuthenticated ? (
                            <NavDropdown
                                title={'' + user?.firstname}
                                id="basic-nav-dropdown"
                            >
                                <NavDropdown.Item  href="/profile">
                                    {MenuNames.SHOW_PROFILE}
                                </NavDropdown.Item>

                                <NavDropdown.Divider />
                                <NavDropdown.Item
                                 
                                    href="/"
                                  
                                    onClick={handleLogout}
                                >
                                    SING OUT
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <Nav.Link
                                as={Link}
                                to="/login"
                                className="justify-content-end"
                            >
                                {MenuNames.LOGIN}
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
