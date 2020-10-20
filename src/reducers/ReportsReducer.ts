import { ReportsState } from "../store/Store";
import { AppAction } from "../actions/AppAction";
import { ReportActions } from "../actions/ReportAction";
import { getType } from "typesafe-actions";
import { Report } from "../types/Report";

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
      let report = action.payload as Report;
      newState.reports = [report];
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
      //just to trigger report state
      newState.changes = !newState.changes;
      break;

    default:
      break;
  }

  return newState;
};

export default reportsReducer;
