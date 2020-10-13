

import { ReportsState } from "../store/Store";
import { AppAction } from "../actions/AppAction";
import { ReportActions } from "../actions/ReportAction";
import { getType } from "typesafe-actions";
import { Report } from "../types/Report";

export const REPORTS_INITIAL_STATE: ReportsState = {
  reports: [],
}



const reportsReducer = (state: ReportsState = REPORTS_INITIAL_STATE,
  action: AppAction): ReportsState => {
  const newState: ReportsState = {
    ...state
  };
  switch (action.type) {
    case getType(ReportActions.fetchReportsSuccess):
      newState.reports = action.payload as Array<Report>;
      break;

    default:
      break;

  }

  return newState;
}

export default reportsReducer;