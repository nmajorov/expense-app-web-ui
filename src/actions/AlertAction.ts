import { ActionType,createAction, createCustomAction } from 'typesafe-actions';
import {ActionKeys as C} from "../utils"
import { AlertMessage } from '../types/AlertTypes';


export const AlertActions = {
    addMessage: createAction(C.SHOW_ERROR)<AlertMessage>(),
    removeMessage: createCustomAction(C.CLEAR_ERROR)
};

export type AlertAction = ActionType<typeof AlertActions>;