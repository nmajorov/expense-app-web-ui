
import { Expense } from "../types/Expense";
import { TimeInMilliseconds } from "../types/Common";
import { AlertMessage } from "../types/AlertTypes";

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
    selectedID: BigInt;
}


export interface AppState {
    expensesState: ExpensesState;
    alertState: AlertsState;
}