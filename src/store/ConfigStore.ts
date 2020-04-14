import { RhoneAppState } from "./Store";
import { VERSION_POPUP_INITIAL_STATE } from "../reducers/VersionPopUpReducer";
import {PROJECTS_INITIAL_STATE} from "../reducers/ProjectReducer";
import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import { PROJECT_DETAIL_VIEW_INITIAL_STATE } from "../reducers/ProjectDetailViewReducer";
import { ALERT_MESSAGE_INITIAL_STATE } from "../reducers/AlertMessagesReducer";



const initialStore: RhoneAppState = {
  versionPopUpState: VERSION_POPUP_INITIAL_STATE,
  projectState: PROJECTS_INITIAL_STATE,
  projectDetailViewState: PROJECT_DETAIL_VIEW_INITIAL_STATE,
  alertState: ALERT_MESSAGE_INITIAL_STATE
}




declare const window;
const composeEnhancers =
  (process.env.NODE_ENV === 'development' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


const configureStore = (initialState: RhoneAppState) => {
  // configure middlewares
  const middlewares = [thunk];
  // compose enhancers

  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  // persist reducers
  //const persistentReducer = persistReducer(persistConfig, rootReducer);

  return createStore(rootReducer, initialState, enhancer);
};


export const store = configureStore(initialStore);