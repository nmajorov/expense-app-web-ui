import { Expense } from '../types/Expense.ts';
import { TimeInMilliseconds } from '../types/Common.ts';
import { AlertMessage } from '../types/AlertTypes.ts';
import { RouterState } from 'connected-react-router';
import { Report } from '../types/Report.ts';
import { UserProfile } from "../types/Login.ts";
/**
 * state of  warning or info messages
 */
export interface AlertsState {
    alertMessage: AlertMessage;
}

export interface LoginState {
      authenticated: boolean;
      user?: UserProfile;
}
/**
 * state of expenses in dashboard
 */
export interface ExpensesState {
    expenses: Array<Expense>;
    pollInterval: TimeInMilliseconds;
    showModal: boolean;
    selectedID: Number;
    newExpense: Expense;
    changed: boolean;
}



export interface ReportsState {
    reports: Array<Report>;
}

export interface AppState {
    expensesState: ExpensesState;
    alertState: AlertsState;
    reportsState: ReportsState;
    loginState: LoginState;
    router: RouterState;
}
