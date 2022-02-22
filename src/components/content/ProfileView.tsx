import {Col, Row} from "react-bootstrap";
import React from "react";
import {useSelector} from "react-redux";
import {AppState} from "../../store/Store";

/**
 *   show user profile
 */
const ProfileView = () => {
    const {userProfile} = useSelector((state: AppState) => {
        return {
            userProfile: state.ssoState.sso.userProfile
        }
    });
    return (
        <>
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
};

export default ProfileView