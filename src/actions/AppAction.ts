import { ExpensesAction } from "./ExpensesAction";
import { AlertAction } from "./AlertAction";

export type AppAction = 
| ExpensesAction
| AlertAction
