import { LoginState, SSOState } from '../store/Store.ts';
import { AppAction } from '../actions/AppAction.ts';
import { SecurityActions } from '../actions/SecurityActions.ts';
import { getType } from 'typesafe-actions';

export const SECURITY_INITIAL_STATE: LoginState = {
 
        authenticated: false,
        
    }


const securityReducer = (
    state: LoginState = SECURITY_INITIAL_STATE,
    action: AppAction
): SSOState => {
    const newState: SSOState = {
        ...state,
    };

    switch (action.type) {
        case getType(SecurityActions.loginActionSuccess):
            newState.user = action.payload.user;
            newState.authenticated = true;
            break;

        case getType(SecurityActions.singOutSuccess):
            newState.Login = SECURITY_INITIAL_STATE;
            break;

        // case getType(SecurityActions.sessionExpired):
        //     newState = {
        //         ...state,
        //         authenticated: false,
        //         user: undefined
        //     };
        //     break;

        default:
            return state;
    }

    return newState;
};

export default securityReducer;
