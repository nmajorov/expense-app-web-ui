import { ActionType,createAction, createCustomAction } from 'typesafe-actions';
import {ActionKeys as C} from "../utils"
import { AlertMessage } from '../types/AlertTypes';


export const AlertActions = {
    addMessage: createAction(C.SHOW_MESSAGE)<AlertMessage>(),
    removeMessage: createCustomAction(C.REMOVE_MESSAGE)
};

export type AlertAction = ActionType<typeof AlertActions>;