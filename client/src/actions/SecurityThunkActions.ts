import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../store/Store.ts"
import { AppAction } from "./AppAction.ts";
import { SecurityActions} from "./SecurityActions.ts";
import { Login } from "../types/Login.ts";
import * as API from '../services/Api.ts';
import { AlertMessage, MessageType } from "../types/AlertTypes.ts";
import { AlertActions } from "./AlertAction.ts";

const SecurityThunkActions = {


    /**
     *login user
     */
    doLogin: (login:Login) => {
        return (dispatch: ThunkDispatch<AppState, undefined, AppAction>) => {
            return API.login(login).then(
                (_response) => {
                    dispatch(SecurityActions.loginActionSuccess(login));
                    
                    dispatch(AlertActions.addMessage({
                        content: "login successful",
                        show_notification: true,
                        type: MessageType.SUCCESS,
                    }));

                    
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


   loadUserProfile: (username:string)  => {
     return (dispatch: ThunkDispatch<AppState, undefined, AppAction>) => {
            return API.fetchAccountInfo(username).then(
                (_response) => {
                    dispatch(SecurityActions.loginActionSuccess(username));
                    
                
                    
                },
                (error) => {
                  const  errorMessage = "Cannot fetch account info: " + error.toString()
                    const alertMessage: AlertMessage = {
                        content: errorMessage,
                        show_notification: true,
                        type: MessageType.ERROR,
                    };

                    dispatch(AlertActions.addMessage(alertMessage));
                }
            );
        }
    },
}


export default SecurityThunkActions;