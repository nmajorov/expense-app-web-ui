import { ActionType, createAction } from 'typesafe-actions';
import {constants as C} from "../utils"
import { AlertMessage } from '../types/AlertTypes';


export const AlertActions = {
    addMessage: createAction(C.SHOW_ERROR)<AlertMessage>(),
    remoteMessage: createAction(C.CLEAR_ERROR)<any>()
}

export type AlertAction = ActionType<typeof AlertActions>;