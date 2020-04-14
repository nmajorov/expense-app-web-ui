import { ActionType, createAction } from 'typesafe-actions';
import {constants as C} from "../utils"
import { Project } from '../types/Project';


export const ProjectActions = {
    fetchActionSuccess: createAction(C.FETCH_PROJECTS)<Array<Project>>(),
    fetchError: createAction(C.ADD_ERROR)<any>()
}

export type ProjectAction = ActionType<typeof ProjectActions>;