import { createSelector } from  '@reduxjs/toolkit';

import { AppState } from '../store/Store.ts';

export const reportSelector = createSelector(
    [(state: AppState) => state.reportsState],
    (reportsSate) => {
        return {
            reports: reportsSate.reports,
        };
    }
);
