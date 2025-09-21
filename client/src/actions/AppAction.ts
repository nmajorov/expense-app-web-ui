import { ExpensesAction } from "./ExpensesAction.ts";
import { AlertAction } from "./AlertAction.ts";
import { LoginAction} from "./LoginAction.ts";
import { ReportAction } from "./ReportAction.ts";

export type AppAction =
    | ExpensesAction
    | AlertAction
    | LoginAction
    | ReportAction
