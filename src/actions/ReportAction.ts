import { ActionType,createAction } from 'typesafe-actions';
import { Report } from '../types/Report';
import {ActionKeys as C} from "../utils"


export const ReportActions = {
    fetchReportsSuccess: createAction(C.FETCH_REPORTS_SUCCESS)<Array<Report>>(),
};

export type ReportAction = ActionType<typeof ReportActions>;