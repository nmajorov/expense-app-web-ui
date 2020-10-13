import { ExpensesAction } from "./ExpensesAction";
import { AlertAction } from "./AlertAction";
import { SSOAction } from "./SSOAction";
import { ReportAction } from "./ReportAction";

export type AppAction =
    | ExpensesAction
    | AlertAction
    | SSOAction
    | ReportAction
