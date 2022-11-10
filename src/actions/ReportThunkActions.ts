import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../store/Store";
import { AppAction } from "./AppAction";
import * as API from "../services/Api";
import { AlertActions } from "./AlertAction";
import { AlertMessage, MessageType } from "../types/AlertTypes";
import { Report } from "../types/Report";
import { ReportActions } from "./ReportAction";
import { SSO } from "../types/SSO";
import { sendEvent } from "../utils/EventProducer";

const ReportThunkActions = {
  fetchReports: (sso: SSO) => {
    return (
      dispatch: ThunkDispatch<AppState, undefined, AppAction>,
      getState: () => AppState
    ) => {
      return API.fetchReports(sso.token).then(
        (response) => {
          const objArray = response.data;
          const data: Array<Report> = [];
          objArray.forEach((element) => {
            data.push({
              name: element.name,
              id: element.id,
              createdAT: element.createdAT,
              tstamp: element.tstamp
            });
          });

          dispatch(ReportActions.fetchReportsSuccess(data));
        },
        (error) => {
          let errorMessage: string;
          console.log(error.response)
          if (error.response && error.response.status === 401){
            errorMessage = "Cannot load the reports  unauthorized ..session expired ? ";
          }
          else {
            errorMessage = "Cannot load the reports: " + error;
          }
        const alertMessage: AlertMessage = {
          content: errorMessage,
          show_notification: true,
          type: MessageType.ERROR
        };
        dispatch(AlertActions.addMessage(alertMessage));
      }
      );
    }  
        
    
  },

  addReport: (sso: SSO, name: String) => {
    return (
      dispatch: ThunkDispatch<AppState, undefined, AppAction>,
      getState: () => AppState
    ) => {
      return API.addReport(sso.token, name).then(
        (response) => {
          dispatch(ReportActions.addReportSuccess());
          const alertMessage: AlertMessage = {
            content: `Report ${name} saved !`,
            show_notification: true,
            type: MessageType.SUCCESS
          };
          dispatch(AlertActions.addMessage(alertMessage));
          
          sendEvent({
              body: {
                  timestamp: Date.now(),
                  user_id: 11,
                  event_name: 'report created',
                  event_data: {},
              },
          }).then((response) => {
                  console.log('event send to azure');
              })
              .catch(function () {
                  console.error('error publish event');
          });
          
        },
        (error) => {
          const alertMessage: AlertMessage = {
            content: "Cannot add the report: " + error.toString(),
            show_notification: true,
            type: MessageType.ERROR
          };
          dispatch(AlertActions.addMessage(alertMessage));
        }
      );
      
    };
  },

  fetchOneReport: (token:string, id: string) => {
    return (
      dispatch: ThunkDispatch<AppState, undefined, AppAction>,
      getState: () => AppState
    ) => {
      return API.fetchOneReport(token, id).then(
        (response) => {
          dispatch(ReportActions.fetchOneReportSuccess(response.data));
        },
        (error) => {
          const alertMessage: AlertMessage = {
            content: "Cannot add the report: " + error.toString(),
            show_notification: true,
            type: MessageType.ERROR
          };
          dispatch(AlertActions.addMessage(alertMessage));
        }
      );
    };
  },

  /**
   * update report
   */
  updateReport: (sso: SSO, report: Report) => {
    return (dispatch: ThunkDispatch<AppState, undefined, AppAction>) => {
      return API.updateReport(sso.token, report).then(
        (response) => {
          dispatch(ReportActions.updateActionSuccess());
          const alertMessage: AlertMessage = {
            content: `Report successfully  updated !`,
            show_notification: true,
            type: MessageType.SUCCESS
          };
          sendEvent({
            body: {
                timestamp: Date.now(),
                user_id: 11,
                event_name: 'report updated',
                event_data: {},
            },
          }).then((response) => {
                console.log('event send to azure');
            })
            .catch(function () {
                console.error('error publish event');
          });
          dispatch(AlertActions.addMessage(alertMessage));
        },
        (error) => {
          const alertMessage: AlertMessage = {
            content: "Cannot update the report: " + error.toString(),
            show_notification: true,
            type: MessageType.ERROR
          };
          dispatch(AlertActions.addMessage(alertMessage));
        }
      );
    };
  },

  deleteReport: (sso: SSO, id: String) => {
    return (
      dispatch: ThunkDispatch<AppState, undefined, AppAction>,
      getState: () => AppState
    ) => {
      return API.deleteReport(sso.token, id).then(
        (response) => {
          dispatch(ReportActions.deleteActionSuccess());
          sendEvent({
            body: {
                timestamp: Date.now(),
                user_id: 11,
                event_name: 'report deleted',
                event_data: {},
            },
          }).then((response) => {
                console.log('event send to azure');
            })
            .catch(function () {
                console.error('error publish event');
          });
        },
        (error) => {
          dispatch(AlertActions.addMessage({
            content: "Cannot delete the report: " + error.toString(),
            show_notification: true,
            type: MessageType.ERROR
          }));
        }
      );
    };
  }
};

export default ReportThunkActions;
