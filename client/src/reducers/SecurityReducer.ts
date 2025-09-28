import { LoginState } from '../store/Store.ts';
import { AppAction } from '../actions/AppAction.ts';
import { SecurityActions } from '../actions/SecurityActions.ts';
import { getType } from 'typesafe-actions';

import { UserProfile } from "../types/Login.ts";

export const SECURITY_INITIAL_STATE: LoginState = {
 
        authenticated: false,
        
    }


const securityReducer = (
    state: LoginState = SECURITY_INITIAL_STATE,
    action: AppAction
): LoginState => {
    const newState: LoginState = {
        ...state
    };

    switch (action.type) {
        case getType(SecurityActions.loginActionSuccess):
            newState.user = action.payload  as UserProfile;
            newState.authenticated = true;
            break;

        case getType(SecurityActions.singOutSuccess):
            newState.authenticated =false,
            newState.user = undefined;
            break;

        // case getType(SecurityActions.userProfileLoadSuccess):
        //     newState = {
        //           user: undefined
        //     };
        //     break;

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
