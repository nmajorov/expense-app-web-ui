import { Col, Container, Row } from 'react-bootstrap';
import { useSecurity } from '../../context/SecurityContext.tsx';
/**
 *   show user profile
 */
const ProfileView = () => {
    const { isAuthenticated, user } = useSecurity();
    


    function renderUserProfile() {
        if (user === undefined && isAuthenticated === false) {
            return <>profile not found</>;
        }

        return (
            <Container fluid="md" className="mt-3">
                <Row>
                    <Col sm={4} md={8} className="mt-3">
                        First name: {user?.firstname}
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>Last name: {user?.lastname}</Col>
                </Row>
                <Row className="mt-3">
                    <Col sm={4} md={8}>
                        User name: {user?.username}
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>Email: {user?.email}</Col>
                </Row>
            </Container>
        );
    }

    return renderUserProfile();
};

export default ProfileView;
