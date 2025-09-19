import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
//import SSOThunkActions from '../../actions/SSOThunkActions';
import { useNavigate as useHistory } from 'react-router-dom';
//import { SecurityContext } from '../../context/SecurityContext';

/**
 *   show user profile
 */
const Logout = () => {
    // const keycloak = useContext(SecurityContext);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        // TODO rewrite logout
        //   if (keycloak === undefined) {
        //       dispatch(SSOThunkActions.initKeycloak(keycloak));
        //   }
        //   dispatch(SSOThunkActions.signOut(keycloak));
        history('/');
    }, [history, dispatch, keycloak]);
};

export default Logout;
