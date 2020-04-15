import { combineReducers } from 'redux'

import  versionPopUpReducer from "./VersionPopUpReducer";
import projectsReducer from "./ProjectReducer";
import  projectDetailReducer from "./ProjectDetailViewReducer";
import alertMessageReducer from './AlertMessagesReducer';
import { RhoneAction } from '../actions/AppAction';
import {AppState} from '../store/Store';


export default combineReducers<AppState,RhoneAction>({
        versionPopUpState: versionPopUpReducer,
        projectState: projectsReducer,
        projectDetailViewState: projectDetailReducer,
        alertState: alertMessageReducer

})