import {ActionKeys as C} from "../utils/ActionKeys.ts";
import { ActionType, createAction } from 'typesafe-actions';
import {UserProfile } from "../types/Login.ts";




export const SecurityActions = {
    // not easy to check login cause it do callback
    loginActionSuccess: createAction(C.LOGIN_SUCCESS)<UserProfile>(),
    userProfileLoadSuccess:createAction(C.USER_PROFILE_LOADED)<UserProfile>(),
    singOutSuccess: createAction(C.SIGN_OUT)(),
    sessionExpired: createAction(C.SESSION_EXPIRED)()
}


export type SecurityAction = ActionType<typeof SecurityActions>;