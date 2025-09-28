

import { ExpensesState } from "../store/Store";
import { AppAction } from "../actions/AppAction";
import { ExpensesActions } from "../actions/ExpensesAction";
import { getType } from "typesafe-actions";
import { Expense } from "../types/Expense";
import { SecurityActions } from '../actions/SecurityActions.ts';

export const EXPENSES_INITIAL_STATE: ExpensesState = {
  expenses: [],
  pollInterval: 0,
  showModal: false,
  selectedID: 0,
  changed: false,
  newExpense: { id: 0, amount: 0.0, createdAT: "", tstamp: "", description: "" },
}



const expensesReducer = (state: ExpensesState = EXPENSES_INITIAL_STATE,
  action: AppAction): ExpensesState => {
  const newState: ExpensesState = {
    ...state
  };
  switch (action.type) {
    case getType(ExpensesActions.fetchActionSuccess):
      newState.expenses = action.payload as Array<Expense>;
      // newState.pollInterval = 0;

      break;

    case getType(ExpensesActions.deleteActionSuccess):
      // empty expense so we can reload it again
      newState.changed = !state.changed
      break;

    /**
     * used by add and edit expense
     */
    case getType(ExpensesActions.addNewExpenseSuccess):
      newState.newExpense = { id: 0, amount: 0.0, createdAT: "", tstamp: "", description: "" }
      newState.changed = !state.changed
      break;

    case getType(ExpensesActions.fetchOneExpenseActionSuccess):
      // newState.expenses = []
      newState.newExpense = action.payload as Expense;
      break;

    case getType(SecurityActions.singOutSuccess):
      // When user logs out, reset to the initial state
      return EXPENSES_INITIAL_STATE;

    default:
      break;

  }

  return newState;
}

export default expensesReducer;
