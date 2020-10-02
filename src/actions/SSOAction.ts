import {ActionKeys as C} from "../utils";
import { ActionType, createAction } from 'typesafe-actions';
import { SSO } from "../types/SSO";


export const SSOActions = {
    // not easy to check login cause it do callback
    loginActionSuccess: createAction(C.DO_SSO_LOGIN)<SSO>(),
    ssoInitializedSuccess:createAction(C.SSO_INITIALIZED)<SSO>(),
    userProfileLoadSuccess:createAction(C.USER_PROFILE_LOADED)<SSO>()
}


export type SSOAction = ActionType<typeof SSOActions>;