import { combineReducers } from 'redux'


import alertMessageReducer from './AlertMessagesReducer';
import { AppAction } from '../actions/AppAction';
import {AppState} from '../store/Store';


export default combineReducers<AppState,AppAction>({
        alertState: alertMessageReducer

})