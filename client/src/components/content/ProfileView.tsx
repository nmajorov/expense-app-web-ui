import { Col, Container, Row } from 'react-bootstrap';
import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/Store.ts';
import { useSecurity } from '../../context/SecurityContext.tsx';
import { UserProfile } from '../../types/Login.ts';
import { useParams, useNavigate as useHistory } from 'react-router-dom';
/**
 *   show user profile
 */
const ProfileView = () => {
    const { isAuthenticated, user } = useSecurity();
    const history = useHistory();

    const { userProfile } = useSelector((state: AppState) => {
        return {
            userProfile: state.loginState?.user,
        };
    });

    function renderUserProfile() {
        if (userProfile === undefined && isAuthenticated === false) {
            return <>profile not found</>;
        }

        return (
            <Container fluid="md" className="mt-3">
                <Row>
                    <Col sm={4} md={8} className="mt-3">
                        Firstname: {userProfile?.firstname}
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>Lastname: {userProfile?.lastname}</Col>
                </Row>
                <Row className="mt-3">
                    <Col sm={4} md={8}>
                        username: {userProfile?.username}
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>Email: {userProfile?.email}</Col>
                </Row>
            </Container>
        );
    }

    return renderUserProfile();
};

export default ProfileView;
