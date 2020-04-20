
/**
 * represent Expense types in backend
 */
export type Expense = {
    id: BigInt;
    description: string;
    createdAT: string;
    amount: Number;
    tstamp: string; //($date)

}