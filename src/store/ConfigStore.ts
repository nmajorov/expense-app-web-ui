

import { AppState } from "./Store";
import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import { ALERT_MESSAGE_INITIAL_STATE } from "../reducers/AlertMessagesReducer";

import { EXPENSES_INITIAL_STATE } from "../reducers/ExpenseReducer";


const initialStore: AppState = {
  alertState: ALERT_MESSAGE_INITIAL_STATE,
  expensesState: EXPENSES_INITIAL_STATE,
 }




declare const window;
const composeEnhancers =
  (process.env.NODE_ENV === 'development' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  

const configureStore = (initialState: AppState) => {
  // configure middlewares
  const middlewares = [thunk];
  // compose enhancers

  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  // persist reducers
  //const persistentReducer = persistReducer(persistConfig, rootReducer);

  return createStore(rootReducer, initialState, enhancer);
};


export const store = configureStore(initialStore);