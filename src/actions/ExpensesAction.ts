import { ActionType, createAction } from 'typesafe-actions';
import {constants as C} from "../utils"
import { Expense } from '../types/Expense';


export const ExpensesActions = {
    fetchActionSuccess: createAction(C.FETCH_EXPENSES)<Array<Expense>>(),
    fetchError: createAction(C.ADD_ERROR)<any>()
}

export type ExpensesAction = ActionType<typeof ExpensesActions>;