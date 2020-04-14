import { combineReducers } from 'redux'

import  versionPopUpReducer from "./VersionPopUpReducer";
import projectsReducer from "./ProjectReducer";
import  projectDetailReducer from "./ProjectDetailViewReducer";
import alertMessageReducer from './AlertMessagesReducer';
import { RhoneAction } from '../actions/RhoneAction';
import {RhoneAppState} from '../store/Store';


export default combineReducers<RhoneAppState,RhoneAction>({
        versionPopUpState: versionPopUpReducer,
        projectState: projectsReducer,
        projectDetailViewState: projectDetailReducer,
        alertState: alertMessageReducer

})