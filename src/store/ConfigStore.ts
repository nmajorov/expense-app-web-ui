
import { createBrowserHistory } from 'history';
//import { AppState } from "./Store";
import { createStore, compose, applyMiddleware } from 'redux';
import createRootReducer from '../reducers';
import thunk from 'redux-thunk';
//import { ALERT_MESSAGE_INITIAL_STATE } from "../reducers/AlertMessagesReducer";
import { routerMiddleware } from 'connected-react-router'
//import { EXPENSES_INITIAL_STATE } from "../reducers/ExpenseReducer";
//import { SSO_INITIAL_STATE } from "../reducers/SSOReducer";
import { persistStore, persistReducer } from 'redux-persist';


// defaults to localStorage for web and AsyncStorage for react-native
import storage from 'redux-persist/lib/storage';



export const history = createBrowserHistory()


/** 
const initialStore: AppState = {
  alertState: ALERT_MESSAGE_INITIAL_STATE,
  expensesState: EXPENSES_INITIAL_STATE,
  ssoState: SSO_INITIAL_STATE
  
 }

 **/




declare const window;
const composeEnhancers =
  (process.env.NODE_ENV === 'development' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  


//const webRoot = (window as any).WEB_ROOT ? (window as any).WEB_ROOT : undefined;
//const persistKey = 'expence-' + (webRoot && webRoot !== '/' ? webRoot.substring(1) : 'root');



const persistConfig = {
  key: "primary",
  storage: storage , 
  whitelist:['ssoState','router']
};





const configureStore = (preloadedState?: any) => {
  // configure middlewares
  const middlewares = [thunk,routerMiddleware(history)];
  // compose enhancers

  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  // persist reducers
  const persistentReducer = persistReducer(persistConfig, createRootReducer(history));

  return createStore(persistentReducer, preloadedState, enhancer);
};


// pass an optional param to rehydrate state on app start
export const store = configureStore();
export const persistor = persistStore(store);

