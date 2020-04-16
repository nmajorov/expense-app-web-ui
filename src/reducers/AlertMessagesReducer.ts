import { constants as C } from "../utils";
import { AlertsState } from "../store/Store";
import { AppAction } from "../actions/AppAction";
import { AlertMessage, MessageType } from "../types/AlertTypes";

export const ALERT_MESSAGE_INITIAL_STATE: AlertsState = {

  alertMessage:{
    content : "",
    show_notification : false,
    type:MessageType.INFO

  }

}


const alertMessageReducer = (state: AlertsState = ALERT_MESSAGE_INITIAL_STATE, action: AppAction): AlertsState => {
  const newState: AlertsState = {
    ...state
  };

  switch (action.type) {
    
    case C.SHOW_ERROR:
      newState.alertMessage = action.payload as AlertMessage; 
      newState.alertMessage.show_notification = true;
      break;
    
    case C.CLEAR_ERROR:
      newState.alertMessage = ALERT_MESSAGE_INITIAL_STATE.alertMessage;
      break;

    default:
      break;
    
  }

  return newState;
}

export default alertMessageReducer;