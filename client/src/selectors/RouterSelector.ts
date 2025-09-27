import { createSelector } from  '@reduxjs/toolkit';

import { AppState } from '../store/Store.ts';


export const  routerSelector  = createSelector(
    [(state: AppState) => state.router],
    (routerState) => {
        return {
            routerLocation: routerState.location,
        };
    }
);

