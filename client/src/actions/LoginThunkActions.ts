import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../store/Store.ts"
import { AppAction } from "./AppAction.ts";
import { LoginActions } from "./LoginAction.ts";
import { Login } from "../types/Login.ts";
import * as API from '../services/Api.ts';
import { ExpensesActions } from "./ExpensesAction.ts";
import { AlertMessage, MessageType } from "../types/AlertTypes.ts";
import { AlertActions } from "./AlertAction.ts";

const LoginThunkActions = {


    /**
     *login user
     */
    doLogin: (login:Login) => {
        return (dispatch: ThunkDispatch<AppState, undefined, AppAction>) => {
            return API.login(login).then(
                (_response) => {
                    dispatch(LoginActions.loginActionSuccess(login));
                },
                (error) => {
                  let  errorMessage = "Cannot login: " + error.toString()
                  if (error.response && error.response.status === 401) {

                  
                        errorMessage =  "Login Fail";
                   }
                   // dispatch(LoginActions.);
                    const alertMessage: AlertMessage = {
                        content: errorMessage,
                        show_notification: true,
                        type: MessageType.ERROR,
                    };

                    dispatch(AlertActions.addMessage(alertMessage));
                }
            );
        };
    },


  // loadUserProfile: (keycloak:KeycloakInstance) => {


  //   return (dispatch: ThunkDispatch<AppState, undefined, AppAction>, getState: () => AppState) => {

  //     return keycloak.loadUserProfile().then(
  //           ok => {
  //             console.log("load profile was ok" + JSON.stringify(keycloak.profile));
  //             if (keycloak.profile) {
  //               dispatch(
  //                 SSOActions.userProfileLoadSuccess(
  //                   {
  //                     authenticated: !!keycloak.authenticated,
  //                     isInitialized: true,
  //                     userProfile: {
  //                       email: keycloak.profile.email ? keycloak.profile.email : "unknown",
  //                       username: keycloak.profile.username ? keycloak.profile.username : "unknown"
  //                     },
  //                     token: keycloak.token ? keycloak.token :"" 
  //                   }
  //                 )

  //               )
  //             }

  //           },
  //           err => {
  //             let message = 'Error at loading profile';


  //             dispatch(ExpensesActions.fetchError(message))
  //             let alertMessage: AlertMessage = {
  //               content: message,
  //               show_notification: true,
  //               type: MessageType.ERROR
  //             }
  //             dispatch(AlertActions.addMessage(alertMessage))

  //           }
  //         )

  //   }
  // },

    // signOut:(keycloak:KeycloakInstance) => {
    //     return(dispatch: ThunkDispatch<AppState, undefined, AppAction>, getState: () => AppState) =>{
    //         //fix redirect url to pointing to home
    //         return keycloak.logout({redirectUri:window.location.href.replace("logout","")}).then(
    //             ok => {
    //                 dispatch(SSOActions.singOutSuccess())
    //             },
    //             err => {
    //                 let message = 'Error at signing out';

    //                 dispatch(ExpensesActions.fetchError(message))
    //                 let alertMessage: AlertMessage = {
    //                     content: message,
    //                     show_notification: true,
    //                     type: MessageType.ERROR
    //                 }
    //                 dispatch(AlertActions.addMessage(alertMessage))

    //             }
    //         )
    //     }
    // }
  
}

export default LoginThunkActions;
