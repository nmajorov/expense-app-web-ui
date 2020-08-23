
import { AppAction } from "../actions/AppAction";
import { SSOState } from "../store/Store";
import { SSOActions } from "../actions/SSOAction";
import { getType } from "typesafe-actions";
import { SSO } from "../types/SSO";
import keycloak from "../keycloak";

export const SSO_INITIAL_STATE: SSOState ={
       sso: {keycloak:keycloak,isInitialized:false}
}


const ssoReducer = (state: SSOState = SSO_INITIAL_STATE,
    action: AppAction): SSOState => {
    const newState: SSOState = {
      ...state
    };
    switch (action.type) {
   // case getType(SSOActions.loginActionSuccess):
   //     console.log("loginActionSuccess  called" );
   //     newState.sso = action.payload as SSO;
   //     break;
       
    case getType(SSOActions.ssoInitializedSuccess):
        newState.sso = action.payload as SSO;
        break;
      default:
        break;
  
    }
  
    return newState;
  }
  
  export default ssoReducer;