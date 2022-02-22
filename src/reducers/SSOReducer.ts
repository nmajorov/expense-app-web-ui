import {AppAction} from "../actions/AppAction";
import {SSOState} from "../store/Store";
import {ActionKeys as C} from "../utils";
import {SSO} from "../types/SSO";
import Keycloak from "keycloak-js";

export const SSO_INITIAL_STATE: SSOState = {
    sso: {
        authenticated: false, isInitialized: false,
        userProfile: {email: "unknown", username: "unknown"},
        token : ""
    },
    keycloak: Keycloak()

}


const ssoReducer = (state: SSOState = SSO_INITIAL_STATE, action: AppAction): SSOState => {
    const newState: SSOState = state;

    switch (action.type) {
        // case getType(SSOActions.loginActionSuccess):
        //     console.log("loginActionSuccess  called" );
        //     newState.sso = action.payload as SSO;
        //     break;

        case C.SSO_INITIALIZED:

            newState.sso = action.payload as SSO;
            break;

        case C.USER_PROFILE_LOADED:

            newState.sso = action.payload as SSO;
           // console.log(" USER_PROFILE_LOADED state now: " + JSON.stringify(newState));
            break;

        case C.SSO_SIGN_OUT:
            newState.sso = SSO_INITIAL_STATE.sso;
            break;
        
        case C.SESSION_EXPIRED:
            
            break;

        default:
            break;

    }

    return newState;
}

export default ssoReducer;