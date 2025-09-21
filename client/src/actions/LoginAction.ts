import {ActionKeys as C} from "../utils";
import { ActionType, createAction } from 'typesafe-actions';
import { Login } from "../types/Login.ts";


export const LoginActions = {
    // not easy to check login cause it do callback
    loginActionSuccess: createAction(C.LOGIN_SUCCESS)<Login>(),
   // loginFail: createAction(C.)<String>(),
 //   ssoInitializedSuccess:createAction(C.SSO_INITIALIZED)<SSO>(),
 //   userProfileLoadSuccess:createAction(C.USER_PROFILE_LOADED)<SSO>(),
    singOutSuccess: createAction(C.SIGN_OUT)(),
    sessionExpired: createAction(C.SESSION_EXPIRED)()
}


export type LoginAction = ActionType<typeof LoginActions>;