
/**
 * represent Report types in backend
 */
export type Report = {
    id: Number;
    name: string;
    createdAT: string;
    tstamp?: string; //(last modified date)
}