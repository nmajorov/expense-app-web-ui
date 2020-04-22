

import { AddEditExpenseState } from "../store/Store";
import { AppAction } from "../actions/AppAction";
import { ExpensesActions } from "../actions/ExpensesAction";
import { getType } from "typesafe-actions";
import { Expense } from "../types/Expense";



export const EXPENSE_FORM_INITIAL_STATE: AddEditExpenseState = {
  newExpense: {id:0, amount: 0.0 , createdAT:"",tstamp:"",description:""}
}

const addEditExpenseReducer = (state: AddEditExpenseState = EXPENSE_FORM_INITIAL_STATE, 
    action: AppAction):AddEditExpenseState => {
  const newState: AddEditExpenseState = {
    ...state
  };
  switch (action.type) {
    case getType(ExpensesActions.addNewExpenseSuccess):
      break;
    default:
      break;
    
    case getType(ExpensesActions.fetchOneExpenseActionSuccess):
        newState.newExpense = action.payload as Expense;
        break;
  }

  return newState;
}

export default addEditExpenseReducer;