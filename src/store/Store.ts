
import { Expense } from "../types/Expense";
import { TimeInMilliseconds } from "../types/Common";
import { AlertMessage } from "../types/AlertTypes";
import { SSO } from "../types/SSO";
import { RouterState } from 'connected-react-router'
import { Report } from "../types/Report";
import { KeycloakInstance } from "keycloak-js";
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
    isLoading: boolean;
}

export interface SSOState{
    sso: SSO;
    keycloak: KeycloakInstance;
}


export interface ReportsState {
    reports : Array<Report>,
    changes?: boolean //helper for trigger changes in state 
}

export interface AppState {
    expensesState: ExpensesState;
    alertState: AlertsState;
    ssoState: SSOState;
    reportsState: ReportsState;
    router: RouterState;
}



