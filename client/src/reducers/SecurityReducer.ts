import { SSOState } from '../store/Store.ts';
import { AppAction } from '../actions/AppAction.ts';
import { SecurityActions } from '../actions/SecurityActions.ts';
import { getType } from 'typesafe-actions';

export const SECURITY_INITIAL_STATE: SSOState = {
    sso: {
        authenticated: false,
        // Other SSO properties can be initialized here
    },
    // keycloak: undefined, // If you are moving away from keycloak
};

const securityReducer = (
    state: SSOState = SECURITY_INITIAL_STATE,
    action: AppAction
): SSOState => {
    const newState: SSOState = {
        ...state,
    };

    switch (action.type) {
        case getType(SecurityActions.loginActionSuccess):
            newState.sso = {
                ...state.sso,
                authenticated: true,
            };
            break;

        default:
            return state;
    }

    return newState;
};

export default securityReducer;
