import { ActionType, createAction } from 'typesafe-actions';
import {constants as C} from "../utils"
import { Expense } from '../types/Expense';


export const ExpensesActions = {
    fetchActionSuccess: createAction(C.FETCH_EXPENSES)<Array<Expense>>(),
    fetchError: createAction(C.ADD_ERROR)<any>(),
    deleteActionSuccess: createAction(C.REMOVE_EXPENSE)<any>(),
    showDeleteDialog: createAction(C.SHOW_DELETE_DIALOG)<Number>(),
    addNewExpenseSuccess: createAction(C.ADD_EXPENSE)<any>()
}

export type ExpensesAction = ActionType<typeof ExpensesActions>;