import { ReportsState } from "../store/Store.ts";
import { AppAction } from "../actions/AppAction.ts";
import { ReportActions } from "../actions/ReportAction.ts";
import { getType } from "typesafe-actions";
import { Report } from "../types/Report.ts";
import { SecurityActions } from '../actions/SecurityActions.ts';

export const REPORTS_INITIAL_STATE: ReportsState = {
  reports: [],
  changes: false
};

const reportsReducer = (
  state: ReportsState = REPORTS_INITIAL_STATE,
  action: AppAction
): ReportsState => {
  const newState: ReportsState = {
    ...state
  };
  switch (action.type) {
    case getType(ReportActions.fetchReportsSuccess):
      newState.reports = action.payload as Array<Report>;
      newState.changes = true;
      break;

    case getType(ReportActions.fetchOneReportSuccess):
      newState.reports = [action.payload as Report];
      newState.changes = true;
      break;

    case getType(ReportActions.addReportSuccess):
      newState.changes = !newState.changes;
      newState.reports = [];
      break;

    case getType(ReportActions.updateActionSuccess):
      console.log("updateActionSuccess reducer called");
      newState.changes = !newState.changes;
      newState.reports = [];
      break;

    case getType(ReportActions.deleteActionSuccess):
      // just to trigger report state
      newState.changes = !newState.changes;
      break;

    case getType(SecurityActions.singOutSuccess):
      // When user logs out, reset to the initial state
      return REPORTS_INITIAL_STATE;

    default:
      break;
  }

  return newState;
};

export default reportsReducer;
