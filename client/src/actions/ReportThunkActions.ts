import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../store/Store.ts';
import { AppAction } from './AppAction.ts';
import * as API from '../services/Api.ts';
import { AlertActions } from './AlertAction.ts';
import { AlertMessage, MessageType } from '../types/AlertTypes.ts';
import { Report } from '../types/Report.ts';
import { ReportActions } from './ReportAction.ts';
import { SSO } from '../types/SSO.ts';
import { SecurityActions } from "./SecurityActions.ts";

const ReportThunkActions = {
    fetchReports: (token: string) => {
        return (
            dispatch: ThunkDispatch<AppState, undefined, AppAction>,
            _getState: () => AppState
        ) => {
            return API.fetchReports(token).then(
                (response) => {
                    const objArray = response.data;
                    const data: Array<Report> = [];
                    objArray.forEach((element) => {
                        data.push({
                            name: element.name,
                            id: element.id,
                            createdAT: element.createdAT,
                            tstamp: element.tstamp,
                        });
                    });

                    dispatch(ReportActions.fetchReportsSuccess(data));
                },
                (error) => {
                    let errorMessage: string;
                    console.log(error.response);
                    if (error.response && error.response.status === 401) {
                        errorMessage =
                            'Cannot load the reports  unauthorized ';
                            
                    } else {
                        errorMessage = 'Cannot load the reports: ' + error;
                    }
                    const alertMessage: AlertMessage = {
                        content: errorMessage,
                        show_notification: true,
                        type: MessageType.ERROR,
                    };
                    dispatch(AlertActions.addMessage(alertMessage));
                    if (error.response && error.response.status === 401) {
                        dispatch(SecurityActions.singOutSuccess())
                    }
                }
            );
        };
    },

    addReport: (token: string, name: string) => {
        return (
            dispatch: ThunkDispatch<AppState, undefined, AppAction>,
            _getState: () => AppState
        ) => {
            return API.addReport(token, name).then(
                (_response) => {
                    dispatch(ReportActions.addReportSuccess());
                    const alertMessage: AlertMessage = {
                        content: `Report ${name} saved !`,
                        show_notification: true,
                        type: MessageType.SUCCESS,
                    };
                    dispatch(AlertActions.addMessage(alertMessage));
                    dispatch(ReportThunkActions.fetchReports(token));

                },
                (error) => {
                    const alertMessage: AlertMessage = {
                        content: 'Cannot add the report: ' + error.toString(),
                        show_notification: true,
                        type: MessageType.ERROR,
                    };
                    dispatch(AlertActions.addMessage(alertMessage));
                }
            );
        };
    },

    fetchOneReport: (token: string, id: number) => {
        return (
            dispatch: ThunkDispatch<AppState, undefined, AppAction>,
            getState: () => AppState
        ) => {
            return API.fetchOneReport(token, id).then(
                (response) => {
                    dispatch(
                        ReportActions.fetchOneReportSuccess(response.data)
                    );
                },
                (error) => {
                    const alertMessage: AlertMessage = {
                        content: 'Cannot add the report: ' + error.toString(),
                        show_notification: true,
                        type: MessageType.ERROR,
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
                        type: MessageType.SUCCESS,
                    };
                  
                    dispatch(AlertActions.addMessage(alertMessage));
                },
                (error) => {
                    const alertMessage: AlertMessage = {
                        content:
                            'Cannot update the report: ' + error.toString(),
                        show_notification: true,
                        type: MessageType.ERROR,
                    };
                    dispatch(AlertActions.addMessage(alertMessage));
                }
            );
        };
    },

    deleteReport: (token, id: number) => {
        return (
            dispatch: ThunkDispatch<AppState, undefined, AppAction>,
            getState: () => AppState
        ) => {
            return API.deleteReport(token, id).then(
                (response) => {
                    dispatch(ReportActions.deleteActionSuccess());
                    dispatch(ReportThunkActions.fetchReports(token));
                    
                },
                (error) => {
                    dispatch(
                        AlertActions.addMessage({
                            content:
                                'Cannot delete the report: ' + error.toString(),
                            show_notification: true,
                            type: MessageType.ERROR,
                        })
                    );
                }
            );
        };
    },

   
};

export default ReportThunkActions;
