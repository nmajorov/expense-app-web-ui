import { ActionType, createAction } from 'typesafe-actions';
import {constants as C} from "../utils"
import { Project } from '../types/Project';
import { Build } from '../types/Build';


export const ProjectDetailViewActions = {
    fetchProjectActionSuccess: createAction(C.FETCH_ONE_PROJECT)<Project>(),
    fetchBuildsForProjectSuccess: createAction(C.FETCH_BUILDS)<Array<Build>>(),
    startBuildSuccess: createAction(C.START_BUILD_OK)<any>()
}

export type ProjectDetailViewAction = ActionType<typeof ProjectDetailViewActions>;