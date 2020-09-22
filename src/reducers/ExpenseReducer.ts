

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
  newExpense: { id: 0, amount: 0.0, createdAT: "", tstamp: "", description: "" },
  isLoading:false 
}



const expensesReducer = (state: ExpensesState = EXPENSES_INITIAL_STATE,
  action: AppAction): ExpensesState => {
  const newState: ExpensesState = {
    ...state
  };
  switch (action.type) {
    case getType(ExpensesActions.fetchActionSuccess):
      newState.expenses = action.payload as Array<Expense>;
      newState.pollInterval = 15 * MILLISECONDS;
      break;

    case getType(ExpensesActions.deleteActionSuccess):
      newState.pollInterval = 0
      break;

      case getType(ExpensesActions.isFetching):
        newState.isLoading = action.payload as boolean;
        break;
     
    
    case getType(ExpensesActions.showDeleteDialog):
      //console.log("showDeleteDialog  called" );
      newState.selectedID = action.payload as Number;
      newState.showModal = !newState.showModal;
      break;

    case getType(ExpensesActions.fetchError):
      newState.newExpense = { id: 0, amount: 0.0, createdAT: "", tstamp: "", description: "" }
      newState.expenses = []
      newState.pollInterval = 15 * MILLISECONDS;
      newState.isLoading = false;
      break;

    /**
     * used by add and edit expense
     */
    case getType(ExpensesActions.addNewExpenseSuccess):
      newState.expenses = []
      newState.newExpense = { id: 0, amount: 0.0, createdAT: "", tstamp: "", description: "" }
      newState.pollInterval = 0
      break;

    case getType(ExpensesActions.fetchOneExpenseActionSuccess):
      newState.expenses = []
      newState.newExpense = action.payload as Expense;
      break;

    default:
      break;

  }

  return newState;
}

export default expensesReducer;