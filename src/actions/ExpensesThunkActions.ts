import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../store/Store"
import { Expense } from "../types/Expense";
import { AppAction } from "./AppAction";
import { ExpensesActions } from "./ExpensesAction";
import * as API from '../services/Api';
import { AlertActions } from "./AlertAction";
import {AlertMessage,MessageType} from "../types/AlertTypes";

const ExpensesThunkActions = {
  fetchExpensesData: (

  ) => {
    return (dispatch: ThunkDispatch<AppState, undefined, AppAction>, getState: () => AppState) => {
      return API.fetchExpenses().then(
        response => {
          const objArray = response.data;
          const data: Array<Expense> = [] ; 
          objArray.forEach(element => {
            data.push(
                {
                  description : element.description,
                  id : element.id,
                  amount : element.amount,
                  createdAT : element.createdAT,
                  tstamp: element.tstamp
                }
                
             )
            
         });
          dispatch(ExpensesActions.fetchActionSuccess(data))
          dispatch(AlertActions.remoteMessage(""))
        },
        error => {
          
          let emsg: string;
          if (error.response && error.response.data && error.response.data.error) {
            emsg = 'Cannot load the expenses: ' + error.response.data.error;
          } else {
            emsg = 'Cannot load the expenses: ' + error.toString();
          }
        
          dispatch(ExpensesActions.fetchError(emsg))
          let alertMessage: AlertMessage = { 
            content: emsg,
            show_notification: true,
            type: MessageType.ERROR
          }
          dispatch(AlertActions.addMessage(alertMessage))
        
       
        }
      )
    }
  }
}

export default ExpensesThunkActions;
