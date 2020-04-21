

import { AddExpenseState } from "../store/Store";
import { AppAction } from "../actions/AppAction";
import { ExpensesActions } from "../actions/ExpensesAction";
import { getType } from "typesafe-actions";
//import { Expense } from "../types/Expense";



export const ADD_EXPENSE_FORM_INITIAL_STATE: AddExpenseState = {
  newExpense: {id:0, amount: 0.0 , createdAT:"",tstamp:"",description:""}
}

const addExpenseReducer = (state: AddExpenseState = ADD_EXPENSE_FORM_INITIAL_STATE, 
    action: AppAction):AddExpenseState => {
  const newState: AddExpenseState = {
    ...state
  };
  switch (action.type) {
    case getType(ExpensesActions.addNewExpenseSuccess):
      //newState.expenses = action.payload as Array<Expense>; 
      //newState.pollInterval = 5 * MILLISECONDS;
      break;
    default:
      break;

  }

  return newState;
}

export default addExpenseReducer;