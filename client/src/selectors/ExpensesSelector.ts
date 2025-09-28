import { createSelector } from  '@reduxjs/toolkit';

import { AppState } from '../store/Store.ts';

export const expensesSelector = createSelector(
    [(state: AppState) => state.expensesState],
    (expensesState) => {
        return {
            expenses: expensesState.expenses,
        };
    }
);
