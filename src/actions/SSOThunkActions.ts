import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../store/Store"
import { AppAction } from "./AppAction";
import { SSOActions } from "./SSOAction";
import { ExpensesActions } from "./ExpensesAction";
import { AlertMessage, MessageType } from "../types/AlertTypes";
import { AlertActions } from "./AlertAction";
import { KeycloakInstance } from "keycloak-js";

const SSOThunkActions = {



  initKeycloak: (keycloak:KeycloakInstance) => {
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
                userProfile:{email:"unknown",username: "unknown"},
                token: keycloak.token ? keycloak.token :"" 
                
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

  loadUserProfile: (keycloak:KeycloakInstance) => {


    return (dispatch: ThunkDispatch<AppState, undefined, AppAction>, getState: () => AppState) => {

      return keycloak.loadUserProfile().then(
            ok => {
              console.log("load profile was ok" + JSON.stringify(keycloak.profile));
              if (keycloak.profile) {
                dispatch(
                  SSOActions.userProfileLoadSuccess(
                    {
                      authenticated: !!keycloak.authenticated,
                      isInitialized: true,
                      userProfile: {
                        email: keycloak.profile.email ? keycloak.profile.email : "unknown",
                        username: keycloak.profile.username ? keycloak.profile.username : "unknown"
                      },
                      token: keycloak.token ? keycloak.token :"" 
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

    }
  },

    signOut:(keycloak:KeycloakInstance) => {
        return(dispatch: ThunkDispatch<AppState, undefined, AppAction>, getState: () => AppState) =>{
            //fix redirect url to pointing to home
            return keycloak.logout({redirectUri:window.location.href.replace("logout","")}).then(
                ok => {
                    dispatch(SSOActions.singOutSuccess())
                },
                err => {
                    let message = 'Error at signing out';

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
    }
  
}

export default SSOThunkActions;
