import { combineReducers } from 'redux'


import alertMessageReducer from './AlertMessagesReducer';
import ssoReducer from './SSOReducer';
import expensesReducer from "./ExpenseReducer";
import { connectRouter } from 'connected-react-router'
import { History } from 'history'

const rootReducer = (history: History) =>  combineReducers({
        alertState: alertMessageReducer,
        expensesState: expensesReducer,
        ssoState: ssoReducer,
        router: connectRouter(history)


})

export default rootReducer