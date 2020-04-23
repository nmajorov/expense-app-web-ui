

import { ExpensesState } from "../store/Store";
import { AppAction } from "../actions/AppAction";
import { ExpensesActions } from "../actions/ExpensesAction";
import { getType } from "typesafe-actions";
import { Expense } from "../types/Expense";
import { MILLISECONDS } from "../types/Common";

export const EXPENSES_INITIAL_STATE: ExpensesState = {
  expenses: [],
  pollInterval: 0,
  showModal: false,
  selectedID: 0,
  newExpense: { id: 0, amount: 0.0, createdAT: "", tstamp: "", description: "" }
}



const expensesReducer = (state: ExpensesState = EXPENSES_INITIAL_STATE,
  action: AppAction): ExpensesState => {
  const newState: ExpensesState = {
    ...state
  };
  switch (action.type) {
    case getType(ExpensesActions.fetchActionSuccess):
      newState.expenses = action.payload as Array<Expense>;
      newState.pollInterval = 5 * MILLISECONDS;
      break;

    case getType(ExpensesActions.deleteActionSuccess):
      
      break;

    case getType(ExpensesActions.showDeleteDialog):
      //console.log("showDeleteDialog  called" );
      newState.selectedID = action.payload as Number;
      if (newState.showModal) {
        newState.showModal = false;
      } else {
        newState.showModal = true;
      }

      break;

    case getType(ExpensesActions.fetchError):
      newState.expenses = []
      newState.pollInterval = 15 * MILLISECONDS;
      break;

    /**
     * used by add and edit expense
     */
    case getType(ExpensesActions.addNewExpenseSuccess):
      newState.pollInterval = 0;
      break;

    case getType(ExpensesActions.fetchOneExpenseActionSuccess):
      newState.newExpense = action.payload as Expense;
      break;

    default:
      break;

  }

  return newState;
}

export default expensesReducer;