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
      return keycloak.init({
         // redirectUri: (process.env.REACT_APP_KEYCLOAK_REDIRECT_URL) ?  process.env.REACT_APP_KEYCLOAK_REDIRECT_URL : window.location.origin + '/callback'

      }).then(
        success => {

          dispatch(
            SSOActions.ssoInitializedSuccess(
              {
                keycloak: keycloak,
                isInitialized: true
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
  }
}

export default SSOThunkActions;
