
import { AppState } from "../store/Store.ts";
import { createSelector } from "@reduxjs/toolkit";

 export const securitySelector =  createSelector(
    [(state: AppState) =>state.loginState ]  ,
   (loginState) => ({
        isAuthenticated: loginState.authenticated,
        user: loginState.user,
    }));