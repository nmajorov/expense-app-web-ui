import { combineReducers } from 'redux'


import alertMessageReducer from './AlertMessagesReducer';
import  addExpenseReducer from "./AddExpenseReducer";
import expensesReducer from "./ExpenseReducer";
import { AppAction } from '../actions/AppAction';
import {AppState} from '../store/Store';


export default combineReducers<AppState,AppAction>({
        alertState: alertMessageReducer,
        expensesState: expensesReducer,
        addExpenseState: addExpenseReducer


})