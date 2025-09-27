import { Col, Row } from 'react-bootstrap';
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
            return (<>profile not found</>);
        }

        return (
            <>
                <Row>
                    <Col sm={4} md={8}>
                        <h4>
                            {userProfile.firstname} {userProfile.lastname}
                        </h4>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4} md={8}>
                        <h4>{userProfile.username}</h4>
                    </Col>
                </Row>
                <Row>
                    <Col>Email: {userProfile.email}</Col>
                </Row>
            </>
        );
    }

    return renderUserProfile();
};

export default ProfileView;
