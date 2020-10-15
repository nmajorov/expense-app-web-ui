import {ThunkDispatch} from "redux-thunk";
import {AppState} from "../store/Store"
import {AppAction} from "./AppAction";
import * as API from '../services/Api';
import {AlertActions} from "./AlertAction";
import {AlertMessage, MessageType} from "../types/AlertTypes";
import {Report} from "../types/Report";
import {ReportActions} from "./ReportAction";
import {SSO} from "../types/SSO";

const ReportThunkActions = {


    fetchReports: (sso: SSO) => {

        return (dispatch: ThunkDispatch<AppState, undefined, AppAction>, getState: () => AppState) => {

            return API.fetchReports(sso.token).then(
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


    addReport: (sso: SSO, name: String) => {
        return (dispatch: ThunkDispatch<AppState, undefined, AppAction>, getState: () => AppState) => {
            return API.addReport(sso.token, name).then(
                response => {
                    dispatch(ReportActions.addReportSuccess)
                },
                error => {
                    let alertMessage: AlertMessage = {
                        content: 'Cannot add the report: ' + error.toString(),
                        show_notification: true,
                        type: MessageType.ERROR
                    }
                    dispatch(AlertActions.addMessage(alertMessage))

                }
            )
        }
    },

    fetchOneReport: (sso: SSO, id: string) => {
        return (dispatch: ThunkDispatch<AppState, undefined, AppAction>, getState: () => AppState) => {
            return API.fetchOneReport(sso.token, id).then(
                response => {
                    dispatch(ReportActions.fetchOneReportSuccess(response.data))
                },
                error => {
                    let alertMessage: AlertMessage = {
                            content: 'Cannot add the report: ' + error.toString(),
                        show_notification: true,
                        type: MessageType.ERROR
                }
                    dispatch(AlertActions.addMessage(alertMessage))
                }
            )
        }
    },

    updateReport: (report: Report) => {
        return (dispatch: ThunkDispatch<AppState, undefined, AppAction>, getState: () => AppState) => {

        }
    }
}


export default ReportThunkActions;
