import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../store/Store"
import { AppAction } from "./AppAction";
import * as API from '../services/Api';
import { AlertActions } from "./AlertAction";
import { AlertMessage, MessageType } from "../types/AlertTypes";
import { Report } from "../types/Report";
import { ReportActions } from "./ReportAction";
import { SSO } from "../types/SSO";

const ReportThunkActions = {
 
  
 
  fetchReports: (sso: SSO) => {
    
    return (dispatch: ThunkDispatch<AppState, undefined, AppAction>, getState: () => AppState) => {
      
      return  API.fetchReports(sso.token).then(
        response => {
       
          const objArray = response.data;
          const data: Array<Report> = [];
          objArray.forEach(element => {
            data.push(
              {
                name: element.name,
                id: element.id,
                createdAT: element.createdAT,
                tstamp: element.tstamp
              }
            )

          });
         
          dispatch(ReportActions.fetchReportsSuccess(data))
        },
        error => {

          let emsg: string;
          if (error.response && error.response.data && error.response.data.error) {
            emsg = 'Cannot load the reports: ' + error.response.data.error;
            ;
          } else {
            emsg = 'Cannot load the reports: ' + error.toString();
          }

          let alertMessage: AlertMessage = {
            content: emsg,
            show_notification: true,
            type: MessageType.ERROR
          }
          dispatch(AlertActions.addMessage(alertMessage))
        }

        
      )
      

    }
  },



   /** 
  deleteExpense: (id: number) => {
    return (dispatch: ThunkDispatch<AppState, undefined, AppAction>, getState: () => AppState) => {
      return API.deleteExpense(id.toString()).then(
        response => {
          dispatch(ExpensesActions.deleteActionSuccess())
        },
        error => {

          let emsg = 'Cannot delete the expenses: ' + error.toString();


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
  },
    showDeleteDialog: (id: number) => {
    return (dispatch: ThunkDispatch<AppState, undefined, AppAction>, getState: () => AppState) => {
      return (
        dispatch(ExpensesActions.showDeleteDialog(id))
      )
    }
  },


  addNewExpense:(newExpense: Expense) => {
  return (dispatch: ThunkDispatch<AppState, undefined, AppAction>, getState: () => AppState) => {
    return API.addNewExpense(newExpense).then(
      response => {
        dispatch(ExpensesActions.addNewExpenseSuccess())
      },
      error => {

        let emsg = 'Cannot add the expenses: ' + error.toString();


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


},

fetchOneExpense:(id: string) => {
  return (dispatch: ThunkDispatch<AppState, undefined, AppAction>, getState: () => AppState) => {
    return API.fetchExpense(id).then(
      response => {
        dispatch(ExpensesActions.fetchOneExpenseActionSuccess(response.data))
      },
      error => {

        let emsg = 'Cannot load expenses from backend: ' + error;


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


},

updateExpense:(expense: Expense) => {
  return (dispatch: ThunkDispatch<AppState, undefined, AppAction>, getState: () => AppState) => {
    return API.updateExpense(expense).then(
      response => {
        dispatch(ExpensesActions.addNewExpenseSuccess())
      },
      error => {

        let emsg = 'Cannot add the expenses: ' + error.toString();


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
   *****/
}

export default ReportThunkActions;
