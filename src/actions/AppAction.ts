import { ExpensesAction } from "./ExpensesAction";
import { AlertAction } from "./AlertAction";
import {SSOAction} from "./SSOAction";

export type AppAction = 
| ExpensesAction
| AlertAction
| SSOAction
