import { ActionType, createAction,createCustomAction } from 'typesafe-actions';
import {ActionKeys as C} from "../utils"
import { Expense } from '../types/Expense';


export const ExpensesActions = {
    fetchActionSuccess: createAction(C.FETCH_EXPENSES_SUCCESS)<Array<Expense>>(),
    fetchOneExpenseActionSuccess: createAction(C.FETCH_ONE_EXPENSE)<Expense>(),
    fetchError: createAction(C.ADD_ERROR)<String>(),
    deleteActionSuccess: createCustomAction(C.REMOVE_EXPENSE),
    addNewExpenseSuccess: createCustomAction(C.ADD_EXPENSE),
}

export type ExpensesAction = ActionType<typeof ExpensesActions>;