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

// import * as toolkitRaw from '@reduxjs/toolkit';
// const { createSelector } = ((toolkitRaw as any).default ??
//     toolkitRaw) as typeof toolkitRaw;

// const { reportChanges } = useSelector((state: AppState) => {
//     return {
//         reportChanges: state.reportsState.changes,
//     };
// });
