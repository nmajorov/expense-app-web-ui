

import { ReportsState } from "../store/Store";
import { AppAction } from "../actions/AppAction";
import { ReportActions } from "../actions/ReportAction";
import { getType } from "typesafe-actions";
import { Report } from "../types/Report";

export const REPORTS_INITIAL_STATE: ReportsState = {
  reports: [],
  changes:false
}



const reportsReducer = (state: ReportsState = REPORTS_INITIAL_STATE,
  action: AppAction): ReportsState => {
  const newState: ReportsState = {
    ...state
  };
  switch (action.type) {
    case getType(ReportActions.fetchReportsSuccess):
      newState.reports = action.payload as Array<Report>;
      newState.changes=true
      break;

    case getType(ReportActions.addReportSuccess):
      console.log("add report reducer called: " + JSON.stringify(newState))
      newState.changes= !newState.changes;
      newState.reports=[];
    break;
    
    case getType(ReportActions.deleteActionSuccess):
      newState.changes= !newState.changes;
    break;

    default:
      break;

  }

  return newState;
}

export default reportsReducer;