import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import SSOThunkActions from "../../actions/SSOThunkActions";
import {useHistory} from "react-router-dom";

/**
 *   show user profile
 */
const Logout = () => {
    let history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(SSOThunkActions.signOut())
        history.push("/")
    }, [dispatch, history])


    return (
        <></>
    );
};

export default Logout