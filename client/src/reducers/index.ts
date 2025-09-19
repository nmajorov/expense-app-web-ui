import { combineReducers } from 'redux';

import alertMessageReducer from './AlertMessagesReducer';

import expensesReducer from './ExpenseReducer';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import reportsReducer from './ReportsReducer';

const rootReducer = (history: History) =>
    combineReducers({
        alertState: alertMessageReducer,
        expensesState: expensesReducer,
        reportsState: reportsReducer,
        router: connectRouter(history),
    });

export default rootReducer;
