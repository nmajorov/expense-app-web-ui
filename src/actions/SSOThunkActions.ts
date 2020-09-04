import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../store/Store"
//import { SSO } from "../types/SSO";
import { keycloak } from "../keycloak";

import { AppAction } from "./AppAction";
import { SSOActions } from "./SSOAction";
import { ExpensesActions } from "./ExpensesAction";
import { AlertMessage, MessageType } from "../types/AlertTypes";
import { AlertActions } from "./AlertAction";

const SSOThunkActions = {



  initKeycloak: () => {
    return (dispatch: ThunkDispatch<AppState, undefined, AppAction>, getState: () => AppState) => {
      return keycloak.init({ onLoad: 'check-sso', checkLoginIframeInterval: 1 
        // redirectUri: (process.env.REACT_APP_KEYCLOAK_REDIRECT_URL) ?  process.env.REACT_APP_KEYCLOAK_REDIRECT_URL : window.location.origin + '/callback'

      }).then(

        success => {
          dispatch(
            SSOActions.ssoInitializedSuccess(
              {
                authenticated: keycloak.authenticated ? true : false,
                isInitialized: true,
                userProfile:{email:"unknown",username: "unknown"}
              }
            )

          )
        },

        error => {
          let message = 'Error at SSO initialization';


          dispatch(ExpensesActions.fetchError(message))
          let alertMessage: AlertMessage = {
            content: message,
            show_notification: true,
            type: MessageType.ERROR
          }
          dispatch(AlertActions.addMessage(alertMessage))

        }


      )
    }
  },

  loadUserProfile: () => {


    return (dispatch: ThunkDispatch<AppState, undefined, AppAction>, getState: () => AppState) => {
      return keycloak.init({
        onLoad: 'check-sso', checkLoginIframeInterval: 1
        
      }).then(
        ok => (


          keycloak.loadUserProfile().then(
            ok => {
              console.log("load profile was ok");
              if (keycloak.profile) {
                dispatch(
                  SSOActions.userProfileLoadSuccess(
                    {
                      authenticated: !!keycloak.authenticated,
                      isInitialized: true,
                      userProfile: {
                        email: keycloak.profile.email ? keycloak.profile.email : "unknown",
                        username: keycloak.profile.username ? keycloak.profile.username : "unknown"
                      }
                    }
                  )

                )
              }

            },
            err => {
              let message = 'Error at loading profile';


              dispatch(ExpensesActions.fetchError(message))
              let alertMessage: AlertMessage = {
                content: message,
                show_notification: true,
                type: MessageType.ERROR
              }
              dispatch(AlertActions.addMessage(alertMessage))

            }
          )

        )
      )
    }
  }
  
}

export default SSOThunkActions;
