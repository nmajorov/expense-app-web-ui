import React, {useContext, useEffect} from "react";
import {useDispatch} from "react-redux";
import SSOThunkActions from "../../actions/SSOThunkActions";
import {useHistory} from "react-router-dom";
import { SecurityContext } from "../../context/SecurityContext";

/**
 *   show user profile
 */
const Logout = () => {
    const keycloak = useContext(SecurityContext);
    let history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if (keycloak === undefined){
            dispatch(SSOThunkActions.initKeycloak(keycloak)) 
        }
        dispatch(SSOThunkActions.signOut(keycloak))
        history.push("/")
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <></>
    );
};

export default Logout