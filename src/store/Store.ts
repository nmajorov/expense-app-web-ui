
import { Expense } from "../types/Expense";
import { TimeInMilliseconds } from "../types/Common";
import { AlertMessage } from "../types/AlertTypes";
import { SSO } from "../types/SSO";

/**
 * state of  warning or info messages
 */
export interface AlertsState{
    alertMessage: AlertMessage;
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
}

export interface SSOState{
    sso: SSO;
}



export interface AppState {
    expensesState: ExpensesState;
    alertState: AlertsState;
    ssoState: SSOState;
  
}