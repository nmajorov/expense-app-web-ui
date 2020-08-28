import { combineReducers } from 'redux'


import alertMessageReducer from './AlertMessagesReducer';
import ssoReducer from './SSOReducer';
import expensesReducer from "./ExpenseReducer";
import { AppAction } from '../actions/AppAction';
import {AppState} from '../store/Store';


const rootReducer = combineReducers<AppState,AppAction>({
        alertState: alertMessageReducer,
        expensesState: expensesReducer,
        ssoState: ssoReducer


})

export default rootReducer