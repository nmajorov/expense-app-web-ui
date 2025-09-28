import { AlertsState } from "../store/Store.ts";
import { AlertActions } from "../actions/AlertAction.ts";
import { AlertMessage, MessageType } from "../types/AlertTypes.ts";
import { getType } from 'typesafe-actions';
import { AppAction } from "../actions/AppAction.ts";


export const ALERT_MESSAGE_INITIAL_STATE: AlertsState = {

  alertMessage:{
    content : "",
    show_notification : false,
    type:MessageType.INFO

  }

}


const   alertMessageReducer = (state: AlertsState = ALERT_MESSAGE_INITIAL_STATE, action: AppAction): AlertsState => {
  const newState: AlertsState = {
    ...state
  };

  switch (action.type) {
    
    case getType(AlertActions.addMessage):
      newState.alertMessage = action.payload as AlertMessage; 
      break;
    
    case getType(AlertActions.removeMessage):
      newState.alertMessage = ALERT_MESSAGE_INITIAL_STATE.alertMessage;
      break;

    default:
      break;
    
  }

  return newState;
}

export default alertMessageReducer;