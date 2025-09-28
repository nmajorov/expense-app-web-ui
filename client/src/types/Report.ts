/**
 * represent Report types in backend
 */
export type Report = {
    id: number;
    name: string;
    createdAT: string;
    tstamp?: string; // (last modified date)
};
