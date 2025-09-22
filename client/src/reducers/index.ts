import { combineReducers } from 'redux';

import alertMessageReducer from './AlertMessagesReducer.ts';

import expensesReducer from './ExpenseReducer.ts';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import reportsReducer from './ReportsReducer.ts';
//import securityReducer from './SecurityReducer.ts';

const rootReducer = (history: History) =>
    combineReducers({
        alertState: alertMessageReducer,
        expensesState: expensesReducer,
        reportsState: reportsReducer,
      //  ssoState: securityReducer,
        router: connectRouter(history),
    });

export default rootReducer;
